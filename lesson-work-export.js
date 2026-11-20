(() => {
  'use strict';
  const MARK='*|       |*** MISSING: ';
  const BIG='# '+ '*'.repeat(72), SMALL='# '+ '-'.repeat(72);
  const clean=value=>String(value??'').replace(/\r\n?/g,'\n');
  const text=element=>element?.textContent?.replace(/\s+/g,' ').trim()||'';
  const preText=element=>[...element.childNodes].map(node=>node.nodeType===3?node.textContent:node.nodeName==='BR'?'\n':preText(node)).join('');
  const hasCode=value=>clean(value).split('\n').some(line=>line.trim()&&!line.trim().startsWith('#'));
  const human=key=>key.replace(/[-_]/g,' ').replace(/^./,c=>c.toUpperCase());
  const info={
    '01':['DEFINE, CALL AND REUSE','A function groups instructions under one name. A definition stores the instructions; a call runs them. Indent the body four spaces. This lesson uses no parameters and no explicit return.'],
    '02':['ONE PARAMETER','A parameter is a name in the definition. An argument is the value supplied by a call. Each call supplies a fresh value. This lesson prints results without an explicit return.'],
    '03':['TWO PARAMETERS','Arguments reach parameters in the order they are supplied. Trace which value belongs to each parameter. Test both ordinary values and the stated boundaries.'],
    '04':['RETURN A VALUE','return sends a result to the caller. Store a returned result when you need to reuse it. A call on its own does not display a returned value.'],
    '05':['TEST A FUNCTION','Work out the expected result independently. Compare it with the actual return. Choose normal, boundary, invalid and special-valid cases from the stated requirements. Categories can overlap; zero is not automatically a boundary and negatives are not automatically invalid. Keep one five-case converter plan for the correct, broken and repaired runs. Keep expectations unchanged when testing a deliberately faulty copy.'],
    '06':['LOCAL VALUES','Parameters and names assigned inside a function are local to that call. Pass needed data in and return results out. Separate calls should not depend on hidden outside calculation values.']
  };
  function context(id,fields){const keys=[id+'-stage'];if(id==='converter'||id==='scratch')keys.push('converter-plan-version','plan-choice',...Array.from({length:5},(_,i)=>'plan-'+i+'-expected'));if(id==='guide')keys.push('guide-mode');if(id==='points')keys.push('points-mode');if(id==='title')keys.push('title-mode');if(id==='event')keys.push('event-stage');for(const n of [1,2])keys.push(id+'-inputs-'+n,id+'-expected-'+n);return Object.fromEntries(keys.map(key=>[key,fields[key]??null]));}
  function records(fields){try{return JSON.parse(fields._lessonRunRecords||'{}');}catch{return {};}}
  function record(state,job,result){const saved=records(state.fields);saved[job.id]={code:job.code,context:context(job.id,state.fields),time:new Date().toISOString(),passed:Boolean(result.passed),error:result.error||null,results:(result.results||[]).map(r=>({name:r.name,inputs:r.inputs||[],actual:r.actual??'',expected:r.expected,checks:r.checks||[],error:r.error||null,passed:Boolean(r.passed)}))};state.fields._lessonRunRecords=JSON.stringify(saved);}
  function snapshot(config){
    const number=String(config.number).padStart(2,'0'), state=config.state, fields=state.fields, root=config.root||document.querySelector('#main');
    const saved=records(fields), used=new Set(), runSeen=new Set();let partNumber=1;
    const starters=Object.fromEntries([...Object.entries(config.tasks||{}),...Object.entries(config.projects||{})].map(([id,task])=>[id+'-code',task.starter]));
    function codeFor(id){if(id==='blocks')return state.order.map(i=>config.border[i]).join('\n');if(id.startsWith('predict-'))return (config.predictions||[]).find(q=>'predict-'+q.id===id)?.code||'';return root.querySelector(`[data-field="${id}-code"]`)?.value??fields[id+'-code']??starters[id+'-code']??'';}
    function currentRun(id){const r=saved[id];return Boolean(r&&r.code===codeFor(id)&&JSON.stringify(r.context)===JSON.stringify(context(id,fields)));}
    function runNode(id){if(runSeen.has(id))return [];runSeen.add(id);const r=saved[id];return [{kind:'run',id,title:id.startsWith('predict-')?'Example run':id==='blocks'?'My arranged-block run':'My test run',record:r||null,current:currentRun(id)}];}
    const challengeStarter=number==='01'?'# Purpose:\n# Parameters: none. Returns: no explicit return.\n\n':number==='02'?'# Purpose:\n# Parameter: name and meaning. Returns: no explicit return.\n\n':number==='03'?'# Purpose:\n# Parameters: names and meanings. Returns: no explicit return.\n\n':'# Purpose:\n# Parameters: names and meanings. Returns: the calculated value.\n\n';
    function challengeSelected(element){return [...element.querySelectorAll('[data-field]')].some(field=>{const key=field.dataset.field,v=fields[key]??'';return key.endsWith('-code')?Boolean(v.trim())&&clean(v).trim()!==clean(starters[key]??challengeStarter).trim():Boolean(v.trim());});}
    function visit(element){
      if(element.nodeType!==1)return [];
      if(element.matches('script,style,button,input,summary,nav,.review-feedback,.fn-result,[id$="-result"],.fn-test-grid:has(.output-label)'))return [];
      if(element.matches('.fn-challenge')){
        const title=text(element.querySelector('summary')), body=element.querySelector('.fn-challenge-body');
        if(!body)return [];
        if(!element.querySelector('[data-field]'))return [{kind:'notice',title,body:text(body.querySelector('p'))+' Reuse the independent work already recorded in Part 3.'}];
        const selected=challengeSelected(element);
        if(!selected){element.querySelectorAll('[data-field]').forEach(f=>used.add(f.dataset.field));return [{kind:'optional',title,description:text(body.querySelector('p')),selected:false,nodes:[]}];}
        return [{kind:'optional',title,description:'Selected challenge',selected:true,nodes:[...body.children].flatMap(visit)}];
      }
      if(number==='06'&&partNumber===4&&element.matches('.fn-section')&&element.querySelector('#task-debug')){
        const selected=challengeSelected(element)||Boolean(saved.debug);
        if(!selected){element.querySelectorAll('[data-field]').forEach(f=>used.add(f.dataset.field));return [{kind:'optional',title:'Further practice — odd totals and debugging',description:'This is a choice alongside the challenge bank.',selected:false,nodes:[]}];}
      }
      if(element.matches('.fn-task')){
        const id=element.id.replace(/^task-/,''), nodes=[...element.children].flatMap(visit);
        const project=config.projects?.[id];
        if(project&&project.stages){const stageId=fields[id+'-stage']||project.default;nodes.splice(1,0,{kind:'notice',title:'Work stage',body:project.stages.find(stage=>stage.id===stageId)?.label||stageId});}
        return nodes;
      }
      if(element.matches('form')&&element.querySelector('input[type="radio"]')){
        const radios=[...element.querySelectorAll('input[type="radio"]')],selected=radios.find(r=>r.checked),name=element.dataset.question?'question-'+element.dataset.question:'concept';used.add(name);
        return [{kind:'question',title:text(element.querySelector('legend')),choices:radios.map(r=>text(r.closest('label'))),answer:selected?text(selected.closest('label')):null}];
      }
      if(element.matches('label')&&element.querySelector('textarea')){
        const input=element.querySelector('textarea'),key=input.dataset.field;used.add(key);
        const clone=element.cloneNode(true);clone.querySelector('textarea')?.remove();const label=text(clone),isCode=input.classList.contains('python-editor')||key.endsWith('-code');
        let raw=fields[key]??'',status='entered';
        if(isCode){const id=key.replace(/-code$/,''),baseline=starters[key];if(!hasCode(raw)){if(!raw.trim()&&hasCode(baseline)&&currentRun(id)){raw=baseline;status='starter-tested';}else status='missing';}else if(baseline!==undefined&&clean(raw).trim()===clean(baseline).trim())status=currentRun(id)?'starter-tested':'starter';
          return [{kind:'code',key,title:label,value:clean(raw),status,starter:status==='missing'||status==='starter'?baseline||'':null}];}
        if(/-inputs-[12]$/.test(key)&&!raw.trim())return [{kind:'answer',key,title:label,value:'No keyboard inputs recorded. Use this blank only if this test needs no input().',missing:false}];
        return [{kind:'answer',key,title:label,value:clean(raw),missing:!raw.trim()}];
      }
      if(element.matches('label')&&element.querySelector('select')){const select=element.querySelector('select'),clone=element.cloneNode(true);clone.querySelector('select')?.remove();used.add(select.id.replace(/^fn-/,''));return [{kind:'notice',title:text(clone),body:select.selectedOptions[0]?.textContent?.trim()||'No version recorded'}];}
      if(element.matches('.block-list')){
        const touched=fields._blocksTouched==='yes'||Boolean(saved.blocks)||JSON.stringify(state.order)!==JSON.stringify([3,0,4,2,1]);
        return [{kind:'blocks',title:'My arranged code blocks',value:state.order.map(i=>config.border[i]).join('\n'),touched},...runNode('blocks')];
      }
      if(element.matches('.fn-actions'))return [...element.querySelectorAll('[data-run],[data-example]')].flatMap(button=>runNode(button.dataset.run||'predict-'+button.dataset.example));
      if(element.matches('h2,h3,h4'))return [{kind:'heading',title:text(element)}];
      if(element.matches('pre'))return [{kind:'reference',title:element.querySelector('code')?'REFERENCE CODE':'TARGET OUTPUT / GIVEN EXAMPLE',value:preText(element)}];
      if(element.matches('p,.fn-reminder,.step-kicker'))return text(element)?[{kind:'text',value:text(element)}]:[];
      if(element.matches('li')&&!element.closest('.block-list'))return [{kind:'text',value:text(element)}];
      return [...element.children].flatMap(visit);
    }
    const ids=['learn','guided','build','challenges'];
    const titles=['LEARN AND PREDICT','GUIDE AND REUSE','BUILD AND TEST','CHALLENGES AND FURTHER PRACTICE'];
    const parts=ids.map((id,i)=>{partNumber=i+1;const panel=root.querySelector('[data-panel="'+id+'"]');return {title:titles[i],nodes:panel?[...panel.children].flatMap(visit):[]};});
    const extras=Object.entries(fields).filter(([key,value])=>!key.startsWith('_')&&!used.has(key)&&String(value).trim());
    if(extras.length)parts[2].nodes.push({kind:'heading',title:'Additional saved work'},...extras.map(([key,value])=>({kind:key.endsWith('-code')?'code':'answer',key,title:human(key),value:clean(value),status:'entered',missing:false})));
    return {number,title:info[number][0],review:info[number][1],date:new Date().toLocaleDateString(),parts};
  }
  function format(data){
    const counts=[0,0,0,0];let part=0;
    const comments=value=>clean(value).split('\n').map(line=>'# '+line).join('\n');
    const wrap=(value,width=76)=>clean(value).split('\n').map(line=>{const words=line.split(/\s+/).filter(Boolean),lines=[];let current='';for(const word of words){if(current&&(current+' '+word).length>width){lines.push(current);current=word;}else current+=(current?' ':'')+word;}if(current)lines.push(current);return lines.join('\n');}).join('\n');
    const prose=value=>comments(wrap(value));
    const missing=title=>{counts[part]++;return comments(MARK+wrap(title,76-MARK.length));};
    const heading=title=>SMALL+'\n'+comments(title)+'\n';
    const codeBlock=(value,tag='MY PYTHON CODE')=>comments('CODE START — '+tag)+'\n'+comments(value)+'\n'+comments('CODE END — '+tag);
    function render(node){
      if(node.kind==='heading')return heading(node.title);
      if(node.kind==='text')return prose(node.value)+'\n';
      if(node.kind==='notice')return prose(node.title+': '+node.body)+'\n';
      if(node.kind==='reference')return comments(node.title+' — reference, not a student answer')+'\n'+comments(node.value)+'\n';
      if(node.kind==='question')return heading(node.title)+node.choices.map((choice,i)=>comments(String.fromCharCode(65+i)+'. '+choice)).join('\n')+'\n'+(node.answer?comments('My answer: '+node.answer):missing('my answer to this concept question'))+'\n';
      if(node.kind==='answer')return comments(node.title)+ '\n'+(node.missing?missing(node.title):comments(node.value))+'\n';
      if(node.kind==='code'){
        let out=comments(node.title)+'\n';
        if(node.status==='missing')out+=missing(node.title)+'\n';
        if(node.status==='starter')out+=missing('my edited code — the supplied starter has not been changed')+'\n';
        if(node.status==='starter-tested')out+=comments('Starter used without edits; a run is recorded. Review whether the required change was made.')+'\n';
        if(node.value.trim())out+=codeBlock(node.value,node.status==='starter'?'UNCHANGED STARTER':node.status==='starter-tested'?'SUPPLIED STARTER — RUN RECORDED':'MY ENTERED CODE')+'\n';
        else if(node.starter?.trim())out+=comments('Supplied starter — no student edit is saved')+'\n'+codeBlock(node.starter,'REFERENCE STARTER')+'\n';
        return out;
      }
      if(node.kind==='blocks')return heading(node.title)+(node.touched?'':missing('my arranged block order — the starting order is unchanged')+'\n')+codeBlock(node.value,node.touched?'MY SAVED BLOCK ORDER':'STARTING BLOCK ORDER')+'\n';
      if(node.kind==='optional')return heading(node.title)+comments(node.description)+'\n'+(node.selected?comments('Status: selected / started')+'\n'+node.nodes.map(render).join('\n'):comments('Status: not selected. This is not marked as missing required work.')+'\n');
      if(node.kind==='run'){
        let out=heading(node.title);const r=node.record;
        if(!r)return out+missing('actual output / test record — no run is saved yet')+'\n';
        out+=prose('Recorded: '+r.time)+'\n';
        if(!node.current)out+=missing('retest the current version — this saved run belongs to earlier code or test settings')+'\n';
        out+=comments('Recorded result: '+(r.error?'RUN ERROR':r.passed?'MATCHED THE RUN CHECKS':'NEEDS REPAIR'))+'\n';
        if(r.error)out+=prose('Run message: '+r.error)+'\n';
        for(const row of r.results){out+=comments('Test: '+row.name)+'\n'+comments('Inputs: '+(row.inputs.length?row.inputs.join(' → '):'none'))+'\n';if(row.expected!==undefined&&row.expected!==null)out+=comments('Expected output:')+'\n'+comments(row.expected===''?'(no output)':row.expected)+'\n';else out+=comments('Expected: use the task or my recorded test plan above.')+'\n';out+=comments('Actual output:')+'\n'+comments(row.actual===''?'(no output)':row.actual)+'\n';if(row.error)out+=prose('Python error: '+row.error)+'\n';for(const message of row.checks)out+=prose('Check message: '+message)+'\n';}
        return out;
      }
      return '';
    }
    const notes=[data.review,'Follow the calls and trace the supplied values in order. Keep predictions separate from the actual output. A supplied starter is labelled so it is not confused with a student edit.','Keep my plan, program, expected results, actual results and explanation together. Saved results apply only to the code and test settings that produced them.','Use remaining time for challenges. All ten are not a quota. Unselected challenges are listed without missing-work markers. Further practice is a choice where the lesson says so.'];
    const bodies=data.parts.map((section,i)=>{part=i;return BIG+'\n'+comments('PART '+(i+1)+' — '+section.title)+'\n'+BIG+'\n'+"'''\n"+wrap(notes[i])+"\n'''\n\n"+section.nodes.map(render).join('\n');});
    return '# -*- coding: utf-8 -*-\n'+BIG+'\n'+comments(data.number+' FUNCTIONS — '+data.title)+'\n'+comments('MY LESSON WORK AND REVIEW')+'\n'+BIG+'\n'+comments('Downloaded: '+data.date)+'\n\n'+comments('CONTENTS')+'\n'+data.parts.map((p,i)=>comments('Part '+(i+1)+': '+p.title)).join('\n')+'\n\n'+comments('MISSING-WORK SUMMARY')+'\n'+counts.map((count,i)=>comments('Part '+(i+1)+': '+count+' missing / recheck marker'+(count===1?'':'s'))).join('\n')+'\n\n'+comments('HOW TO USE THIS FILE')+'\n'+comments('Look for *|       |*** MISSING: to find unanswered or untested work.\nWritten answers and output are comments. Student code is preserved in labelled\ncommented practice blocks, including any unfinished code. To run an exercise,\nuncomment ONE complete code block, keeping its indentation. Keep the other\nexercises commented. The triple-quoted sections are short review notes.\nA recorded result is kept with its activity. A matched run is not a grade for\nthe written explanation. Empty input boxes can mean no keyboard input is needed.')+'\n\n\n'+bodies.join('\n\n')+'\n\n'+BIG+'\n'+comments('END OF MY '+data.number+' FUNCTIONS REVIEW')+'\n'+BIG+'\n';
  }
  function build(config){return format(snapshot(config));}
  window.CP11_LESSON_EXPORT={build,snapshot,format,record,hasCode};
})();
