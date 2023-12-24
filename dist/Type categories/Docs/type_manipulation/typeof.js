// js   already has a typeof operator you can use in an expression context:
// Prints "string"
console.log(typeof "Hello world");
// TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property:
let st = "hello";
let nt; // let n: string
function f() {
    return { x: 10, y: 3 };
}
// limitations
// TypeScript intentionally limits the sorts of expressions you can use typeof on.
// Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties. This helps avoid the confusing trap of writing code you think is executing, but isn’t:
// Meant to use =  ReturnType<typeof msgbox>
function msgbox(message) {
    return window.prompt(message, "Type 'yes' to continue") === "yes";
}
let shouldContinue;
("Are you sure you want to continue?");
