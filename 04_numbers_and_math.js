// ===== TOPIC: Numbers and Math =====

// Number operations
let n1 = 10;
let n2 = 20;
let sum = n1 + n2;
console.log("Sum:", sum);

let n3 = 345.89996;
console.log("Rounded:", n3.toFixed(1)); // Round to 1 decimal place
console.log(n3.toString()); // Convert to string

let n4 = new Number(50);
console.log(n4); // Number object
console.log(typeof n4); // "object"

// Copy by value
let a2 = 10;
let b2 = a2;
b2 = 20;
console.log(a2); // 10
console.log(b2); // 20

// Copy by reference
let arr3 = [1, 2, 3];
let arr4 = arr3;
arr4[0] = 10;
console.log(arr3); // [10, 2, 3]
console.log(arr4); // [10, 2, 3]


// Math object
console.log(Math.PI);
console.log(Math.sqrt(16));
console.log(Math.pow(2, 3));
console.log(Math.random());

console.log(Math.random()); // random number between 0 and 1
console.log(Math.floor(Math.random() * 10)); // random integer between 0 and 9

// OTP generator: generates a 4 digit random number between 1000 and 9999
console.log(Math.floor(Math.random()*(9999 - 1000 + 1)) + 1000); // 4 digit OTP
