// string unions in types
const passedObj = {
    firstName: "Ssoid",
    lastName: "Ronan",
    age: 25,
};
// The naive function signature of on() might thus be: on(eventName: string, callback: (newValue: any) => void). However, in the preceding description, we identified important type constraints that we’d like to document in our code. Template Literal types let us bring these constraints into our code.
function makeWatchedObject(obj) {
}
const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});
// makeWatchedObject has added `on` to the anonymous Object
person.on("firstNameChanged", (newValue) => {
    console.log(`firstName was changed to ${newValue}!`);
});
// with this we can build something that errors when given the wrong property 
const personwe = makeWatchedObject1({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
});
personwe.on("firstNameChanged", () => { });
// Prevent easy human error (using the key instead of the event name)
personwe.on("firstName", () => { });
// It's typo-resistant
personwe.on("frstNameChanged", () => { });
const person6 = makeWatchedObject5({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
});
person6.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
person6.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
});
