# CP11 · The Python Notebook

A small, expandable interactive notebook for Computer Programming 11.

## Topics

1. Input, output & variables
2. Conditions
3. Loops
4. Functions
5. Lists
6. Extra 01 — Turtle drawing
7. Extra 02 — Pygame

The main topics begin with short introductory notes, Python examples, self-checks, activities, and personal note spaces. Loops opens a choice page for notes and guided homework. Functions opens a lesson choice page with **01 — Functions**. This is a starting collection, not a full course or replacement for daily assignments.

## Preview

Open `index.html` in a browser, or run a local server from this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. No dependency installation or build is needed.

## Add more notes

Edit `topics.js`. Each object in `window.CP11_TOPICS` defines a topic:

- Keep `id` stable; it is used in page links and student note storage.
- Add short reading sections to the `lesson` array.
- Update `code`, `sample`, `tryIt`, and `reflection` as needed.
- `question.answer` is the zero-based index of the correct choice.
- Use `kind: 'core'` for the main topics or `kind: 'extra'` for extras.

## Loops guided homework

- `#loops` — topic choices.
- `#loops/notes01` — the original loop introduction, preserving existing personal notes.
- `#loops/notes02`, `#loops/notes03`, `#loops/notes04` — clearly marked spaces for future teacher-posted notes.
- `#loops/work01` — Guess My Number: choose a range, explain difficulty, choose unlimited or limited chances, choose whether out-of-range whole numbers use a chance, edit messages, and try a browser preview. A fixed-secret testing mode makes boundary tests repeatable. Students then build their own Python game; the site does not generate a complete project solution.
- `#loops/work01/test` — Work 01, Part 02: test and explain the saved Python game, using suggested tests adapted to the saved rules, expected/actual results, repair/retest records, and student explanations.

- `#loops/work02` — a placeholder for a different game, clearly marked pending.

`loops.js` contains the Loops page structure and guidance. `game-engine.js` models the preview rules. The preview uses JavaScript; it does not run or assess uploaded Python code. The site does not accept code uploads. Text, blank, and decimal guesses are rejected by the browser safeguard without using a chance. Python work may assume whole-number input; extra text handling is not required by this guide. The preview supports number limits from -1,000,000 to 1,000,000 and 1–100 chances; these are browser-tool bounds, not course requirements.

Design decisions, explanations, and test records are saved separately under `cp11-loops-guide-v1` in local storage. **Download my design & test notes** exports the guide; the global **Export my notes** includes it too. Neither download submits the student's `.py` game. There is no import or teacher collection service.

For a developer with Node.js, run `node game-engine.test.cjs` to verify feedback, inclusive endpoints, invalid input, counters, unlimited mode, loss, and final-chance wins. Node.js is not needed to use or publish the site.

The page renders content as text rather than accepting HTML in lesson fields. Layout is in `index.html` and `styles.css`; interactions are in `app.js`.

## Review: for, while, and AND/OR with while loops

Open `#loops/review` from the **Review** card on the Loops choices page. The three parts are:

1. **Review 1 — For loop:** range start/stop/step, zero turns, and repeated versus final output.
2. **Review 2 — While loop:** start/check/update, print/update order, zero turns, and stopping.
3. **Review 3 — AND/OR with while loops:** complete comparisons, truth combinations, numeric retry conditions, and stopping on success or an attempt limit.

Each part has two concept checks, two expected-output boxes, a drag-and-drop block puzzle with its target output visible, and a similar coding problem after each activity. Blocks also have Move up/Move down buttons. There are nine small coding tasks in total. This standalone website review does not assign or replace any dated classroom lesson, document or test.

**Run & check executes real Python**, using Pyodide 314.0.8 in a module Web Worker. The first run loads its runtime from `https://cdn.jsdelivr.net/pyodide/v314.0.8/full/`; school network access to that host is needed. Student code and responses are evaluated locally, not submitted to a grading server. The runner checks output, supplied input consumption, and the requested loop/Boolean construct, rather than requiring one exact source-code answer. Passing these examples is feedback on the stated tests, not a complete assessment of understanding.

`review-data.js` contains the original questions, expected outputs and test cases. `review.js` handles the page, checks, ordering and saved work. `review-worker.js` loads Python. `review-checker.py` provides fresh namespaces for each test, bounded output and a 10,000-step trace guard. The page can stop/terminate the worker, enforces a six-second execution timeout, and reports runtime-loading failures. Imports, break, continue, pass and literal `while True` are excluded from these basic review tasks. `review.css` contains the review layout.

The editor's Run button supplies the listed inputs automatically. Prompt text in `input()` is omitted from output comparisons. Printed line order and text matter; trailing whitespace is ignored. Inputs must all be consumed, which catches an extra prompt or an early stop. Students may save a coding attempt as `.py`.

Review drafts, predictions, choices and block orders use the separate browser-local key `cp11-loop-review-v1`. **Download my review work** exports them as text; the main **Export my notes** includes them too. Check results are recalculated when students run/check again. Browser-local storage has the same shared-profile and clearing limitations described below.

Python runtime reference: https://pyodide.org/en/stable/usage/webworker.html

## Functions: 01 — Functions

Open `#functions` and choose **01 — Functions**, or use `#functions/01` directly. The lesson covers the current first-functions (Day 44) teaching material only; later lessons are not included and course files/schedules are unchanged.

Four sections provide Learn & predict, Guide & reuse, Build & test, and Challenges. Students distinguish defining from calling, predict printed output, arrange and run border code, try similar problems, build Reusable Club Heading, and grow one event program through rules/welcome/closing stages. The 10 primary challenges and 10 further reuse choices retain their student briefs; teacher independent/challenge solutions are not published.

`functions-data.js` contains challenge briefs; `functions.js` contains the lesson and browser interactions. `functions-worker.js` loads the same pinned Pyodide runtime as Loop Review, and `functions-checker.py` checks real Python with fresh state for each test, bounded output, call counts, no-parameter definitions and selected task requirements. The worker can be stopped and has the same loading and execution timeouts. It does not change the Loop Review runner.

Fixed tasks compare against the displayed target output. Open-ended event/challenge tasks compare against student-planned expected outputs and selected function requirements; they do not certify every scenario requirement or explanation. Students must review the full brief and choose useful tests. Input prompts are omitted from output comparisons. First use needs internet access to jsDelivr. Code and responses stay in the browser.

Drafts, predictions and block order are saved under `cp11-functions-01-v1`. Students can save individual `.py` files or download all lesson work as text. The global **Export my notes** includes this work. There is no server submission or import feature.

## Student notes and progress

Notes and reviewed-topic markers are stored only in the current browser's local storage. There are no student accounts or server submissions. Shared browser profiles share the same notes; clearing browser data removes them. Students should use **Export my notes** to keep a text copy. The exported file is a readable backup; there is no import feature yet. If browser storage is unavailable, the page tells students to export before leaving.

The introductory topic examples download as `.py` files for a Python editor. Loop Review and 01 Functions also run their supported Python exercises in the browser. Turtle needs a graphics-capable Python environment. Pygame needs a desktop environment with the Pygame package installed.

## Publish on GitHub Pages

This project uses relative asset paths and hash-based topic navigation so it works under a repository path.

1. Push these files to the `main` branch of `mindy604/CP11_Notes`.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose **main** and **/(root)**, then **Save**.
5. Use the published URL shown by GitHub after deployment finishes.

The `.nojekyll` file tells GitHub Pages to serve the static files directly. No automated build workflow is required.
