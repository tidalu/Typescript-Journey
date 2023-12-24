// interfaces
function printUser(info) {
    info.name;
}
// Like type aliases, interfaces can be imported/exported between modules just like values, and they serve to provide a “name” for a specific type.
// inheritance in interfaces 
//  If you’ve ever seen a JavaScript class that “inherits” behavior from a base class, you’ve seen an example of what TypeScript calls a heritage clause: extends
class Animal {
    eat(food) {
        consumeFood(food);
    }
}
function consumeFood(food) {
    throw new Error("Function not implemented.");
}
class Dog extends Animal {
    bark() {
        return "woof";
    }
}
const d = new Dog();
d.eat;
d.bark;
function careForDog(dog) {
    dog.getBreed;
}
// class Dog1 implements AnimalLike // uncomment this line
{ //Class 'Dog' incorrectly implements interface 'AnimalLike'.Property 'eat' is missing in type 'Dog' but required in type 'AnimalLike'.
    // bark() {
    //     return "woof"  // do uncomment this line
    // }
}
class Dog2 {
    bark() {
        return "woof";
    }
    eat(food) {
        consumeFood(food);
    }
}
// While TypeScript (and JavaScript) does not support true multiple inheritance (extending from more than one base class), this implements keyword gives us the ability to validate, at compile time, that instances of a class conform to one or more “contracts” (types). Note that both extends and implements can be used together:
class LivingOrganism {
    isAlive() {
        return true;
    }
}
class Dog3 extends LivingOrganism {
    bark() {
        return "Woof";
    }
    eat(food) {
        consumeFood(food);
    }
}
class Dog4 {
    bark() {
        return "woof";
    }
    eat(food) {
        consumeFood(food);
    }
}
function feed(animal) {
    animal.eat;
    animal.isAlive;
}
// These declarations are merged together to create a result identical to what you would see if both the isAlive and eat methods were on a single interface declaration.
// You may be asking yourself: where and how is this useful?
// Imagine a situation where you want to add a global property to the window object
window.document; // an existing property
window.exampleProperty = 42;
// What we have done here is augment an existing Window interface that TypeScript has set up for us behind the scene.
// which one to use
//  In many situations, either a type alias or an interface would be perfectly fine, however…
// --- 1. If you need to define something other than an object type (e.g., use of the | union type operator), you must use a type alias
// --- 2. If you need to define a type to use with the implements heritage term, it’s best to use an interface
// --- 3. If you need to allow consumers of your types to augment them, you must use an interface. 
// recursive types 
// Recursive types, are self-referential, and are often used to describe infinitely nestable types. For example, consider infinitely nestable arrays of numbers: 
;
[3, 4, [5, 6, [7], 59], 221];
const val = [3, 4, [5, 6, [7], 59], 221];
if (typeof val !== "number") {
    val.push(41); // inference: (method) Array<NestedNumbers>.push(...items: NestedNumbers[]): number
    // Appends new elements to the end of an array, and returns the new length of the array.
    // @param items — New elements to add to the array.
    // val.push("this will not work") // Argument of type 'string' is not assignable to parameter of type 'NestedNumbers'. to solve we should add string to the type of the nestedNumbers
}
