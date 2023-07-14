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