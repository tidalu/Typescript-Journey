// type aliases
function printContactInfo(info) {
    console.log(info);
    console.log(info.email);
}
// we can see here couple fo things here: 
// -- the tooltip of info is now a lot cleaner and more semantic(meaningful, in connection with concept behind it)
// -- import/export of this type works jst as it would for a function or a class in javascript
// it is more important to realize the name 'UserContactInfo' is just for our convenience. this ios still a structural type system
const painter = {
    name: "Robert Ross",
    email: "bross@pbs.org",
    favoriteColor: "Titanium White"
};
printContactInfo(painter); // totally fine
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
export function maybeGetUserInfo1() {
    // implementation is the same in both examples
    if (Math.random() > 0.5) {
        return [
            "success",
            { name: "Mike North", email: "mike@example.com" },
        ];
    }
    else {
        return [
            "error",
            new Error("The coin landed on TAILS :("),
        ];
    }
}
/**
 * CLEANED UP version
 */
export function maybeGetUserInfo() {
    // implementation is the same in both examples
    if (Math.random() > 0.5) {
        return [
            "success",
            { name: "Mike North", email: "mike@example.com" },
        ];
    }
    else {
        return [
            "error",
            new Error("The coin landed on TAILS :("),
        ];
    }
}
const newYearEve = Object.assign(Object.assign({}, new Date()), { getReason: () => "Last day of the year" });
newYearEve.getReason;
// while there is not true extends keyword that can be used when defining type aliases, this pattern has a very similar effect
