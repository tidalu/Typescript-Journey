let age = 6;
const gea = 6;


const RANDOM_WAIT_TIME =
  Math.round(Math.random() * 500) + 500

let startTime = new Date()
let endTime
//    ^?

setTimeout(() => {
  endTime = 0
  endTime = new Date()
}, RANDOM_WAIT_TIME)


function ad(a: number, b: number) : number {
  return a + b
}

const ressie = ad(4, 3)


// Objects

var car: {
  make: string
  model: string
  year: number
  chargeVoltage ?: number
} = {
  make: "car", 
  model: "toyota", 
  year: 2023, 
  chargeVoltage: 23
}

function printCar22(car: {
  make: string
  model: string
  year: number
  chargeVoltage ?: number
}) : number {
  let srt = `${car.make} ${car.model} (${car.year})`

  car.chargeVoltage

  if (typeof car.chargeVoltage !== "undefined") 
    srt += `// ${car.chargeVoltage}v`

  return 7
}

// we could have a condition where extra property added to the object

printCar22({
  make: 'string',
  model: 'string',
  year: 5465,
  chargeVoltage: 666,
  // color: "red" , // <--- extra property 
})

// like this above , any why, it does not break our code, the reaso is that there is no
// way to acces  that property in the code that is why ts shows it as an arror
// there is three ways to colve this issue

// first  : remove the property
//second: add to the object that property as optionale or regular according to your
//condition
// third way : to make object literal, in that case such extra properies will be accessable and somehow somebdy will use , and never makes us an error

// index signatures
const phonesfff: {
  [key: string]: {
    country: string
    area: string
    number: string
  } | undefined
} = {
  home: { country: "+1", area: "211", number: "652-4515" },
  work: { country: "+1", area: "670", number: "752-5856" },
  fax: { country: "+1", area: "322", number: "525-4357" },
}


// array types

const file = ["js", "ts"]

const array: {
  make: string
  model: string
  year: number
  chargeVoltage ?: number
}[] = [
    {
      make: 'string',
      model: 'string',
      year: 5465,
      chargeVoltage: 666,
  }

  ]


// tuples
  
let myCar111 = [2002, "toy", "corola"]

const [year11, make11, model11] = myCar111


// w should explicitly make tuple typed

let myCar1111: [number, string, string] = [
  2002, 
  "t", 
  "y"
]

// if we mix next time up everything , we will get error
// myCar1111 = ['h', 4, 't'] // like this


// we do have limitations

// like  while declaring the tuple 
const myP: [number, number] = [3, 6] // [5, 4, 6]  we cannot give many items. but

myP.push(2) // we can add more ts does not care yet

// so we do have this

const mp: readonly [number, number] = [5, 6]
// mp.push(5) // there we are not able to edit the tuple rather than readonly


// union types

function flipCoin23(): "heads" | "tails" {
  if (Math.random() > .5) return "heads"
  return "tails"
}

function maybeGetUserInfo23() : 
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (flipCoin23() === "heads") {
    return [
      "success", 
      {
        name: "alif", email: "edu"
      }
      ]
  } else {
    return [
      "error", 
      new Error(" the coin landed on Tails :(")
    ]
    }
  }


const outcome22 = maybeGetUserInfo23()
// working with union types
  
let [first22, second22] = outcome22

first22

second22


// narrowing

if (second22 instanceof Error) {
  second22 // in this cond, it is Error
} else {
  second22 // in this cond it is obj
}


// discriminated unions

if (outcome22[0] == "error") {
  outcome22
} else {
  outcome22
}


// intersections types 
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7 // 1w in ms
/// ---cut---
function makeWeek1(): Date & { end: Date } {
  //⬅ return type

  const start = new Date()
  const end = new Date(start.valueOf() + ONE_WEEK)

  return { ...start, end } // kind of Object.assign
}

const thisWeek1 = makeWeek1()
thisWeek.toISOString()
//   ^?
thisWeek.end.toISOString()
//        ^?


