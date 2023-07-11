// @noImplicitAny: false
/**
 *
 * @param a {number}
 * @param b {number}
 */

function add1(a, b) {
  /* @type {number} */
  return a + b;
}
// here it can get anything , and it may represent itself as any

///---- cut ----
const result1 = add1(3, "4"); // type result : any
// const p = new Promise(result1);
///

// Objects, Arrays and Tuples

// objects

// in general object types are defined by :
// the names of the properties that are (or maybe) present
// the types of those properties


// that we could describe the objects structure
// {
//     make: string,
//     model: string,
//     year: number
// }

let typesCar: {
  make: string;
  model: string;
  year: number;
};

/**
 * Print information about a car to the console
 * @param car - the car to print
 */
function printCar(car: { make: string; model: string; year: number }) {
  return `${car.make} ${car.model} (${car.year})`;
}

console.log(printCar(car));
