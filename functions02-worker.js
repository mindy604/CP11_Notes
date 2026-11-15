// Real Python runs off the page thread. The parent can terminate this worker.
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pyodide.mjs';
const ready = (async () => {
  const [python, response] = await Promise.all([
    loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v314.0.8/full/'}),
    fetch(new URL('functions02-checker.py', import.meta.url))
  ]);
  if (!response.ok) throw new Error('The Python checker could not be loaded. Refresh the page and try again.');
  await python.runPythonAsync(await response.text());
  return python;
})();
ready.then(()=>self.postMessage({type:'ready'})).catch(error=>self.postMessage({type:'load-error',error:String(error.message||error)}));
self.onmessage=async event=>{
  try {
    const python=await ready;
    python.globals.set('_review_payload',JSON.stringify(event.data));
    const result=await python.runPythonAsync('_cp11_check(_review_payload)');
    self.postMessage({type:'result',id:event.data.id,result:JSON.parse(result)});
  }catch(error){self.postMessage({type:'result',id:event.data.id,result:{error:String(error.message||error)}});}
};
