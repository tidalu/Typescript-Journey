// OBJECT TYPES 

// OBJECTS  can be anonymous 

function greetNew(person: { name: string; age: number }) {
    return "hello " + person.name;
}

// or theu can be named using either interface:

interface Person {
    name: string;
    age: number;
}

function greetnew1(person: Person) {
    return " hello " + person.name;
}

// or a type alias:

type Person1 = {
    name: string;
    age: number;
};

function greetnew2(person: Person1) {
    return "Hello " + person.name;
}


// in all three examples above, wehave written functions for both type and interfaces, if you want a quick look at the inportant everyday syntax at a glance.

// optional properties


function getShape(): Shape {

    const square: Shape = {
        // ...
    };

    return square;
}

interface Shape {
    // ...
}

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opt: PaintOptions) {
    //...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });


// in this example both x and y pos are optional either we can provide them or optionally we can provide only shape key, All optionally reall ysays is that if the property is set, it better to have a specific type.

// we cam also read from those properties - but when we do under strickNullChecks, Ts will tell use they are potentislly undefined 

function paintShape1(opts: PaintOptions) {
    let xPos = opts.xPos;

    let yPos = opts.yPos;

    // ...

}


// in js even if the property has never been  set, we can still access it -- it is just going to give us the value undefined. we can just handle undefined specifically by checking for it.

function paintShape2(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;

    let yPos = opts.yPos === undefined ? 0 : opts.yPos;

    // ...
}

// note that this pattern of setting defaults for unspecified values is so common that Js has syntax to support it.

function paintShape3({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);

    console.log("y coordinate at", yPos);

    // ...
}



// here we used a destucting pattern for paintShape's parameter, and provided defaultvalus for xPos and yPos , not they are both definitely present within the body of paintShape, but optionally for any callers to paintShape

function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
    render(shape);

    render(xPos)
}


// in an object destructing pattern , shape: Shape means grab the property shape and redefine it locally as a variable named Shape. Likewise xPos:  number creates a variable named number whose value is based on the parameter's xPos.


// -------------------------------------

// readonly properties 

// properties can also be marked as readonly for typescript. While it wont change any behavior at runtime , a property marked as readonly cannot be written to during type-checking

interface SomeType {
    readonly prop: string;
}

function doAnything(obj: SomeType) {
    // we can read from obj.prop 
    console.log(`prop has the value '${obj.prop}'.`);

    // but we cannot reassign it.
    obj.prop = "hello"; // cannot assign to 'prop' because it is a readonly property 
}

// using a readonly modifier does not necessarily imply that a value is totally immutable - or in other words, that its internal contents cannot be changed . it just means the property itself cannot be re-written to.

interface Home {
    readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
    // we can read and update properties from home.resident 
    console.log(`Happy bithday ${home.resident.name}!`);
    home.resident.age++;
}


function evict(home: Home) {
    //  but we cannot rewrite to the 'resident' property itself on a Home.
    home.resident = { // Cannot assign to 'resident' because it is a read-only property
        name: "Victor",
        age: 42,
    };
}

/// it is important to manage expectations of what readonly implies it is useful intern during development time for Ts on how an object should be used.

// typescript doe snot factor i whether properties on two types are readonly when checking whether those types are compatible, so readonly properties can also change via aliasing 

interface Person2 {
    name: string;
    age: string;
};


interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}


let writablePerson: Person = {
    name: "Person McPersonFace",
    age: 42,
}

// works 
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // -> 42
writablePerson.age++;
console.log(readonlyPerson.age); // -> 43


// index signatures

//sometimes you do not have all the names of a type's properties ahead of time, but you do know the shape of the value 
// in those cases you can use an index signatures to describe the types of possible values, ex:

interface StringArray {
    [index: number]: string;
}

function getStringArray(): StringArray {
    const strings: string[] = ["Hello", "World", "TypeScript", "Function"];

    const stringArray: StringArray = strings;

    return stringArray;
}

const myArray: StringArray = getStringArray();
const secondTime = myArray[1]
console.log(myArray, secondTime);

// Above we have a StringArray interface  which has an index signature. This indexSignature states that when a StringArray is indexes with a number , it will return a string.

