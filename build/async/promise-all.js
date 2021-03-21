"use strict";
/**
 * Promise.all example
 * As number of promises increases, Promise.all adds load on client
 * Use this when there are limited promises to be handled
 */
/** Testing Code */
(function () {
    function pTimer(resolveValue) {
        // Create a Promise that resolves
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(resolveValue); }, resolveValue * 10);
        });
    }
    var _100_timers = new Array(100).fill(null).map(function (v, i) { return function () { return pTimer(i); }; });
    // Below promise.all starts 100 timer promises and resolves when all timers are completed
    Promise.all(_100_timers.map(function (promise) { return promise(); })).then(console.log);
}());