// type aliases
type meaningfullName = {
  name: string
  email: string
}

function rpCon(info: meaningfullName) {
  console.log(info.name)
  console.log(info.email)

}



// inheritance

// we can create type aliases that combine existing type with new behaviour by using intersection(&) types

type specialDate = Date & { getReason(): string }

const newYear: specialDate = {
  ...new Date(), 
  getReason: () => "Last day of the year"
}

newYear.getReason


// interfacess

// it is more limited than type aliases, where we are only able to define object types . An "object type" can be thought of as "an instance of a class could conceivably look like this"

interface User3 {
  name: string
  email: string
}

function printUserss(info: User3) {
  info.name 
}


// inheritance
// extends

class Animal2 {
  eat(food) {
    consumeFood(food)
  }
}

class Dogg extends Animal2 {
  bark() {
    return "woof"
  }
}

const it = new Dogg()

it.eat("e")
it.bark()

// interface can extends from other interfaces

interface anil {
  isAlive(): boolean
}

interface mammal extends anil {
  getColor(): string
}

interface doog extends mammal {
  getBreed(): string 
}

const usery: doog = {
  isAlive: () => true, 
  getColor: () => "yellow", 
  getBreed: () => "hola"
}


// implements :
// typescript adds a second heritage clause that can be used state that a given classs should produce instance that confirm to a given interface

interface animalLike {
  eat(food): void
}

class Dooog implements animalLike { // what implements does is it requires the DOog to havbe all the methods to have in all instances of the class , like now if we do not write eat it requires the eat to have it 
  bark() {
    return "woof"
  }
  eat(food: any): void {
    consumeFood(food)
  }

  isAlive(): void {  // iti si added after writing the line 318 
    
  }
}


// we can redeclare interfaces with the same name, but types not 
interface animalLike {
   isAlive() : void
}
 

// recursion

;[3, 4, [5, 6, [7], 56], 554]

type Nested = number | Nested[]

const va2l: Nested = [3, 4, [5, 6, [7], 56], 554]
if (typeof va2l !== 'number') {
  va2l.push(34)
}



// problem 
// @errors: 2578

type Primitive = string | number | boolean | null 
type JSONObject = { [key : string ] : JSONValue}
type JSONArray = JSONValue[]
type JSONValue = Primitive | JSONArray | JSONObject

////// DO NOT EDIT ANY CODE BELOW THIS LINE //////
function isJSON(arg: JSONValue) {}

// POSITIVE test cases (must pass)
isJSON("hello")
isJSON([4, 8, 15, 16, 23, 42])
isJSON({ greeting: "hello" })
isJSON(false)
isJSON(true)
isJSON(null)
isJSON({ a: { b: [2, 3, "foo"] } })

// NEGATIVE test cases (must fail)
// @ts-expect-error
isJSON(() => "")
// @ts-expect-error
isJSON(class {})
isJSON(undefined)
// @ts-expect-error
isJSON(new BigInt(143))
// @ts-expect-error
isJSON(isJSON)





// functions


interface TZwoNumberCalc {
  (x:number, y:number) : number
}

type twoNumberCalc = (x: number, y: number) => number

const addRes: twoNumberCalc = (a, b) => a + b
const subtract: TZwoNumberCalc = (x, y) => x - y


function undefinedRet(values: number[]): undefined {
  values.push(44)
}

function voidReturn(valie: number[]): void {
  valie.push(23)
}



// construct signatures

interface DateConstructor {
  new (value: number) : Date
}

let myDate: DateConstructor = Date
const d22 = new myDate()


// funtion overloads :

// @noImplicitAny: true
type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void

function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler
)
function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler
)
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {}

const myFrame = document.getElementsByTagName("iframe")[0]
//     ^?
const myForm = document.getElementsByTagName("form")[0]
//     ^?
handleMainEvent(myFrame, (val) => {
  //        ^?
})
handleMainEvent(myForm, (val) => {
  //        ^?
})


