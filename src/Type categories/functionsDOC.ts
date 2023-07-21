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


// optional parameters in callback

// common mistakes 

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for(let i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
}

// what people usually intend when writing index? as an optional paramenter is that they want both of these calls to be legal 
 myForEach([1,2, "string"], (a) => console.log(a))
 myForEach([1,2, "string"], (a, i) => console.log(a, i))

 // what is actually means is that callback might get invoked with one argument. in other words, the function definition says that in the implementation might looj like this: 
 function myForEach1(arr: any[], callback: (arg: any, index?: number) => void ) {
    for (let i = 0; i < arr.length; i++ ) {
        // I do not feel like providing the index today
        callback(arr[i]);
    }
 }

 // in turn Ts will enforce this meaning and issue errors that are bit really possible 
 myForEach1([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
});

// In JavaScript, if you call a function with more arguments than there are parameters, the extra arguments are simply ignored. TypeScript behaves the same way. Functions with fewer parameters (of the same types) can always take the place of functions with more parameters.

// Rule: when writing a fucntion type for a callback, never write an optional paramenter unless u intend to call the function without passing that argument


// Function Overloads

// Some JavaScript functions can be called in a variety of argument counts and types. For example, you might write a function to produce a Date that takes either a timestamp (one argument) or a month/day/year specification (three arguments).

// In TypeScript, we can specify a function that can be called in different ways by writing overload signatures. To do this, write some number of function signatures (usually two or more), followed by the body of the function:

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d? : number, y?: number ): Date {
    if(d !== undefined && y!== undefined )  {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// In this example, we wrote two overloads: one accepting one argument, and another accepting three arguments. These first two signatures are called the overload signatures.

// Then, we wrote a function implementation with a compatible signature. Functions have an implementation signature, but this signature can’t be called directly. Even though we wrote a function with two optional parameters after the required one, it can’t be called with two parameters!

// overload signatures and the implementation signatures 

// this is common source of confusion. often people will write code like this and not understand why theer is an arror:

function fn5(x: string): void;
function fn5() {
  // ...
}
// Expected to be able to call with zero arguments
fn5();


// again the signature used to write the fucntion body cannot be seen from the outside

// signature of the implementation is  not isible from the outside. When writing an overloaded fucntion, you should always have two or more signatures above the implementation of the function.

// The implementation signature must also be compatible with the overload signature. for example. These functiona have erorr because the implementations signature does not match the overloads in a correct way: 


function fnn(x: boolean) : void;
// argument type is not right
function fnn(x: string): void;
function fnn(x: boolean) {}

///

function f12(x: string): string;
// return type is not right;
function f12(x: number): boolean;
function f12(x: string | number) {
    return "oops"
}


// writing good overloads
// like generics, ther are a few guidlines you should know when using function overloads. folllowing these principles will make you function easier to call. easier to understand, and easier to implement.
// Let’s consider a function that returns the length of a string or an array:

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
    return x.length;
}
// This function is fine; we can invoke it with strings or arrays. However, we can’t invoke it with a value that might be a string or an array, because TypeScript can only resolve a function call to a single overload:
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);


// because both overloads have the same argument counmt , same return type, we can instead write non-overloaded version of the function: 

function len1(x: any[] | string) {
    return x.length;
}

// Always prefer parameters with union types instead of overloads when possible

// declaring this in a function
// typescript will infer what the this should be in a fucntion via code flow analysis, for example in the following:
const user = {
    id: 123, 

    admin: false, 
    becomeAdmin: function () {
        this.admin = true;
    },
};

// TypeScript understands that the function user.becomeAdmin has a corresponding this which is the outer object user. this, heh, can be enough for a lot of cases, but there are a lot of cases where you need more control over what object this represents. The JavaScript specification states that you cannot have a parameter called this, and so TypeScript uses that syntax space to let you declare the type for this in the function body.

