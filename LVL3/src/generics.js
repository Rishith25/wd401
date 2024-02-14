"use strict";
// Example of a generic function
function identity(arg) {
    return arg;
}
let result = identity("hello");
console.log(result); // Output: hello
// Example of a generic class
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
let box = new Box(42);
console.log(box.getValue()); // Output: 42
