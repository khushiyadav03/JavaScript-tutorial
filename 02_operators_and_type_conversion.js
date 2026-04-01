// ===== TOPIC: Operators and Type Conversion =====

// Arithmetic operators
let num1 = 10;
let num2 = 5;
console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
console.log(num1 % num2);

// Assignment operators
let x1 = 10;
x1 += 5;
console.log(x1); // 15
x1 -= 3;
console.log(x1);
x1 *= 2;
console.log(x1);
x1 /= 4;
console.log(x1);
x1 %= 3;
console.log(x1);

// Comparison operators
let a1 = 10;
let b1 = 20;
console.log(a1 == b1);
console.log(a1 != b1);
console.log(a1 > b1);
console.log(a1 < b1);
console.log(a1 >= b1);
console.log(a1 <= b1);

// Difference between == and ===
let num3 = 10;
let strNum = "10";
console.log(num3 == strNum); // true (type coercion)
console.log(num3 === strNum); // false (strict type check)

// Logical operators
let isTrue = true;
let isFalse = false;
console.log(isTrue && isFalse);
console.log(isTrue || isFalse);
console.log(!isTrue);

// Type conversion
let num4 = 10;
let strNum2 = String(num4);
console.log(strNum2);
console.log(typeof strNum2);

let strNum3 = "20";
let num5 = Number(strNum3);
console.log(num5);
console.log(typeof num5);

let boolValue = Boolean(1);
console.log(boolValue);
console.log(typeof boolValue);

// Handling NaN (Not a Number)
let result = 0 / 0;
console.log(result); // NaN
console.log(typeof result); // "number"

let invalidNumber = Number("abc");
console.log(invalidNumber);
console.log(typeof invalidNumber); // "number"

// Checking for NaN
console.log(isNaN(result)); // true
console.log(isNaN(invalidNumber)); // true

// Floating point precision
let num6 = 0.1 + 0.2;
console.log(num6); // 0.30000000000000004

// Fix float precision using toFixed()
let fixedNum = num6.toFixed(2);
console.log(fixedNum); // "0.30"
console.log(typeof fixedNum); // "string"

// Loose equality with null/undefined
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null > 0); // false
console.log(undefined > 0); // false

// String comparison with ASCII values
console.log("apple" < "banana"); // true
console.log("apple" > "banana"); // false
console.log("apple" == "Apple"); // false 
