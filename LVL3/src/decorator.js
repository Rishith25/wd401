"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Example of a class decorator
function logClass(target) {
    console.log("Decorating class:", target.name);
}
// Applying class decorator
var SampleClass = /** @class */ (function () {
    function SampleClass() {
        console.log("Initializing SampleClass");
    }
    SampleClass = __decorate([
        logClass
    ], SampleClass);
    return SampleClass;
}());
// Example of a method decorator
function logMethod(target, key) {
    console.log("Decorating method:", key);
}
// Applying method decorator
var AnotherClass = /** @class */ (function () {
    function AnotherClass() {
    }
    AnotherClass.prototype.someMethod = function () {
        console.log("Executing someMethod");
    };
    __decorate([
        logMethod
    ], AnotherClass.prototype, "someMethod", null);
    return AnotherClass;
}());