// only  some types are allowed for index signatures properties: string, number, symbol, template string patterns and union types consisting only of these.

// While string index signatures are a powerful way tp describe the dictionary pattern , they also enforce that all properties  match their return type, this is because a string index declares that obj.property is also available as obj["property"]. In the following example. name's type does not match string index's type and the type checker gives an error:

interface NumberDictionary {
    [index: string]: number;

    length: number; // okay
    name: stri

}

// however. properties of different types are acceptable if the index signature is a union of the property types:

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;// okay the length is a number 
    name: string; // okay the name is a string 

}


// finally you can make index signatures readonly in order to prevent assignment to their indices: 

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

function getReadonlyStringArray(): ReadonlyStringArray {
    return ["Alice", "Bob", "Charlie"];
}

let myArray1: ReadonlyStringArray = getReadonlyStringArray();
myArray1[2] = "Mallory"; // Index signature in type 'ReadonlyStringArray' only permits reading

// we cannot see myArray1[2] cuz the index signature is readonly.

// Excess property checks 
//  where and how an object is assigned a type can make a difference in the system. One of the key examples of this is excess property checking, which validates the object more thoroughly when it is created and assigned to an object type during creation


interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width ** 2 : 20;
    };
}

let mySquare = createSquare({ colour: "blue", width: 100 });


console.log(mySquare);

// notice the given arguments to createSquare is spelled colour instead of color, in plain js , this kind of things fails silently.

// getting around these checks is actually really simple, the easiest method is to just use a type assertion: 

let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// however ,  better approach might be added a string index signatures if you are sure that the object can have some extra properties that are used in some special way. if squareConfig can have color and width properties with the above types but could also have any number of other properties, they we could define it like so: 

interface squareConfig1 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// we will  discuss index signatures in a bit here we are saying s SquareConfig can have any number of properties, and ads long as they are not color or width , their types do not matter .

// one final way to get around these checks, which might be a bit surprizing . is to assign the object to another variable: since assigning SquareOPtions will not undergo excess property checks. the compiled will not give you an error:

let SquareOptions = { color: "red", width: 100 };
let mySquare2 = createSquare(SquareOptions);


// The above workaround will work as long as you have a common property between squareOptions and SquareConfig. In this example it was a property width. it will however , fail if the variable does not have any common object property . for example:

let SquareOptions1 = { colour: " red " };
let mySquare3 = createSquare(SquareOptions1);

// keep in mind  that for simple code like above, you probably should not be trying to get around these checks. for more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs.



// Extending types 
// it is pretty common to have types that might be more specific version of other types. For example we might have a BasicAddress type that describes the fields necessary for a sending letters and packages in the Usa.


interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

// in some situations that's enough , but addresses often have a unit number associated with them if the building at an address has multiple units. We can then describe an AddressWithUnit.

interface AddressWithUnit {
    name?: string;
    unit: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

// this does the job, but the downloads here is that we had to repeat all the other fields from BasicAddress when our changes purely addictive. Instead, we can extends the original BasicAddress type and just add the new fields that are unique  to AddressWithUnit.

interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
    unit: string;
}

// the extends methods on an interface allows us to effectively copy members from other named types, adn add whatever new members we want. this can be useful.

// interface can also extend fro multiple types 
interface Colorful1 {
    color: string;
}

interface Circle1 {
    radius: number;
}


interface ColorfulCircle1 extends Colorful1, Circle1 { };

const cc1: ColorfulCircle1 = {
    color: "red",
    radius: 42,
}


// intersection types 

// interfaces allowed us to build up new types from other types by extending them, typescript provides another construct called intersection types that is mainly used to combine existing object types.

// an intersection type is defined using the & operator.

interface Colorful1 {
    color: string;
}

interface Circle1 {
    radius: number;
}

type ColorfulCircle2 = Colorful1 & Circle1;

// here we have intersected Colorful and circle to produce a new type that has all the members of Colorful and Circle.

function draw1(circle: Colorful1 & Circle1) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}

// okay
draw1({ color: "blue", radius: 42 });

// oops
draw1({ color: "red", raidus: 42 });


// interfaces vs intersections 

