function Logger(constructor: Function) {
  console.log("logging the data");
  console.log(constructor);
}

@Logger
class Person {
  name: "Rishith";
  constructor() {
    console.log("Creating Object");
  }
}

const person = new Person();
console.log(person);
