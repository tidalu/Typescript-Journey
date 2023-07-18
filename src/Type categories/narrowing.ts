// narrowing 


// imagine we have a function called padLeft.

function padLeft( padding: number | string , input: string): string {
    throw new Error("Not implemented yet ");
}

// If padding is a number, it will treat that as the number of spaces we want to prepend to input. If padding is a string, it should just prepend padding to input. Let’s try to implement the logic for when padLeft is passed a number for padding.

function padLeft1(padding: number | string , input: string ) {
    return " ".repeat(padding) + input
} // Argument of type 'string | number' is not assignable to parameter of type 'number'.
//   Type 'string' is not assignable to type 'number'.

// Uh-oh, we’re getting an error on padding. TypeScript is warning us that we’re passing a value with type number | string to the repeat function, which only accepts a number, and it’s right. In other words, we haven’t explicitly checked if padding is a number first, nor are we handling the case where it’s a string, so let’s do exactly that.

function padLeft3( padding: number | string, input: string ) {
    if(typeof padding == "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}

// there are couple of difere constructor ts understans for narrowing.

// typeof  type guards 

// As we’ve seen, JavaScript supports a typeof operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

// ---- "string" ---
// ---- "number" ---
// ---- "bigint" ---
// ---- "boolean" ---
// ---- "symbol" ---
// ---- "undefined" ---
// ---- "object" ---
// ---- "function" ---



// In TypeScript, checking against the value returned by typeof is a type guard. Because TypeScript encodes how typeof operates on different values, it knows about some of its quirks in JavaScript. For example, notice that in the list above, typeof doesn’t return the string null. Check out the following example:

function printAll( strs: string | string[] | null ) {
    if(typeof strs === "object"){
        for( const s of strs ) { // saying strs is possibly null , cuz typeof null also returns "OBJECT"
            console.log( s );
        }
    } else if( typeof strs === "string" ) {
        console.log(strs);
    } else {
        // do nothing
    }
}

// n the printAll function, we try to check if strs is an object to see if it’s an array type (now might be a good time to reinforce that arrays are object types in JavaScript). But it turns out that in JavaScript, typeof null is actually "object"! This is one of those unfortunate accidents of history.

// Users with enough experience might not be surprised, but not everyone has run into this in JavaScript; luckily, TypeScript lets us know that strs was only narrowed down to string[] | null instead of just string[].

// This might be a good segue into what we’ll call “truthiness” checking.

// truthiness narrowing 

// In JavaScript, we can use any expression in conditionals, &&s, ||s, if statements, Boolean negations (!), and more. As an example, if statements don’t expect their condition to always have the type boolean.
function getUsersOnlineMessage( numsUsersOnline: number ) {
    if( numsUsersOnline ) {
        return `There are ${numsUsersOnline} online now!`
    } 
    return "Nobody is here. :("
}

// in js constructors like if first coerce their conditions to boolean s to maake sense of them, and then shoose their branches depending on whether the result is true or false, value like: 
// ----> 0
// ----> NaN
// ----> "" (the empty string)
// ----> 0n (the bigint version of zero)
// ----> null
// ----> undefined

// both results of these in true 
Boolean("Hello"); // true 
!!"World"; // true 

// it is fairly popular  to leverage this behavior, espescialyy for guaarding against values like null or undedfined
// as an example let's try  using it for our printAll function

function printAll1(strs : string | string[] | null ) {
    if(strs && typeof strs === "object"){ // we are checking the strs is also truthy 
        for(const s of strs ) {
            console.log(s)
        }
    } else if ( typeof  strs  == "string" ) {
        console.log(strs);
    }
} // by this we get rid of error: TypeError: null is not iterable

// Keep in mind though that truthiness checking on primitives can often be error prone. As an example, consider a different attempt at writing printAll


function printAll2( strs : string | string[] | null ) {
    // do not do this 
    if(strs) { // We wrapped the entire body of the function in a truthy check, but this has a subtle downside: we may no longer be handling the empty string case correctly.
        if(typeof strs === "object") {
            for(const s of strs ) {
                console.log(s)
            }
        }else{
            if( typeof strs == "string"){
                console.log(strs)
            }
        }
    }
} 

// one last word on narrowing by truthiness is that Boolean negation with ! filter out from negated branches.

function multiplyAll(
    values: number[] | undefined , 
    factor: number 
): number[] | undefined {
    if(!values) {
        return values ;
    } else {
        return values.map((x) => x * factor )
    }
}

// till equality narrowing 

// typescript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. for ex:
function example(x: string|number, y: string | boolean ) {
    if( x === y) {
        // we can call any string method on x or y
        x.toUpperCase();
        y.toUpperCase();
    } else {
        console.log(x);
        console.log(y);
    }
}

// another example

function printAll3( strs: string | string[] | null ) {
    if ( strs !== null ) {
        if ( typeof strs === "object" ) {
            for( const s of strs ) {
                console.log(s);
            }
        } else if ( typeof strs === "string" ) {
            console.log(strs)
        }
    }
}

// JavaScript’s looser equality checks with == and != also get narrowed correctly. If you’re unfamiliar, checking whether something == null actually not only checks whether it is specifically the value null - it also checks whether it’s potentially undefined. The same applies to == undefined: it checks whether a value is either null or undefined.


interface Container {
    value: number | null | undefined;
}

function multiplyValue( container: Container, factor:number ) {
    // remove both 'null' and 'undefined' from the type 
    if( container.value != null ) {
        console.log( container.value ) 


        // now we can safely multiply container.value
        container.value *= factor
    }
}

// The in operator narrowing 

// Javascript has an operator for determining if an object or its prototype chain has a property with name: the in operator. Typescropt takes this into account as a way to narrow down potential types.

// for example, with code: "value" in x. where "value" is a string literal and x is an union type. the true branch narrow x's type which have either  an optional or required property  value, missing property value.

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move ( animal: Fish | Bird ) {
    if( "swim" in animal ) {
        return animal.swim(;)
    }

    return animal.fly();
}

// to reiterate, optional will exist in both sides for narrowing. for example  a human could swim and fly ( wiht the right equipment ) and thus should show up in both sides of the in check:

type Fish1 = { swim: () => void };
type Bird1 = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move( animal: Fish | Bird | Human ) {
    if( "swim" in animal ) {
        animal;
    } else {
        animal;
    }
}

// instanceof narrowing 

// Js  has an operator for checking whether or not value is an "instance" of another value. More specifically, in Js x instanceof Foo checks whether the prototype chain of x contains Foo.prototype. While we wont dive deep here, and you'll see more of this when we get into classes, they can still be useful for most values values that can be constucted with new. As you might have guessed, instanceof is also a type guard, and TS narrows in branches guarded by instanceof s.


function logValue( x: Date | string ) {
    if ( x instanceof Date ) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase())
    }
}

