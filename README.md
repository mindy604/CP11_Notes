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

Each topic currently contains one short introductory lesson, a Python example to download, a self-check, an activity, and space for student notes. This is a starting collection, not a full course or replacement for daily assignments.

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
