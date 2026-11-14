"""Run small CP11 review programs against explicit cases. Used by the browser worker."""
import ast
import builtins
import contextlib
import io
import json
import sys
import traceback


def _cp11_check(payload_json):
    payload = json.loads(payload_json)
    code = payload.get('code', '')
    if len(code) > 12000:
        return json.dumps({'error': 'Keep this small review program under 12,000 characters.'})
    try:
        tree = ast.parse(code, filename='<student>')
    except SyntaxError as error:
        return json.dumps({'error': f'Line {error.lineno}: {error.msg}. Check colons, brackets and indentation.'})
    forbidden = (ast.Import, ast.ImportFrom, ast.Break, ast.Continue, ast.Pass)
    if any(isinstance(node, forbidden) for node in ast.walk(tree)):
        return json.dumps({'error': 'Use the basic loop and conditions for this review. Imports, break, continue and pass are not needed.'})
    if any(isinstance(node, ast.While) and isinstance(node.test, ast.Constant) and node.test.value is True for node in ast.walk(tree)):
        return json.dumps({'error': 'Use a while condition that can become False instead of while True.'})
    required = payload.get('requires', 'for')
    loops = [node for node in ast.walk(tree) if isinstance(node, ast.For if required == 'for' else ast.While)]
    structure = bool(loops)
    if required in ('and', 'or'):
        operation = ast.And if required == 'and' else ast.Or
        structure = any(any(isinstance(node, ast.BoolOp) and isinstance(node.op, operation) for node in ast.walk(loop.test)) for loop in loops)
    structure_note = {'for': 'Use a for loop for this problem.', 'while': 'Use a while loop for this problem.', 'and': 'Use and in your while condition for this problem.', 'or': 'Use or in your while condition for this problem.'}[required]
    results = []
    for case in payload['cases']:
        used = 0
        output = io.StringIO()
        line_count = 0

        def read_input(prompt=''):
            nonlocal used
            if used >= len(case.get('inputs', [])):
                raise RuntimeError('Your program asked for another input after the supplied inputs ended. Check its stopping condition.')
            value = str(case['inputs'][used])
            used += 1
            return value

        def bounded_print(*values, sep=' ', end='\n', file=None, flush=False):
            text = sep.join(str(value) for value in values) + end
            if output.tell() + len(text) > 12000:
                raise RuntimeError('Output limit reached. Check the loop condition and update.')
            output.write(text)

        def trace(frame, event, arg):
            nonlocal line_count
            if frame.f_code.co_filename == '<student>' and event == 'line':
                line_count += 1
                if line_count > 10000:
                    raise RuntimeError('Stopped after 10,000 steps. Check the loop condition and update.')
            return trace

        allowed = dict(vars(builtins))
        allowed.update({'input': read_input, 'print': bounded_print})
        namespace = {'__builtins__': allowed, '__name__': '__main__'}
        error_message = None
        try:
            sys.settrace(trace)
            with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
                exec(compile(tree, '<student>', 'exec'), namespace, namespace)
        except BaseException as error:
            frames = [frame for frame in traceback.extract_tb(error.__traceback__) if frame.filename == '<student>']
            prefix = f'Line {frames[-1].lineno}: ' if frames else ''
            error_message = prefix + type(error).__name__ + ': ' + str(error)
        finally:
            sys.settrace(None)
        actual = output.getvalue().replace('\r\n', '\n').rstrip()
        expected = str(case['expected']).replace('\r\n', '\n').rstrip()
        results.append({'name': case['name'], 'actual': actual, 'expected': expected, 'inputs': case.get('inputs', []), 'consumed': used, 'passed': error_message is None and actual == expected and used == len(case.get('inputs', [])), 'error': error_message})
    return json.dumps({'results': results, 'structure': structure, 'structureNote': structure_note, 'passed': structure and all(result['passed'] for result in results)})
