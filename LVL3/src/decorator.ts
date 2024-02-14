function Logger(constructor: Function, target: any) {
  console.log("logging the data");
  console.log(constructor);
}

@Logger
class Person {
  name: "Rishith" = "Rishith";
  constructor() {
    console.log("Creating Object");
  }
}

const person = new Person();
console.log(person);