// we just looked at two ways to combine types which are similar, but are actually subtly different.



// generic object types 

// let's imagine a Box type that can contain any value - string s number s Giraffe s  whatever 

interface Box {
    contents: any;
}

// Right now . the concepts property us types as any , which works, but can lead to accidents down the line.

// we could instead use unknown , but that would mean that is cases where we already know the type of contents , we'd need to do precautionary checks, or use error-prone type assertions.


interface Box1 {
    contents1: unknown;
}

let x4: Box1 = {
    contents1: "Hello World!",
};

// we could check 'x.contents1';

if (typeof x4.contents1 === "string") {
    console.log(x4.contents1.toLowerCase());
}

// or we could use  a type assertions 
console.log((x4.contents1 as string).toLowerCase());

// one type safe approach would be to instead scaffold out different Box types for every type of contents 

interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}


interface BooleanBox {
    contents: boolean;
}

// but that means we'll have to create different functions, or overloads of functions, to operate , to operate on these type.


function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}

// this a lot of boilerPlate. Moreover we might later need to introduce new types and overloads. this is frustrating, since our box types and overloads are all efficiently the same.

// instead . we can make a generic Box type which declares a type parameter.

interface Botnet<Type> {
    concepts: Type;
}

// you might read this as "A Botnet of Type is something whose concepts have Type". Later on , when we refer o Botnet we have to give type argument in place of Type.

let box: Botnet<string>;

// think of Botnet as a template for a real type. where Type is a placeholder that will het replaced with some other type. When Ts  seeds Botnet<string> , it will replace every instance of Type in in Box<Type> with string, and end up working with something like { contents: string }. In other words, Box<string> and our earlier StringBox work identically.


interface This<Type> {
    contents: Type;
}

interface StringType {
    contents: string;
}

let ThisA: This<string> = { contents: "hello" };
ThisA.contents;

let ThisB: StringType = { contents: "world" };
ThisB.contents;

// this is here reusable in that Type can be substituted with anything. that means that when we need a This for new type. we do not need to declare a new Box Type at all (though we certainly could if we want to).

interface Box5<Type> {
    contents: Type;
}

interface Apple {
    // ...
}

// Same as '{ contents : Apple }.
type AppleBox = Box5<Apple>;


// this also means that can avoid overloads entirely by instead using generic functions.

function setContents5<Type>(box: Box5<Type>, newContents5: Type) {
    box.contents = newContents5;
}

//it is worth nothing type aliases can also be generic. we could have defined our new Box5<Type> interface, which was: 
interface Box5<Type> {
    contents: Type;
}


// by using type aliases instead 
type Box6<Type> = {
    contents: Type
}

// since type aliases , unlike interfaces, can describe more than just object types, we can use them to write other kinds of generic helper types

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;


type OneOrManyOrNullString = OneOrManyOrNull<string>;

// The array Type 

// generic object types are often some sort of container type that work independently of the type of elements  they contain. it is ideal for data structures to work this way so that they are re-usable across different data types.

// it turns our we have been working with a type just like that  throughout this handbook, the Array type. Whenever we rwite out types like number[] or string[], that is really just a shorthand for Array<number> and Array<string>.

function somethingDo(value: Array<string>) {
    // ...
}

let myArrayT: string[] = ["hello", "world"];

// either of these work
somethingDo(myArrayT);
somethingDo(new Array("hello", "world"));

// much like box type above , array itself is  generic function

interface Arr<Type> {
    /**
   * Gets or sets the length of the array.
   */
    length: number;

    /**
   * Removes the last element from an array and returns it.
   */
    pop(): Type | undefined;


    /**
   * Appends new elements to an array, and returns the new length of the array.
   */

    push(...items: Type[]): number;

    // ...
}

// modern Javascript also provides other data structures which are  generic, like Map<K, V>, Set<T> and promise<T>. All this really means is that because of how Map, Set and promise behave, they can work with any sets of types.

// the ReadonlyArray type 


// the ReadonlyArray is a special type that describes arrays that should not be changed.

function doStuff(values: ReadonlyArray<string>) {
    // we can read from value ...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // but we cannot mutate ' value ' 
    value.push("Hello");
}

