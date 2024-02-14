// Decorator function to log method calls
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling method ${key} with arguments: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// Example usage of the decorator
class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Output: Calling method add with arguments: 2, 3
