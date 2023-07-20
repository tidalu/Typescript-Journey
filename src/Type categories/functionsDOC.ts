// typescript is looks awesome


// function type expressions

// the simple way to describe a function is with a function type expression. these types are sytactically similar to arrow functions;

function greeter(fn: (a: string) => void) {
    fn("Hello world!");
}

function printToConcole(s: string) {
    console.log(s)
}

greeter(printToConcole);

// of course we can use a type aliases to name a fucntion type
type GreetFunction = (a: string) => void;
function greeter1(fn: GreetFunction) {
    // ...
}

// call signatures 
// in js, fonctions can have properties in addition to being callable. however , the function type expression syntax doesnt allow for declaring properties. if we want describe smth callable with properties, we can write a call signature in an object type:

type DeclarableFunction = {
    description: string;
    (someArg: number): boolean;
};

function doSomething(fn: DeclarableFunction) {
    console.log(fn.description + " returned " + fn(6));

}

function myFunc(someArg: number) {
    return someArg > 3;
}

myFunc.description = "default description";

console.log(doSomething(myFunc));

// note that the syntax is slightly different compared to a fucntion type expression - use between the parameter list and the return type reather than => .

// construct signatures 

// js fucntions can also be invoked with the new operator.
// ts refers to these as constructors becausse they usually create a new object, you can write a constant signature by addig the new keyword in front of a call signature;
type SomeObject = any;

type SomeConstructor = {
    new(s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

// some object like Js's Date Objectm can be called with or without new. You can combine call and construct signatures in the same type arbitrarily;

interface CallOrConstruct {
    new(s: string): Date;
    (n?: number): string;
}

// generic functions
// it is common to write a function where the types of the input relate to the type of the output, or where the types pf two inputs are related in some way. let's consider for a moment a function that returns the first element of the array;

function firstElement(arr: any[]) {
    return arr[0];
}

// this function does it's job, but unfortunately has the return type any. it would be better if the function returned the type of the array element.

// in typescript generics are used when we want to describe a correspondence between two values. we do this by declaring a type paramenter in the function signature.

function firstElemnt1<Type>(arr: Type[]): Type | undefined {
    return arr[0]
};

// by adding a type parameter Type to this function ans using it in two places we have created a link between the inout of the function (the array) anf the output (return value). Now we call it a more specific type comes out:

// s is of type "string"
const s = firstElemnt1(["a", "b", "c"]);
console.log(s)

// n is of type "number"
const n = firstElemnt1([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElemnt1([])

// inference 
// note that we did not have to specify the Type in this sample/ The type was inferred - choosen automatically by typescript.

// we can use muliple type paramenters as well. for example, a standalone version of map would look like this:

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}

// parameter 'n' is of type 'string'
// 'parsed' is of type number[]
console.clear()
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed)

// constraints
// we have written some generic fucntions that can only work on any kind of value. sometimes we want to relate two values, but can only operate on a certain subset of values. In this case, we can use a constraint to limit the kind of types that type parameter can accept.

// let's write a function that returns the longer of two values. to do this, we need a length property that's a number. we constain the type paramenter to that type by writing a extends clause:

function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a.length;
    } else {
        return b.length;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray)
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString)
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);


// working with constrined values;

// here is a common error when working with generic constraints:

function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
): Type {
    if (obj.length > minimum) {
        return obj;
    } else {
        return { length: minimum }
    }
} /// It might look like this function is OK - Type is constrained to { length: number }, and the function either returns Type or a value matching that constraint. The problem is that the function promises to return the same kind of object as was passed in, not just some object matching the constraint. If this code were legal, you could write code that definitely wouldn’t work:

const arr = minimumLength([1, 2, 3], 6);
console.log(arr.slice(0)); // // and crashes here because arrays have
// a 'slice' method, but not the returned object!


// specifying type arguments 

//Ts can usualyy infer the intended type arguments in a generic call , but not always for example, let's say  you wrote fucntion to combine two arrays:
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2)
}


// normally it would eb an arror to call this fucntion with mismatched arrays
// const arrq = combine([1, 2, 3], ["hello"]); /// "string" is not assignable to type number 

// however if u intended to do this, however you could manually specify Type:
const arrq1 = combine<string | number>([1, 2, 3], ["hello"]);
console.log(arrq1)

// guidline for writing good generic functions

// writing generic functions is fun, and it can be easy to get carried away with type perameters. having to many type parameters or using constraints where they are not needed can make inference less successful, frusturating callers of yiur function.

// Push  type parameters downgrade
// >>>

function firstElementsim1<Type>(arr: Type[]) {
    return arr[0]
}

function firstElementsim2<Type extends any[]>(arr: Type) {
    return arr[0]
}

// a: number(good)
const a = firstElementsim1([1, 2, 3]);
// b: any ( bad )
const b = firstElementsim2([1, 2, 3])

// Rule: When possible, use the type parameter itself rather than constraining i

// here is another pair of similar fucntions:

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func)
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
): Type[] {
    return arr.filter(func)
}

// we have created a type parameter Func that does not relate two values. That's always s red flag. cuz it means callers wanting to specify type arguments have to manually specify an extra type argument for no reason. func does not do anything but maake the function harder to read and reason about.

// Rule: Alwaays use as few type paramenters as possible.

// type paramenters should appear twice:
// sometimes we forget that  a fucntion might not need to be a generic:
function greetOk<Str extends string>(s: Str) {
    console.log("Hello" + s)
}

console.log(greetOk("how?"))

// we could jsut write a simpler version
function verGreet(s: string) {
    console.log("Hello, " + s);
}

// Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

// Optional parameters

// fucntions in js often take  variable number of arguments, for ex, the toFixed method of Numbers takes a optional digit count: 

function f(n: number) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 argument
}

// we man model this in ts by marking the peremeter as optional with ?:

function f1(x?: number) {
    // ...
}

f1(); // ok
f1(10);// ok


// although the parameter is specified as type number, the x parameter will actua;;;y have te type number | undefined because unspecified parameters in JavaScript get the value undefined.

// you  can also provide a parameter defauls: 
function f2(x = 10) {
    // ...
}

// now in the body of f, x, will have type number bacausse any undefined argument will replace with 10. Note that when a parameter is optional, callers can always pass undefined, as this simply simulates a missing argument:

declare function f3(x?: number) : void;
    // cut 
    // all ok

    f3();
    f3(10);
    f3(undefined);


