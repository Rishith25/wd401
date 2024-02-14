"use strict";
// Example of a generic function
function identity(arg) {
    return arg;
}
var result = identity("hello");
console.log(result); // Output: hello
// Example of a generic class
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.prototype.getValue = function () {
        return this.value;
    };
    return Box;
}());
var box = new Box(42);
console.log(box.getValue()); // Output: 42
