// union types


// Union and intersection types can conceptually be thought of as logical boolean operators (AND, OR) as they pertain to types. Let’s look at this group of two overlapping sets of items as an example:

// A union type has a very specific technical definition that comes from set theory, but it’s completely fine to think of it as OR, for types.

// Intersection types also have a name and definition that comes from set theory, but they can be thought of as AND, for types.

// In the same diagram above, if we wanted fruits that are also sour (Fruit AND Sour) we’d end up only getting { Lemon, Lime, Grapefruit }.

// Union types in typescript 

// union types can be described using the |(pipe) operator

// if we had a type that could be one of two strings, "success" or "error", we could define it as

// "success"|"error";

// for example, the flipCoin() function will return "Heads" if a number selector from(0, 1) is >= 0.5, or "tails" if <= 0.5

function flipCoin():"heads"|"tails" {
    if(Math.random() > 0.5) return "heads"
    return "tails"
}

const outcome = flipCoin();
// inference is : const outcome: () => "heads" | "tails"


// Let’s make this a bit more interesting by using tuples, that is structured as follows:

    // [0] either "success" or "failure"
    // [1] something different, depending on the value found in [0]

            // "success" case: a piece of contact information: { name: string; email: string; }
            // "error" case: an Error instance

function maybeGetUserInfo():
    | ["error", Error]
    | ["success", {name: string; email:string}]  {
        if(flipCoin() === "heads" ) {
            return [
                "success", 
                {
                    name: "Mike North",  email: "mike@example.com"
                },
            ]
        }else{
            return [
                "error", 
                new Error("The contain landed on tails:("), 
            ]
        }
    }


    var outcome1 = maybeGetUserInfo()

    // this type is significantly more interesting.

    // working with union types 

    // Let’s continue with our example from above and attempt to do something with the “outcome” value.

    // First, let’s destructure the tuple and see what TypeScript has to say about its members


    outcome1 = maybeGetUserInfo()

    const[first, second] = outcome1

    first//if we put dot we will see the autocompletion // const first: "error" | "success"


    second//if we put dot we will see the autocompletion 
            /**const second: Error | {
            name: string;
            email: string;
            } */


// We can see that the autocomplete information for the first value suggests that it’s a string. This is because, regardless of whether this happens to be the specific "success" or "error" string, it’s definitely going to be a string.

// The second value is a bit more complicated — only the name property is available to us. This is because, both our “user info object, and instances of the Error class have a name property whose value is a string.

// What we are seeing here is, when a value has a type that includes a union, we are only able to use the “common behavior” that’s guaranteed to be there.

// --------narrowing with type guards

// Ultimately, we need to “separate” the two potential possibilities for our value, or we won’t be able to get very far. We can do this with type guards.

// Type guards are expressions, which when used with control flow statement, allow us to have a more specific type for a particular value.

// I like to think of these as “glue” between the compile time type-checking and runtime execution of your code. We will work with one that you should already be familiar with to start: instanceof.

outcome1 = maybeGetUserInfo()
const [alpha, beta] = outcome1
                

if (beta instanceof Error) {
  // In this branch of your code, beta is an Error
    beta
} else {
  // In this branch of your code, beta is the user info
    beta
}


// TypeScript has a special understanding of what it means when our instanceof check returns true or false, and creates a branch of code that handles each possibility.

// It gets even better…



// Discriminated Unions 

const outcome2 = maybeGetUserInfo()

if(outcome2[0] === "error"){
    // in this branch of your code, second is an Error
    outcome2
}else{
    // in this branch of you code, second is the user info 
    outcome2
}

// TypeScript understands that the first and second positions of our tuple are linked. What we are seeing here is sometimes referred to as a "discriminated" or “tagged” union type.


