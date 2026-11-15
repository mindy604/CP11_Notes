"""Small browser-local checks for the one-parameter functions lesson."""
import ast
import builtins
import io
import json
import re
import math
import sys
import traceback


def _cp11_check(payload_json):
    payload = json.loads(payload_json)
    code = payload.get('code', '')
    if len(code) > 16000:
        return json.dumps({'error': 'Keep this practice program under 16,000 characters.'})
    try:
        tree = ast.parse(code, filename='<student>')
    except SyntaxError as error:
        return json.dumps({'error': f'Line {error.lineno}: {error.msg}. Check the colon, parentheses and four-space indentation.'})
    nodes = list(ast.walk(tree))
    if any(isinstance(n, (ast.Import, ast.ImportFrom, ast.Break, ast.Continue, ast.Pass)) for n in nodes):
        return json.dumps({'error': 'Use the taught functions, loops and conditions. Imports, break, continue and pass are not needed here.'})
    if any(isinstance(n, ast.While) and isinstance(n.test, ast.Constant) and n.test.value is True for n in nodes):
        return json.dumps({'error': 'Use a while condition that can become False, with an update.'})
    requirements = payload.get('requires', {})
    definitions = [n for n in nodes if isinstance(n, ast.FunctionDef)]
    notes = []
    if len(definitions) < requirements.get('minDefinitions', 1):
        notes.append('Define the required function(s), then call them. Printing the target without a function does not practise this skill.')
    primary_names = requirements.get('names', [])
    for definition in definitions:
        arguments = definition.args
        count = len(arguments.posonlyargs) + len(arguments.args)
        target = count == 1 if definition.name in primary_names or not primary_names else count in (0, 1)
        if not target or arguments.kwonlyargs or arguments.vararg or arguments.kwarg or arguments.defaults:
            notes.append(f'{definition.name}(): use exactly one ordinary parameter for the main task; a supporting display function may have none.')
        if count == 1 and requirements.get('usesParameter', True):
            parameter = (arguments.posonlyargs + arguments.args)[0].arg
            if not any(isinstance(n, ast.Name) and isinstance(n.ctx, ast.Load) and n.id == parameter for statement in definition.body for n in ast.walk(statement)):
                notes.append(f'Use the parameter {parameter} inside {definition.name}(). A quoted word does not use its value.')
    if any(isinstance(n, ast.Return) for n in nodes):
        notes.append('This lesson prints results; do not use an explicit return statement yet.')
    for name in requirements.get('names', []):
        if sum(n.name == name for n in definitions) != 1:
            notes.append(f'Define {name}() exactly once.')
    if requirements.get('outerLoop') and not any(isinstance(n, ast.For) for n in tree.body):
        notes.append('Use a for loop in the main program, outside the functions.')
    if requirements.get('decision') and not any(isinstance(n, ast.If) for d in definitions for n in ast.walk(d)):
        notes.append('Include the required if/else decision inside your function.')
    results = []
    for case in payload.get('cases', []):
        output = io.StringIO()
        inputs = case.get('inputs', [])
        consumed = 0
        steps = 0
        calls = {}
        starts = {}
        function_outputs = {}
        argument_values = {}

        def read_input(prompt=''):
            nonlocal consumed
            if consumed >= len(inputs):
                raise RuntimeError('Another input was requested. Add it to the test inputs, or check how often your function is called.')
            value = str(inputs[consumed])
            consumed += 1
            return value

        def write(*values, sep=' ', end='\n', **kwargs):
            text = sep.join(str(v) for v in values) + end
            if output.tell() + len(text) > 12000:
                raise RuntimeError('Output limit reached. Check repeated calls and loop updates.')
            output.write(text)

        def trace(frame, event, arg):
            nonlocal steps
            if frame.f_code.co_filename == '<student>':
                name = frame.f_code.co_name
                if event == 'line':
                    steps += 1
                    if steps > 10000:
                        raise RuntimeError('Stopped after 10,000 steps. Check the stopping condition and update.')
                if name != '<module>' and event == 'call':
                    calls[name] = calls.get(name, 0) + 1
                    starts[id(frame)] = output.tell()
                    if frame.f_code.co_argcount == 1:
                        argument_values.setdefault(name, []).append(frame.f_locals.get(frame.f_code.co_varnames[0]))
                elif name != '<module>' and event == 'return':
                    start = starts.pop(id(frame), output.tell())
                    function_outputs.setdefault(name, []).append(output.getvalue()[start:])
            return trace

        allowed_names = ('abs', 'bool', 'float', 'int', 'len', 'max', 'min', 'range', 'round', 'str', 'sum', 'enumerate')
        safe = {name: getattr(builtins, name) for name in allowed_names}
        safe.update({'print': write, 'input': read_input})
        namespace = {'__builtins__': safe, '__name__': '__main__'}
        error_message = None
        try:
            sys.settrace(trace)
            exec(compile(tree, '<student>', 'exec'), namespace, namespace)
        except BaseException as error:
            frames = [f for f in traceback.extract_tb(error.__traceback__) if f.filename == '<student>']
            prefix = f'Line {frames[-1].lineno}: ' if frames else ''
            error_message = prefix + type(error).__name__ + ': ' + str(error)
        finally:
            sys.settrace(None)
        checks = list(notes)
        if not error_message:
            for name, count in requirements.get('calls', {}).items():
                if calls.get(name, 0) != count:
                    checks.append(f'{name}() must run {count} time(s); this run called it {calls.get(name, 0)} time(s).')
            minimum = requirements.get('sameFunctionCalledAtLeast', 1)
            if minimum > 0 and not any(count >= minimum for count in calls.values()):
                checks.append(f'Call the same function at least {minimum} time(s) in this run.')
            if len(calls) < requirements.get('minCalledFunctions', 1):
                checks.append('Call each of the different functions required by this task.')
            line_requirements = dict(requirements.get('functionLines', {}))
            if requirements.get('anyFunctionLines'):
                wanted = requirements['anyFunctionLines']
                if not any(len(text.rstrip('\n').splitlines()) == wanted for outputs in function_outputs.values() for text in outputs):
                    checks.append(f'Your function needs to print {wanted} lines when called.')
            for name, count in line_requirements.items():
                if not function_outputs.get(name) or any(len(text.rstrip('\n').splitlines()) != count for text in function_outputs[name]):
                    checks.append(f'Each call to {name}() should print {count} lines.')
        if not error_message:
            for name, wanted in case.get('callArguments', {}).items():
                if argument_values.get(name, []) != wanted:
                    checks.append(f'Pass each supplied value to {name}() in order. Expected arguments: {wanted}; actual: {argument_values.get(name, [])}.')
        actual = output.getvalue().replace('\r\n', '\n').rstrip()
        expected = case.get('expected')
        compared = expected is not None
        matched = not compared or actual == str(expected).replace('\r\n', '\n').rstrip()
        semantic = case.get('semantic')
        if semantic and not error_message:
            matched = True
            name = semantic['function']
            values = semantic['values']
            outputs = function_outputs.get(name, [])
            if len(outputs) != len(values):
                matched = False
                checks.append('Each supplied value needs its own function call and displayed result.')
            else:
                for number, text in zip(values, outputs):
                    numbers = [float(v) for v in re.findall(r'(?<![A-Za-z_])[-+]?\d+(?:\.\d+)?', text)]
                    contains = lambda wanted: any(math.isclose(v, wanted, rel_tol=1e-8, abs_tol=1e-8) for v in numbers)
                    if semantic['kind'] == 'millilitres':
                        valid = contains(number * 236.6) and re.search(r'\bmL\b', text, re.I)
                    elif semantic['kind'] == 'temperature':
                        label = 'Cold' if number < 10 else 'Mild'
                        other = 'Mild' if number < 10 else 'Cold'
                        valid = contains(number) and re.search(r'\b' + label + r'\b', text) and not re.search(r'\b' + other + r'\b', text)
                    else:
                        valid = contains(number) and ('Goal met' in text if number >= 10 else contains(10-number) and re.search(r'remain', text, re.I))
                    if not valid:
                        matched = False
                        checks.append(f'Recheck the result for argument {number} in {name}(). Labels may vary, but values, units and boundary messages must match the brief.')
                if semantic['kind'] == 'score':
                    lines = actual.splitlines()
                    if not all(any(member in line for line in lines) for member in semantic.get('members', [])):
                        matched = False
                        checks.append('Print each member name in the main program.')
        results.append({'name': case.get('name', 'Test'), 'actual': actual, 'expected': expected, 'inputs': inputs,
                        'consumed': consumed, 'calls': calls, 'arguments': argument_values, 'checks': checks, 'error': error_message,
                        'passed': not error_message and not checks and matched and consumed == len(inputs)})
    return json.dumps({'results': results, 'passed': bool(results) and all(r['passed'] for r in results)})
