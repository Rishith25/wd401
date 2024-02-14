"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorator function to log method calls
function LogMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Calling method ${key} with arguments: ${args.join(", ")}`);
        return originalMethod.apply(this, args);
    };
    return descriptor; // Return the modified Property Descriptor
}
// Example usage of the decorator
class Calculator {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    LogMethod
], Calculator.prototype, "add", null);
const calc = new Calculator();
calc.add(2, 3); // Output: Calling method add with arguments: 2, 3
