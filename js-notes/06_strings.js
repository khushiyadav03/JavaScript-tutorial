// ==========================================
// 06_strings.js
// String Operations, Methods, Template Literals
// ==========================================

// Concept: Strong Creation
const str1 = "Hello";
const str2 = 'World';
const str3 = `Hello, ${str2}!`;
console.log(str1);
console.log(str2);
console.log(str3);

// Concept: Multiline Strings
const multiLineStr = `This is a multi-line
string using template literals.`;
console.log(multiLineStr); 

// Concept: String Transformation
console.log(str1.toUpperCase());
console.log(str2.toLowerCase());

// Concept: String Length
console.log(str1.length);
console.log(str2.length);
console.log(str3.length);

// Concept: Finding Substrings
console.log(str3.includes("World")); // true
console.log(str3.indexOf("World")); // 7
console.log(str3.slice(7, 12));

// Concept: Slicing Strings
const str4 = "JavaScript";
console.log(str4.slice(0, 4)); // "Java"
console.log(str4.slice(4)); // "Script"
console.log(str4.slice(-6)); // "Script"

// - Using negative indices with .slice()
console.log(str4.slice(-10, -6)); // "Java"
console.log(str4.slice(-6, -3)); // "Scr"

// - substring() method does not support negative indices (treats them as 0)
console.log(str4.substring(0, 4)); // "Java"
console.log(str4.substring(4)); // "Script"

// Concept: String Concatenation
const str5 = "Hello";
const str6 = "World";
const concatenatedStr = str5 + " " + str6;
console.log(concatenatedStr); // "Hello World"
const concatenatedStr2 = `${str5} ${str6}`;
console.log(concatenatedStr2); // "Hello World"

// - Concatenating strings with numbers
const num7 = 10;
const num8 = 20;
const concatenatedStr3 = "The sum is: " + (num7 + num8);
console.log(concatenatedStr3); // "The sum is: 30"

const concatenatedStr4 = `The sum is: ${num7 + num8}`;
console.log(concatenatedStr4); // "The sum is: 30"

// Concept: Replacing Substrings
const str7 = "I love JavaScript";
const replacedStr = str7.replace("JavaScript", "coding");
console.log(replacedStr); // "I love coding"

// Concept: Trimming Whitespace
const str8 = "   Hello World!   ";
console.log(str8.trim()); // "Hello World!"

// Concept: Splitting Strings
const str9 = "apple,banana,orange";
const fruits = str9.split(",");
console.log(fruits); // ["apple", "banana", "orange"]

// Concept: String Padding
const str10 = "5";
console.log(str10.padStart(3, "0")); // "005"
console.log(str10.padEnd(3, "0")); // "500"
