// typescript is looks awesome
// function type expressions
// the simple way to describe a function is with a function type expression. these types are sytactically similar to arrow functions;
function greeter(fn) {
    fn("Hello world!");
}
function printToConcole(s) {
    console.log(s);
}
greeter(printToConcole);
function greeter1(fn) {
    // ...
}
function doSomething(fn) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "default description";
console.log(doSomething(myFunc));
function fn(ctor) {
    return new ctor("hello");
}
// generic functions
// it is common to write a function where the types of the input relate to the type of the output, or where the types pf two inputs are related in some way. let's consider for a moment a function that returns the first element of the array;
function firstElement(arr) {
    return arr[0];
}
// this function does it's job, but unfortunately has the return type any. it would be better if the function returned the type of the array element.
// in typescript generics are used when we want to describe a correspondence between two values. we do this by declaring a type paramenter in the function signature.
function firstElemnt1(arr) {
    return arr[0];
}
;
// by adding a type parameter Type to this function ans using it in two places we have created a link between the inout of the function (the array) anf the output (return value). Now we call it a more specific type comes out:
// s is of type "string"
const s = firstElemnt1(["a", "b", "c"]);
console.log(s);
// n is of type "number"
const n = firstElemnt1([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElemnt1([]);
// inference 
// note that we did not have to specify the Type in this sample/ The type was inferred - choosen automatically by typescript.
// we can use muliple type paramenters as well. for example, a standalone version of map would look like this:
function map(arr, func) {
    return arr.map(func);
}
// parameter 'n' is of type 'string'
// 'parsed' is of type number[]
console.clear();
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);
// constraints
// we have written some generic fucntions that can only work on any kind of value. sometimes we want to relate two values, but can only operate on a certain subset of values. In this case, we can use a constraint to limit the kind of types that type parameter can accept.
// let's write a function that returns the longer of two values. to do this, we need a length property that's a number. we constain the type paramenter to that type by writing a extends clause:
function longest(a, b) {
    if (a.length >= b.length) {
        return a.length;
    }
    else {
        return b.length;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString);
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
// working with constrined values;
// here is a common error when working with generic constraints:
function minimumLength(obj, minimum) {
    if (obj.length > minimum) {
        return obj;
    }
    else {
        return { length: minimum };
    }
} /// It might look like this function is OK - Type is constrained to { length: number }, and the function either returns Type or a value matching that constraint. The problem is that the function promises to return the same kind of object as was passed in, not just some object matching the constraint. If this code were legal, you could write code that definitely wouldn’t work:
const arr = minimumLength([1, 2, 3], 6);
console.log(arr.slice(0)); // // and crashes here because arrays have
// a 'slice' method, but not the returned object!
// specifying type arguments 
//Ts can usualyy infer the intended type arguments in a generic call , but not always for example, let's say  you wrote fucntion to combine two arrays:
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
// normally it would eb an arror to call this fucntion with mismatched arrays
// const arrq = combine([1, 2, 3], ["hello"]); /// "string" is not assignable to type number 
// however if u intended to do this, however you could manually specify Type:
const arrq1 = combine([1, 2, 3], ["hello"]);
console.log(arrq1);
// guidline for writing good generic functions
// writing generic functions is fun, and it can be easy to get carried away with type perameters. having to many type parameters or using constraints where they are not needed can make inference less successful, frusturating callers of yiur function.
// Push  type parameters downgrade
// >>>
function firstElementsim1(arr) {
    return arr[0];
}
function firstElementsim2(arr) {
    return arr[0];
}
// a: number(good)
const a = firstElementsim1([1, 2, 3]);
// b: any ( bad )
const b = firstElementsim2([1, 2, 3]);
// Rule: When possible, use the type parameter itself rather than constraining i
// here is another pair of similar fucntions:
function filter1(arr, func) {
    return arr.filter(func);
}
function filter2(arr, func) {
    return arr.filter(func);
}
// we have created a type parameter Func that does not relate two values. That's always s red flag. cuz it means callers wanting to specify type arguments have to manually specify an extra type argument for no reason. func does not do anything but maake the function harder to read and reason about.
// Rule: Alwaays use as few type paramenters as possible.
// type paramenters should appear twice:
// sometimes we forget that  a fucntion might not need to be a generic:
function greetOk(s) {
    console.log("Hello" + s);
}
console.log(greetOk("how?"));
// we could jsut write a simpler version
function verGreet(s) {
    console.log("Hello, " + s);
}
// Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it
// Optional parameters
// fucntions in js often take  variable number of arguments, for ex, the toFixed method of Numbers takes a optional digit count: 
function f(n) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 argument
}
// we man model this in ts by marking the peremeter as optional with ?:
function f1(x) {
    // ...
}
f1(); // ok
f1(10); // ok
// although the parameter is specified as type number, the x parameter will actua;;;y have te type number | undefined because unspecified parameters in JavaScript get the value undefined.
// you  can also provide a parameter defauls: 
function f2(x = 10) {
    // ...
}
// cut 
// all ok
f3();
f3(10);
f3(undefined);
// optional parameters in callback
// common mistakes 
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
// what people usually intend when writing index? as an optional paramenter is that they want both of these calls to be legal 
myForEach([1, 2, "string"], (a) => console.log(a));
myForEach([1, 2, "string"], (a, i) => console.log(a, i));
// what is actually means is that callback might get invoked with one argument. in other words, the function definition says that in the implementation might looj like this: 
function myForEach1(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        // I do not feel like providing the index today
        callback(arr[i]);
    }
}
// in turn Ts will enforce this meaning and issue errors that are bit really possible 
myForEach1([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
});
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
function fn5() {
    // ...
}
// Expected to be able to call with zero arguments
fn5();
function fnn(x) { }
function f12(x) {
    return "oops";
}
function len(x) {
    return x.length;
}
// This function is fine; we can invoke it with strings or arrays. However, we can’t invoke it with a value that might be a string or an array, because TypeScript can only resolve a function call to a single overload:
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
// because both overloads have the same argument counmt , same return type, we can instead write non-overloaded version of the function: 
function len1(x) {
    return x.length;
}
// Always prefer parameters with union types instead of overloads when possible
declaring;
this in a;
// typescript will infer what the this should be in a fucntion via code flow analysis, for example in the following:
const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};
function getDB() {
    const users = [
        { name: 'Alice', isAdmin: false },
        { name: 'Bob', isAdmin: true },
        { name: 'Charlie', isAdmin: true },
        { name: 'David', isAdmin: false },
    ];
    return {
        filterUsers: function (filter) {
            return users.filter(filter);
        },
    };
}
const db = getDB();
// Filtering admins
const admins = db.filterUsers(function () {
    return this.isAdmin;
});
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
function f111(a) {
    a.b(); // ok
}
function f2(a) {
    a.b();
}
// this is useful when describing function types becauase you can describe functions that accpet any value without having any values in your function body.
// conversely, you can describe a function that returns a value of unknown type:
function safeParse(s) {
    return JSON.parse(s);
}
// need to be careful with 'obj'
const obj = safeParse("ala ald ld sa");
// never 
/// some functions never return a value :
function fail(msg) {
    throw new Error(msg);
}
// The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.
// never also appears when TypeScript determines there’s nothing left in a union.
function fn(x) {
    if (typeof x === "string") {
        // do something
    }
    else if (typeof x === "number") {
        // do something else
    }
    else {
        x; // has type 'never'!
    }
}
// function 
// the global type Function descrobes properties like bind, call, apply, and others present on all function values in js. It also has special property that values of type Function can always be called; these calls return any:
function doSomething1(f) {
    return f(1, 2, 3);
}
// /This is an untyped function call and is generally best avoided because of the unsafe any return type.
// If you need to accept an arbitrary function but don’t intend to call it, the type () => void is generally safer
// rest parameters and arguments 
// rest paramenters 
// In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts, we can also define functions that take an unbounded number of arguments using rest parameters.
// A rest parameter appears after all other parameters, and uses the ... syntax:
function multiplyer(n, ...m) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40];
const a = multiplyer(10, 1, 2, 3, 4);
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
const args1 = [8, 5];
// OK
const angle1 = Math.atan2(...args1);
// paramenter deconstructing; -->>>>>>>>>>>>>>>>>>>>>>->>>>>>>>>>
// you can use paramenter too cconvenient unpack objects provided as an agrument into one or more local variables in the functions body. In js, it looks like this:
function sum({ a, b, c }) {
    console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
// the type annotation for the objects goes after the destucting syntax: 
function sum1({ a, b, c }) {
    return (a + b + c);
}
function sum3({ a, b, c }) {
    console.log(a + b + c);
}
const f1 = () => {
    return true;
};
const f2 = () => true;
const f3 = function () {
    return true;
};
// and when the return value of one of these functions is assigned to another variable, it will retain the type of void: 
const v1 = f1();
const v2 = f2();
const v3 = f3();
// this behavior exists so that the follwing code is valid even though Arra.prototype.push returns a number and the Array.prototype.forEach method expects a fucntions with a return type of void.
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));
// this is one special case to be avare of, when a literal functions definition has a void return type, that fucntion must not return anything.
function f4() {
    // @ts-expect-error
    return true;
}
const f5 = function () {
    // @ts-expect-error
    return true;
};
