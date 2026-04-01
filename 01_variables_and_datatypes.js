// ===== TOPIC: Variables and Datatypes =====

// Create a variable
let name = "Khushi";
console.log(name);

// Constant variable
const pi = 3.14;
console.log(pi);

// Primitive data types: number, string, boolean, null, undefined
let age = 25;
let isStudent = true;
let grade = 'A';
let address = null;
let phoneNumber = undefined;
console.log(age);
console.log(isStudent);
console.log(grade);
console.log(address);
console.log(phoneNumber);

// null vs undefined
let x = null; // explicitly assigned null
let y; // undefined by default
console.log(x);
console.log(y);

// Non-primitive data types
let person = {
    name: "Khushi",
    age: 25,
    isStudent: true
};
console.log(person);

let numbers = [1, 2, 3, 4, 5];
console.log(numbers);
console.log(typeof numbers);

function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Khushi"));

let symbol = Symbol("description");
console.log(symbol);

// Immutable vs mutable data types

// Immutable data types: primitive types
let str = "Hello";
str[0] = "h"; // cannot change string characters directly
console.log(str); // still "Hello"

// Mutable data types: object, array, function
let arr = [1, 2, 3];
arr[0] = 10;
console.log(arr); // [10, 2, 3]

let obj = { name: "Khushi", age: 25 };
obj.name = "Khu";
console.log(obj); // { name: "Khu", age: 25 }

// Pass by value vs pass by reference

// Pass by value (Primitive types)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20

// Pass by reference (Non-primitive types)
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2[0] = 10;
console.log(arr1); // [10, 2, 3]
console.log(arr2); // [10, 2, 3]

let obj1 = { name: "Khushi", age: 25 };
let obj2 = obj1;
obj2.name = "Khu";
console.log(obj1); // { name: "Khu", age: 25 }
console.log(obj2); // { name: "Khu", age: 25 }
