// Variable declarations and inference

let age = 6;
// age = "not number" // got an error here ::: Type 'string' is nto assignable to type 'number'

// in Typescript , variables are born with their types.there’s no (safe) way of changing age’s type from number to string.

// let's try the same thing with const
const age1 = 6;

// const variable declarations cannot be reassigned
// the initial value assigned to age is a number, which is an immutable value type

// therefore , age will always be 6 in this program

// literal types

// the type 6 is called a literal type, if our let declaration is a variable that can hold any number, the const declaration is one that can hold only 6 - a specific number

// inference is not so specific as to get in the way of common behavior

// implicit any and type annotations

//  Sometimes, we need to declare a variable before it gets initialized, like endTime below

// between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

let startTime = new Date();
let endTime;

setTimeout(() => {
  endTime = 0;
  endTime = new Date();
}, RANDOM_WAIT_TIME);

// endTime is “born” without a type, so it ends up being an implicit any.

// TypeScript doesn’t have enough information around the declaration site to infer what endTime should be, so it gets the most flexible type: any.

// Think of any as “the normal way JS variables work”, in that you could assign endTime to a number, then later a function, then a string

// if we want more safely we could add a type annotation:

// between 500 and 1000
const RANDOM_WAIT_TIME1 = Math.round(Math.random() * 500) + 500;

let startTime1 = new Date();
let endTime1: Date;

setTimeout(() => {
  // endTime1 = 0;// type number is not assignable to type 'Date'
  endTime1 = new Date();
}, RANDOM_WAIT_TIME1);
