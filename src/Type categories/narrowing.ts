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