// The keyof type operator

// the keyof operator takes an object type produces a string or number literal union of its keys . The following type P is the same type as type P = "x" | "y"

type Point = { x: number; y: number };

type P = keyof Point;

// if the type has a string or number index signature, keyof will return those type instead : 

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string ]: boolean };
type M = keyof Mapish;


// note that in this example , M is string | number = this is because javascript object keys are always coerced to a string, so obj[0]  is always  the same as obj["0"];