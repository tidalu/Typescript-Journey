// js   already has a typeof operator you can use in an expression context:

// Prints "string"
console.log(typeof "Hello world");
// TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property:

let st = "hello";
let nt: typeof s; // let n: string


// let’s start by looking at the predefined type ReturnType<T>. It takes a function type and produces its return type:

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
    return { x: 10, y: 3 }
}

type Pr = ReturnType<f>;
// Remember that values and types aren’t the same thing. To refer to the type that the value f has, we use typeof:
type Pr1 = ReturnType<typeof f>;

// limitations

// TypeScript intentionally limits the sorts of expressions you can use typeof on.

// Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties. This helps avoid the confusing trap of writing code you think is executing, but isn’t:

// Meant to use =  ReturnType<typeof msgbox>
function msgbox(message: string) {
    return window.prompt(message, "Type 'yes' to continue") === "yes";
}
let shouldContinue: typeof msgbox("Are you sure you want to continue?");