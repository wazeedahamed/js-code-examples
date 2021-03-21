/**
 * Promise.all example
 * As number of promises increases, Promise.all adds load on client
 * Use this when there are limited promises to be handled
 */


/** Testing Code */
(function () {
    function pTimer(resolveValue: number) {
        // Create a Promise that resolves
        return new Promise<number>(resolve => {
            setTimeout(() => resolve(resolveValue), resolveValue * 10);
        })
    }
    const _100_timers = new Array(100).fill(null).map((v, i) => () => pTimer(i));

    // Below promise.all starts 100 timer promises and resolves when all timers are completed
    Promise.all(_100_timers.map(promise => promise())).then(console.log);
}())