// this type

// @errors: 2684 2684
function myClickHandler(
  this: HTMLButtonElement,
  event: Event
) {
  this.disabled = true
  //   ^?
}

myClickHandler(document.querySelector('button'), new Event("click")) // seems no longer ok

myClickHandler
// ^?
const myButton = document.getElementsByTagName("button")[0]
const boundHandler =
  //    ^?
  myClickHandler.bind(myButton)
boundHandler(new Event("click")) // bound version: ok
myClickHandler.call(myButton, new Event("click")) // also ok


// classsesss

class Carrie{
  public make: string
  public model: string
  public year: number 
  protected viaNumber = GenerateVinNumber()
  private doorLockCode = generateDoorLock()
  constructor(make: string, model: string, year: number) {
    this.make= make
    this.model = model
    this.year = year
  }

  protected unlockAllDoors() {
    unlocCar(this, this.doorLockCode)
  }
}

function GenerateVinNumber(): number {
  return 0
}

function generateDoorLock(): number { return 1 }
function unlocCar(obj: { [key: string] : number}, code: number) { }

class Sedan2 extends Carrie {
  constructor(make: string, model: string, year: number) {
    super(make, model, year)
    this.viaNumber
  }
}

let Sedan = new Carrie("Honda", "Accord", 2019)


// access modifier keywords

// public -> everyone can see somthing
// privite ->  only visible to the class itself
// protected -> Class can see something, and subclassess can see something


// Js privite #fields

class Edi {
  public b : number
  #year: number

  constructor(n: number, year: number) {
    this.b = n
    this.#year = year
  }
}

const res = new Edi(3, 2004)
res.#year


// readonly ,

class eme {
  public d: number
  public readonly year: number
  
  constructor(d: number, year: number)
  {
    this.d = d
    this.year = year
  }
  
  updateYear() {
    this.year++; // this will not allow us to do that
    
  }
  
}



// param properties

// we could come up this

class easyPeasy {
  constructor(
    public name: string,
    public age: number,
    public year: number
  ){}
}

const me = new easyPeasy("alif", 19, 2004)




///



class Base { }

class next extends Base {
  foo = console.log("class field initializer")
  constructor(public make: string) {
    super()
    console.log("custom construxtor stuff")
  }
}


const resul = new next("honda")


// executed in js is :

/**
"use strict";

class Base {
}
class next extends Base {
    constructor(make) {
        super();
        this.make = make;
        this.foo = console.log("class field initializer");
        console.log("custom construxtor stuff");
    }
}
const resul = new next("honda");
 */



//////////
// Top and Bottom types 
let firstT: 6 | 7 | 8

let bT: null
let cT : {
  favo?: "pineapple"  // pineapple | undefined 
}


// top types

// top types( symbol: T) is a  type that describes any possible value allowed by the system
// Ts provides two of these types : any , unknown

// any : anything

// unknown : values wit an unknow type cannot  be used without first applying a type guard

let unknownV: unknown = 23
// unknownV we cannot use unless we check with type guards


if (typeof unknownV == "number") {
  console.log(unknownV) // now it is safe 

}

// bottom types : never
// no possible value allowed but the system



// never


// @errors: 2322
function obtainRandomVehicle(): any {
  return {} as any
}
/// ---cut---
class Car {
  drive() {
    console.log("vroom")
  }
}
class Truck {
  tow() {
    console.log("dragging something")
  }
}
class Boat {
  isFloating() {
    return true
  }
}
type Vehicle = Truck | Car | Boat

let myVehicle: Vehicle = obtainRandomVehicle()

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow() // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive() // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle   // this is the condition where when we cover all the possible cases, but what if someone added another class another possibility , then this case is wrong , that means there is something left, now out Boat is not covered, so in that case never is so useful
  // it checks if there is anu cases are left, to make it correc there should not anyything lef t
  
}



