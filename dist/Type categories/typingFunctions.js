// The : foo syntax we’ve just seen for variable type annotations can also be used to describe function arguments and return values. In this example it’s not clear, even from the implementation of the function, whether add should accept numbers or strings.
function add(a, b) {
    return a + b; //strings? numbers? a mix?
}
const result = add(3, '4'); // my editor think of that function add(a: any, b: any): any
// and even result 
console.log(result); // const result: any
// if we want too specifically state a return type , we could do so using the :foo syntax in one more place
function add2(a, b) {
    return a + b;
}
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
add2(3, add2(5, 1));
