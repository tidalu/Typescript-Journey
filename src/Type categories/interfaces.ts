// interfaces

// they can only be used to define what we call object types

// An “object type” can be thought of as, “an instance of a class could conceivably look like this”.

// for example , string~number is not object type, cuz it makes use of the union type operator

interface UserInfo {
    name: string
    email: string
}

function  printUser(info: UserInfo) {
    info.name
}


// Like type aliases, interfaces can be imported/exported between modules just like values, and they serve to provide a “name” for a specific type.



// inheritance in interfaces 

//  If you’ve ever seen a JavaScript class that “inherits” behavior from a base class, you’ve seen an example of what TypeScript calls a heritage clause: extends

class Animal {
    eat(food) {
        consumeFood(food)
    }
}

function consumeFood(food: any) {
    throw new Error("Function not implemented.")
}

class Dog extends Animal {
    bark() {
        return "woof"
    }
}


const d = new Dog()
d.eat
d.bark


// just as in Javascript, a subclass extends from a base class
// Additionally a "sub-interface" extends from a base interface

interface Animal {
    isAlive(): boolean
}

interface Mammal extends Animal {
    getFourHairColor(): string
}

interface Dog extends Mammal {
    getBreed():string
}

function careForDog(dog:Dog){
    dog.getBreed
}


// IMPLEMENTS

// typescript adds a second heritage clause that can be used to state that given class should produce instance that confirm to a given interface: implements


interface AnimalLike{
    eat(food): void
}

// class Dog1 implements AnimalLike // uncomment this line
{ //Class 'Dog' incorrectly implements interface 'AnimalLike'.Property 'eat' is missing in type 'Dog' but required in type 'AnimalLike'.
    // bark() {
    //     return "woof"  // do uncomment this line
    // }
}
//In the example above, we can see that TypeScript is objecting to us failing to add an eat() method to our Dog class. Without this method, instances of Dog do not conform to the AnimalLike interface. Let’s update our code


interface AnimalLike1 {
    eat(food): void
}

class Dog2 implements AnimalLike {
    bark() {
        return "woof"
    }
    eat(food: any): void {
        consumeFood(food)
    }
}


// While TypeScript (and JavaScript) does not support true multiple inheritance (extending from more than one base class), this implements keyword gives us the ability to validate, at compile time, that instances of a class conform to one or more “contracts” (types). Note that both extends and implements can be used together:


class LivingOrganism {
    isAlive() {
        return true
    }
}

interface AnimalLike1 {
    eat(food): void
}
interface CanBark {
    bark(): string
}

class Dog3 
    extends LivingOrganism
    implements AnimalLike1, CanBark
    {
        bark(): string {
            return "Woof"
        }
        eat(food) {
            consumeFood(food)
        }
    }

    // while  it is possible to use implements with type aliases, if the type ever breaks the object type rules there is some potential problems 

    type CanBark1 = 
        // | number // to check do uncomment this line
        | {
            bark(): string
        }

    class Dog4 implements CanBark1 { // we got err: A class can only implement an object type or intersection of object types with statically known members; union operator breaks the rule of object type
        bark(){
            return "woof"
        }
        eat(food) {
            consumeFood(food)
        }
    }


    // For this reason, it is best to use interfaces for types that are used with the implements heritage clause.


    // open interfaces 
    // TypeScript interfaces are “open”, meaning that unlike in type aliases, you can have multiple declarations in the same scope:


    interface AnimLike {
        isAlive(): boolean
    }

    function feed(animal: AnimLike) {
        animal.eat

        animal.isAlive
    }

    // second declaration of the same name

    interface AnimLike {
        eat(food):void
    }

    // These declarations are merged together to create a result identical to what you would see if both the isAlive and eat methods were on a single interface declaration.

    // You may be asking yourself: where and how is this useful?

// Imagine a situation where you want to add a global property to the window object


window.document// an existing property


window.exampleProperty = 42


// tels TS that `exampleProperty` exists

interface Window {
    exampleProperty: number
}


// What we have done here is augment an existing Window interface that TypeScript has set up for us behind the scene.


// which one to use

//  In many situations, either a type alias or an interface would be perfectly fine, however…

// --- 1. If you need to define something other than an object type (e.g., use of the | union type operator), you must use a type alias

// --- 2. If you need to define a type to use with the implements heritage term, it’s best to use an interface

// --- 3. If you need to allow consumers of your types to augment them, you must use an interface. 



// recursive types 

// Recursive types, are self-referential, and are often used to describe infinitely nestable types. For example, consider infinitely nestable arrays of numbers: 

;[3, 4, [5, 6, [7], 59], 221]

// You may read or see things that indicate you must use a combination of interface and type for recursive types. As of TypeScript 3.7 this is now much easier, and works with either type aliases or interfaces: 

type NestedNumbers = number | NestedNumbers[]

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

if(typeof val !== "number") {
    val.push(41) // inference: (method) Array<NestedNumbers>.push(...items: NestedNumbers[]): number
    // Appends new elements to the end of an array, and returns the new length of the array.
    
    // @param items — New elements to add to the array.

    // val.push("this will not work") // Argument of type 'string' is not assignable to parameter of type 'NestedNumbers'. to solve we should add string to the type of the nestedNumbers
}