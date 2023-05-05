'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

let queue = [];
let processPromise;
let count = 0;
function process() {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        while (queue.length > 0) {
            console.log(count++);
            // eslint-disable-next-line @typescript-eslint/await-thenable
            yield 0;
            const _queue = queue;
            queue = [];
            _queue.forEach((func) => {
                try {
                    func();
                }
                catch (err) {
                    console.error('Unhandled promise rejection', err);
                }
            });
        }
        processPromise = null;
    });
}
function promiseSchedulerEnqueue(func) {
    queue.push(func);
    if (!processPromise) {
        processPromise = process();
    }
}

exports.promiseSchedulerEnqueue = promiseSchedulerEnqueue;
