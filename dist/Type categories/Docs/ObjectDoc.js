// OBJECT TYPES 
// OBJECTS  can be anonymous 
function greetNew(person) {
    return "hello " + person.name;
}
function greetnew1(person) {
    return " hello " + person.name;
}
function greetnew2(person) {
    return "Hello " + person.name;
}
// in all three examples above, wehave written functions for both type and interfaces, if you want a quick look at the inportant everyday syntax at a glance.
// optional properties
function getShape() {
    const square = {
    // ...
    };
    return square;
}
function paintShape(opt) {
    //...
}
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
// in this example both x and y pos are optional either we can provide them or optionally we can provide only shape key, All optionally reall ysays is that if the property is set, it better to have a specific type.
// we cam also read from those properties - but when we do under strickNullChecks, Ts will tell use they are potentislly undefined 
function paintShape1(opts) {
    let xPos = opts.xPos;
    let yPos = opts.yPos;
    // ...
}
// in js even if the property has never been  set, we can still access it -- it is just going to give us the value undefined. we can just handle undefined specifically by checking for it.
function paintShape2(opts) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
    // ...
}
// note that this pattern of setting defaults for unspecified values is so common that Js has syntax to support it.
function paintShape3({ shape, xPos = 0, yPos = 0 }) {
    console.log("x coordinate at", xPos);
    console.log("y coordinate at", yPos);
    // ...
}
// here we used a destucting pattern for paintShape's parameter, and provided defaultvalus for xPos and yPos , not they are both definitely present within the body of paintShape, but optionally for any callers to paintShape
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
    render(shape);
    render(xPos);
}
function doAnything(obj) {
    // we can read from obj.prop 
    console.log(`prop has the value '${obj.prop}'.`);
    // but we cannot reassign it.
    obj.prop = "hello"; // cannot assign to 'prop' because it is a readonly property 
}
function visitForBirthday(home) {
    // we can read and update properties from home.resident 
    console.log(`Happy bithday ${home.resident.name}!`);
    home.resident.age++;
}
function evict(home) {
    //  but we cannot rewrite to the 'resident' property itself on a Home.
    home.resident = {
        name: "Victor",
        age: 42,
    };
}
;
let writablePerson = {
    name: "Person McPersonFace",
    age: 42,
};
// works 
let readonlyPerson = writablePerson;
console.log(readonlyPerson.age); // -> 42
writablePerson.age++;
console.log(readonlyPerson.age); // -> 43
function getStringArray() {
    const strings = ["Hello", "World", "TypeScript", "Function"];
    const stringArray = strings;
    return stringArray;
}
const myArray = getStringArray();
const secondTime = myArray[1];
console.log(myArray, secondTime);
function getReadonlyStringArray() {
    return ["Alice", "Bob", "Charlie"];
}
let myArray1 = getReadonlyStringArray();
myArray1[2] = "Mallory"; // Index signature in type 'ReadonlyStringArray' only permits reading
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? Math.pow(config.width, 2) : 20
    };
}
let mySquare = createSquare({ colour: "blue", width: 100 });
console.log(mySquare);
// notice the given arguments to createSquare is spelled colour instead of color, in plain js , this kind of things fails silently.
// getting around these checks is actually really simple, the easiest method is to just use a type assertion: 
let mySquare1 = createSquare({ width: 100, opacity: 0.5 });
// we will  discuss index signatures in a bit here we are saying s SquareConfig can have any number of properties, and ads long as they are not color or width , their types do not matter .
// one final way to get around these checks, which might be a bit surprizing . is to assign the object to another variable: since assigning SquareOPtions will not undergo excess property checks. the compiled will not give you an error:
let SquareOptions = { color: "red", width: 100 };
let mySquare2 = createSquare(SquareOptions);
// The above workaround will work as long as you have a common property between squareOptions and SquareConfig. In this example it was a property width. it will however , fail if the variable does not have any common object property . for example:
let SquareOptions1 = { colour: " red " };
let mySquare3 = createSquare(SquareOptions1);
;
const cc1 = {
    color: "red",
    radius: 42,
};
// here we have intersected Colorful and circle to produce a new type that has all the members of Colorful and Circle.
function draw1(circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}
// okay
draw1({ color: "blue", radius: 42 });
// oops
draw1({ color: "red", raidus: 42 });
let x4 = {
    contents1: "Hello World!",
};
// we could check 'x.contents1';
if (typeof x4.contents1 === "string") {
    console.log(x4.contents1.toLowerCase());
}
// or we could use  a type assertions 
console.log(x4.contents1.toLowerCase());
function setContents(box, newContents) {
    box.contents = newContents;
}
// you might read this as "A Botnet of Type is something whose concepts have Type". Later on , when we refer o Botnet we have to give type argument in place of Type.
let box;
let ThisA = { contents: "hello" };
ThisA.contents;
let ThisB = { contents: "world" };
ThisB.contents;
// this also means that can avoid overloads entirely by instead using generic functions.
function setContents5(box, newContents5) {
    box.contents = newContents5;
}
// The array Type 
// generic object types are often some sort of container type that work independently of the type of elements  they contain. it is ideal for data structures to work this way so that they are re-usable across different data types.
// it turns our we have been working with a type just like that  throughout this handbook, the Array type. Whenever we rwite out types like number[] or string[], that is really just a shorthand for Array<number> and Array<string>.
function somethingDo(value) {
    // ...
}
let myArrayT = ["hello", "world"];
// either of these work
somethingDo(myArrayT);
somethingDo(new Array("hello", "world"));
// modern Javascript also provides other data structures which are  generic, like Map<K, V>, Set<T> and promise<T>. All this really means is that because of how Map, Set and promise behave, they can work with any sets of types.
// the ReadonlyArray type 
// the ReadonlyArray is a special type that describes arrays that should not be changed.
function doStuff(values) {
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
const roArray = ["red", "green"];
// just as Ts provides a shorthand syntax for AJust as TypeScript provides a shorthand syntax for Array<Type> with Type[], it also provides a shorthand syntax for ReadonlyArray<Type> with readonly Type[].
function doStuff1(value) {
    // we can read from 'value'...
    const copy = value.slice();
    console.log(`The first value is ${value[0]}`);
    // ...but we can't mutate 'values'.
    value.push("hello!");
}
// one last thing to note is that unlike the readonly property modifier, assignability is not bidirectional between regular Array s and ReadonlyArray s.
let ta = [];
let na = [];
ta = na;
na = ta;
// here StringNumberPair is a tuple of string and number. Like ReadonlyArray, it has no representations at runtime , but is significant to Ts. To the type system, StringNumberPair describes arrays those 0 index contains a string and whose 1 index contains a number.
function dodo(pair) {
    const a = pair[0];
    const b = pair[1];
    // ...
}
dodo(["hello", 42]);
// if we try to index past the number of elements . we will get an error.
function dodo1(pair) {
    // ...
    const c = pair[2];
}
// we can also destructing tuples js's array destructing 
function dodo2(stringHash) {
    const [inputString, hash] = stringHash;
    console.log(inputString);
    console.log(inputString);
}
function setCoordinates(coord) {
    const [x, y, z] = coord;
    console.log(`Provided coordinates had ${coord.length} dimensions`);
}
const t = ["hello", 1];
const p = ["beautiful", 2, true];
const c = ["world", 3, true, false, true, false, true];
// why might optional and rest elements be useful? well it allows Ts to correspond tuples with parameter list. Tuples types can be used in rest parameters and arguments , so that the following : 
function readButtonInput(...args) {
    const [name, version, ...input] = args;
    // ...
}
// is basically equivalent to: 
function readButtonInput1(name, version, ...input) {
    // ...
}
// this is handy when you want to take a variable  number of arguments with a rest parameter, and you need a minimum number of elements , but you do not introduce intermediate variables;
// readonly tuple types
// One final note about tuple types - tuple types have readonly variants, and can be specified by sticking a readonly modifier in front of them - just like with array shorthand syntax.
function doto(pair) {
    // ...
}
// as you might expected , writing to any property of a readonly tuple is not allowed in Ts.
function eldo(pair) {
    pair[0] = "hello";
}
// tuples tend to be created and left uun-modified in most code , so annotating types as readonly tuples when possible is a good default. this is also important given that array literals with const assertions will be inferred with readonly tuple types 
let point = [3, 4];
function distanceFromOrigin([x, y]) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
distanceFromOrigin(point);
// Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple. Since point’s type was inferred as readonly [3, 4], it won’t be compatible with [number, number] since that type can’t guarantee point’s elements won’t be mutated.
