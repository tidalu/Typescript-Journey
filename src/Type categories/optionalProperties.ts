// optional properties

// we sometimes have some properties which can sometimes have value and sometimes not, so we can have a solution for this type

var car = {
  make: "Toyota",
  model: "Corolla",
  year: 2002,
};

/**
 * Print information about a car to the console
 * @param car - the car to print
 */

function printCar1(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number; // for such moments we will use ? right after the property name , and we will give the available type like here if charge voltage is exists it will be a number, otherwise undefined
}) {
  let str = `${car.make} ${car.model} (${car.year})`;
  car.chargeVoltage;

  if (typeof car.chargeVoltage !== "undefined") // and this line is checking if the optional value is there, if yes it will make it number like : (property) chargeVoltage?: number
    str += `// ${car.chargeVoltage}v`; // this is called type guard

  console.log(str);
}
console.log(printCar(car));

// the second case of being near to optional but it has some kinda weird situation that makes it not optional, like instead of ? we can give types using pipe (|) like : number | undefined, but here is the error we will get, that even if it is undefined we will not be able to skip the unnecessary moment if we will not be using that property that is one corner case of it,


//and there is another type of error that Typescript catches for us , which is Excess property checking 

//  which means fi we have more property than declared


function printCar5(car: {
  make: string
  model: string
  year: number
  chargeVoltage?: number
  color?: string
}) {
  // implementation removed for simplicity
}
// in 2 ways we can solve this problem one is adding colos?:string
// second is make a variable object from argument, it means no one will use that, cuz it stays in the list of object, nobody will access and then pass it and then it will not be seem pointless,  
// third way is removing property

printCar5({
  make: "Tesla",
  model: "Model 3",
  year: 2020,
  chargeVoltage: 220,
  color: "RED", // <0------ EXTRA PROPERTY
// here for color, it will give us this long lines: Argument of type '{ make: string; model: string; year: number; chargeVoltage: number; color: string; }' is not assignable to parameter of type '{ make: string; model: string; year: number; chargeVoltage?: number | undefined; }'.
  // Object literal may only specify known properties, and 'color' does not exist in type '{ make: string; model: string; year: number; chargeVoltage?: number | undefined; }'.
})