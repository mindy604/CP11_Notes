/* Browser preview rules. This models decisions; it does not execute student Python. */
(function (root) {
  'use strict';
  function validate(rules) {
    const errors = [];
    if (!Number.isSafeInteger(rules.low) || !Number.isSafeInteger(rules.high)) errors.push('Enter whole numbers for both limits.');
    else if (Math.abs(rules.low) > 1000000 || Math.abs(rules.high) > 1000000) errors.push('For this browser preview, use limits from -1,000,000 to 1,000,000.');
    else if (rules.low >= rules.high) errors.push('Choose a highest number greater than the lowest number.');
    if (!['until', 'limited'].includes(rules.mode)) errors.push('Choose a stopping rule.');
    if (rules.mode === 'limited' && (!Number.isInteger(rules.limit) || rules.limit < 1 || rules.limit > 100)) errors.push('Choose 1–100 chances for this preview.');
    for (const field of ['prompt','lowMessage','highMessage','invalidMessage','winMessage','loseMessage']) {
      if (typeof rules[field] !== 'string' || !rules[field].trim()) errors.push('Write a message for every message box.');
    }
    return [...new Set(errors)];
  }
  function start(rules, fixedSecret) {
    const errors = validate(rules);
    if (errors.length) throw new Error(errors.join(' '));
    const secret = fixedSecret === undefined ? rules.low + Math.floor(Math.random() * (rules.high - rules.low + 1)) : fixedSecret;
    if (!Number.isInteger(secret) || secret < rules.low || secret > rules.high) throw new Error('The test secret must be a whole number inside your range.');
    return {rules:{...rules},secret,used:0,entries:0,ended:false,outcome:null,history:[]};
  }
  function guess(session, raw) {
    if (session.ended) return {type:'ended',message:'This game has ended. Start a new preview to play again.',used:session.used};
    const text = String(raw).trim();
    let type, message, counted = false;
    if (!/^[+-]?\d+$/.test(text) || !Number.isSafeInteger(Number(text))) {
      type = 'text'; message = 'Enter a whole number, such as 7. This entry does not use a chance.';
    } else {
      const value = Number(text);
      session.entries++;
      if (value < session.rules.low || value > session.rules.high) {
        type = 'range'; message = session.rules.invalidMessage;
        counted = Boolean(session.rules.invalidCounts);
      } else {
        counted = true;
        if (value === session.secret) {type='win';message=session.rules.winMessage;session.ended=true;session.outcome='win';}
        else if (value < session.secret) {type='low';message=session.rules.lowMessage;}
        else {type='high';message=session.rules.highMessage;}
      }
      if (counted) session.used++;
      // Check a win first: a correct final chance is still a win.
      if (!session.ended && session.rules.mode === 'limited' && session.used >= session.rules.limit) {
        session.ended=true;session.outcome='loss';
        message += ' ' + session.rules.loseMessage + ' The secret was ' + session.secret + '.';
      }
    }
    const result={type,message,counted,used:session.used,ended:session.ended,outcome:session.outcome};
    session.history.push({input:text,...result});
    return result;
  }
  root.CP11_GAME = {validate,start,guess};
})(typeof window !== 'undefined' ? window : globalThis);
