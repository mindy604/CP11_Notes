"""Small browser-local checks for the function-testing lesson."""
import ast
import builtins
import io
import json
import re
import math
import symtable
import sys
import traceback


def _cp11_check(payload_json):
    payload = json.loads(payload_json)
    code = payload.get('code', '')
    if len(code) > 60000:
        return json.dumps({'error': 'Keep this practice program under 60,000 characters.'})
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
        if (wanted is not None and count != wanted) or count > 3 or arguments.vararg or arguments.kwarg or arguments.kwonlyargs or arguments.defaults:
            notes.append(f'Check the parameters of {definition.name}(). Use the number specified in the task.')
    returning = {d.name for d in definitions if any(isinstance(n, ast.Return) and n.value is not None for n in ast.walk(d))}
    for name in requirements.get('returnFunctions', []):
        if name not in returning:
            notes.append(f'{name}() needs to return its calculation. A print statement alone cannot supply the result to the caller.')
    if requirements.get('returningAtLeast', 0) > len(returning):
        notes.append('Write a calculation function that returns a value, then use that value in the caller.')

    # Day 49: calculation data belongs to each call, not hidden outside state.
    scopes = symtable.symtable(code, '<student>', 'exec').get_children()
    isolated = [d.name for d in definitions] if requirements.get('isolatedAll') else requirements.get('isolatedFunctions', [])
    allowed_globals = {d.name for d in definitions} | {'print', 'input', 'abs', 'bool', 'float', 'int', 'len', 'max', 'min', 'range', 'round', 'str', 'sum', 'enumerate'}
    for name in isolated:
        scope = next((scope for scope in scopes if scope.get_name() == name), None)
        if scope:
            hidden = [symbol.get_name() for symbol in scope.get_symbols() if symbol.is_global() and symbol.is_referenced() and symbol.get_name() not in allowed_globals]
            if hidden:
                notes.append(f'{name}() uses hidden outside data: {", ".join(hidden)}. Pass needed values as parameters or create local values.')
    if any(isinstance(n, (ast.Global, ast.Nonlocal)) for n in nodes):
        notes.append('Keep working values local. Pass data in and return results rather than changing shared outside variables.')
    for name, wanted in requirements.get('localVariables', {}).items():
        definition = next((d for d in definitions if d.name == name), None)
        assigned = {n.id for n in ast.walk(definition) if isinstance(n, ast.Name) and isinstance(n.ctx, ast.Store)} if definition else set()
        for variable in wanted:
            if variable not in assigned:
                notes.append(f'Create {variable} inside {name}() as the local working value required by the task.')
    for name, values in requirements.get('localConstants', {}).items():
        definition = next((d for d in definitions if d.name == name), None)
        for variable, wanted in values.items():
            if not definition or not any(isinstance(n, ast.Assign) and isinstance(n.value, ast.Constant) and n.value.value == wanted and any(isinstance(t, ast.Name) and t.id == variable for t in n.targets) for n in ast.walk(definition)):
                notes.append(f'Set the local {variable} to {wanted} inside {name}().')
    if requirements.get('loopInFunction'):
        name = requirements['loopInFunction']
        definition = next((d for d in definitions if d.name == name), None)
        if not definition or not any(isinstance(n, (ast.For, ast.While)) for n in ast.walk(definition)):
            notes.append(f'Keep the loop and its working total inside {name}().')

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
        output_events = []
        argument_values = {}
        returned_values = {}
        outside_values = {}

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
            frame = sys._getframe(1)
            in_menu = False
            while frame:
                if frame.f_code.co_filename == '<student>' and frame.f_code.co_name == 'show_menu':
                    in_menu = True
                frame = frame.f_back
            output_events.append({'text': text, 'menu': in_menu})

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
                    watched = list(requirements.get('globalsUnchanged', {}))
                    if requirements.get('changedOutside'):
                        watched.append(requirements['changedOutside'])
                    for variable in watched:
                        if name in primary_names:
                            outside_values.setdefault(variable, []).append(frame.f_globals.get(variable))
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
            for name, count in case.get('calls', requirements.get('calls', {})).items():
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
            if len(actual_returns) != len(wanted) or any((type(value) is not bool or value is not expected) if isinstance(expected, bool) else (isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isclose(value, expected, rel_tol=1e-8, abs_tol=1e-8)) for value, expected in zip(actual_returns, wanted)):
                checks.append(f'Check what {name}() returns for each supplied value. Expected: {wanted}; actual: {actual_returns}.')
        for name in requirements.get('quietReturns', []):
            if any(text for text in function_outputs.get(name, [])):
                checks.append(f'Let {name}() return the result. Display it in the main program instead of printing inside this calculation function.')
        for name in returning:
            if any(value is None for value in returned_values.get(name, [])):
                checks.append(f'{name}() returned None on this test. Check that the required calculation is returned on that path.')
        for variable, wanted in requirements.get('globalsUnchanged', {}).items():
            if namespace.get(variable) != wanted or not outside_values.get(variable) or any(v != wanted for v in outside_values[variable]):
                checks.append(f'Keep the outside {variable} at {wanted} before, during and after the calls.')
        if requirements.get('changedOutside'):
            variable = requirements['changedOutside']
            seen = outside_values.get(variable, [])
            if len(seen) < 2 or seen[0] is None or seen[-1] is None or seen[0] == seen[-1]:
                checks.append(f'Give the outside {variable} a value before testing, then change it before the final call. The parameter must still control the result.')
        semantic = case.get('semantic')
        if semantic and not error_message:
            number_pattern = r'[-+]?\d+(?:\.\d+)?'
            values = semantic.get('values', [])
            equal = lambda a, b: math.isclose(float(a), float(b), rel_tol=1e-8, abs_tol=1e-8)
            if semantic['kind'] == 'numericResults':
                numbers = re.findall(number_pattern, actual)
                matched = len(numbers) == len(values) and all(equal(got, wanted) for got, wanted in zip(numbers, values))
                if not matched:
                    checks.append('Display the required results in order. Clear labels and equivalent numeric formatting are accepted; leave out extra numbers and temporary traces.')
            elif semantic['kind'] == 'saleRows':
                lines = [line for line in actual.splitlines() if line.strip()]
                matched = len(lines) == len(values)
                if matched:
                    for line, original, sale in zip(lines, semantic['original'], values):
                        first = re.search(r'\boriginal\s*[:=]\s*\$([-+]?\d+\.\d{2})(?!\d)', line, re.I)
                        final = re.search(r'\bsale\s*[:=]\s*\$([-+]?\d+\.\d{2})(?!\d)', line, re.I)
                        if not first or not final or not equal(first.group(1), original) or not equal(final.group(1), sale):
                            matched = False
                if not matched:
                    checks.append('Use one labelled Original: $... | Sale: $... row per call, with both prices to two decimal places.')
            elif semantic['kind'] == 'testRows':
                rows = [line for line in actual.splitlines() if 'expected' in line.lower() and 'actual' in line.lower()]
                matched = len(rows) == len(semantic['arguments'])
                if matched:
                    for row, argument, expected_value, actual_value, status in zip(rows, semantic['arguments'], semantic['expected'], semantic['actual'], semantic['status']):
                        first = re.search(r'\binput\s*[:=]?\s*(' + number_pattern + r')\s*m\b', row, re.I)
                        expected_match = re.search(r'\bexpected\s*[:=]?\s*(' + number_pattern + r')\s*cm\b', row, re.I)
                        actual_match = re.search(r'\bactual\s*[:=]?\s*(' + number_pattern + r')\s*cm\b', row, re.I)
                        flags = re.findall(r'\b(PASS|FAIL)\b', row)
                        if not first or not expected_match or not actual_match or not equal(first.group(1), argument) or not equal(expected_match.group(1), expected_value) or not equal(actual_match.group(1), actual_value) or flags != [status]:
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
                        'consumed': consumed, 'outputEvents': output_events, 'calls': calls, 'arguments': argument_values, 'returns': returned_values, 'checks': checks, 'error': error_message,
                        'passed': not error_message and not checks and matched and consumed == len(inputs)})
    return json.dumps({'results': results, 'passed': bool(results) and all(r['passed'] for r in results)})


