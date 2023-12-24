// In languages like C# and Java , one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.
// to start ioff, let's dp the "hello world!" of generics: the identity function. The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the echo command.
// Without generics  we would either have tp give the identity function a special type:
function identity(arg) {
    return arg;
}
// or we could describe the identity function using the type any:
function identity1(arg) {
    return arg;
}
// while we use any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are loosing the information about what type it was when the function returns. If we passed in a number, the only information we have is that any type could be returned.
// instead we need a way of capturing the type of the argument in a such way that we can also use it to denote what is being returned. Here, we will use a type variable, a special kind of variable that works oon types rather than values.
function identity2(arg) {
    return arg;
}
// now we have added a type variable Type to the identity function. This allows us to capture the type user provides (ex: number), so we can use that information later. Here we use Type again as the return type. On inspection, we can now seee the same type is used for the argument and the return type. This allows use to traffic that type information in one side of the functions and out the others.
let output = identity2("myString");
// here we explicitly set Type to nbe string as one of the arguments to the function call. denoted using <> around the arguments rather than ().
// the second way is also perhaps the most common. Here we use type argument interface - The second, we want the compiler to set the value of Type for us automatically based on the type of the arguments we pass in:
let output1 = identity2("myString");
// working with generic type variables
// when you begin to use generics, you will notice that when you create generics functions like identity, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. That is, then you actually treat these parameters  as if they could be any and all types 
function identity3(arg) {
    return arg;
}
// what if we want log the length of the arguments arg to the console with each call? we might be tempted to write this:
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// whe we do, The compiler will give us an error that we are using the .length member of arg, but nowhere have we said that arg has this member Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.
//  Let’s say that we’ve actually intended this function to work on arrays of Type rather than Type directly. Since we’re working with arrays, the .length member should be available. We can describe this just like we would create arrays of other types:
function loggingIdentity1(arg) {
    console.log(arg.length);
    return arg;
}
// you an read the type of loggingIdentity as "the generic function loggingIdentity take a type parameter Type, and an argument arg which is an array of Type s , and returns an array of Type s". if we passed in an array of numbers , we'd get an array of numbers back out, as Type would bind to number. This allows us to use our generic type variable Type as part of the types we are working with, rather than the whole type, giving use greater flexibility.
function loggingIdentity2(arg) {
    console.log(arg.length); // array has a length so no prob[]
    return arg;
}
// Generic Types 
// The type of generic functions is just like  those of non-generic functions with the type parameter listed first, similarly to function declarations: 
function identity4(arg) {
    return arg;
}
let myIdentity = identity4;
// we could also have used a different name for the generic type parameter in the type, so long as the number of type variable and how the variables are used line up
function identity5(arg) {
    return arg;
}
let myIdentity2 = identity5;
// we can also write th generic type as a call signature of an object literal types:
function identity6(arg) {
    return arg;
}
let myIdentit3 = identity6;
function identity7(arg) {
    return arg;
}
let myIdentit4 = identity7;
function identity8(arg) {
    return arg;
}
let myIdentity5 = identity8;
// Generic classes
// A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets(<>) following the name of the class
class GenericNumber {
}
let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
// this is a pretty literal to use of the GenericNumber class, but you may have noticed that nothing is restricting it to only use the number type. We could have instead used string or even more complex objects.
let stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "Test"));
// Just as with interface, putting the type parameter on teh class itself lets us make sure all of the properties of the class are working with the same type;
// a class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.
// generic constraints
// If you remember from an earlier example , you may sometimes want to write a generic function that on a set of types where you have some knowledge about what capabilities that set of types will have. In our loggingIdentity example, we wanted to be able to access the .length property of arg, but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.
function loggingIdentity3(arg) {
    console.log(arg.length); // length property does not exist on type Type
    return arg;
}
function loggingIdentity4(arg) {
    console.log(arg.length); // we know it has  length property so no more errors 
    return arg;
}
// Because the generic function is now constrained, it will no longer work over any and all types:
loggingIdentity4(3);
/// instead , we need to pass values whose type has all the required properties:
loggingIdentity({ length: 10, value: 3 });
// Using parameters in Generic Constraints
// you can declare a type parameter that is constrained by another type parameter. For example . here we'd like to get a property from an object given its name. We'd like to ensure that we are not accidentally grabbing a property that does not exist on the obj, so we will place a constraint between the two types: 
function getProperty(obj, key) {
    return obj[key];
}
let o = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(o, "a"));
getProperty(o, "m");
// using CLASS types in Generics
// when creating factories in Ts using generics, it is necessary to refer to class types by their constructor functions, for ex: 
function create(c) {
    return new c();
}
// more advanced example uses the prototype prperty to infer and constrain relationships between the constructor function and the instance side of class types.
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nameTag = "Mikle";
    }
}
class AnimalAb {
    constructor() {
        this.numlegs = 4;
    }
}
class Bee extends AnimalAb {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper;
    }
}
class Lion extends AnimalAb {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMask;
// A generic parameter default follows the following rules:
// A type parameter is deemed optional if it has a default.
// Required type parameters must not follow optional type parameters.
// Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
// When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
// If a default type is specified and inference cannot choose a candidate, the default type is inferred.
// A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
// A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.
