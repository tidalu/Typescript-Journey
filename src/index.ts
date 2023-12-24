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