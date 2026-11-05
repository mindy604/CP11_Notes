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

The main topics begin with short introductory notes, Python examples, self-checks, activities, and personal note spaces. Loops now opens a choice page for notes and guided homework. This is a starting collection, not a full course or replacement for daily assignments.

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
- `#loops/work02` — test and explain the saved Python game, using suggested tests adapted to the saved rules, expected/actual results, repair/retest records, and student explanations.

`loops.js` contains the Loops page structure and guidance. `game-engine.js` models the preview rules. The preview uses JavaScript; it does not run or assess uploaded Python code. The site does not accept code uploads. Text, blank, and decimal guesses are rejected by the browser safeguard without using a chance. Python work may assume whole-number input; extra text handling is not required by this guide. The preview supports number limits from -1,000,000 to 1,000,000 and 1–100 chances; these are browser-tool bounds, not course requirements.

Design decisions, explanations, and test records are saved separately under `cp11-loops-guide-v1` in local storage. **Download my design & test notes** exports the guide; the global **Export my notes** includes it too. Neither download submits the student's `.py` game. There is no import or teacher collection service.

For a developer with Node.js, run `node game-engine.test.cjs` to verify feedback, inclusive endpoints, invalid input, counters, unlimited mode, loss, and final-chance wins. Node.js is not needed to use or publish the site.

The page renders content as text rather than accepting HTML in lesson fields. Layout is in `index.html` and `styles.css`; interactions are in `app.js`.

## Student notes and progress

Notes and reviewed-topic markers are stored only in the current browser's local storage. There are no student accounts or server submissions. Shared browser profiles share the same notes; clearing browser data removes them. Students should use **Export my notes** to keep a text copy. The exported file is a readable backup; there is no import feature yet. If browser storage is unavailable, the page tells students to export before leaving.

Python examples download as `.py` files and run in a Python editor, not on this website. Turtle needs a graphics-capable Python environment. Pygame needs a desktop environment with the Pygame package installed.

## Publish on GitHub Pages

This project uses relative asset paths and hash-based topic navigation so it works under a repository path.

1. Push these files to the `main` branch of `mindy604/CP11_Notes`.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose **main** and **/(root)**, then **Save**.
5. Use the published URL shown by GitHub after deployment finishes.

The `.nojekyll` file tells GitHub Pages to serve the static files directly. No automated build workflow is required.
