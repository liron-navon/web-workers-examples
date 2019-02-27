# Web Workers examples

Find the complete post in medium [https://medium.com/clockwork-nl/web-workers-demystified-fb4c84bd566c](https://medium.com/clockwork-nl/web-workers-demystified-fb4c84bd566c)

To Run the examples, I serve them with http-server.

Install dependencies.
```bash
npm install
```

Run the examples by their number:
```
npm run example_1
```


Example 1: A simple example of sending a message and recieving a message from a worker.
Example 2: Send a message to a worker, and he will send message to a sub worker and so on... a loop of workers calling each other.
Example 3: Loading lodash into a worker with CDN.
Example 4: Sorting a huge array by spreading the load to multiple workers.
Example 5: Sharing a state across windows using SharedWorker.
