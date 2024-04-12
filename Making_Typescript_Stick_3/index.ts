// qs 1
class Person {
    #name = ''
    private age  = 1
}

const person = new Person()

// console.log(person.age) // even though ts type checking shows that we cannot access to the age property, in runtime it is possible to access we can read the value 
// but with #name there is no way we cann access to that in outside of class itself 

// qs 2


// Which of the following variables (a, b, c, d, e) hold immutable values

const a = 'Ali' // immutable
let b = 'Ali' // immutable // string is by nature immutable

const c = { learnAt: "Ali"} // mutable
let d = { learnAt: "Ali"} // mutable

const e = Object.freeze({ learnAt: "Ali"}) // immutable


// qs 3

const str = 'hello'
let val = str.split('')
let inObj = { ...str.split('') }
    console.log(val, inObj)

//

// variadic tuple types

type Color = [
    number, 
    number,
    number
]


enum Sandwich {
    Hamburger, 
    VeggieBurger, 
    GrilledCheese, 
    BLT
}

type SandwichOrder = [
    number, // order total
    Sandwich, // Sandwich
    ...string[] // toppings
]

const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce', 'Avacado']

/**
 * return an array containing everything except the first element
 */

function tail<T>(args : readonly [number, ...T[]]) {
    const [_ignored, ...rest] = args
    return rest
}


const orderWithouitTotal = tail(order1)


// 

function returnArray<T>(arg: readonly T[]): readonly T[] {
    return arg
}


const array = [Sandwich.Hamburger,  'lettuce'] as const 

const result = returnArray(array) // we have something not very likely // tooltip: const result: readonly (Sandwich.Hamburger | "lettuce")[]


// let's go anothe way 


function returnArrayFixed<T extends any[]>(arg: T): T {
    return arg
}

const array1 : [Sandwich.Hamburger, 'lettuce'] = [Sandwich.Hamburger, 'lettuce']

const resultOk = returnArrayFixed(array1) // tooltip: const resultOk: [Sandwich.Hamburger, "lettuce"]



// now we can do that with our first fucntion 


function tailOk<T extends any[]>(arg: readonly [number, ...T]) {
    const [_ignored, ...rest] = arg
    return rest
}

const order2: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce', 'Avacado']

const result1 = tailOk(order2)


// we can use that with generics also



type Mytuple<T> = [number, ...T[]]

const x1: Mytuple<string> = [1, 'a', 'a']
const x2: Mytuple<boolean> = [1, true, false, true]


// another thing we can do in tuples is multiple spreads 


type SpreadTuple = [ 
    ...[number, number], 
    ...[string,  string, string] 
]

const x: SpreadTuple = [1, 2, 'a', 'b', 'b']


// it is important to note that only one ...rest[] element is posible in a given tuple, but it does not necessarily have to be the last

type YESCompile = [...[number, number], ...string[]]

// type NOCompile =[ ...number[], ...string[]] 

type YESPOSSIBLE = [ boolean, ...number[], string]



// another new feature 

class CLASS {
    private read
    public green
    public blue
    constructor(c: [number, number, number]) {
        this.read = c[0]
        this.green = c[2]
        this.blue = c[1]
    }
}


// thrown values as unknown

// sometime we cannot know that where the error is thrown, so we should better type checking  as unknowns


// risky funtion
function somethingRisky() {
    if (Math.random() > 0.5) {
        throw 'error';
    } else {
        throw new Error('error');
    }
}


// handling error with unknown
try { 
    somethingRisky()
} catch (err: unknown) {
    if(err instanceof Error) {
        throw err
    } else throw new Error(`${err}`)
}




// another feature
// teplate literal types

type Statistics = {
    [K in `${"median" | "mean"}Value`]?: number
}

const stats: Statistics = {}


// we can do some pretty things

let winFn: Extract<keyof Window, `set${any}`> = '' as any

// we even get some sprecial utility types to assis with changing cases 

type T3 = `send${Capitalize<"mouse" | "keyboard">}Event`
type T2 = `send${Uppercase<"mouse" | "keyboard">}Event`
type T1 = `send${Lowercase<"Mouse" | "keBoard">}Event`


// key mapping in mapped types

type Clrs = 'red' | 'blue' | 'green'

type ClrSelector = {
    [K in Clrs as `select${Capitalize<K>}`]: () => void
}

const cs : ClrSelector = {} as any

cs.selectBlue // check tooltip


/// checked index access 


// Mike thinks this is way too optimistic 

type Dict<T> = { [K: string]: T}

const f: Dict<string[]> = {}
f.notExistThing.join(', ') // now it does nto care if the method exist or not , so bette to do this >>>


type DictFix<T> = { [K: string]: T | undefined}

const fFix: DictFix<string[]> = {}
// fFix.notExistThing.join(', ') // now it says type error


//

class Car {
    public model!: string;
    public make!: string;
    protected static cost: number = Math.round(Math.random() * 1000);
    private static year: number = new Date().getFullYear();
    #alif: number = 2004

    constructor(model: string, make: string) {
        this.model = model;
        this.make = make;
    }

