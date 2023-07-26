// At the heart of  most programs , w have to decisions based on input , js programs are no different, but given the fact that rules can be easily introspected, those decision are also based on the type of the inputs , conditional types can help describe the relation between the types of inputs and outs;

interface AnimI {
    live(): void;
}

interface DogI extends AnimI {
    woof(): void;
}

type ExampleI = DogI extends AnimI ? number : string;

type Example2 = RegExp extends Animal ? number : string;

// Conditional types take a form that looks a little like conditional expressions(condition? trueExpression : falseExpression ) in js

// someType extends otherType ? trueType : falseType; 

// let’s take the following createLabel function: 

interface IdLabel {
    id: number /** some fields  */;
}

interface NameLabel {
    name: string /** other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
}

//  these overloads for createLabel describe a single Js function that makes a choice based on the types of inputs, note a few things:
//  If a library has to make the same sort of choice over and over throughout its API, this becomes cumbersome.
// We have to create three overloads: one for each case when we’re sure of the type (one for string and one for number), and one for the most general case (taking a string | number). For every new type createLabel can handle, the number of overloads grows exponentially.

// instead we can use that conditional type to simplify our overloads down to a single  function with no overloads 
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
function createLabelI<T extends number | string>(idNumber: T):NameOrId<T> {
    throw "unimplemented"
}

let app = createLabelI("typescript");
let bpp = createLabelI(2.5);
let cpp = createLabelI(Math.random() ? "hello" : 42);