// much like the readonly modifier ,, it is mainly a tool we can use for intent, when we see a function that returns ReadonlyArrays, it tells we are not meant to change the contents at all , and we see a functions that consumes ReadonlyArray s it tells us that we can pass any array into that function without worrying that it will change its contents.

// unlike Array that is not ReadonlyArray constructor that we can use.

new ReadonlyArray("red", "green");



// instead we can assign regular Array s to ReadonlyArray s.

const roArray: ReadonlyArray<string> = ["red", "green"];

// just as Ts provides a shorthand syntax for AJust as TypeScript provides a shorthand syntax for Array<Type> with Type[], it also provides a shorthand syntax for ReadonlyArray<Type> with readonly Type[].

function doStuff1(value: readonly string[]) {
    // we can read from 'value'...
    const copy = value.slice();
    console.log(`The first value is ${value[0]}`);

    // ...but we can't mutate 'values'.
    value.push("hello!");
}

// one last thing to note is that unlike the readonly property modifier, assignability is not bidirectional between regular Array s and ReadonlyArray s.


let ta: readonly string[] = [];
let na: string[] = [];

ta = na;
na = ta;

// tuple types 

// A tuple type is another sort of Array type that knows  exactly how many elements it contains, and exactly which types ot contains at specific positions.

type StringNumberPair = [string, number];  
// here StringNumberPair is a tuple of string and number. Like ReadonlyArray, it has no representations at runtime , but is significant to Ts. To the type system, StringNumberPair describes arrays those 0 index contains a string and whose 1 index contains a number.

function dodo(pair: [string, number]) {
    const a = pair[0];
    const b = pair[1];

    // ...
}

dodo(["hello", 42]);

// if we try to index past the number of elements . we will get an error.

function dodo1(pair: [string, number]) {
    // ...

    const c = pair[2];
}

// we can also destructing tuples js's array destructing 

function dodo2(stringHash: [string, number]) {
    const [inputString, hash] = stringHash;

    console.log(inputString);
    
    
    console.log(inputString);
}

// other than those length checks, simple tuple types like these are equivalent to types which are version of Arrays that declare properties for specific indexes, and that declare length with a numeric literal type .
interface StringNumberPair2 {
    // specialized properties 
    length: 2;
    0: string;
    1: number;

    // other 'Array<string | number>' members ...
    slice(start?: number, end?: number): Array<string | number>;
}

// another thing you may be interested in is that tuples can have optional properties by writing by writing out a question mark (? after an  element's type). Optional tuple elements can only come  at the end, and also affect the type of length.

type Either2dOr3d = [number, number, number?];
function setCoordinates(coord: Either2dOr3d) {
    const [x, y, z] = coord;

    console.log(`Provided coordinates had ${coord.length} dimensions`);
}

// Tuples can also have rest elements, which have to be an array /tuple type.

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];


const t: StringNumberBooleans = ["hello", 1];
const p: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// why might optional and rest elements be useful? well it allows Ts to correspond tuples with parameter list. Tuples types can be used in rest parameters and arguments , so that the following : 

function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [ name, version, ...input] = args;
    // ...
}

// is basically equivalent to: 
function readButtonInput1(name: string, version: number, ...input: boolean[]) {
    // ...
}

// this is handy when you want to take a variable  number of arguments with a rest parameter, and you need a minimum number of elements , but you do not introduce intermediate variables;

// readonly tuple types

// One final note about tuple types - tuple types have readonly variants, and can be specified by sticking a readonly modifier in front of them - just like with array shorthand syntax.

function doto(pair: readonly [string, number]) {
    // ...
}

// as you might expected , writing to any property of a readonly tuple is not allowed in Ts.

function eldo(pair: readonly [string, number]) {
    pair[0] = "hello"
}

// tuples tend to be created and left uun-modified in most code , so annotating types as readonly tuples when possible is a good default. this is also important given that array literals with const assertions will be inferred with readonly tuple types 

let point = [3, 4] as const;

function  distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y**2 );
}

distanceFromOrigin(point);
// Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple. Since point’s type was inferred as readonly [3, 4], it won’t be compatible with [number, number] since that type can’t guarantee point’s elements won’t be mutated.