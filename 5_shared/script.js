const output = document.querySelector('#output');
const decrementBtn = document.querySelector('#decrement');
const incrementBtn = document.querySelector('#increment');

let localState = {
    counter: 0
};

// create a shared worker
const sharedWorker = new SharedWorker('worker.js');
// start listening to the port
sharedWorker.port.start();

// this is a simple function to turn the requests into promises, we make a request to the worker, and wait for his response.
// to make it safer you can pass an ID for each request
const promisePort = (data) => {
    return new Promise((resolve) => {
        // send a message to the worker
        sharedWorker.port.postMessage(data);

        // listen to the response message
        const listener = (e) => {
            resolve(e.data);
            sharedWorker.port.removeEventListener('message', listener)
        };
        sharedWorker.port.addEventListener('message', listener)
    })
};

// get the state
const getState = () => promisePort({ action: 'getState' });

// set the state
const setState = async (state) => promisePort({ action: 'setState', state });


// sync the local state from the shared state
const syncState = async () => {
    localState = await getState();
    output.innerHTML = localState.counter;
};

// change the counter
const changeCounter = async (n) => {
    const newState = { ...localState, counter: localState.counter + n };
    localState = await setState(newState);
    output.innerHTML = localState.counter;
    return localState;
};

// change the state when clicking the buttons
incrementBtn.onclick = () => changeCounter(1);
decrementBtn.onclick = () => changeCounter(-1);

// we would like to update the state when the window is focused or visible again
window.addEventListener('visibilitychange', () =>  syncState());
window.addEventListener('focus', () =>  syncState());

// get the initial state
syncState();
