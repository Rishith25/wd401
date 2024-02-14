// Example of a generic function
function identity<T>(arg: T): T {
  return arg;
}

let result = identity<string>("hello");
console.log(result); // Output: hello

// Example of a generic class
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

let box = new Box<number>(42);
console.log(box.getValue()); // Output: 42
