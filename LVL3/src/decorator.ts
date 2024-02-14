// Decorator function to log class instantiation
function logClass(constructor: Function) {
  console.log("Decorating class:", constructor);
}

// Applying class decorator
@logClass
class SampleClass {
  constructor() {
    console.log("Initializing SampleClass");
  }
}

// Decorator function to log method calls
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
