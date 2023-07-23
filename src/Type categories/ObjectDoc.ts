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

function createSquare(config: SquareConfig): {color: string; area: number} {
    return {
        color: config.color || "red", 
        area: config.width ? config.width ** 2 : 20;
    };
}

let mySquare = createSquare({colour: "blue", width: 100 });


console.log(mySquare);

// notice the given arguments to createSquare is spelled colour instead of color, in plain js , this kind of things fails silently.

// getting around these checks is actually really simple, the easiest method is to just use a type assertion: 

let mySquare1 = createSquare( { width: 100, opacity: 0.5} as SquareConfig);

// however ,  better approach might be added a string index signatures if you are sure that the object can have some extra properties that are used in some special way. if squareConfig can have color and width properties with the above types but could also have any number of other properties, they we could define it like so: 

interface squareConfig1 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// we will  discuss index signatures in a bit here we are saying s SquareConfig can have any number of properties, and ads long as they are not color or width , their types do not matter .

// one final way to get around these checks, which might be a bit surprizing . is to assign the object to another variable: since assigning SquareOPtions will not undergo excess property checks. the compiled will not give you an error:

let SquareOptions = { color : "red", width: 100 };
let mySquare2 = createSquare(SquareOptions);


// The above workaround will work as long as you have a common property between squareOptions and SquareConfig. In this example it was a property width. it will however , fail if the variable does not have any common object property . for example:

let SquareOptions1 = { colour: " red " };
let mySquare3 = createSquare(SquareOptions1);

// keep in mind  that for simple code like above, you probably should not be trying to get around these checks. for more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs.



// Extending types 
// it is pretty common to have types that might be more specific version of other types. For example we might have a BasicAddress type that describes the fields necessary for a sending letters and packages in the Usa.
















