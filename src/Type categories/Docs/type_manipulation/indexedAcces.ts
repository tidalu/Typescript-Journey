// we can use an indexed access type to look up a specific property on another type:

type personage = { age: number; name: string; alive: boolean };
type Age = personage["age"]

// the indexing type itself a type, so we can use unions , keyof , or other types entirely:

type I1 = personage["age" | "name"];

type I2 = personage[keyof personage];

type AliveOrName = "alive" | "name";
type I3 = personage[AliveOrName];

// we will never see an error if we try to index a property that does not exist : 
type I4 = personage["aaa"];


// Another example of indexing with an arbitrary type is number to get the type of an array's elements. we an combine this with typeof to conveniently capture the element type of an array literal:

const myAra = [
    {name: "alice", age: 43}, 
    {name: "alice1", age: 33}, 
    {name: "alice2", age: 23}, 
];

type Xenon = typeof myAra[number]
type IAge = typeof myAra[number]["age"];

// /or 
type IIAge = Xenon["age"];

// you can only use types when indexing , meaning you cannt use a const to make a variable reference:
const key = "age";
type IIIAge = Xenon[key];

// however we cna use a type aliases for a similar style of refactor:

type IKey = "age";
type IIIIAge = Xenon[IKey];

