// create a new worker from our script
let worker = new Worker('worker.js');
// wait for a message and log it's data
worker.onmessage = (e) => console.log(e.data);
// post a message to the worker
worker.postMessage('In the grim darkness of the far future there is only war');

