// Example of a class decorator
function logClass(target: Function) {
  console.log("Decorating class:", target.name);
}

// Applying class decorator
@logClass
class SampleClass {
  constructor() {
    console.log("Initializing SampleClass");
  }
}

// Example of a method decorator
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("Decorating method:", key);
}

// Applying method decorator
class AnotherClass {
  @logMethod
  someMethod() {
    console.log("Executing someMethod");
  }
}
