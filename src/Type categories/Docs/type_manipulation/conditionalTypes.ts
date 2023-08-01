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


// conditional type constraints 

// often , the checks in a conditional type will provide us with some new information, just like   narrowing with type guards can give us a more specific type, the true branch of a conditional type will futher generics by the type we check against. For example:

type MessageOf<T> = T["message"];

// in this example, ts errors because T is not known to have a property called message. We could constrain T, and Ts would no longer complain:

type MessageOf1<T extends {message: unknown}> = T["message"];

interface Email {
    message: string;
}

type EmailMessageContents = MessageOf<Email>

// however , what if we wanted MessageOf to take any type, and default something like never if a message property is not available ? we can do this by moving the constraint out and introducing a conditional type: 

type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;


interface Email2 {
    message: string;
}

interface Dog {
    bark(): void;
}

type EmailMessageContents1 = MessageOf2<Email2>;


type DogMessageContents = MessageOf2<Dog>;

// Within the true branch , Ts knows that T  will have a message property .

//  as another example, we could also write a type called Flatten that flattens array types to their element types, but leaves them alone otherwise:

type Flatten<T> = T extends any[] ? T[number] : T;


// extracts out the element type.

type Str = Flatten<string[]>;

// leaves the type alone

type Num = Flatten<number>

// when Flatten is given an array type, it uses an indexed access with number to fetch out string[]'s element type. Otherwise it just return the type it was given. 


// inferring with conditional types

// we just found ourselves using conditional types to apply constraints and then extract out types. this ends up being such common operation that conditional types make it easier.

// conditional types provide us with a way to infer from types we compare against on the true brach using the infer keyword. For example , we could have inferred the element type in Flatten instead if fetching it out "manually" with an indexed access type:

type Flatten1<Type> = Type extends Array<infer Item> ? Item : Type ;


// here we use infer keyword to declaratively introduce  a new generic type variable named Item instead of specifying how to retrieve the element type of Type within the true branch , This frees us from having to think about how to dig through and probing apart the structure of the types we are interested in .

// we can write some useful helper type aliases using the infer keyword. for example, for simple cases, we can extract the return type out from function types:

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;


type Num2 = GetReturnType<() => number>;

type Str1 = GetReturnType<(x: string) => string>;

type Bools = GetReturnType<( a : boolean, b: boolean ) => boolean[]>;


// when inferring from  a type with multiple call signatures (such as the type of an overload function), inference are made from the last signature (which presumable, is the most permissive catch-all-cases). it is not possible to perform overload resolution based on a list of arguments types.

declare function StringOrNumber(x: string) : number;
declare function StringOrNumber(x: number) : string;
declare function StringOrNumber(x: string | number ) : string | number ;

type T3 = ReturnType<typeof StringOrNumber>

// distributive conditional type 

// when conditional types act on a generic type, they become distributive when given a union type, For example , take the following :

type ToArray<Type> = Type extends any ? Type[] : never;


// if we plug a union type into TOArray, the conditional type will be applied to each member of that union.

type TOArray<Type> = Type extends any ? Type[] : never; 

type StrArrOrNumArr = TOArray<string | number>

// what happens here is  that TOArray distributes on:
// string | number

// and maps over each member type of the union, to what if efficiently: 
// TOArray<string> | TOArray<number>

// which leaved us with: 
// string[] | number[]

// typically,distributivity is the desired behavior. TO avoid that behavior you cna surround each side of the extends keyword with square brackets

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr1 = ToArrayNonDist<string | number>;