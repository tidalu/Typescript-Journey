// Array types
// Describing types for arrays is often as easy as adding [] to the end of the array member’s type. For example the type for an array of strings would look like string[]
const fileExtension = ["js", "ts"];
// we could use our more complicated car type too, following the type for our 3-property object with [] as shown in the tooltip below:
const cars = [
    {
        make: "Toyota",
        model: "Corolla",
        year: 2002,
    },
];
// Tuples
// sometimes we may want to work with multi element, ordered data structure,w here position of each element has some special meaning or convention. this kind of structure is often called a tuple.
// let's imagine we define a convention where we can represent the same "2002 Toyota Corolla" as 
//          [Year,  Make,     Model]
let myCar = [2002, "Toyota", "Corolla"];
const [year, make, model] = myCar;
// const model: string|number
// in this case inference is not very handy 
// | means or, we can think if string|number means either a string or a number
//  TypeScript has chosen the most specific type that describes the entire contents of the array.This is not quite what we wanted, in that:
// it allows us to break our convention where the year always comes first
// it doesn’t quite help us with the “finite length” aspect of tuples
// If TypeScript made a more specific assumption as it inferred the type of myCar, it would get in our way much of the time…
// There’s no major problem here, but it does mean that we need to explicitly state the type of a tuple whenever we declare one.
let myCar1 = [
    2002,
    "Toyota",
    "Corolla",
];
// ERROR: not right convention
// myCar1 = ["Honda", 2001, "Accord"] // I am commenting this cuz it has an error
// Type 'string' is not assignable to type 'number'.
// Type 'number' is not assignable to type 'string'.
// ERROR: to many items
// myCar1 = [2017, "Honda", "Accord", "Sedam"]; ///  I am commenting this cuz it has an error
// Type '[number, string, string, string]' is not assignable to type '[number, string, string]'.
//   Source has 4 element(s) but target allows only 3.
const [year1, make1, model1] = myCar1;
// here if we look at the inference it is showing correct 
// Limitations
// const numPair: [number, number] = [4, 5, 6] // I am commenting this cuz it has an error
// Type '[number, number, number]' is not assignable to type '[number, number]'.Source has 3 element(s) but target allows only 2. 
//  but not around push and pop: 
const numPair1 = [4, 5];
numPair1.push(6); // [4, 5, 6]
numPair1.pop(); // [4, 5]
numPair1.pop(); // [4]
numPair1.pop(); // []
// it is not any issue happening
// const numPair: readonly [number, number] = [4, 5]
