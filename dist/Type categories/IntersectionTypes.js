// intersection types in typescript 
// intersection types in Typescript can be described using the &(ampersand) operator.
// for example what if we had a Promise, that had extra starTime and endTime properties added to it?
function makeWeek() {
    // ⬅ return type
    const start = new Date();
    const end = new Date(start.valueOf()); // + ONE_WEEK)  // one week is actually should be added
    return Object.assign(Object.assign({}, start), { end }); // kind of object assign
}
const thisWeek = makeWeek();
thisWeek.toISOString();
thisWeek.end.toISOString();
