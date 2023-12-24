// At the heart of  most programs , w have to decisions based on input , js programs are no different, but given the fact that rules can be easily introspected, those decision are also based on the type of the inputs , conditional types can help describe the relation between the types of inputs and outs;
function createLabel(nameOrId) {
    throw "unimplemented";
}
function createLabelI(idNumber) {
    throw "unimplemented";
}
let app = createLabelI("typescript");
let bpp = createLabelI(2.5);
let cpp = createLabelI(Math.random() ? "hello" : 42);