    func(): void {
        console.log(this.model, this.make, Car.year, Car.cost, this.#alif);
    }
}

const myCar = new Car("Model X", "Tesla");
myCar.func(); 

// quiz one 
let age = 38;
age = Number.NaN


// quiz ttwo
const vector3: [ number, number] = [1, 2]
vector3.push(5)



// quiz three
// type Color = {
//     red: number
// }

//  quiz 4 
class Perli  {
    name: string
    // friends: Perli[]
    constructor(name: string) {
        this.name = name
    }
}

// quiz 5

abstract class Persi {
    public abstract name : string
}

// class Stud extends Persi {
//     public name: string | string[] = ["Alif Bertta"]
// }

// ex 6
//  interface Color {
//   red: number
//   green: number
//   blue: number
// }
function printColor(color: Color) {
  // ... //
}
// printColor({
//   red: 255,
//   green: 0,
//   blue: 0,
//   alpha: 0.4, we canot have it access so it is pointless 
//to have there, but if this value obj is in an variable , and
// if we pass there will not be any errror, cuz to the extra methods we 
// can have at least an access with that parent , 

// })


// ex 7

type Coloriy = {
  red: number
  green: number
  blue: number
}
class ColorValue implements Coloriy {
  constructor(
    public red: number,
    public green: number,
    public blue: number // using this is very good 
  ) {}
}

// task

///// type-challenges
/////
// @errors: 2344
type Expect<T extends true> = T
type Equal<X, Y> =
(<T>() => T extends X ? 1 : 2) extends
(<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type
type If<C, T, F> = C extends true ? T : F

// Tests
type cases = [
  Expect<Equal<If<true, "apple", "pear">, "apple">>,
  Expect<Equal<If<false, "orange", 42>, 42>>
]
///////


// Implement this type
type LengthOfTuple<T> = T extends readonly any[] ? T['length'] : never

// Tests
const Fruits = ["cherry", "banana"] as const
type cases2 = [
  Expect<Equal<LengthOfTuple<[1, 2, 3]>, 3>>,
  Expect<NotEqual<LengthOfTuple<[1, 2, 3]>, 2>>,
  Expect<Equal<LengthOfTuple<typeof Fruits>, 2>>,
  Expect<Equal<LengthOfTuple<[]>, 0>>
]/////



// Implement this type
type EndsWith<A, B extends string> = A extends `${string}${B}` ?  true : false

// Tests
type cases3 = [
  Expect<Equal<EndsWith<"ice cream", "cream">, true>>,
  Expect<Equal<EndsWith<"ice cream", "chocolate">, false>>
]

///////
// Implement this type
type Concat<A extends any[], B extends any[]> = [...A, ...B]

// Tests
type cases4 = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], ["hello"]>, ["hello"]>>,
  Expect<
    Equal<Concat<[18, 19], [20, 21]>, [18, 19, 20, 21]>
  >,
  Expect<
    Equal<
      Concat<[42, "a", "b"], [Promise<boolean>]>,
      [42, "a", "b", Promise<boolean>]
    >
  >
]

//////

// Implement this type
type ReturnOf<F> = F extends { (...arg: any[]): infer RT } ? RT : never 


// Tests

const flipCoin = () =>
  Math.random() > 0.5 ? "heads" : "tails"
const rockPaperScissors = (arg: 1 | 2 | 3) => {
  return arg === 1
    ? ("rock" as const)
    : arg === 2
    ? ("paper" as const)
    : ("scissors" as const)
}

type cases5 = [
  // simple 1
  Expect<Equal<boolean, ReturnOf<() => boolean>>>,
  // simple 2
  Expect<Equal<123, ReturnOf<() => 123>>>,
  Expect<
    Equal<ComplexObject, ReturnOf<() => ComplexObject>>
  >,
  Expect<
    Equal<
      Promise<boolean>,
      ReturnOf<() => Promise<boolean>>
    >
  >,
  Expect<Equal<() => "foo", ReturnOf<() => () => "foo">>>,
  Expect<
    Equal<"heads" | "tails", ReturnOf<typeof flipCoin>>
  >,
  Expect<
    Equal<
      "rock" | "paper" | "scissors",
      ReturnOf<typeof rockPaperScissors>
    >
  >
]

type ComplexObject = {
  a: [12, "foo"]
  bar: "hello"
  prev(): number
}


/////
// Implement this type
type Split<S extends string, SEP extends string> = 
   S extends `${infer REST}${SEP}${infer T}` ? 
   [REST, ...Split<T, SEP>] : S extends '' & SEP ? 
   [] : string extends S ? string[] : [S]

type x =  Split<"hello world rest", ' '>
// Tests

type cases6 = [
  Expect<
    Equal<
      Split<"Hi! How are you?", "z">,
      ["Hi! How are you?"]
    >
  >,
  Expect<
    Equal<
      Split<"Hi! How are you?", " ">,
      ["Hi!", "How", "are", "you?"]
    >
  >,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
]

////


// Implement this type
type IsTuple<T> = T extends readonly [...any[]]
    ? [...T, any]['length'] extends T['length'] 
      ? false
      : true
  : false // not even an arrayish thing 
  
  // type IsTuple<T> = [T] extends [never] 
  // ? false 
  // : T extends readonly [] 
  //   ? true 
  //   : T extends readonly [infer _Head, ...infer _Tail] 
  //     ? true 
  //     : false

// Tests
type cases7 = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>
  
]


///

// Implement this type
type IndexOf<T extends any[], U , Acc extends any[] = [] > = T extends [infer F, ...infer R] 
  ?  F extends U 
    ? Acc['length'] 
    : IndexOf<R, U, [...Acc, F]>
  : -1
  
  

// Tests

type cases8 = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>
]




// Challenge
