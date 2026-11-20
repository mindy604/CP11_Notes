"""Small browser-local checks for the function-testing lesson."""
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
        count = len(arguments.posonlyargs + arguments.args)
        wanted = requirements.get('arities', {}).get(definition.name)
        if (wanted is not None and count != wanted) or count > 2 or arguments.vararg or arguments.kwarg or arguments.kwonlyargs or arguments.defaults:
            notes.append(f'Check the parameters of {definition.name}(). Use the number specified in the task.')
    returning = {d.name for d in definitions if any(isinstance(n, ast.Return) and n.value is not None for n in ast.walk(d))}
    for name in requirements.get('returnFunctions', []):
        if name not in returning:
            notes.append(f'{name}() needs to return its calculation. A print statement alone cannot supply the result to the caller.')
    if requirements.get('returningAtLeast', 0) > len(returning):
        notes.append('Write a calculation function that returns a value, then use that value in the caller.')

    def outside(node):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)):
            return
        yield node
        for child in ast.iter_child_nodes(node):
            yield from outside(child)

    main_nodes = list(outside(tree))
    def caller_nodes(name):
        def walk(node):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and node.name == name:
                return
            yield node
            for child in ast.iter_child_nodes(node):
                yield from walk(child)
        return list(walk(tree))
    for name in requirements.get('ifElseFunctions', []):
        definition = next((d for d in definitions if d.name == name), None)
        if not definition or not any(isinstance(n, ast.If) and n.orelse for n in ast.walk(definition)):
            notes.append(f'Use the required if/else in {name}() and return True or False.')
    parent = {id(child): node for node in ast.walk(tree) for child in ast.iter_child_nodes(node)}
    required_returns = requirements.get('returnFunctions', []) or (list(returning) if requirements.get('returningAtLeast') else [])
    for name in required_returns:
        if not any(isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == name and not isinstance(parent.get(id(n)), ast.Expr) for n in caller_nodes(name)):
            notes.append(f'Use the value returned by {name}() in the caller. A call on its own does not display or store the result.')
    assignments = [n for n in main_nodes if isinstance(n, ast.Assign)]
    stored = {}
    for name in requirements.get('storeReturns', []):
        variables = {target.id for n in caller_nodes(name) if isinstance(n, ast.Assign) and isinstance(n.value, ast.Call) and isinstance(n.value.func, ast.Name) and n.value.func.id == name for target in n.targets if isinstance(target, ast.Name)}
        if not variables:
            notes.append(f'Store the value returned by {name}() in the code that checks or uses the result.')
        for iteration in range(len(assignments)):
            for n in assignments:
                if any(isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load) and child.id in variables for child in ast.walk(n.value)):
                    variables.update(t.id for t in n.targets if isinstance(t, ast.Name))
        stored[name] = variables
    if requirements.get('comparesReturned'):
        name = requirements['comparesReturned']
        nodes = caller_nodes(name)
        actual_names = {target.id for n in nodes if isinstance(n, ast.Assign) and isinstance(n.value, ast.Call) and isinstance(n.value.func, ast.Name) and n.value.func.id == name for target in n.targets if isinstance(target, ast.Name)}
        valid_comparison = False
        for node in nodes:
            if not isinstance(node, ast.Compare) or not any(isinstance(op, (ast.Eq, ast.NotEq)) for op in node.ops):
                continue
            operands = [node.left] + node.comparators
            uses_actual = any(any(isinstance(child, ast.Name) and child.id in actual_names or isinstance(child, ast.Call) and isinstance(child.func, ast.Name) and child.func.id == name for child in ast.walk(term)) for term in operands)
            independent = any(isinstance(term, ast.Constant) or isinstance(term, ast.Name) and term.id not in actual_names for term in operands)
            if uses_actual and independent:
                valid_comparison = True
        if not valid_comparison:
            notes.append('Compare the actual returned value with an independently expected value. Printing PASS without a comparison is not a test.')
    for name, minimum in requirements.get('printStoredCopies', {}).items():
        prints = [n for n in main_nodes if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == 'print' and any(isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load) and child.id in stored.get(name, set()) for child in ast.walk(n))]
        if len(prints) < minimum:
            notes.append('Use the stored area in both labelled outputs. Do not call the function again just to display the same area.')
    if requirements.get('subtractStored'):
        variables = stored.get(requirements['subtractStored'], set())
        if not any(isinstance(n, ast.BinOp) and isinstance(n.op, ast.Sub) and any(isinstance(child, ast.Name) and child.id in variables for child in ast.walk(n)) for n in main_nodes):
            notes.append('In the main program, subtract the stored discount from the original price.')
    if requirements.get('noAreaOutside'):
        name = requirements['noAreaOutside']
        input_names = {a.id for n in main_nodes if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == name for a in n.args if isinstance(a, ast.Name)}
        if any(isinstance(n, ast.BinOp) and isinstance(n.op, ast.Mult) and len({child.id for child in ast.walk(n) if isinstance(child, ast.Name)} & input_names) >= 2 for n in main_nodes):
            notes.append('Keep the area formula inside triangle_area(). Reuse its returned value in the main program.')
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
        returned_values = {}

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
                    returned_values.setdefault(name, []).append(arg)
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
        for name, wanted in case.get('returnValues', {}).items():
            actual_returns = returned_values.get(name, [])
            if len(actual_returns) != len(wanted) or any((type(value) is not bool or value is not expected) if isinstance(expected, bool) else (isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isclose(value, expected, rel_tol=1e-9, abs_tol=0.0)) for value, expected in zip(actual_returns, wanted)):
                checks.append(f'Check what {name}() returns for each supplied value. Expected: {wanted}; actual: {actual_returns}.')
        for name in requirements.get('quietReturns', []):
            if any(text for text in function_outputs.get(name, [])):
                checks.append(f'Let {name}() return the result. Display it in the main program instead of printing inside this calculation function.')
        for name in returning:
            if any(value is None for value in returned_values.get(name, [])):
                checks.append(f'{name}() returned None on this test. Check that the required calculation is returned on that path.')
        semantic = case.get('semantic')
        if semantic and not error_message:
            number_pattern = r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'
            values = semantic.get('values', [])
            equal = lambda a, b: math.isclose(float(a), float(b), rel_tol=1e-9, abs_tol=0.0)
            if semantic['kind'] == 'testRows':
                if any(not equal(a, b) for a, b in zip(semantic['expected'], semantic.get('independentExpected', semantic['expected']))):
                    checks.append('Recalculate your independent predictions from the metre-to-centimetre rule. Keep predictions separate from actual results.')
                rows = [line for line in actual.splitlines() if 'expected' in line.lower() and 'actual' in line.lower()]
                matched = len(rows) == len(semantic['arguments'])
                if matched:
                    for row, argument, expected_value, actual_value, status in zip(rows, semantic['arguments'], semantic['expected'], semantic['actual'], semantic['status']):
                        first = re.search(r'\binput\s*[:=]?\s*(' + number_pattern + r')\s*m\b', row, re.I)
                        expected_match = re.search(r'\bexpected\s*[:=]?\s*(' + number_pattern + r')\s*cm\b', row, re.I)
                        actual_match = re.search(r'\bactual\s*[:=]?\s*(' + number_pattern + r')\s*cm\b', row, re.I)
                        flags = re.findall(r'\b(PASS|FAIL)\b', row)
                        if not first or not expected_match or not actual_match or not equal(first.group(1), argument) or not equal(expected_match.group(1), expected_value) or not equal(actual_match.group(1), actual_value) or (flags != [status] and not (status == 'PASS' and flags == ['FAIL'] and actual_value != expected_value and equal(actual_value, expected_value))):
                            matched = False
                if not matched:
                    checks.append('Check each labelled Input / Expected / Actual row, its m and cm units, and its PASS or FAIL result. Keep the expected values unchanged in the faulty copy.')
            elif semantic['kind'] == 'booleanRows':
                lines = [line.strip() for line in actual.splitlines() if line.strip()]
                matched = len(lines) == len(values)
                if matched:
                    for line, wanted in zip(lines, values):
                        word = 'True' if wanted else 'False'
                        if line == word:
                            continue
                        expected_match = re.search(r'\bexpected\s*[:=]?\s*(True|False)\b', line, re.I)
                        actual_match = re.search(r'\bactual\s*[:=]?\s*(True|False)\b', line, re.I)
                        if not expected_match or not actual_match or expected_match.group(1).lower() != word.lower() or actual_match.group(1).lower() != word.lower():
                            matched = False
                if not matched:
                    checks.append('Record the four Boolean results in order: True, False, False, True. Return Boolean values, not the strings "True" and "False".')
            elif semantic['kind'] == 'triangle':
                lines = [line for line in actual.splitlines() if 'square units' in line.lower()]
                matched = len(lines) == 2 * len(values)
                if matched:
                    for i, wanted in enumerate(values):
                        pair = lines[2*i:2*i+2]
                        numbers = [re.findall(number_pattern, line) for line in pair]
                        roles = any('material' in line.lower() for line in pair) and any('area' in line.lower() and 'material' not in line.lower() for line in pair)
                        if not roles or not all(nums and equal(nums[-1], wanted) for nums in numbers):
                            matched = False
                if not matched:
                    checks.append('For each triangle, display its stored area twice: once as an area label and once as a material amount. Include square units in both lines.')
            elif semantic['kind'] == 'rectangle':
                numbers = [re.findall(number_pattern, line) for line in actual.splitlines() if line.strip()]
                matched = len(numbers) == len(values) and all(nums and equal(nums[-1], wanted) for nums, wanted in zip(numbers, values))
            elif semantic['kind'] == 'discount':
                original = float(case['inputs'][0]); discount = values[0]
                first = re.findall(r'\bdiscount(?:\s+amount)?\s*[:=]?\s*\$?\s*(' + number_pattern + r')', actual, re.I)
                final = re.findall(r'\b(?:final(?:\s+price)?|amount\s+to\s+pay|after\s+discount)\s*[:=]?\s*\$?\s*(' + number_pattern + r')', actual, re.I)
                matched = any(equal(v, discount) for v in first) and any(equal(v, original-discount) for v in final)
                if not matched:
                    checks.append('Display the returned discount and the final price with labels. Calculate the final price in the main program.')
        results.append({'name': case.get('name', 'Test'), 'actual': actual, 'expected': expected, 'inputs': inputs,
                        'consumed': consumed, 'calls': calls, 'arguments': argument_values, 'returns': returned_values, 'checks': checks, 'error': error_message,
                        'passed': not error_message and not checks and matched and consumed == len(inputs)})
    return json.dumps({'results': results, 'passed': bool(results) and all(r['passed'] for r in results)})
