// ==========================================
// 01_variables_and_datatypes.js
// Variables, Data Types, Primitives vs Non-Primitives
// ==========================================

// Concept: Creating Variables
// - let is used for block-scoped variables that can be reassigned
let name = "Khushi";
console.log(name);

// - const is used for block-scoped variables that cannot be reassigned
const pi = 3.14;
console.log(pi);

// Concept: Data Types
// - Primitive types include: number, string, boolean, null, undefined
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

// Concept: null vs undefined
// - null is an intentional absence of any value
let x = null;
// - undefined means a variable has been declared but not assigned a value
let y;
console.log(x);
console.log(y);

// Concept: Non-Primitive Data Types
// - Includes objects, arrays, functions, and symbols
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

// Concept: Immutable vs Mutable
// Tip: Primitive data types are immutable, meaning their state cannot be modified after creation
let str = "Hello";
str[0] = "h"; // Warning: cannot change the first character of the string
console.log(str); // still "Hello"

// - Non-primitive data types (objects, arrays, functions) are mutable
let arr = [1, 2, 3];
arr[0] = 10;
console.log(arr); // [10, 2, 3]

let obj = { name: "Khushi", age: 25 };
obj.name = "Khu";
console.log(obj); // { name: "Khu", age: 25 }

// Concept: Pass by Value vs Pass by Reference
// - Primitive types are passed by value (a copy is created)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20

// - Non-primitive types are passed by reference (points to the same memory location)
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

// Concept: Copying Values
// - Copy by value example
let a2 = 10;
let b2 = a2;
b2 = 20;
console.log(a2); // 10
console.log(b2); // 20

// - Copy by reference example
let arr3 = [1, 2, 3];
let arr4 = arr3;
arr4[0] = 10;
console.log(arr3); // [10, 2, 3]
console.log(arr4); // [10, 2, 3]
