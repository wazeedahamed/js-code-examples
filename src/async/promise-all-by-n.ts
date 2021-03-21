/**
 * Creates a promise handler that processes a list of promises in batches, helps to avoid overloading clients during bulk processing
 * @param {number} limit number of promises to process in a batch
 * @returns {Function} batch promise handling function
 */
const promiseAllByBatch: (limit: number) => <T>(list: (() => Promise<T>)[]) => Promise<T[]> = (function () {
    /**
     * Processes a list of promises in batches, helps to avoid overloading clients during bulk processing
     * @param {number} limit number of promises to process in a batch
     * @param {Array<Function>} list list of functions that returns promises to be procesed
     * @returns {Promise<Array>} promise
     */
    function batchProcess<T>(limit: number, list: (() => Promise<T>)[]): Promise<T[]> {
        const total = list.length;
        return new Promise<T[]>(resolve => {
            next(0, []);
            function next(start: number, queue: Promise<T>[]) {
                if (start >= total) return complete(queue);
                const batch = list.slice(start, start + limit).map(promise => promise());
                [].push.apply(queue, batch as never[]);
                Promise.all(batch).then(() => next(start + limit, queue));
                console.log(`Start >>>  ${start.toString().padStart(3, " ")} To ${(start + limit).toString().padStart(3, " ")}`)
            }
            function complete(queue: Promise<T>[]) {
                resolve(Promise.all(queue));
            }
        });
    }
    return (limit: number) => <T>(list: (() => Promise<T>)[]) => batchProcess<T>(limit, list);
}());


/** Testing code **/
(function (promiseBatch) {
    function pTimer(resolveValue: number) {
        return new Promise<number>(resolve => {
            setTimeout(() => resolve(resolveValue), resolveValue * 10);
        })
    }
    const _100_timers = new Array(100).fill(null).map((v, i) => () => pTimer(i)),
        time = () => console.log(new Date());
    time(), promiseBatch(_100_timers).then(console.log).then(time);
}(promiseAllByBatch(5)));


/**
 * Output:
2021-03-20T15:10:29.398Z
Start >>>    0 To   5
Start >>>    5 To  10
Start >>>   10 To  15
Start >>>   15 To  20
Start >>>   20 To  25
Start >>>   25 To  30
Start >>>   30 To  35
Start >>>   35 To  40
Start >>>   40 To  45
Start >>>   45 To  50
Start >>>   50 To  55
Start >>>   55 To  60
Start >>>   60 To  65
Start >>>   65 To  70
Start >>>   70 To  75
Start >>>   80 To  85
Start >>>   85 To  90
Start >>>   90 To  95
Start >>>   95 To 100
[
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  96, 97, 98, 99
]
2021-03-20T15:10:39.869Z

---- Total Time: 1s 471ms
 */