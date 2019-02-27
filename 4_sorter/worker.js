// CPU consuming function (sorting a big array)
function sortBigArray(bigArray) {
    return bigArray.sort((a, b) => a - b);
}

onmessage = ({ data }) => {
    // sort
    const sorted = sortBigArray(data);
    // send the sorted array back
    postMessage(sorted);
    // we are done and can close the worker 🙌
    close();
};
