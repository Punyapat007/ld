// worker.js
let timers = {};

self.onmessage = function(e) {
    const { action, customerId } = e.data;

    if (action === 'start') {
        if (!timers[customerId]) {
            timers[customerId] = { seconds: 0 };
            timers[customerId].interval = setInterval(() => {
                timers[customerId].seconds++;
                self.postMessage({ customerId, seconds: timers[customerId].seconds });
            }, 1000);
        }
    } else if (action === 'stop') {
        if (timers[customerId]) {
            clearInterval(timers[customerId].interval);
            delete timers[customerId];
        }
    } else if (action === 'reset') {
        if (timers[customerId]) {
            clearInterval(timers[customerId].interval);
            timers[customerId].seconds = 0;
            self.postMessage({ customerId, seconds: 0 });
        }
    }
};
