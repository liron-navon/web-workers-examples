// a simple sort function
async function sortBigArray(bigArray) {
    return bigArray.sort((a, b) => a - b);
}

// create some big array
const elements = 5000000; // 5 million
const maxWorkers = navigator.hardwareConcurrency || 4;

console.log(`generating ${elements} random numbers...`);
console.time(`generated ${elements} numbers`);
const bigArray = Array(elements)
    .fill()
    .map(() => Math.random());
console.timeEnd(`generated ${elements} numbers`);

// we turn the worker activation into a promise
const sortArrayWithWorker = arr => {
    return new Promise((resolve, reject) => {
        let worker = new Worker('worker.js');
        // wait for a message and resolve
        worker.onmessage = ({data}) => resolve(data);
        // if we get an error, reject
        worker.onerror = reject;
        // post a message to the worker
        worker.postMessage(arr);
    });
};

// this function will distribute the array across workers
async function sortWithWorkers() {
    // how many elements each worker should sort
    const segmentsPerWorker = Math.round(bigArray.length / maxWorkers);
    const chunks = _.chunk(bigArray, segmentsPerWorker);

    // let each worker handle it's own part
    const promises = chunks.map(c => sortArrayWithWorker(c));

    // merge all the segments of the array
    const segmentsResults = await Promise.all(promises);
    return segmentsResults.reduce((acc, arr) => acc.concat(arr), []);
}

async function run() {
    // sort with workers
    console.time(`sorted ${elements} numbers with ${maxWorkers} workers`);
    await sortWithWorkers();
    console.timeEnd(`sorted ${elements} numbers with ${maxWorkers} workers`);

    // sort with no workers
    console.time(`sorted ${elements} numbers on ui`);
    await sortBigArray(bigArray);
    console.timeEnd(`sorted ${elements} numbers on ui`);

    console.log('Done!')
}

run()
    .catch((err) => {
        clearInterval(interval);
        console.log('err', err)
    });
