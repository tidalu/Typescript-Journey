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
  

// extract and exclude
    
// extract
// it is useful for obtaining some sub-part of a type that is assignable to some other type


type FavoriteColors =
  | "dark sienna"
  | "van dyke brown"
  | "yellow ochre"
  | "sap green"
  | "titanium white"
  | "phthalo green"
  | "prussian blue"
  | "cadium yellow"
  | [number, number, number]
    | { red: number; green: number; blue: number }
  
type stringColors = Extract<FavoriteColors, string>
type numberArrays = Extract<FavoriteColors, number[]>
type objectTypes = Extract<FavoriteColors, { [key: string]: number }> // another way --> 
type ObjectColors = Extract<FavoriteColors, { red: number }>
type tupleColors = Extract<FavoriteColors, [number, number, number]>

// we are extracting in the buset of a type that is assignable to antoher specified type


// exclude
// it is just opposite of extract 

type NonStringColors = Exclude<FavoriteColors, string>

// how doe these work ,

// exclude in the bg
type Exclude<T, U> = T extends U ? never : T

// extract in the bg
type Extract<T, U> = T extends U ? T : never




// inference with conditional types

// infer keyword is used to access sub part of type onformation within a larger type


// infer keyword , which can only be used in the context of a condition expression (within conditional type declaration) is an imporetant tool for being able to extract out pience of type information from  other types



class WebpackCompiler {
  constructor(options: {
    amd?: false | { [index: string]: any }
    bail?: boolean
    cache?:
      | boolean
      | {
          maxGenerations?: number
          type: "memory"
        }

    context?: string
    dependencies?: string[]
    devtool?: string | false
    entry?: string
    chunkLoading?: string | false

    dependOn?: string | string[]
    layer?: null | string
    runtime?: string

    wasmLoading?: string | false

    externalsType?:
      | "var"
      | "module"
      | "assign"
      | "this"
      | "window"
      | "self"
      | "global"
      | "commonjs"
      | "commonjs2"
      | "commonjs-module"
      | "amd"
      | "amd-require"
      | "umd"
      | "umd2"
      | "jsonp"
      | "system"
      | "promise"
      | "import"
      | "script"

    ignoreWarnings?: (
      | RegExp
      | {
          file?: RegExp

          message?: RegExp

          module?: RegExp
        }
    )[]

    loader?: { [index: string]: any }
    mode?: "development" | "production" | "none"
    name?: string
    parallelism?: number
    profile?: boolean
    recordsInputPath?: string | false
    recordsOutputPath?: string | false
    recordsPath?: string | false
    stats?:
      | boolean
      | "none"
      | "summary"
      | "errors-only"
      | "errors-warnings"
      | "minimal"
      | "normal"
      | "detailed"
      | "verbose"

    target?: string | false | string[]

    watch?: boolean
  }) {}
}
/// ---cut---
type ConstructorArg<C> = C extends {
  new (arg: infer A, arg2: infer B, ...args: any[]): any
}
  ? [A, B]
  : never

class FruitStand {
  constructor(fruitNames: string[], ali: number[]) {}
}
// our simple example
let fruits: ConstructorArg<typeof FruitStand>
//      ^?
// our more realistic example
let compilerOptions: ConstructorArg<typeof WebpackCompiler>
//     ^?




// Indexed access type
// these kinds of types are all abbout accessing some part of another type via an index


interface Car {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}
 
let carColor: Car["color"]
let redColor: Car['color']['red']
let carProp: Car['color' | "year"]


// Mapped types
// powerful tool for transforming types


type Fruitr = {
  name: string
  color: string
  mass: number
}
 
type Dict<T> = { [k: string]: T } // <- index signature
 
const fruitCatalog: Dict<Fruitr> = {}
fruitCatalog.apple


// mapped type

type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruitr }

function printFruit(fruit: MyRecord) {
    fruit.apple
    fruit.cherry
    // fruit.lemon  // Property 'lemon' does not exist on type 'MyRecord'
}




type alse = {
  name: string
  color: string
  mass: number
}
type DDD<T> = { [k: string] : T}  // <<- index signature


const smthing: DDD<alse> = {}
smthing.apple 


// with mapped types

type DDDchanged = { [Fruitkey in "apple" | "cherry"]: alse }

//notice
// in keyword in the mapped types 
function printit(obj: DDDchanged) {
  obj.cherry
  obj.pii // there it does not accept rather than apple and cherry
}


// index signstures can be on all string s or all number s , but not some subset of strings or numbers:

