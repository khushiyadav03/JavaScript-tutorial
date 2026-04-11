// ==========================================
// 04_functions.js
// Function Types, Parameters, Scope, Callbacks
// ==========================================

// Concept: Basic Functions
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Khushi"));

// Concept: Parameters vs Arguments
// - Parameters are variables listed in function definition
function add(a, b) { 
    return a + b;
}
// - Arguments are the actual values passed
console.log(add(5, 10)); 

// Concept: Default Parameters
function greetWithDefault(name = "Guest") {
    return "Hello, " + name + "!";
}
console.log(greetWithDefault()); // "Hello, Guest!"
console.log(greetWithDefault("Khushi")); // "Hello, Khushi!"

// - Default values
function multiply(a, b = 1) {
    return a * b;
}
console.log(multiply(5)); // 5, because b defaults to 1
console.log(multiply(5, 2)); // 10, because b is provided as 2

// Concept: Rest Operator
// - Gathers remaining arguments into a single array
function summm(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(summm(1, 2, 3)); // 6
console.log(summm(4, 5)); // 9

// Concept: Spread Operator
// - Expands elements of an iterable into individual elements
const arr24 = [1, 2, 3];
const arr25 = [...arr24, 4, 5];
console.log(arr25); // [1, 2, 3, 4, 5]

// Concept: Function Declarations vs Expressions
// - Declarations are hoisted and can be called before defined
function sayHello() {
    return "Hello!";
}
console.log(sayHello()); // "Hello!"

// - Expressions are assigned to variables and are NOT hoisted
const sayHi = function() {
    return "Hi!";
}
console.log(sayHi()); // "Hi!"

// Concept: Arrow Functions
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 10)); // 15
const greetArrow = name => "Hello, " + name + "!";
console.log(greetArrow("Khushi")); // "Hello, Khushi!"

// - Implicit Return
const square = x => x * x;
console.log(square(5)); // 25

// - Single Parameter
const double = x => x * 2;
console.log(double(5)); // 10

// - Returning Object
// Warning: Must wrap object in parentheses
const createPerson = (name, age) => ({ name: name, age: age });
console.log(createPerson("Khushi", 25)); // { name: "Khushi", age: 25 }

// - Calling Arrow Function
const numbersss = [1, 2, 3];
const squaredNumbers = numbersss.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9]

// Concept: IIFE (Immediately Invoked Function Expression)
// - Executes immediately to create new scope and prevent polluting global space
(function() {
    console.log("This is an IIFE!");
})();

// - Arrow function IIFE
(() => {
    console.log("This is an arrow function IIFE!");
})();

// Concept: Callbacks
// Tip: A function passed as an argument to another, often used for async code
function fetchData(callback) {
    setTimeout(() => {
        const data = "Data fetched!";
        callback(data);
    }, 2000);
}
fetchData(function(result) {
    console.log(result); // "Data fetched!" after 2 seconds
});
