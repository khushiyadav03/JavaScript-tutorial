// ==========================================
// 02_operators_and_type_conversion.js
// Operators, Type Conversion, Math Object
// ==========================================

// Concept: Arithmetic Operators
let num1 = 10;
let num2 = 5;
console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
console.log(num1 % num2);

// Concept: Assignment Operators
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

// Concept: Comparison Operators
let a1 = 10;
let b1 = 20;
console.log(a1 == b1);
console.log(a1 != b1);
console.log(a1 > b1);
console.log(a1 < b1);
console.log(a1 >= b1);
console.log(a1 <= b1);

// Concept: Difference between == and ===
// Tip: == performs type coercion, === checks for both value and type equality
let num3 = 10;
let strNum = "10";
console.log(num3 == strNum); // true, because == does type coercion
console.log(num3 === strNum); // false, because === does not do type coercion

// Concept: Logical Operators
let isTrue = true;
let isFalse = false;
console.log(isTrue && isFalse);
console.log(isTrue || isFalse);
console.log(!isTrue);

// Concept: Type Conversion
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

// Concept: Handling NaN
// Warning: NaN is a special value representing an invalid number
let result = 0 / 0;
console.log(result); // NaN
console.log(typeof result); // "number"

let invalidNumber = Number("abc");
console.log(invalidNumber);
console.log(typeof invalidNumber); // "number"

// - Checking for NaN
console.log(isNaN(result)); // true
console.log(isNaN(invalidNumber)); // true

// Concept: Floating Point Precision
// KEY NOTE: decimals can have precision issues in JavaScript
let num6 = 0.1 + 0.2;
console.log(num6); // 0.30000000000000004 due to floating point precision issues

// - Use toFixed() to fix precision issues
let fixedNum = num6.toFixed(2);
console.log(fixedNum); // "0.30"
console.log(typeof fixedNum); // "string"

// Concept: Loose Equality and Comparisons
console.log(null == undefined); // true, they are equal in loose equality
console.log(null === undefined); // false, different types
console.log(null > 0); // false, null is converted to 0 in comparison
console.log(undefined > 0); // false, undefined converted to NaN

// Concept: String Comparison
// - String comparison depends on ASCII values
console.log("apple" < "banana"); // true, "a" has lower ASCII than "b"
console.log("apple" > "banana"); // false
console.log("apple" == "Apple"); // false, case-sensitive  

// Concept: Number Object and Conversions
let n1 = 10;
let n2 = 20;
let sum = n1 + n2;
console.log("Sum:", sum);

let n3 = 345.89996;
console.log("Rounded:", n3.toFixed(1)); // round to 1 decimal place
console.log(n3.toString()); // convert to string

let n4 = new Number(50);
console.log(n4); // number object
console.log(typeof n4); // "object"

// Concept: Math Object
console.log(Math.PI);
console.log(Math.sqrt(16));
console.log(Math.pow(2, 3));
console.log(Math.random());

console.log(Math.random()); // random number between 0 and 1
console.log(Math.floor(Math.random() * 10)); // random integer between 0 and 9

// Concept: OTP Generator Example
// Tip: Formula for random range is Math.random() * (max - min + 1) + min
console.log(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000); 