type cantbe = { [key: "apple" | "olme"]: Fruit }



//Record
// if we make our type a bit more generalized with some type params instead of hardcoding fruit an aplle cherry as  shown below, we will arrive at a built-in type that comes with typescript

type Generalized<KeyType extends number, ValueType> = { [Key in KeyType]: ValueType }

// lets see

type MyRecords<KeyType extends string, ValueType> = {
  [Key in KeyType]: ValueType
}

//here is the built in ts type , whivh matches this pretty much exactly

/**
 * Construct a type with a set of properties K of the T
 */

type Record<K extends keyof any, T> = {
  [p in K]: T
}

//lets use this with index access types

type PartOFWindow = {
  [
    Key in 
    | "document"
    | "navigator"
    | "setTimeout"
  ] : Window[Key]
}

type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key]
}

// prettier-ignore
type PartOFWindow1 = PickWindowProperties<
  "document" | "navigator" | "setTimeout" | "setInterval"
  >


//let's generalize it one step further by allowing this type to work on anything, now just windwo. cuz this is no longer a type
// that exclusively works with Window , we will rename this type to pickupProperties

type PickupProperties< Keys extends keyof ValueType, ValueType> = {
  [Key in Keys] : ValueType[Key]
}

type Partly = PickupProperties<"document" | "navigator" | "setTimeout" | "setInterval", Window> // now it is done, can be used anywhere


// we have arrived another built in type Pick

/**
 * From T, pick a set of properties whose keys are in the union 
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}


// Mapping modifiers

// Folloing our analogy of mapped types feeling like "Looping over all keys", there are a couple of final things we can do to the properties as we create each type: set whether the value placed  there should be readonly and /or optional


/**
 * Make all properties in T optional 
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}
/**
 * Make all properties in T required
 */
type REquired<T> = {
  [P in keyof T]-?: T[P]
}
/**
 * Make all the properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
  // -readonly [P in keyof T]: T[P]
}


//Template literal types

type ArtF = 'cabin' | "tree" | "sunset"
type COlors = 
  | "darkSienna"
  | "sapGreen"
  | "titaniumWhite"
  | "prussianBlue"

type paintNames = `paint_${COlors}_${ArtF}`

// while simething "paint_darkSienna_cabin" could definetely be the name of a class method in js or ts, it is more convantional to use cameCase instead of snake_case
//  ts provides a few special types you can use within these template literal types

// UpperCase
// LowerCase
// Capitalize
// Uncapitilize

type ArtMEthodNames = `paint${Capitalize<COlors>}${Capitalize<ArtF>}`




// now the use of as keyword in the index signatures
interface DataState {
  digits: number[]
  names: string[]
  flags: Record<"darkMode" | "mobile", boolean>
}

type DataSDK = {
  // the mapped type 
  [K in keyof DataState as `set${Capitalize<K>}`]:
    (arg: DataState[K]) => void
}

function load(datasdk: DataSDK) {
  datasdk.setNames(['alif'])
  datasdk.setFlags({ darkMode: true, mobile: false })
  datasdk.setDigits([12, 2, 2, 3])
}


// filtering properties out

//  here is the example of using Extract and a template literal typt tp filter for onlu those member of window.document that begin with "query"

type DocKeys = Extract<keyof Document, `query${string}`>
type FilteredDocs = {
  [Key in DocKeys]: Document[Key]
}



// Get keys of type T whose values are assignable to type U
type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T] &
  keyof T

type RelevantDocumentKeys = FilteredKeys<
  Document,
  (...args: any[]) => Element | Element[]
>

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>
//    ^?

function loader(doc: ValueFilteredDoc) {
  doc.querySelector("input")
  
  //    ^?
}

//  typing a  data layer

class Book {
  constructor(public author: string, public title: string){}
}

class Movie {
  constructor(public director: string ){}
}

class Song {

  constructor(public artist: string ) { }
}
interface EntitlyMap {
  book: Book
  movie: Movie
  song: Song
}

class Store {
  constructor() {
    
  }

  get<Key extends keyof EntitlyMap>(kind: Key, id: string) : EntitlyMap[Key] {
    
  }

  getAll<Key extends keyof EntitlyMap>(kind: Key):EntitlyMap[Key][] { }
  
  create<Key extends keyof EntitlyMap>(kind: Key, toCreate: EntitlyMap[Key]): void { }
  update<Key extends keyof EntitlyMap>(kind: Key, id: string, props: Partial<EntitlyMap[Key]>) { }
}