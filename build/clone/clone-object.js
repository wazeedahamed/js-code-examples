"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Create a clone of an object
 * @param {any} obj object to clone
 */
function cloneObject(obj) {
    switch (obj["constructor"]) {
        case Date: return new Date(obj);
        case Object: return Object.keys(obj)
            .reduce(function (newObj, key) { return (newObj[key] = cloneObject(obj[key]), newObj); }, {});
        case Array: return obj.map(cloneObject);
    }
    return obj;
}
// Test
var obj = { number: 100, string: "string", boolean: true, object: { key: "value" }, date: new Date(), array: [0] }, objClone = __assign({}, obj), objClone2 = cloneObject(obj);
// Update obj
obj.number += 1, obj.string += "1", obj.boolean = false, obj.object.key += "1", obj.date.setHours(0), obj.array.push(1);
// Print
console.log(objClone, objClone2);
/**
{
  number: 100, string: 'string', boolean: true,
  object: { key: 'value1' },                    // <<< object also updated as this is by reference
  date: 2021-03-21T18:50:29.022Z,               // <<< date also updated as this is by reference
  array: [ 0, 1 ]                               // <<< array also updated as this is by reference
} {
  number: 100, string: 'string', boolean: true,
  object: { key: 'value' },
  date: 2021-03-22T13:50:29.022Z,
  array: [ 0 ]
}
 */
/**Test Code */
(function () {
    var obj = {
        array: [1, "s", [2, 3, new Date()]],
        object: {
            a: 10,
            b: 20,
            array: [1, 2, 3]
        },
        number: 1,
        string: "s",
        date: new Date()
    };
    // Using spread operator
    var objClone = __assign({}, obj);
    // Using cloneObject function
    var objClone2 = cloneObject(obj);
    // Update in reference type of obj
    obj.array.push(100);
    obj.date.setDate(1);
    console.log("objClone still contains references of obj, hence \n", objClone);
    console.log("\n\nobjClone contains only copy of obj\n", objClone2);
}());
/**
 * Output:
objClone still contains references of obj
 {
  array: [ 1, 's', [ 2, 3, 2021-03-22T13:41:01.618Z ], 100 ],       // <<< 100 is pushed in clone
  object: { a: 10, b: 20, array: [ 1, 2, 3 ] },
  number: 1,
  string: 's',
  date: 2021-03-01T13:41:01.618Z        // <<< Date is changed to 1 in clone
}


objClone contains only copy of obj
 {
  array: [ 1, 's', [ 2, 3, 2021-03-22T13:41:01.618Z ] ],
  object: { a: 10, b: 20, array: [ 1, 2, 3 ] },
  number: 1,
  string: 's',
  date: 2021-03-22T13:41:01.618Z
}
 */ 
