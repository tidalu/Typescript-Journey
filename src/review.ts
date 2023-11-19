
type manufacturer = {
    make: string , 
    model: string, 
    year: number
}

let object : manufacturer = {
    make: "Toyota", 
    model: "Gtr", 
    year: 2001
};


function getObj( input: manufacturer ) : [string, string | number ][] {
    return Object.entries(input)
}

function getKeys( input : manufacturer ) : string[] {
    return Object.keys(input);
}

function getValues( input : manufacturer ) : (string|number)[] {
    return Object.values(input)
}

console.log( getObj(object) )
console.log( getKeys(object) )
console.log( getValues(object) )

let lasetti : {
    narxi: string, 
    yili: string, 
    feedback: string
} = {
    narxi : "o'ta qimmat", 
    yili :"eski", 
    feedback : "chirigan"
}


function print( car : {
    new: number, 
    old: string
}) {
    return car
}


console.log(print({
    new: 23, 
    old: "yangi toyota"
}))


// optional properties

// just set ? 

function optional(questions : {
    ism: string, 
    yosh: number, 
    jins: string, 
    dini?: string, 
}) : string {
    return `${questions.dini ? questions.dini : "this key is not available"}`
}

console.log(optional({
    ism:"name", 
    yosh: 23, 
    jins:"sex",
    // dini: "ISLAM"
}))


type FullObj = {
    [key : string | number ] : {
        name: string;
        age : number;
    };
};

var elif : FullObj = {
    hello : {
        name: "alfa",
        age: 67,
    },
    23 : {
        name : "alpha", 
        age: 45,
    }, 
    59 : {
        name: "", 
        age: 87,
    }
}

function takeAndCheck(obj: FullObj): string[] | {name: string; age: number }[] | [string , { name: string; age: number }][] {
    const entries = Object.values(obj);
    return entries;
}

console.log(takeAndCheck(elif)) 

const cars1  : {
    make : string;
    model: string;
    year: number;
}[]
    = [
        {
            make: "toyota", 
            model: "corolla", 
            year: 2002, 
        }
    ]

console.log(cars1)

// tuples


let myCar11 = [ 2002, "Toyota", "corolla"]

var tuple : [number, number, string] = [
  2002, 
  2003, 
  "stop here", 
]


tuple = [2003, 2003, "sting"]

tuple.push("hello");

console.log(tuple.length);

function foo(x) {
    // 
}



function flipCoin1(): "heads" | "tails" {
  return Math.random() > 0.5 ? "heads" : "tails";
}

const coinOutcome = flipCoin1();
console.log(coinOutcome)

function maybeGetUserInfo1():
  ["error", Error] | ["success", { name: string; email: string }] {
  if (coinOutcome === "heads") {
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

const outcome11 = maybeGetUserInfo1();
console.log(outcome11)