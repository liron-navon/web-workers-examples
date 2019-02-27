// The worker is available globally here
//
// for typescript:
// const worker = this as DedicatedWorkerGlobalScope;
//
// and just use it like so "worker.postMessage" "worker.onmessage"
onmessage = e => postMessage('PONG');



