"""Small browser-local checks for the two-parameter functions lesson."""
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
        parameters = arguments.posonlyargs + arguments.args
        count = len(parameters)
        target = count == 2 if definition.name in primary_names or not primary_names else count in (0, 1, 2)
        if not target or arguments.kwonlyargs or arguments.vararg or arguments.kwarg or arguments.defaults:
            notes.append(f'{definition.name}() needs two ordinary parameters. A supporting function may use fewer.')
        if requirements.get('usesParameter', True):
            for parameter in parameters:
                if not any(isinstance(n, ast.Name) and isinstance(n.ctx, ast.Load) and n.id == parameter.arg for statement in definition.body for n in ast.walk(statement)):
                    notes.append(f'Use {parameter.arg} inside {definition.name}(). Printing its name in quotes does not use its value.')
    if any(isinstance(n, ast.Return) for n in nodes):
        notes.append('This lesson prints results; do not use an explicit return statement yet.')
    for name in requirements.get('names', []):
        if sum(n.name == name for n in definitions) != 1:
            notes.append(f'Define {name}() exactly once.')
    if requirements.get('outerLoop') and not any(isinstance(n, (ast.For, ast.While)) for n in tree.body):
        notes.append('Use a loop in the main program, outside the functions.')
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
                raise RuntimeError('This test ran out of inputs. Check how many values your program reads. If you are using your own test plan, add any missing inputs to its box.')
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
                    if frame.f_code.co_argcount:
                        argument_values.setdefault(name, []).append([frame.f_locals.get(parameter) for parameter in frame.f_code.co_varnames[:frame.f_code.co_argcount]])
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
            run_tree = tree
            if case.get('probe'):
                probe = case['probe']
                expression = ast.Expr(value=ast.Call(func=ast.Name(id=probe['function'], ctx=ast.Load()), args=[ast.Constant(value=v) for v in probe['arguments']], keywords=[]))
                run_tree = ast.fix_missing_locations(ast.Module(body=[n for n in tree.body if isinstance(n, ast.FunctionDef)] + [expression], type_ignores=[]))
            exec(compile(run_tree, '<student>', 'exec'), namespace, namespace)
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
                    checks.append(f'{name}() should run {count} time' + ('s' if count != 1 else '') + f' in this test. It ran {calls.get(name, 0)} time' + ('s' if calls.get(name, 0) != 1 else '') + '.')
            minimum = requirements.get('sameFunctionCalledAtLeast', 1)
            if minimum > 0 and not any(count >= minimum for count in calls.values()):
                checks.append('Call your function at least once.' if minimum == 1 else f'Call the same function at least {minimum} times in this test.')
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
            pairs = semantic['values']
            outputs = function_outputs.get(name, [])
            if len(outputs) != len(pairs):
                matched = False
                checks.append('Call the same function once for each pair of values in the test.')
            else:
                number_pattern = r'(?<![\d.])([-+]?\d+(?:\.\d+)?)(?!\d|\.\d)'

                def equal(a, b):
                    return math.isclose(float(a), float(b), rel_tol=1e-8, abs_tol=1e-8)

                def role_matches(text, patterns, wanted, money=False):
                    for pattern in patterns:
                        for match in re.finditer(pattern, text, re.I):
                            amount = match.group(1)
                            if equal(amount, wanted) and (not money or re.fullmatch(r'[-+]?\d+\.\d{2}', amount)):
                                return True
                    return False

                for (first, second), text in zip(pairs, outputs):
                    numbers = [float(v) for v in re.findall(r'(?<![A-Za-z_])[-+]?\d+(?:\.\d+)?', text)]
                    valid = False
                    if semantic['kind'] == 'area':
                        valid = any(equal(number, first * second) for number in numbers)
                    elif semantic['kind'] == 'labels':
                        length_ok = role_matches(text, [r'\blength\s*[:=]?\s*' + number_pattern], first)
                        width_ok = role_matches(text, [r'\bwidth\s*[:=]?\s*' + number_pattern], second)
                        area_ok = role_matches(text, [r'\barea\s*[:=]?\s*' + number_pattern], first * second)
                        valid = length_ok and width_ok and area_ok
                    elif semantic['kind'] == 'bake':
                        quantity_ok = role_matches(text, [r'\b(?:quantity|qty|items)\s*[:=]?\s*' + number_pattern, number_pattern + r'\s+items?\b'], first)
                        price_ok = role_matches(text, [r'\b(?:unit\s*price|price\s*(?:each)?|each)\s*[:=]?\s*\$?\s*' + number_pattern, r'(?:\bat|@)\s*\$?\s*' + number_pattern], second, money=True)
                        total_ok = role_matches(text, [r'\b(?:total|cost|costs)\s*[:=]?\s*\$?\s*' + number_pattern, r':\s*\$\s*' + number_pattern], first * second, money=True)
                        valid = quantity_ok and price_ok and total_ok
                    if not valid:
                        matched = False
                        if semantic['kind'] == 'bake':
                            checks.append(f'For quantity {first} and unit price {second}, show the quantity, unit price and total in their correct roles. Use two decimal places for both money amounts.')
                        elif semantic['kind'] == 'labels':
                            checks.append(f'For ({first}, {second}), label Length as {first}, Width as {second}, and Area as {first * second}. Check the labels as well as the product.')
                        else:
                            checks.append(f'For ({first}, {second}), display an area of {first * second}.')
        results.append({'name': case.get('name', 'Test'), 'actual': actual, 'expected': expected, 'inputs': inputs,
                        'consumed': consumed, 'calls': calls, 'arguments': argument_values, 'checks': checks, 'error': error_message,
                        'passed': not error_message and not checks and matched and consumed == len(inputs)})
    return json.dumps({'results': results, 'passed': bool(results) and all(r['passed'] for r in results)})
