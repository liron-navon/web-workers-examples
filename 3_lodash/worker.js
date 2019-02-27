importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js');

onmessage = ({data}) => {
    postMessage(_.kebabCase(data))
};



