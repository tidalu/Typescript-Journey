//

// declaration merging 
interface Fruit {
    name: string
    mass: number
    color: string 
}

const Abanan: Fruit = {
    name: "banana", 
    color: "yellow", 
    mass: 123
}

// we can stack multiple things on top of each other , like :

interface Game {
    players: number
    place: string
}

const Game = {
    players: 2, 
    place: "open air"
}

export { Game }  // here it is two things satcked on top of each other  type alias, and a thing

// there is actualy tihrd thing to stack on it



class Anime {
    static createBanana(): Anime {
        return { name: "smth", color: "yellow", count: 123}
    }
}

namespace Anime {
    function createBanana(): Anime {
        // the type 
        return Anime.createBanana() // the class
    }
}

interface Anime {
    name: string
    color: string 
    count: number
}

export { Anime }
// in the thing above , we have one identifier that is three thing in one,
// a value (class)
// a type
// a namespace 
