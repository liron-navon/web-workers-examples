// make sure Worker is supported here
if (window.Worker) {
    // this can be a relative path or a complete URL,
    // it must be on the same origin
    const workerScriptPath = 'worker.js';
    // create a new worker from our script
    let worker = new Worker(workerScriptPath);
    // wait for a message and log it's data
    worker.onmessage = (e) => console.log(e.data);
    // post a message to the worker
    worker.postMessage('PING');
} else {
    alert('No worker support here, weird, it should be supported in IE10 and above 🧐')
}
