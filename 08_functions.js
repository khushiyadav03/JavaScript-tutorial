// ===== TOPIC: Functions =====

// Basic functions
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Khushi"));


// Parameters vs arguments (a and b are params, 5 and 10 are args)
function add(a, b) {
    return a + b;
}
console.log(add(5, 10)); // 5 and 10 are arguments

// Default parameters
function greetWithDefault(name = "Guest") {
    return "Hello, " + name + "!";
}
console.log(greetWithDefault()); // "Hello, Guest!"
console.log(greetWithDefault("Khushi")); // "Hello, Khushi!"

// Default values
function multiply(a, b = 1) {
    return a * b;
}
console.log(multiply(5)); // 5, because b defaults to 1
console.log(multiply(5, 2)); // 10, because b is provided as 2

// Rest operator (combines arguments into array)
function summm(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(summm(1, 2, 3)); // 6
console.log(summm(4, 5)); // 9

// Spread operator (expands array elements)
const arr24 = [1, 2, 3];
const arr25 = [...arr24, 4, 5];
console.log(arr25); // [1, 2, 3, 4, 5]

// Spread expands arrays; Rest collects arguments

// Function declaration (hoists so can be called early)
function sayHello() {
    return "Hello!";
}
console.log(sayHello()); // "Hello!"

// Function expression (No hoisting)
const sayHi = function() {
    return "Hi!";
}
console.log(sayHi()); // "Hi!"

// Arrow functions
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 10)); // 15
const greetArrow = name => "Hello, " + name + "!";
console.log(greetArrow("Khushi")); // "Hello, Khushi!"

// Arrow implicit return
const square = x => x * x;
console.log(square(5)); // 25

// Arrow single parameter
const double = x => x * 2;
console.log(double(5)); // 10

// Arrow return object (wrap in parentheses)
const createPerson = (name, age) => ({ name: name, age: age });
console.log(createPerson("Khushi", 25)); // { name: "Khushi", age: 25 }

// Calling arrow function
const numbers = [1, 2, 3];
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9]

// IIFE (Immediately Invoked Function Expression) creates private scope
(function() {
    console.log("This is an IIFE!");
})();

// Arrow function IIFE
(() => {
    console.log("This is an arrow function IIFE!");
})();

// Callback function runs after task finishes
function fetchData(callback) {
    setTimeout(() => {
        const data = "Data fetched!";
        callback(data);
    }, 2000);
}
fetchData(function(result) {
    console.log(result); // "Data fetched!" after 2 seconds
});

// Use callbacks for buttons, APIs and non-blocking tasks

// Callbacks enable Javascript's asynchronous programming
