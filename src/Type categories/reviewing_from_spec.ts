// every  error is on purpose
import express from "express"
const app = express()

app.get("/", function (req, res) {
    res.send
});
console.log(app.listen(3000))

console.clear()
console.log(fn(25))

function fn(x: number): number {
    return Math.pow(x, 2)
}

const user = {
    name: "Daniel",
    age: 26,
}

user.location; // Property 'location' does not exist on type '{ name: string; age: number; }'
console.log(1)

const announcement = "Hello World!";

// How quickly can you spot the typos?
// announcement.toLocaleLowercase();
// announcement.toLocalLowerCase();

// We probably meant to write this...
announcement.toLocaleLowerCase();

function flipCoin() {
    // Meant to be Math.random()
    return Math.random() < 0.5;
}

console.log(flipCoin())
console.clear()
console.log("Hello World");



function greet(person: string, date: Date) {
    return `Hello ${person}, today is ${date.toDateString()}!`
}

console.log(greet("Breden", new Date()))


// we do not need to wrrite always explicitly type annotations,

let msg = "we can simple assign, it assumes that it is string"


// erased types 

"use strict"

function greet1(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"))
}

greet1("Maddison", new Date())


    // remeber : type annotations never change the runtime behavior of our program


    // Downleveling

    `Hello ${person}, today is ${date.toDateString()}!`;


// everyday types 

// primitives: string, number, and boolean


// Arrays
// to specify the type of an array like [1, 2, 3], you can use the syntax number[]; this syntax fors for any type (e.g. string[] is an array of strings, and so on), u may have seen like Array<number>, which means the same thing. we will leran more about the syntax T<U> when we cover Generics

// [number] is a different thing, look at Tuples 

// any
// use the to avoid typeschecking

let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed 
// you know the environment better than TypeScript.
// obj.foo()
// obj()
obj.bar = 100;
obj = "Hello";
const n: number = obj;
console.log(obj)

// noImplicitAny

// When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.

// You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.


// type annotations on variable->

// when we declare a variable using const, var, let we can optionally add a type annotation to explicitly specify the type of te variable 
let myName: string = "Alice"
// typeScript does not use "Types on the left" - style declaration like int x= 0; type annotations will always go after the thing being Typed

// In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

// No type annotation needed -- 'myName' inferred as type 'string'
let myNameAuto = "Alice";


// functions => 
// Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

// parameter type annotations
function hello(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!")
}

hello("Azam")


// Return type annotations
function getFavoriteNumber(): number {
    return 26;
}

// anonymous functions
const names = ["Alice", "45", "Bob", "Eve"]

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase())
})
// Even though the parameter s didn’t have a type annotation, TypeScript used the types of the forEach function, along with the inferred type of the array, to determine the type s will have.
// This process is called contextual typing because the context that the function occurred within informs what type it should have.

// Object types

// the parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 })

// Optional properties
//object types can also specify that some or all of their properties are optional. to do this add a ? after the property name

function printName(obj: { first: string; last?: string }) {
    // ...
}

// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });


// in javascript if u access a property that does not exist , u will get the value undefined rather than a runtime error. cuz pf this when you read an optional  property, u will have to check for undefined before using it.

function printName1(obj: { first: string, last?: string }) {
    // Error -might crash if obj.last was not provided!
    console.log(obj.last.toUpperCase())// it is saying obj.last is possibly undefined
    // so
    if (obj.last !== undefined) {
        // OK THIS TIMEOUT
        console.log(obj.last.toUpperCase())
    }

    // A safe alternative using modern Javascript syntax:
    console.log(obj.last?.toUpperCase());
}

// union types 

// Typescript's type system allows you build new types out of existing ones a large variety if operators. Nopw that we know how to write a few types, it is time to start combining then in interesting ways.

// defining a union type

function printId(id: number | string) {
    console.log("Your id is : " + id);
}

// ok
printId(120);
//ok 
printId("202");
// Error cuz it is not type what we have expected
printId({ myId: 22342 }); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

// working with union types

function printId1(id: number | string) {
    console.log(id.toUpperCase())
    // Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.
}

function printId2(id: number | string) {
    if (typeof id === "string") {
        // in this brach, id is of type "string"
        console.log(id.toUpperCase())
    } else {
        // here id is of type "number"
        console.log(id)
    }
}



// another exaple is to use a functionlike Array.isArray;
function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        // here: x is string[]
        console.log("Hello, " + x.join(" and "));
    } else {
        // here: x is string
        console.log("welcome lone traveler " + x);
    }
}
// this thing called narrowing, Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a slice method. If every member in a union has a property in common, you can use that property without narrowing: 
// return type si inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}


// Type Aliases

// We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

// A type alias is exactly that - a name for any type. The syntax for a type alias is:

type Point = {
    x: number;
    y: number;
}

// exactly the same as the earlier example 
function printSmth(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
console.clear()
printSmth({ x: 100, y: 200 })

// we can actually use a type alies to give a name to any type at all, not just an object type, ex. a type aliases can name a union type:
type ID = number | string;


type UserINputSanitizedString = string;
function sanitizeInput(str: string): UserINputSanitizedString {
    // return sanitize(str)
}

//  create a sanitized input 
// let userIput = sanitizeInput(getInput());

// can still be reassigned with a string though
// userIput = "new input"

// INTERFACES 

// an interface decalaration is another wat to name an object type 

interface Point1 {
    x: number;
    y: number;
}

function print3(pt: Point1) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

print3({ x: 100, y: 300 })

// the difference between type aliases and interfacese

//  type aliases  and interfaces are very similar, and in many cases you can choose between 
// then freely, almost all features of an interface are available in type, the key distinction is that a type cannot be reopened  to add new properties vs an interface which is always extendable .

// extending an interface
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

function getBear(): Bear {
    return {
        name: "Brown Bear",
        honey: true,
    };
}

const bear = getBear();
bear.name;
bear.honey;


//  extending a type via intersection

type Animal2 = {
    name: string;
}

type Bear2 = Animal & {
    honey: boolean;
}
function getBear2(): Bear2 {
    return {
        name: "Brown Bear",
        honey: true
    }
}
const bear1 = getBear();
bear1.name;
bear1.honey;

//--------------------------------------------

// adding a new field to an existing interface 

interface Window {
    title: string;
}

interface TypeScriptAPI {
    // Define the methods and properties of your TypeScript API here
    getVersion(): string;
    setTitle(title: string): void;
}

interface Window {
    ty: TypeScriptAPI;
}


// A type cannot be changed after being created 

type Window1 = {
    title: string
}

type Window1 = {
    ts: TypeScriptAPI;

}// Error: duplicate identifier 'Window1'


// Type assersion

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
//Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

// You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

// const myCanvas1 = <HTMLCanvasElement>document.getElementById("main_canvas"); // this line is also valid but to make it work u should install react;

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:
const x = "hello" as number;

// Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:

const a = (expr as any) as T;

// Literal Types

let changingString = "Hello Workers!"
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

const constantString = "ellipse";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

// by themselves , literal types are not very valuable 

let z: "hello" = "hello";
// ok
z = "hello";
// ...
z = "howdy" // type "Howdy" is not assignable to type hello;

// It’s not much use to have a variable that can only have one value!

// But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}

printText("hello", "left")
printText("G'day, Mate!", "centre");


// Numberic literal types work the same way:
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

// of course you can combine them with non literal types :

interface Options {
    width: number;
}
function configure(x: Options | "auto") {
    // ...
}

configure({ width: 100 });
configure("auto");
configure("automatic");

// There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types true and false. The type boolean itself is actually just an alias for the union true | false.

// till literal interface
