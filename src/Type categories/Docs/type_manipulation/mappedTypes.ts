// when u do not want to repeat yourself , sometimes a  type needs to be based on another type.
// mapped types build on the syntax  for index signatures, which are used to declare the types of properties which have not beed declared ahead of time:

type OnlyBooleansAndHorses = {
    [key: string]: boolean | Horse;
}

const conforms: OnlyBooleansAndHorses = {
    del: true,
    rodney: false,
}

// A mapped types is a generic type which uses a union of propertyKeys frequently created via keyof to iterate through keys to create a type:

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};


// in this example, OptionsFlags will take all the properties from the type Type and change their values to be a boolean;

type features = {
    darkMode: () => void;
    newUserProfiles: () => void;

};

type FeatureOptions = OptionsFlags<features>;


// mapping modifiers 

// there are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionally respectively;

// you cannot remove or add these modifiers by prefixing with - or +. If you do not add a prefix then + is assumed; 

// Removes readonly attribute from a type's properties 
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
}

type UnlockedAccount = CreateMutable<LockedAccount>


// removes 'optional' attributes from a type's properties 

type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};


type MaybeUser = {
    id: string;
    name?: string;
    age?: string;
};

type UserBoy = Concrete<MaybeUser>;

// Key mapping via as
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}


// You can leverage features like template literal types to create new property names from prior ones:
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Persoon {
    name: string;
    age: number;
    location: string;

}

type LazyPerson = Getters<Persoon>;


// we can filter out the heys by producing never via a conditional type:

// remove the kind property 

type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
}

interface Circel {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circel>;

// you can map over arbitrary unions, not just unions of string|number|symbol, but unions of any types

type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>

// further explorations

// Mapped types work very well with other features in this type Manipulation section, for example here is a mapped type using a conditional type which returns either a true or false depending on whether an object has the property pii set to the literal true:

type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true};
}

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;