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

// notice that on listens the event "firstNameChanged", not just "firstName". Our  naive specification of on() could made more robust if we were to ensure that the set of eligible event  names was constrained by the union of attribute names in the watched object with "Changed" added at the end. While  we are comfortable with doing such a calculation in in Javascript i.e. Object.keys(passedObject).map(x => `${x}Changed`), template literals inside in the type system provide a similar approach to string manipulation

type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;

};

// create a "watched object with an 'on' method "
/// so that you can watch for changes to properties 
declare function makeWatchedObject1<Type>(obj: Type): Type & PropEventSource<Type>;


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


// interface with Template literals 

// Notice that we did not benefit from all the information provided in the original passed object. Given change of a firstName (i.e. a firstNameChanged event), we should expect that the callback will receive an argument of type string. Similarly, the callback for a change to age should receive a number argument. We’re naively using any to type the callback’s argument. Again, template literal types make it possible to ensure an attribute’s data type will be the same type as that attribute’s callback’s first argument.

// The key insight that makes this possible is this: we can use a function with a generic such that:

// The literal used in the first argument is captured as a literal type
// That literal type can be validated as being in the union of valid attributes in the generic
// The type of the validated attribute can be looked up in the generic’s structure using Indexed Access
// This typing information can then be applied to ensure the argument to the callback function is of the same type


type PropEventSource3<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject5<Type>(obj: Type): Type & PropEventSource3<Type>;

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
})

// Here we made on into a generic method.

// When a user calls with the string "firstNameChanged", TypeScript will try to infer the right type for Key. To do that, it will match Key against the content before "Changed" and infer the string "firstName". Once TypeScript figures that out, the on method can fetch the type of firstName on the original object, which is string in this case. Similarly, when called with "ageChanged", TypeScript finds the type for the property age which is number.

// Inference can be combined in different ways, often to deconstruct strings, and reconstruct them in different ways.


// intrinsic String Manipulation types

// to help with string Manipulation, Ts includes a set of types which can be used in string manipulation. These types come built in to  the compiler  for performance  and cant be found in the .d.ts files included with typescript .

// UpperCase<string>

// converts each character in the string to the uppercase  version

type Greeting = "Hello World"

type ShoutGreeting = Uppercase<Greeting>;

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ACIICacheKey<"my_app">


// Lowercase<String type>

// converts each character in the string to the lower case equivalent 

type GreetingLower = "Hello, world"
type QuietGreeting = Lowercase<GreetingLower>

type ASCIICacheKeyLower<Str extends string> = `id-${Lowercase<Str>}`
type MainIDLower = ASCIICacheKeyLower<"MY_APP">


// Capitalize<StringType>
// Converts the first character in the string to an uppercase equivalent.

type LowercaseGreeting = "hello, world";
type GreetingCap = Capitalize<LowercaseGreeting>;


// Uncapitalize<StringType>
// Converts the first character in the string to a lowercase equivalent.


type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
