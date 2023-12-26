//

// declaration merging 
interface Fruit {
    name: string
    mass: number
    color: string 
}

const Abanan: Fruit = {
    name: "banana", 
    color: "yellow", 
    mass: 123
}

// we can stack multiple things on top of each other , like :

interface Game {
    players: number
    place: string
}

const Game = {
    players: 2, 
    place: "open air"
}

export { Game }  // here it is two things satcked on top of each other  type alias, and a thing

// there is actualy tihrd thing to stack on it



class Anime {
    static createBanana(): Anime {
        return { name: "smth", color: "yellow", count: 123}
    }
}

namespace Anime {
    function createBanana(): Anime {
        // the type 
        return Anime.createBanana() // the class
    }
}

interface Anime {
    name: string
    color: string 
    count: number
}

export { Anime }
// in the thing above , we have one identifier that is three thing in one,
// a value (class)
// a type
// a namespace


/// read about namespaces
//
//
//

// class

class FFF {
    name?: string 
    mass?: number 
    color?: string
    static createSmth(): FFF { // here we are creating FFF interface along with class
        return { name: "bbb", color: "FFF", mass: 34}
    }
}

const valuetest = FFF
valuetest.createSmth // so here were suing the class itself not the instance that is why we are able to use call apply bind 

// how to test for a type 
let typeTest: FFF = {}
// there are using it as interface it is possible with declaration merging



// modules %%%%% CJS( common js)

// impoort and export modules

// named imports 
import { strawberry, raspberry } from "./berries"
import kiwi from "./kiwi"  // defaul inport 
export function makeFruitSalad() { } // named export 
export default class FruitBasket { } // default export 
export { lemon, lime } from "./citrus"

// although it is not very common in js world, it is possible to
//import an entire module as a namespace.Typescript Supports that as well

import * as allBerries from "./berries" // namespace import 
allBerries.strawberry // using the namespace
allBerries.blueBerry
allBerries.raspberry
export * from "./berries" // namespace re-export


// Common Js interop

// most of the tome, you can just convert somthing like 
const fs = require("fs")

// we can do that just like this

import * as fs1 from "fs"  // namespace import



// 
  ////////////////////////////////////////////////////////
// @filename: fruits.ts
function createBanana1() {
  return { name: "banana", color: "yellow", mass: 183 }
}
 
// equivalent to CJS `module.exports = createBanana`
// export = createBanana1

////////////////////////////////////////////////////////

// @filename: smoothie.ts
 
// import createBanana = require("./index")
const banana = createBanana1()


// importing non-TS things

// particulary if we use a bundler like webpack , parcel or snowpack, you may end up importing things are not .js or .ts files

import img from './img.jpeg' // Cannot find module './img.jpeg' or its corresponding type declarations

// img.jpeg  is obviously not a ts file, we just need to tell tss that whenever we
//import a.jpeg file, it should be treated as if it is a js moduel with a string valus
// its default export

// see global.d.ts for export

// import

import img1 from './img.jpeg'




// type queries

// keyof
// keyof type query allows us to obtain type representing all property keys on a given interface

type DatePropertyNames = keyof Date

// not all the keys are strings , so we can separete out those keys that are symbbol and those that are strings using the intersection operator &
// lets get sub partt of those 
type DatePropertyNamesString = DatePropertyNames & string 
type DatePropertyNamesSymbol = DatePropertyNames & symbol 




// typeof

// the typeif type query allows you to extract a tyoe from a value . An example is shown below

async function main() {
    const apiResponse = await Promise.all([
        fetch('https://example.com'), 
        Promise.resolve("Titanium White")
    ])

    type ApiResponseType = typeof apiResponse
}



// a common use of typeof is to obtain a type representing the "static site " of a class (meanign :
// constructor , static, properties, and other things not present on an instance of the class )

class Thing {
    constructor(
        public readonly name: string, 
        public readonly mass: number, 
        public readonly color: string 
    ) { }
    
    static createThing(name: string, mass: number, color: string ) { return new Thing(name, mass, color)}
}

const thing = Thing
const another = thing.createThing("banna", 123, "red")

// deff of the static : you can use the static keyword to define static class members, including properties. A static property is a property that is shared across all instances of a class, and can be accessed without creating an instance of the class.
// let me explain the static , it is a property thihc can be accessed without creating the instance of the class, class itself has an access



// conditional types
// ternary operators with values
    
class Grill {
    startGas() { }
    stopGas() { }
}

class Oven {
    setTemperature( degrees: number) {}
}

type Cooking<T> = T extends "grill" ? Grill : Oven;

let device1: Cooking<"grill"> = new Grill();
device1.startGas();
let device2: Cooking<"oven"> = new Oven();

// conditional types practise :

// condition
// 1	64 extends number; // true
// 2	number extends 64 // false
// 3	string[] extends any // true
// 4	string[] extends any[] // true
// 5	never extends any // true
// 6	any extends any // true
// 7	Date extends {new (...args: any[]): any } // false
// 8	(typeof Date) extends {new (...args: any[]): any } // true


type answer_1 = 64 extends number ? true : false
//     ^?
type answer_2 = number extends 64 ? true : false
//     ^?
type answer_3 = string[] extends any ? true : false
//     ^?
type answer_4 = string[] extends any[] ? true : false
//     ^?
type answer_5 = never extends any ? true : false
//     ^?
type answer_6 = any extends any ? true : false
//     ^?
// prettier-ignore
type answer_7 = Date extends { new (...args: any[]): any }
//     ^?
  ?  true
  : false
// prettier-ignore
type answer_8 = typeof Date extends { new (...args: any[]): any }
//     ^?
  ?  true
  : false