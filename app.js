(() => {
  'use strict';
  const topics = window.CP11_TOPICS;
  const storageKey = 'cp11-notebook-v1';
  let state = { notes: {}, completed: [] };
  let storageAvailable = true;
  let toastTimer;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved.notes === 'object' && saved.notes !== null) {
      for (const topic of topics) {
        if (typeof saved.notes[topic.id] === 'string') state.notes[topic.id] = saved.notes[topic.id];
      }
      if (Array.isArray(saved.completed)) state.completed = saved.completed.filter(id => topics.some(t => t.id === id));
    }
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch { storageAvailable = false; }
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const done = id => state.completed.includes(id);
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); storageAvailable = true; }
    catch { storageAvailable = false; }
    return storageAvailable;
  }
  function toast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3300);
  }
  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url; link.download = filename;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function navigation(active) {
    for (const kind of ['core', 'extra']) {
      $(`#${kind}-nav`).innerHTML = topics.filter(t => t.kind === kind).map(t => `<a class="nav-item ${active === t.id ? 'active' : ''}" href="#${t.id}" ${active === t.id ? 'aria-current="page"' : ''}><span>${t.number}</span><span class="nav-title">${escapeHTML(t.title)}</span>${done(t.id) ? '<span class="tick" aria-label="Reviewed">✓</span>' : ''}</a>`).join('');
    }
    $('#home-link').classList.toggle('active', active === 'home');
    if (active === 'home') $('#home-link').setAttribute('aria-current', 'page');
    else $('#home-link').removeAttribute('aria-current');
  }
  function card(t) {
    return `<a class="topic-card" href="#${t.id}" data-search="${escapeHTML([t.title, t.short, t.description, ...t.tags].join(' ').toLowerCase())}"><div class="card-top"><span class="card-icon" aria-hidden="true">${escapeHTML(t.icon)}</span><span class="card-number">${t.kind === 'extra' ? 'EXTRA ' + t.number.slice(1).padStart(2, '0') : 'TOPIC ' + t.number}</span></div><h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.description)}</p><div class="card-bottom"><span>${done(t.id) ? '✓ Reviewed · revisit topic' : 'Explore topic'}</span><span aria-hidden="true">↗</span></div></a>`;
  }
  function home() {
    const count = topics.filter(t => done(t.id)).length;
    $('#crumb').textContent = 'Overview';
    document.title = 'CP11 · The Python Notebook';
    $('#main').innerHTML = `<section class="hero" aria-labelledby="welcome"><div><div class="eyebrow">A place to think in Python</div><h1 id="welcome">Small steps.<br><em>Big possibilities.</em></h1><p class="intro">Your Computer Programming 11 notebook.<br>Explore an idea, try it in Python, and write down what you discover.</p></div><div class="hero-art" aria-hidden="true"><div class="code-paper"><div class="paper-label"><span>MY_FIRST_IDEA.PY</span><span>● ● ●</span></div><span class="comment"># Every idea starts somewhere.</span><br>name = <span class="keyword">input</span>(<span class="string">"Your name? "</span>)<br><span class="keyword">print</span>(<span class="string">"Hello,"</span>, name)<br><br><span class="comment"># What will you create?</span></div><span class="little-sticker">curiosity → code</span></div></section><section class="progress-panel" aria-label="Your progress"><span class="progress-icon" aria-hidden="true">✧</span><div class="progress-copy"><strong>Your notebook, your pace.</strong><span>Mark a topic reviewed when you’re ready.</span></div><div class="progress-track" role="progressbar" aria-label="Topics reviewed" aria-valuemin="0" aria-valuemax="${topics.length}" aria-valuenow="${count}"><span style="width:${count / topics.length * 100}%"></span></div><span class="progress-count">${count} / ${topics.length} reviewed</span></section><section aria-labelledby="core-title"><div class="section-heading"><div><h2 id="core-title">Build your foundations</h2><p>Five core topics. Start at the beginning, or revisit an idea.</p></div><label class="search"><span aria-hidden="true">⌕</span><input id="topic-search" type="search" placeholder="Find a topic…" aria-label="Find a topic"></label></div><div class="grid" id="core-grid">${topics.filter(t => t.kind === 'core').map(card).join('')}</div></section><section class="extra-section" aria-labelledby="extra-title"><div class="section-heading"><div><h2 id="extra-title">Take a creative detour</h2><p>Extra tools for turning your ideas into something you can see.</p></div></div><div class="grid extra-grid" id="extra-grid">${topics.filter(t => t.kind === 'extra').map(card).join('')}</div></section><p id="search-status" class="save-note" role="status" aria-live="polite"></p><p class="bottom-note"><span aria-hidden="true">↳</span><span>This is a starting collection. More notes and activities will grow here over time.</span></p>`;
    $('#topic-search').addEventListener('input', event => {
      const query = event.target.value.toLowerCase().trim();
      let matches = 0;
      document.querySelectorAll('.topic-card').forEach(el => {
        el.hidden = !el.dataset.search.includes(query);
        if (!el.hidden) matches++;
      });
      document.querySelectorAll('.empty').forEach(el => el.remove());
      for (const id of ['core-grid', 'extra-grid']) {
        const grid = $('#' + id);
        if (![...grid.children].some(el => !el.hidden)) grid.insertAdjacentHTML('beforeend', '<p class="empty">No matching topics here. Try another search.</p>');
      }
      $('#search-status').textContent = query ? `${matches} topic${matches === 1 ? '' : 's'} found.` : '';
    });
  }
  function lesson(t) {
    $('#crumb').textContent = t.title;
    document.title = `${t.title} · CP11 Notebook`;
    const index = topics.indexOf(t);
    const next = topics[index + 1];
    $('#main').innerHTML = `<a class="back" href="#home">← All topics</a><header class="lesson-header"><div class="eyebrow">${t.kind === 'core' ? 'Topic ' + t.number : 'Extra ' + t.number.slice(1).padStart(2, '0')} · ${escapeHTML(t.short)}</div><h1>${escapeHTML(t.title)}</h1><p class="intro">${escapeHTML(t.description)}</p><div class="tags">${t.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div></header><div class="lesson-grid"><div class="lesson-main"><div class="goal"><strong>START HERE</strong>${escapeHTML(t.goal)}</div>${t.lesson.map(s => `<section class="lesson-section"><h2>${escapeHTML(s.title)}</h2><p>${escapeHTML(s.text)}</p></section>`).join('')}<div class="example"><div class="code-heading"><span>EXAMPLE.PY</span><button id="download-code" type="button">↓ Download .py</button></div><pre><code>${escapeHTML(t.code)}</code></pre><div class="output"><span class="output-label">${t.id === 'turtle' || t.id === 'pygame' ? 'WHAT TO EXPECT' : 'SAMPLE RUN'}</span><pre>${escapeHTML(t.sample)}</pre></div></div><p class="run-note">Download or copy the example and run it in your Python editor.${t.id === 'pygame' ? ' Pygame must be installed there.' : ''}</p><section class="lesson-section try-panel"><span class="small-tag">YOUR TURN</span><h2>Make one change.</h2><p>${escapeHTML(t.tryIt)}</p></section><p class="reflection"><strong>Pause & think</strong><br>${escapeHTML(t.reflection)}</p></div><aside class="lesson-aside" aria-label="Your learning activities"><section class="check-panel"><span class="check-label">CHECK YOUR UNDERSTANDING</span><h2>Think it through.</h2><form id="check-form"><fieldset class="choices"><legend>${escapeHTML(t.question.prompt)}</legend>${t.question.choices.map((c, i) => `<label class="choice"><input type="radio" name="answer" value="${i}" required><span>${escapeHTML(c)}</span></label>`).join('')}</fieldset><button class="button small" type="submit">Check my answer →</button><div class="feedback" id="feedback" role="status" aria-live="polite"></div></form></section><section class="notes-panel"><span class="check-label">MY NOTEBOOK</span><h2><label for="personal-notes">Keep the useful bits.</label></h2><p>Your explanations, questions, and things you want to try next.</p><textarea id="personal-notes" placeholder="Something I learned…&#10;Something I’m still wondering…" aria-describedby="save-status">${escapeHTML(state.notes[t.id] || '')}</textarea><p class="save-note" id="save-status" role="status">${storageAvailable ? 'Saved automatically in this browser. Export your notes to keep a copy or move devices.' : 'Browser saving is unavailable. Export your notes before leaving this page.'}</p></section></aside></div><div class="complete-row"><button class="button ${done(t.id) ? 'quiet' : ''}" id="complete-topic" aria-pressed="${done(t.id)}">${done(t.id) ? '✓ Reviewed · mark as still learning' : '✓ Mark this topic reviewed'}</button><a class="next-link" href="#${next ? next.id : 'home'}">${next ? 'Next: ' + escapeHTML(next.title) : 'Back to the overview'} →</a></div>`;
    $('#download-code').addEventListener('click', () => download(`cp11_${t.id}_example.py`, t.code));
    $('#check-form').addEventListener('submit', event => {
      event.preventDefault();
      const selected = Number(new FormData(event.target).get('answer'));
      $('#feedback').textContent = selected === t.question.answer ? `That’s right. ${t.question.explanation}` : 'Not quite. Trace the example one step at a time, then try again.';
    });
    $('#personal-notes').addEventListener('input', event => {
      state.notes[t.id] = event.target.value;
      $('#save-status').textContent = save() ? 'Saved in this browser. Export your notes to keep a copy or move devices.' : 'Browser saving is unavailable. Export your notes before leaving this page.';
    });
    $('#complete-topic').addEventListener('click', event => {
      if (done(t.id)) state.completed = state.completed.filter(id => id !== t.id);
      else state.completed.push(t.id);
      const persisted = save();
      const isDone = done(t.id);
      event.target.textContent = isDone ? '✓ Reviewed · mark as still learning' : '✓ Mark this topic reviewed';
      event.target.classList.toggle('quiet', isDone);
      event.target.setAttribute('aria-pressed', String(isDone));
      navigation(t.id);
      toast(persisted ? (isDone ? 'Topic marked reviewed. Keep exploring!' : 'Topic marked as still learning.') : 'Updated for this visit. Browser saving is unavailable.');
    });
  }
  function route(focus = false) {
    const id = location.hash.slice(1) || 'home';
    const topic = topics.find(t => t.id === id);
    navigation(topic ? topic.id : 'home');
    if (topic) lesson(topic); else home();
    window.scrollTo(0, 0);
    if (focus) $('#main').focus({ preventScroll: true });
  }
  $('#export-notes').addEventListener('click', () => {
    let output = 'MY CP11 PYTHON NOTEBOOK\nExported ' + new Date().toLocaleDateString() + '\n\n';
    for (const t of topics) {
      output += `${t.number} · ${t.title}\nStatus: ${done(t.id) ? 'Reviewed' : 'Still learning'}\n${state.notes[t.id] || '(No notes yet)'}\n\n`;
    }
    download('my-cp11-notes.txt', output);
    toast('Your notebook has been exported.');
  });
  $('.skip').addEventListener('click', event => {
    event.preventDefault();
    $('#main').focus();
  });
  window.addEventListener('hashchange', () => route(true));
  route();
})();