//  assignments 


// when we assign any varible, Ts looks at the right side of the assignment and narrows the left side appropriatly.
 let x = Math.random() < 0.5 ? 10 : "Hello world!"

 x = 1;

 console.log(x);

x = "Goodbye";

console.log(x);

// / Notice  that each of these assignments is valid. Even though the ovserved type of x changed to Number after our first assignment, we were still able to assign a string to x.
// This is because  the declared type of x - the type that x started with string | number, and assignability is always checked against declared type.

// if we'd  assigned to boolen to x , we'd have seen an error since that was not part if the declared type. 

let y = Math.random() < 0.5 ? 10 : "hellow world";

y = 1;
console.log(x);

x = true; // type boolen is not assignable to type string | number;

console.log(x);

//  control flow analysis 

// up until this point, we have gone through some basic examples of how narrows within specific branches, But there's a bit more going on than just walking  up from every variable and looking for gurads in if's , while's condintionals , etc. for example 

function padLeft2( padding: number | string, input: string ) {
    if ( typeof padding === "number" ) {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}

// padLeft returns from within its first if block. TypeScript was able to analyze this code and see that the rest of the body (return padding + input;) is unreachable in the case where padding is a number. As a result, it was able to remove number from the type of padding (narrowing from string | number to string) for the rest of the function.
// this analysis of code based or reachability is called control flow analysis, and typescript uses this flwo analysis to narrow types it encounters type guards and assignments. when a variable can be observed to have a different type at each point.

function example1 () {
    let x: string | number | boolean;

    x = Math.random() < 0.5;
    console.log(x)


    if( Math.random() < 0.5 ) {
        x = "hello";
        console.log(x);
    } else {
        x = 100;
        console.log(x)
    }

    return x;


}

// using type predicates

// we have worked with existing  js constructors to handle narrowing so far, however sometimes you want more direct control over how types changes throughout you code. to define a user-defined type gurad, we simply need a fn whose return type is type predicate;

function isFish ( pet: Fish | Bird ) : pet is Fish {
    return ( pet as Fish ).swim !== undefined;
}

// pet is Fish is our type predicate in this example. A predicate takes the form parameterName is Type, where parameterName must  be the name of a parameter from the current function signature.

// Any time isFish is called with some variable, Ts will narrow that variable to that specific type if the original type is compatible.
