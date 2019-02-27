let worker = new Worker('worker.js');
worker.onmessage = (e) => console.log(e.data);
worker.postMessage('PING');
