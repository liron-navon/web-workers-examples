onmessage = e => {
    postMessage('PONG');
    // wait 1 second and spawn a sub worker and tell it to PING too,
    // this creates an infinite loop using web worker recursion 😱
    setTimeout(() => {
        let worker = new Worker('worker.js');
        worker.onmessage = (e) => console.log(e.data);
        worker.postMessage('PING');
    }, 1000)
};
