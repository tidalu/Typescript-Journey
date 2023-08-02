type World = "World";

type Gereeting = `hello ${World}`;

// when a union is used in the interpolated position, the type is the set of  every possible string literal that could be presented by each union member: 

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// for each interpolated position in the template literal , the unions are cross multiplied 

type AllLocaleID1s = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type Lang = "eng" | "js" | "pt" | "uz";

type LocaleMessageIds = `${Lang}_${AllLocaleIDs}`;

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
