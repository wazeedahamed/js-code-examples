/**
 * Creates a promise handler that processes a list of promises in queue with limited concurency, helps to avoid overloading clients during bulk processing
 * @param {number} limit number of promises to process concurrently
 * @returns {Function} concurrent promise handling function
 */
const promiseAllConcurrent: (limit: number) => <T>(list: (() => Promise<T>)[]) => Promise<T[]> = (function () {
    interface IMeta<T> {
        concurrent: number;
        queued: number;
        queue: Promise<T>[]
    }
    /**
     * Processes a list of promises in queue with limited concurency, helps to avoid overloading clients during bulk processing
     * @param {number} limit number of promises to process concurrently
     * @param {Array<Function>} list list of functions that returns promises to be procesed
     * @returns {Promise<Array>} promise
     */
    function concurrentProcess<T>(limit: number, list: (() => Promise<T>)[]): Promise<T[]> {
        const total = list.length;
        return limit >= total ?
            Promise.all(list.map(promise => promise())) :
            new Promise(resolve => {
                next({ concurrent: 0, queued: 0, queue: [] });
                function next(meta: IMeta<T>, previous?: number) {
                    // previous parameter is used only for logging
                    const { queue, queued, concurrent } = meta;
                    if (queued == total) return concurrent == 0 ? complete(queue) : null;
                    queue.push(list[queued]());
                    queue[queue.length - 1].then(() => {
                        concurrency(false, meta);
                        next(meta, queued);
                    });
                    console.log(
                        previous === undefined ?
                            `Queued >>>  ${queued.toString().padStart(3, " ")}` :
                            `Queued >>>  ${queued.toString().padStart(3, " ")}  <<< ${previous.toString().padStart(3, " ")}`
                    );
                    concurrency(true, meta) < limit && next(meta);
                }
                function concurrency(flag: boolean, meta: IMeta<T>) {
                    flag ? (meta.queued++, meta.concurrent++) : (meta.concurrent--);
                    return meta.concurrent;
                }
                function complete(queue: Promise<T>[]) {
                    resolve(Promise.all(queue));
                }
            });
    }
    return (limit: number) => <T>(list: (() => Promise<T>)[]) => concurrentProcess<T>(limit, list);
}());


/** Testing code **/
(function (promiseConcurrent) {
    function pTimer(resolveValue: number) {
        return new Promise<number>(resolve => {
            setTimeout(() => resolve(resolveValue), resolveValue * 10);
        })
    }
    const _100_timers = new Array(100).fill(null).map((v, i) => () => pTimer(i)),
        time = () => console.log(new Date());
    time(), promiseConcurrent(_100_timers).then(console.log).then(time);
}(promiseAllConcurrent(5)));

/**
2021-03-20T15:10:49.260Z
Queued >>>    0
Queued >>>    1
Queued >>>    2
Queued >>>    3
Queued >>>    4
Queued >>>    5  <<<   0
Queued >>>    6  <<<   1
Queued >>>    7  <<<   2
Queued >>>    8  <<<   3
Queued >>>    9  <<<   4
Queued >>>   10  <<<   5
Queued >>>   11  <<<   6
Queued >>>   12  <<<   7
Queued >>>   13  <<<   8
Queued >>>   14  <<<   9
Queued >>>   15  <<<  10
Queued >>>   16  <<<  11
Queued >>>   17  <<<  12
Queued >>>   18  <<<  13
Queued >>>   19  <<<  14
Queued >>>   20  <<<  15
Queued >>>   21  <<<  16
Queued >>>   22  <<<  17
Queued >>>   23  <<<  18
Queued >>>   24  <<<  19
Queued >>>   25  <<<  20
Queued >>>   26  <<<  21
Queued >>>   27  <<<  22
Queued >>>   28  <<<  23
Queued >>>   29  <<<  24
Queued >>>   30  <<<  25
Queued >>>   31  <<<  26
Queued >>>   32  <<<  27
Queued >>>   33  <<<  28
Queued >>>   34  <<<  29
Queued >>>   35  <<<  30
Queued >>>   36  <<<  31
Queued >>>   37  <<<  32
Queued >>>   38  <<<  33
Queued >>>   39  <<<  34
Queued >>>   40  <<<  35
Queued >>>   41  <<<  36
Queued >>>   42  <<<  37
Queued >>>   43  <<<  38
Queued >>>   44  <<<  39
Queued >>>   45  <<<  40
Queued >>>   46  <<<  41
Queued >>>   47  <<<  42
Queued >>>   48  <<<  43
Queued >>>   49  <<<  44
Queued >>>   50  <<<  45
Queued >>>   51  <<<  46
Queued >>>   52  <<<  47
Queued >>>   53  <<<  48
Queued >>>   54  <<<  49
Queued >>>   55  <<<  50
Queued >>>   56  <<<  51
Queued >>>   57  <<<  52
Queued >>>   58  <<<  53
Queued >>>   59  <<<  54
Queued >>>   60  <<<  55
Queued >>>   61  <<<  56
Queued >>>   62  <<<  57
Queued >>>   63  <<<  58
Queued >>>   64  <<<  59
Queued >>>   65  <<<  60
Queued >>>   66  <<<  61
Queued >>>   67  <<<  62
Queued >>>   68  <<<  63
Queued >>>   69  <<<  64
Queued >>>   70  <<<  65
Queued >>>   71  <<<  66
Queued >>>   72  <<<  67
Queued >>>   73  <<<  68
Queued >>>   74  <<<  69
Queued >>>   75  <<<  70
Queued >>>   76  <<<  71
Queued >>>   77  <<<  72
Queued >>>   78  <<<  73
Queued >>>   79  <<<  74
Queued >>>   80  <<<  75
Queued >>>   81  <<<  76
Queued >>>   82  <<<  77
Queued >>>   83  <<<  78
Queued >>>   84  <<<  79
Queued >>>   85  <<<  80
Queued >>>   86  <<<  81
Queued >>>   87  <<<  82
Queued >>>   88  <<<  83
Queued >>>   89  <<<  84
Queued >>>   90  <<<  85
Queued >>>   91  <<<  86
Queued >>>   92  <<<  87
Queued >>>   93  <<<  88
Queued >>>   94  <<<  89
Queued >>>   95  <<<  90
Queued >>>   96  <<<  91
Queued >>>   97  <<<  92
Queued >>>   98  <<<  93
Queued >>>   99  <<<  94
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
2021-03-20T15:10:59.752Z

---- Total Time: 1s 492ms
 */