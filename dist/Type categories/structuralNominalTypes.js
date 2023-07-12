// Structural and nominal types
// what is type checking
// typechecking has to do with answering a question about type equivalence 
// Type-checking can be thought of as a task that attempts to evaluate the question of compatibility or type equivalence:
var myValue, x, y;
function foo1(x) {
    // ... mystery code ...
}
//
// TYPE CHECKING
// -------------
// Is `myValue` type-equivalent to
//     what `foo` whats to receive?
foo1(myValue);
// This question can be asked at a function call - such as foo(myValue) in the above example - as an assignment,
// is the value y holds type-equivalent to what 'x' allows?
x = y;
// ... a return , 
const myString = ["a"];
// ---cut---
function bar() {
    // ...mystery code that might return early...
    //
    //
    // TYPE CHECKING
    // -------------
    // Is `myStrings` type-equivalent to
    //     what `bar` states it will return?
    return myString;
}
// sorting type systems as either  static or dynamic has to do with whether type-checking is performed as compile time or runtime.
// typescript is static type system
// Java, C#, C++ all fit into this category. Keep in mind that inference can still occur in static type systems — TypeScript, Scala, and Haskell all have some form of static type checking.
// Dynamic type systems perform their "Type equivalence" evaluation at runtime.Javascript , python, ruby, perl, and PHP fall into this category
// Nominal vs structural
//nominal type systems are all about Names. Let's take a look at simple Java example:
// public class Car {
// String make;
// String model;
// int make;
// }
// public class CarChecker {
// takes a `Car` argument, returns a `String`
// public static String printCar(Car car) { }
// }
//   Car myCar = new Car();
// TYPE CHECKING
// -------------
// Is `myCar` type-equivalent to
//     what `checkCar` wants as an argument?
// CarChecker.checkCar(myCar);
// In the code above, when considering the question of type equivalence on the last line, all that matters is whether myCar is an instance of the class named Car.
// TypeScript type system is structural
// structural type systems are all about STRUCTURE or ShAPE. let;s look at a typescript example:
class Car {
}
class Truck {
}
const vehicle = {
    make: "Honda",
    model: "Accord",
    year: 2017,
};
function printCar2(car) {
    console.log(`${car.make} ${car.model} (${car.year})`);
}
printCar2(new Car()); // Fine
printCar2(new Truck()); // Fine
printCar2(vehicle); // Fine
// the function printCar2 does not care about which constructor its argument came from , it only cares about whether it has:
// A make property that’s of type string
// A model property that’s of type string
// A year property that’s of type number
// If the argument passed to it meets these requirements, printCar is happy
// Duck typing 
// "Duck typing" gets its name from the "duck test".
// “If it looks like a duck, swims like a duck, and quack like a duck, then it probably is a duck”.
// In practice, this is very similar to structural typing, but “Duck typing” is usually used to describe dynamic type systems.
// "strong" vs "Weak" types
// These terms, while used frequently, have no agreed-upon technical definition. In the context of TypeScript it’s common for those who say “strong” to really mean “static”.