// User interface
interface User {
  name: string;
  isAdmin: boolean;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

function getDB(): DB {
  const users: User[] = [
    { name: 'Alice', isAdmin: false },
    { name: 'Bob', isAdmin: true },
    { name: 'Charlie', isAdmin: true },
    { name: 'David', isAdmin: false },
  ];

  return {
    filterUsers: function (filter: (this: User) => boolean): User[] {
      return users.filter(filter);
    },
  };
}

const db = getDB();

// Filtering admins
const admins = db.filterUsers(function (this: User) {
  return this.isAdmin;
});
// this pattent is commn with callback-style APIs, where another object type constrols when you function is called . Note that you need to use function and not arrow functions to get t this behavior
interface DB1 {
    filterUsers(filter:(this: User) => boolean): User[];
}
const db1 = getDB();
const admins1 = db.filterUsers(() => this.admin);

// other types to know about 

// ther are some additional types you will want to recognize that appear often when working with function types. like al types, you can use them everywhere butthese are especially relevant in the context of the functions.

// void 

// void represents the return value of the functions which do not return a value: it is the inferred type any time a function does not have any return statements, or does not return any explicit value from those return statemets: 

// the inferred return type is void 
function noop() {
    return;
}
// void is not the same thing as undefined

// Object

// the special value refers to any value the is not primitve (string, number, bigint, boolean, symbol, null, or undefined). this is different from the empty object type {}, and also different from the gloval Object. It is very likely you  will never Use Object.
// !!! object is not Object alwats use object!!!

// Note that in JavaScript, function values are objects: They have properties, have Object.prototype in their prototype chain, are instanceof Object, you can call Object.keys on them, and so on. For this reason, function types are considered to be objects in TypeScript.

// unknown
// the unknown type represents any value. this si similar to any type , but is safer because it is not legal to do anything with unknown value:

function f111(a: any) {
    a.b(); // ok
}
function f2(a: unknown) {
  a.b();
}

// this is useful when describing function types becauase you can describe functions that accpet any value without having any values in your function body.

// conversely, you can describe a function that returns a value of unknown type:

function safeParse(s: string): unknown {
    return JSON.parse(s)
}

// need to be careful with 'obj'
const obj = safeParse("ala ald ld sa");

// never 

/// some functions never return a value :
function fail(msg: string): never {
    throw new Error(msg);
}

// The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.

// never also appears when TypeScript determines there’s nothing left in a union.

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}


// function 

// the global type Function descrobes properties like bind, call, apply, and others present on all function values in js. It also has special property that values of type Function can always be called; these calls return any:

function doSomething1(f: Function) {
    return f(1, 2, 3);
}

// /This is an untyped function call and is generally best avoided because of the unsafe any return type.

// If you need to accept an arbitrary function but don’t intend to call it, the type () => void is generally safer

// rest parameters and arguments 

// rest paramenters 

// In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts, we can also define functions that take an unbounded number of arguments using rest parameters.

// A rest parameter appears after all other parameters, and uses the ... syntax:

function multiplyer(n: number, ...m: number[]) {
    return m.map((x) => n*x)
}
// 'a' gets value [10, 20, 30, 40];
const a = multiplyer(10, 1, 2, 3, 4)

// In TypeScript, the type annotation on these parameters is implicitly any[] instead of any, and any type annotation given must be of the form Array<T> or T[], or a tuple Type


// rest Arguments
//Conversely, we can provide a variable number of arguments from an iterable object (for example, an array) using the spread syntax. For example, the push method of arrays takes any number of arguments:


const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// Note that in general, TypeScript does not assume that arrays are immutable. This can lead to some surprising behavior:

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);

// The best fix for this situation depends a bit on your code, but in general a const context is the most straightforward solution:
// Inferred as 2-length tuple
const args1 = [8, 5] as const;
// OK
const angle1 = Math.atan2(...args1);


// paramenter deconstructing; -->>>>>>>>>>>>>>>>>>>>>>->>>>>>>>>>