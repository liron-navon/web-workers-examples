// this object is a state that will be cloned into every window
let crossWindowState = {
    counter: 0
};

onconnect = (e) => {
    // we take the caller port
    const port = e.ports[0];

    // on message we expect either "getState" or "setState"
    port.onmessage = ({data}) => {
        const {action, state} = data;

        if (action === 'getState') {
            port.postMessage(crossWindowState);
        } else if (action === 'setState') {
            crossWindowState = Object.assign(crossWindowState, state);
            port.postMessage(crossWindowState);
        }
    };
};
