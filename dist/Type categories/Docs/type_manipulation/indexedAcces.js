// we can use an indexed access type to look up a specific property on another type:
// Another example of indexing with an arbitrary type is number to get the type of an array's elements. we an combine this with typeof to conveniently capture the element type of an array literal:
const myAra = [
    { name: "alice", age: 43 },
    { name: "alice1", age: 33 },
    { name: "alice2", age: 23 },
];
// you can only use types when indexing , meaning you cannt use a const to make a variable reference:
const key = "age";
