/**
 * async-await is a syntactic sugar for asynchronous call backs
 * with async-await, programmer writes synchronous code
 * the compiled code contains awaiter & generator functions with callbacks to execute asynchronously
 * Note: Used timers to mimic delay in api fetching
 */

async function execAsync(seconds: number) {
    console.log(`started timer for ${seconds} sec`)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`resolved after ${seconds} sec`);
            resolve(seconds);
        }, seconds * 1e3);
    });
}
async function execute() {
    const timer_3_4 = await Promise.all([execAsync(3), execAsync(4)]);
    console.log("timer_3_4", timer_3_4);
    const timer_5 = await execAsync(5);
    console.log("timer_5", timer_5);
}
execute();

/** Output:
 * Timer[async call] 3 and 4 starts together with Promise.all, while Timer 5 waits
 * 
    started timer for 3 sec
    started timer for 4 sec
    resolved after 3 sec
    resolved after 4 sec
    timer_3_4 [ 3, 4 ]        << timer_3_4 gets resolved values from two different promises
    started timer for 5 sec
    resolved after 5 sec
    timer_5 5
 **/