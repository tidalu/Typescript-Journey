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