// type guards and narrowing



let value:
  | Date
  | null
  | undefined
  | "pineapple"
  | [number]
  | { dateRange: [Date, Date] }

// instanceof
if (value instanceof Date) {
  value
  // ^?
}
// typeof
else if (typeof value === "string") {
  value
  // ^?
}
// Specific value check
else if (value === null) {
  value
  // ^?
}
// Truthy/falsy check
else if (!value) {
  value
  // ^?
}
// Some built-in functions
else if (Array.isArray(value)) {
  value
  // ^?
}
// Property presence check
else if ("dateRange" in value) {
  value
  // ^?
} else {
  value
  // ^?
} 

// user defined type guards

// value is foo


interface CarLike {
  make: string
  model: string
  year: number
}

let maybeCar: unknown

// the guard
function isCarLike(
  valueToTest: any
): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  )
}

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar
  // ^?
}

// assers value is foo

function assertsIsCarLike(
  valueToTest: any
): asserts valueToTest is CarLike {
  if (
    !(
      valueToTest &&
      typeof valueToTest === "object" &&
      "make" in valueToTest &&
      typeof valueToTest["make"] === "string" &&
      "model" in valueToTest &&
      typeof valueToTest["model"] === "string" &&
      "year" in valueToTest &&
      typeof valueToTest["year"] === "number"
    )
  )
    throw new Error(
      `Value does not appear to be a CarLike${valueToTest}`
    )
}

// using the guard
maybeCar
// ^?
assertsIsCarLike(maybeCar)
maybeCar
// ^?


// nullish  values


// null | undefined | void


// null
// null means : there is a value , and that value is nothing

// undefined

// undefined means: the value is not available yet ?


// void : should excllusively be used to describe that a function return value should be ignored


// non - null assertion operator

// The non-null assertion operator (!.) is used to cast away the possibility that a value might be null or undefined.

// @errors: 2532 18048
type GroceryCart = {
  fruits?: { name: string; qty: number }[]
  vegetables?: { name: string; qty: number }[]
}

const cart: GroceryCart = {}

cart.fruits.push({ name: "kumkuat", qty: 1 }) /// it says fruits is possible null,
//   ^?
cart.fruits!.push({ name: "kumkuat", qty: 1 }) // it works well


//  definite assignment operator (!:)

// @errors: 2564
// @noImplicitAny: false
class ThingWithAsyncSetup {
  setupPromise: Promise<any> // ignore the <any> for now
  isSetup!: boolean  // typescript knows the behaviour of the async , so it says isSetup is not initialized, u should initialize now, but if we pul !: like that, we say that i assure that isSetup get's initialized later , 

  constructor() {
    this.setupPromise = new Promise((resolve) => {
      this.isSetup = false
      return this.doSetup(resolve)
    }).then(() => {
      this.isSetup = true
    })
  }

  private async doSetup(resolve: (value: unknown) => void) {
    // some async stuff
  }
}


// Generics
// generics allows use to paramterixe types which unlocks great opportunity to reuse types broadly across a typescrupt project

function listToDict<T>(
  list: T[], 
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {}
  list.forEach((element) => {
    const dictKey = idGen(element)
    dict[dictKey] = element
  })
  return dict
}

const dict1 = listToDict(
  [{ name: "Mike" }, { name: "alif" }], 
  x => x.name
)

console.log(dict1)
console.log(dict1.Mike)


// reduce , filter, map







// generic scopes and constrints

// @errors: 2339
interface HasId {
  id: string
}
interface Dict<T> {
  [k: string]: T
}

function listToDictWithExtends<T extends HasId>(list: T[]): Dict<T> { 
  // what is happening there is , we are asking thatt T can be anything, but 
  // at minimum it should have basecase of hasId  like a limit 
  const dict: Dict<T> = {}

  list.forEach((item) => {
    dict[item.id] = item
  })

  return dict
}