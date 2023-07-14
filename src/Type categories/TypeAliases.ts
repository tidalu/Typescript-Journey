// type aliases

// Interfaces anf type aliases are a way we can give a friendly name to our types

// type aliases help to address this, by allowing us to :
// -- define a more meaningful name for this type.
// -- declare the particular of the type ina single place
// -- import and export this type from modules, the same as if it were an exported value


import { UserContactInfo  } from "./typesModule";


function printContactInfo(info: UserContactInfo) {
    console.log(info)
    console.log(info.email)
}

// we can see here couple fo things here: 

// -- the tooltip of info is now a lot cleaner and more semantic(meaningful, in connection with concept behind it)
// -- import/export of this type works jst as it would for a function or a class in javascript

// it is more important to realize the name 'UserContactInfo' is just for our convenience. this ios still a structural type system


const painter = {
    name: "Robert Ross",
    email: "bross@pbs.org", 
    favoriteColor: "Titanium White"
}


printContactInfo(painter) // totally fine

// Let’s look at the declaration syntax for a moment:

type UserContactInfo1 = {
    name: string
    email: string
}


// a few things to point out here:

// --- 1. this is a rare occasion where we see type  information on the right hand side of the assignment operator (=) 

// --- 2. We’re using TitleCase to format the alias’ name. This is a common convention

// --- 3. As we can see below, we can only declare an alias of a given name once within a given scope. This is kind of like how a let or const variable declaration works

type contactInfo = {
    name: string
    mobile: number
}

// type contactInfo = {  // if u uncomment this u will see that we cannot declare the same name twice
//     fail: "this will not work"
// }

// A type alias can hold any type, as it’s literally an alias (name) for a type of some sort.

// Here’s an example of how we can “cleaned up” an the code from our Union and Intersection Types section (previous chapter) through the use of type aliases:



///////////////////////////////////////////////////////////
// @filename: original.ts
/**
 * ORIGINAL version
 */
export function maybeGetUserInfo1():
    | ["error", Error]
    | ["success", { name: string; email: string }] {
  // implementation is the same in both examples
    if (Math.random() > 0.5) {
    return [
        "success",
        { name: "Mike North", email: "mike@example.com" },
    ]
    } else {
    return [
        "error",
        new Error("The coin landed on TAILS :("),
    ]
    }
}
    
///////////////////////////////////////////////////////////
// @filename: with-aliases.ts
type UserInfoOutcomeError = ["error", Error]
type UserInfoOutcomeSuccess = [
    "success",
    { name: string; email: string }
]
type UserInfoOutcome =
    | UserInfoOutcomeError
    | UserInfoOutcomeSuccess
    
/**
 * CLEANED UP version
 */
export function maybeGetUserInfo(): UserInfoOutcome {
  // implementation is the same in both examples
    if (Math.random() > 0.5) {
    return [
        "success",
        { name: "Mike North", email: "mike@example.com" },
    ]
    } else {
    return [
        "error",
        new Error("The coin landed on TAILS :("),
    ]
    }
}

// inheritance in type aliases

// you can create  type aliases that combine existing types with new behavior by using intersection(&)types.

type SpecialDate = Date & { getReason(): string}

const newYearEve: SpecialDate= {
    ...new Date(), 
    getReason: () => "Last day of the year", 
}
newYearEve.getReason

// while there is not true extends keyword that can be used when defining type aliases, this pattern has a very similar effect