_cp11_base_check = _cp11_check


def _cp11_check(payload_json):
    payload = json.loads(payload_json)
    code = payload.get('code', '')
    mode = payload.get('requires', {}).get('workMode')
    if mode == 'split':
        try:
            tree = ast.parse(code)
        except SyntaxError as error:
            return json.dumps({'error': f'Your earlier program has a syntax error on line {error.lineno}. It remains saved; repair it before importing.'})
        names = [item['name'] for item in payload['requires'].get('contracts', [])]
        parts = {node.name: ast.get_source_segment(code, node) for node in tree.body if isinstance(node, ast.FunctionDef) and node.name in names}
        has_menu = any(isinstance(node, ast.FunctionDef) and node.name == 'show_menu' for node in tree.body)
        main = '\n\n'.join(ast.get_source_segment(code, node) for node in tree.body if not isinstance(node, ast.FunctionDef) or node.name not in names) if has_menu else ''
        return json.dumps({'split': parts, 'menu': main})
    if mode == 'export':
        results = []
        checked = json.loads(_cp11_check(json.dumps({**payload, 'requires': {**payload['requires'], 'workMode': 'tools'}})))
        if checked.get('error'):
            return json.dumps(checked)
        results.extend(checked['results'])
        if checked['passed']:
            if payload['requires'].get('exportKind') == 'menu':
                checked = json.loads(_cp11_check(json.dumps({**payload, 'requires': {**payload['requires'], 'workMode': 'menu'}})))
            else:
                checked = json.loads(_cp11_base_check(json.dumps({'code': code, 'requires': {'quietReturns': [item['name'] for item in payload['requires']['contracts']]}, 'cases': [{'name': 'Downloaded Python file runs', 'inputs': []}]})))
            if checked.get('error'):
                return json.dumps(checked)
            results.extend(checked['results'])
        return json.dumps({'results': results, 'passed': bool(results) and all(row['passed'] for row in results)})
    if mode not in ('tools', 'menu'):
        return _cp11_base_check(payload_json)
    try:
        tree = ast.parse(code, filename='<student>')
    except SyntaxError:
        return _cp11_base_check(payload_json)
    component = payload.get('requires', {}).get('componentName')
    definitions = {n.name: n for n in tree.body if isinstance(n, ast.FunctionDef)}
    contracts = payload.get('requires', {}).get('contracts', [])
    names = [item['name'] for item in contracts]
    notes = []
    for item in contracts:
        name = item['name']
        definition = definitions.get(name)
        if not definition:
            continue
        nodes = list(ast.walk(definition))
        if any(isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id in ('input', 'print') for n in nodes):
            notes.append(f'Keep input and print outside {name}(). This tool receives parameters and returns a value.')
        if not any(isinstance(n, ast.Return) and n.value is not None for n in nodes):
            notes.append(f'{name}() needs to return its result.')
        for banned in item.get('avoid', []):
            if any(isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == banned for n in nodes):
                notes.append(f'Use comparisons and a working value in {name}() rather than {banned}().')
        if name in ('sum_between', 'sum_odds_between', 'count_even_between', 'count_factors', 'factorial', 'is_prime', 'hcf', 'lcm'):
            loops = [n for n in nodes if isinstance(n, (ast.For, ast.While))]
            if not loops:
                notes.append(f'Use the taught loop inside {name}().')
    results = []
    if mode == 'tools':
        for item in contracts:
            name = item['name']
            for arguments, wanted in zip(item['tests'], item['values']):
                # The runner supplies direct calls; the saved program remains the student's work.
                probe_call = f'print({name}(' + ', '.join(repr(v) for v in arguments) + '))'
                req = {'names': [name], 'arities': {name: item['arity']}, 'calls': {name: 1}, 'returnFunctions': [name], 'quietReturns': [name], 'isolatedFunctions': [name]}
                case = {'name': name + '(' + ', '.join(str(v) for v in arguments) + ')', 'inputs': [], 'probe': {'function': name, 'arguments': arguments}, 'returnValues': {name: [wanted]}}
                result = json.loads(_cp11_base_check(json.dumps({'code': code + '\n' + probe_call, 'requires': req, 'cases': [case]})))
                if result.get('error'):
                    return json.dumps(result)
                row = result['results'][0]
                actual_returns = row['returns'].get(name, [])
                row['expected'] = str(wanted)
                row['actual'] = str(actual_returns[-1]) if actual_returns else '(no returned result)'
                row['checks'].extend(notes)
                row['passed'] = row['passed'] and not notes
                results.append(row)
    else:
        menu = definitions.get('show_menu')
        if menu:
            if any(isinstance(n, ast.Return) for n in ast.walk(menu)):
                notes.append('show_menu() displays choices and has no explicit return.')
            if not all(isinstance(n, ast.Expr) and isinstance(n.value, ast.Call) and isinstance(n.value.func, ast.Name) and n.value.func.id == 'print' for n in menu.body):
                notes.append('Keep show_menu() for displaying choices only. Put input and menu control in the main program.')
        loops = [n for n in tree.body if isinstance(n, ast.While)]
        valid_control = False
        for loop in loops:
            test = loop.test
            if not (isinstance(test, ast.Compare) and len(test.ops) == 1 and isinstance(test.ops[0], ast.NotEq) and isinstance(test.left, ast.Name) and len(test.comparators) == 1 and isinstance(test.comparators[0], ast.Constant) and test.comparators[0].value == '0'):
                continue
            variable = test.left.id
            def reads_choice(statement):
                return isinstance(statement, ast.Assign) and any(isinstance(t, ast.Name) and t.id == variable for t in statement.targets) and any(isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == 'input' for n in ast.walk(statement.value))
            before = tree.body[:tree.body.index(loop)]
            if any(reads_choice(n) for n in before) and loop.body and reads_choice(loop.body[-1]):
                valid_control = True
        if not valid_control:
            notes.append('Read a choice before while choice != "0", then read a new choice at the end of each turn. Keep this menu loop in the main program.')
        # Check the whole session, including calls that must NOT happen after rejection or quit.
        base_cases = []
        source_cases = payload.get('cases', [])
        for case in source_cases:
            base_cases.append({**case, 'expected': None, 'calls': {} if payload.get('requires', {}).get('own') else {name: case.get('calls', {}).get(name, 0) for name in names}, 'callArguments': {} if payload.get('requires', {}).get('own') else {name: case.get('callArguments', {}).get(name, []) for name in names}})
        required_return_names = [name for name in names if any(case.get('calls', {}).get(name, 0) for case in source_cases)]
        req = {'names': names + ['show_menu'], 'arities': {**{item['name']: item['arity'] for item in contracts}, 'show_menu': 0}, 'returnFunctions': required_return_names, 'quietReturns': names, 'isolatedFunctions': names + ['show_menu']}
        checked = json.loads(_cp11_base_check(json.dumps({'code': code, 'requires': req, 'cases': base_cases})))
        if checked.get('error'):
            return json.dumps(checked)
        for row, case in zip(checked['results'], source_cases):
            row['checks'].extend(notes)
            events = row.pop('outputEvents', [])
            menu_text = ''.join(event['text'] for event in events if event['menu'])
            actual = ''.join(event['text'] for event in events if not event['menu']).strip()
            row['fullActual'] = row['actual']
            row['actual'] = actual
            row['expected'] = case['expected']
            menu_digits = set(re.findall(r'\b[0-6]\b', menu_text))
            if menu_digits != set('0123456'):
                row['checks'].append('show_menu() must display all choices 1–6 and 0 Quit.')
            if row['calls'].get('show_menu', 0) < case.get('menuChoices', 1):
                row['checks'].append('Display the menu before each new choice.')
            lines = [line.strip() for line in actual.splitlines() if line.strip()]
            items = case.get('items', [])
            matched = len(lines) == len(items)
            if matched:
                for line, item in zip(lines, items):
                    lower = line.lower()
                    kind = item['kind']
                    if kind == 'number':
                        numbers = re.findall(r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?', line)
                        okay = bool(numbers) and any(c.isalpha() for c in re.sub(r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?', '', line)) and math.isclose(float(numbers[-1]), item['value'], rel_tol=1e-9, abs_tol=0.0)
                    elif kind in ('even', 'odd'):
                        okay = bool(re.search(r'\b' + kind + r'\b', lower)) and not bool(re.search(r'\b' + ('even' if kind == 'odd' else 'odd') + r'\b', lower))
                    elif kind == 'prime':
                        okay = bool(re.search(r'\bprime\b', lower)) and not bool(re.search(r'\bnot\b|non.?prime', lower))
                    elif kind == 'notprime':
                        okay = bool(re.search(r'\bnot\b.*\bprime\b|non.?prime', lower))
                    elif kind == 'negative':
                        okay = bool(re.search(r'negative|zero|>=|at least|invalid|must|cannot', lower)) and bool(re.search(r'factorial|integer|number|input', lower))
                    elif kind == 'range':
                        okay = bool(re.search(r'start|end|range|first|second', lower)) and bool(re.search(r'must|invalid|cannot|at most|revers|greater|less|<=|order', lower))
                    elif kind == 'domain':
                        okay = bool(line.strip()) and any(c.isalpha() for c in line)
                    elif kind == 'invalid':
                        okay = bool(re.search(r'\binvalid\b', lower)) and bool(re.search(r'\b(choice|option|selection)\b', lower))
                    else:
                        okay = bool(re.search(r'\bgoodbye\b', lower))
                    matched = matched and okay
            if case.get('ownOutput'):
                matched = actual.replace('\r\n', '\n').rstrip() == case['expected'].replace('\r\n', '\n').rstrip()
            if not matched:
                row['checks'].append('Compare the result/message order with the expected session. Use a labelled numeric result, a prime/not-prime sentence for is_prime, and a clear message for rejected input. Your labels can use your own words. Repeated menu lines and input prompts are omitted here.')
            row['passed'] = row['passed'] and matched and not row['checks']
            results.append(row)
    return json.dumps({'results': results, 'passed': bool(results) and all(row['passed'] for row in results)})
