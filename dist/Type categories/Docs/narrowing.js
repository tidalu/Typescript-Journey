// narrowing 
// imagine we have a function called padLeft.
function padLeft(padding, input) {
    throw new Error("Not implemented yet ");
}
// If padding is a number, it will treat that as the number of spaces we want to prepend to input. If padding is a string, it should just prepend padding to input. Let’s try to implement the logic for when padLeft is passed a number for padding.
function padLeft1(padding, input) {
    return " ".repeat(padding) + input;
} // Argument of type 'string | number' is not assignable to parameter of type 'number'.
//   Type 'string' is not assignable to type 'number'.
// Uh-oh, we’re getting an error on padding. TypeScript is warning us that we’re passing a value with type number | string to the repeat function, which only accepts a number, and it’s right. In other words, we haven’t explicitly checked if padding is a number first, nor are we handling the case where it’s a string, so let’s do exactly that.
function padLeft3(padding, input) {
    if (typeof padding == "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}
// there are couple of difere constructor ts understans for narrowing.
// typeof  type guards 
// As we’ve seen, JavaScript supports a typeof operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:
// ---- "string" ---
// ---- "number" ---
// ---- "bigint" ---
// ---- "boolean" ---
// ---- "symbol" ---
// ---- "undefined" ---
// ---- "object" ---
// ---- "function" ---
// In TypeScript, checking against the value returned by typeof is a type guard. Because TypeScript encodes how typeof operates on different values, it knows about some of its quirks in JavaScript. For example, notice that in the list above, typeof doesn’t return the string null. Check out the following example:
function printAll(strs) {
    if (typeof strs === "object") {
        for (const s of strs) { // saying strs is possibly null , cuz typeof null also returns "OBJECT"
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
    else {
        // do nothing
    }
}
// n the printAll function, we try to check if strs is an object to see if it’s an array type (now might be a good time to reinforce that arrays are object types in JavaScript). But it turns out that in JavaScript, typeof null is actually "object"! This is one of those unfortunate accidents of history.
// Users with enough experience might not be surprised, but not everyone has run into this in JavaScript; luckily, TypeScript lets us know that strs was only narrowed down to string[] | null instead of just string[].
// This might be a good segue into what we’ll call “truthiness” checking.
// truthiness narrowing 
// In JavaScript, we can use any expression in conditionals, &&s, ||s, if statements, Boolean negations (!), and more. As an example, if statements don’t expect their condition to always have the type boolean.
function getUsersOnlineMessage(numsUsersOnline) {
    if (numsUsersOnline) {
        return `There are ${numsUsersOnline} online now!`;
    }
    return "Nobody is here. :(";
}
// in js constructors like if first coerce their conditions to boolean s to maake sense of them, and then shoose their branches depending on whether the result is true or false, value like: 
// ----> 0
// ----> NaN
// ----> "" (the empty string)
// ----> 0n (the bigint version of zero)
// ----> null
// ----> undefined
// both results of these in true 
Boolean("Hello"); // true 
!!"World"; // true 
// it is fairly popular  to leverage this behavior, espescialyy for guaarding against values like null or undedfined
// as an example let's try  using it for our printAll function
function printAll1(strs) {
    if (strs && typeof strs === "object") { // we are checking the strs is also truthy 
        for (const s of strs) {
            console.log(s);
        }
    }
    else if (typeof strs == "string") {
        console.log(strs);
    }
} // by this we get rid of error: TypeError: null is not iterable
// Keep in mind though that truthiness checking on primitives can often be error prone. As an example, consider a different attempt at writing printAll
function printAll2(strs) {
    // do not do this 
    if (strs) { // We wrapped the entire body of the function in a truthy check, but this has a subtle downside: we may no longer be handling the empty string case correctly.
        if (typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        }
        else {
            if (typeof strs == "string") {
                console.log(strs);
            }
        }
    }
}
// one last word on narrowing by truthiness is that Boolean negation with ! filter out from negated branches.
function multiplyAll(values, factor) {
    if (!values) {
        return values;
    }
    else {
        return values.map((x) => x * factor);
    }
}
// till equality narrowing 
// typescript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. for ex:
function example(x, y) {
    if (x === y) {
        // we can call any string method on x or y
        x.toUpperCase();
        y.toUpperCase();
    }
    else {
        console.log(x);
        console.log(y);
    }
}
// another example
function printAll3(strs) {
    if (strs !== null) {
        if (typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        }
        else if (typeof strs === "string") {
            console.log(strs);
        }
    }
}
function multiplyValue(container, factor) {
    // remove both 'null' and 'undefined' from the type 
    if (container.value != null) {
        console.log(container.value);
        // now we can safely multiply container.value
        container.value *= factor;
    }
}
function move1(animal) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}
function move(animal) {
    if ("swim" in animal) {
        animal;
    }
    else {
        animal;
    }
}
// instanceof narrowing 
// Js  has an operator for checking whether or not value is an "instance" of another value. More specifically, in Js x instanceof Foo checks whether the prototype chain of x contains Foo.prototype. While we wont dive deep here, and you'll see more of this when we get into classes, they can still be useful for most values values that can be constucted with new. As you might have guessed, instanceof is also a type guard, and TS narrows in branches guarded by instanceof s.
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
//  assignments 
// when we assign any varible, Ts looks at the right side of the assignment and narrows the left side appropriatly.
let x = Math.random() < 0.5 ? 10 : "Hello world!";
x = 1;
console.log(x);
x = "Goodbye";
console.log(x);
// / Notice  that each of these assignments is valid. Even though the ovserved type of x changed to Number after our first assignment, we were still able to assign a string to x.
// This is because  the declared type of x - the type that x started with string | number, and assignability is always checked against declared type.
// if we'd  assigned to boolen to x , we'd have seen an error since that was not part if the declared type. 
let y = Math.random() < 0.5 ? 10 : "hellow world";
y = 1;
console.log(x);
x = true; // type boolen is not assignable to type string | number;
console.log(x);
//  control flow analysis 
// up until this point, we have gone through some basic examples of how narrows within specific branches, But there's a bit more going on than just walking  up from every variable and looking for gurads in if's , while's condintionals , etc. for example 
function padLeft2(padding, input) {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}
// padLeft returns from within its first if block. TypeScript was able to analyze this code and see that the rest of the body (return padding + input;) is unreachable in the case where padding is a number. As a result, it was able to remove number from the type of padding (narrowing from string | number to string) for the rest of the function.
// this analysis of code based or reachability is called control flow analysis, and typescript uses this flwo analysis to narrow types it encounters type guards and assignments. when a variable can be observed to have a different type at each point.
function example1() {
    let x;
    x = Math.random() < 0.5;
    console.log(x);
    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
    }
    else {
        x = 100;
        console.log(x);
    }
    return x;
}
// using type predicates
// we have worked with existing  js constructors to handle narrowing so far, however sometimes you want more direct control over how types changes throughout you code. to define a user-defined type gurad, we simply need a fn whose return type is type predicate;
function isFish(pet) {
    return pet.swim !== undefined;
}
// pet is Fish is our type predicate in this example. A predicate takes the form parameterName is Type, where parameterName must  be the name of a parameter from the current function signature.
// Any time isFish is called with some variable, Ts will narrow that variable to that specific type if the original type is compatible.
// both calls to 'swim' and 'fly' are now okay.
function getSmallPet() {
    // Logic to determine and return a small pet (either a Fish or a Bird)
    // For the sake of example, let's assume it returns a Fish
    const smallFish = {
        swim: () => {
            console.log("The fish is swimming.");
        },
        name: "Nemo", // Assuming the fish has a name property
    };
    return smallFish;
}
let pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
const zoo = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1 = zoo.filter(isFish);
// 0r, equivalently
const underWater2 = zoo.filter(isFish);
// the predicate may need repeating for more complex examples;
const underWater3 = zoo.filter((pet) => {
    if (pet.name === "sharkey")
        return false;
    return isFish(pet);
});
function handleShape(shape) {
    // oops
    if (shape.kind === "rect") { //This comparison appears to be unintentional because the types '"circle" | "square"' and '"rect"' have no overlap.
    }
}
// we can write a getArea functioni that applies the right logic based on if it is dealing with a circle or square. we will first try dealing with circle;
function getArea2(shape) {
    return Math.PI * Math.pow(shape.radius, 2); // it is saying radius is possible undefined;
}
// under the strictNullChecks that gives use an error which is appropriate since radius might not be defined. but what if we perform the appropriate checks on the kind property.
function getArea3(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2); // radius is possibly undefined;
    }
}
// hmm ts still does not know what tot do here , we have hit a point where we know more about our vaoues than the type checker does. we could tryy ro use a not null assertion (!) to say that radius is definitely present.
function getArea5(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2);
    }
}
// // here we hve prperty separated ShapeFixed out into two types with different value for the kind property, but radius and sideLength are declarred as required in their respective types 
// function getArea8(shape: Shape) {
//     return Math.PI * shape.radius ** 2; // shape.radius is possibly undedfined;
// }
// what when we check with the kind property agains it is gonna work
function getArea(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2);
    }
}
// hat got rid of the error! When every type in a union contains a common property with literal types, TypeScript considers that to be a discriminated union, and can narrow out the members of the union.
// In this case, kind was that common property (which is what’s considered a discriminant property of Shape). Checking whether the kind property was "circle" got rid of every type in Shape that didn’t have a kind property with the type "circle". That narrowed shape down to the type Circle.
// The same checking works with switch statements as well. Now we can try to write our complete getArea without any pesky ! non-null assertions.
function getArea0(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.sideLength, 2);
    }
}
function getArea5(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.sideLength, 2);
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
function getArea7(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.sideLength, 2);
        default:
            const _exhaustiveCheck = shape;
            // Type 'Triangle' is not assignable to type 'never'.
            return _exhaustiveCheck;
    }
}
