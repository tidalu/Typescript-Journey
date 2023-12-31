// In languages like C# and Java , one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.


// to start ioff, let's dp the "hello world!" of generics: the identity function. The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the echo command.

// Without generics  we would either have tp give the identity function a special type:
function identity(arg: number): number {
    return arg;
}

// or we could describe the identity function using the type any:
function identity1(arg: any): any {
    return arg;
}

// while we use any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are loosing the information about what type it was when the function returns. If we passed in a number, the only information we have is that any type could be returned.


// instead we need a way of capturing the type of the argument in a such way that we can also use it to denote what is being returned. Here, we will use a type variable, a special kind of variable that works oon types rather than values.

function identity2<Type>(arg: Type): Type {
    return arg;
}

// now we have added a type variable Type to the identity function. This allows us to capture the type user provides (ex: number), so we can use that information later. Here we use Type again as the return type. On inspection, we can now seee the same type is used for the argument and the return type. This allows use to traffic that type information in one side of the functions and out the others.
let output = identity2<string>("myString");

// here we explicitly set Type to nbe string as one of the arguments to the function call. denoted using <> around the arguments rather than ().

// the second way is also perhaps the most common. Here we use type argument interface - The second, we want the compiler to set the value of Type for us automatically based on the type of the arguments we pass in:

let output1 = identity2("myString");



// working with generic type variables

// when you begin to use generics, you will notice that when you create generics functions like identity, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. That is, then you actually treat these parameters  as if they could be any and all types 

function identity3<Type>(arg: Type): Type {
    return arg;
}
// what if we want log the length of the arguments arg to the console with each call? we might be tempted to write this:

function loggingIdentity<Type>(arg: Type): Type {
    console.log(arg.length);
    return arg;
}


// whe we do, The compiler will give us an error that we are using the .length member of arg, but nowhere have we said that arg has this member Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.
//  Let’s say that we’ve actually intended this function to work on arrays of Type rather than Type directly. Since we’re working with arrays, the .length member should be available. We can describe this just like we would create arrays of other types:

function loggingIdentity1<Type>(arg: Type[]): Type[] {
    console.log(arg.length);
    return arg;
}

// you an read the type of loggingIdentity as "the generic function loggingIdentity take a type parameter Type, and an argument arg which is an array of Type s , and returns an array of Type s". if we passed in an array of numbers , we'd get an array of numbers back out, as Type would bind to number. This allows us to use our generic type variable Type as part of the types we are working with, rather than the whole type, giving use greater flexibility.

function loggingIdentity2<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length) // array has a length so no prob[]
    return arg;
}

// Generic Types 
// The type of generic functions is just like  those of non-generic functions with the type parameter listed first, similarly to function declarations: 

function identity4<Type>(arg: Type): Type {
    return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity4;


// we could also have used a different name for the generic type parameter in the type, so long as the number of type variable and how the variables are used line up

function identity5<Input>(arg: Input): Input {
    return arg;
}

let myIdentity2: <Input>(arg: Input) => Input = identity5;

// we can also write th generic type as a call signature of an object literal types:
function identity6<Type>(arg: Type): Type {
    return arg;
}

let myIdentit3: { <Type>(arg: Type): Type } = identity6;


// which leads us to writing our first generic interface. Let's take the object literal from the previous example and move it to an interface;

interface GenericIdentity {
    <Type>(arg: Type): Type;
}

function identity7<Type>(arg: Type): Type {
    return arg;
}

let myIdentit4: GenericIdentity = identity7;

// in a similar example, we may want to move the generic parameter to be a parameter of the whole interface. This lets us see what types we are generic over (e.g. Dictionary<string> rather than just Dictionary). This makes the type parameter visible to al the other member of the interface;

interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

function identity8<Type>(arg: Type): Type {
    return arg;
}

let myIdentity5: GenericIdentityFn<number> = identity8;


// Generic classes

// A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets(<>) following the name of the class

class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
}

// this is a pretty literal to use of the GenericNumber class, but you may have noticed that nothing is restricting it to only use the number type. We could have instead used string or even more complex objects.

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "Test"));

// Just as with interface, putting the type parameter on teh class itself lets us make sure all of the properties of the class are working with the same type;

// a class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.


// generic constraints

// If you remember from an earlier example , you may sometimes want to write a generic function that on a set of types where you have some knowledge about what capabilities that set of types will have. In our loggingIdentity example, we wanted to be able to access the .length property of arg, but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.

function loggingIdentity3<Type>(arg: Type): Type {
    console.log(arg.length); // length property does not exist on type Type
    return arg;
}

// instead of working with any and all types, wed like to constrain this function to work with any and all types that also have the .length property. As long as the type has this member, we will allow it, but it's required to have at least this member. To do so, we must list our requirements as a constraint on what Type can be.

// to do so we will create an interface that describes our constraint. here we will create an interface that has a single .length property and then we will use this interface and the extends keyword to denote our constraint: 

interface Lengthwise {
    length: number;
}


function loggingIdentity4<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // we know it has  length property so no more errors 
    return arg;
}

// Because the generic function is now constrained, it will no longer work over any and all types:
loggingIdentity4(3);


/// instead , we need to pass values whose type has all the required properties:
loggingIdentity({ length: 10, value: 3 });


// Using parameters in Generic Constraints
// you can declare a type parameter that is constrained by another type parameter. For example . here we'd like to get a property from an object given its name. We'd like to ensure that we are not accidentally grabbing a property that does not exist on the obj, so we will place a constraint between the two types: 

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}

let o = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(o, "a"));
getProperty(o, "m");

// using CLASS types in Generics

// when creating factories in Ts using generics, it is necessary to refer to class types by their constructor functions, for ex: 
function create<Type>(c: { new(): Type }): Type {
    return new c();
}

// more advanced example uses the prototype prperty to infer and constrain relationships between the constructor function and the instance side of class types.

class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nameTag: string = "Mikle";
}

class AnimalAb {
    numlegs: number = 4;
}

class Bee extends AnimalAb {
    numlegs: 6;
    keeper: BeeKeeper = new BeeKeeper;
}

class Lion extends AnimalAb {
    keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends AnimalAb>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMask;


// generic Parameter defaults 

//  Consider a function that creates a new HTMLElement. Calling the function with no arguments generates a Div; calling it with an element as the first argument generates an element of the argument’s type. You can optionally pass a list of children as well. Previously you would have to define it as:

declare function create1(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
    element: T,
    children: U[]
): Container<T, U[]>;

// A generic parameter default follows the following rules:
// A type parameter is deemed optional if it has a default.
// Required type parameters must not follow optional type parameters.
// Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
// When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
// If a default type is specified and inference cannot choose a candidate, the default type is inferred.
// A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
// A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.
