// ==========================================
// JAVASCRIPT ARRAYS: FULL TUTORIAL & BEHIND THE SCENES
// ==========================================

/*
THEORY OVERVIEW:
In traditional languages (like C++ or Java), an Array is a linear data structure that stores 
elements of the SAME data type at CONTIGUOUS (continuous) memory locations.
However, in JavaScript, Arrays are technically Objects. They can store heterogeneous data 
(different data types together) and do not strictly follow contiguous memory allocation.
*/

// ---------------------------------------------------------
// 1. ARRAY CREATION & BASIC PROPERTIES
// ---------------------------------------------------------

// Instead of creating 100 variables for 100 students (marks1, marks2...), we use Arrays.
let marks = [100, 50, 70, 80, 90];
console.log("Marks array:", marks);

// Finding the length of an array (number of elements inside it)
console.log("Length of marks array:", marks.length); // Output: 5

// JS Arrays can store Heterogeneous Data (Different data types in the same array)
let mixedArray = [100, 30, "Rohit", true];
console.log("Mixed Data Array:", mixedArray);


// ---------------------------------------------------------
// 2. ACCESSING & MUTATING ELEMENTS
// ---------------------------------------------------------

// Arrays use zero-based indexing (0, 1, 2, 3...)
console.log("First element:", mixedArray[0]); // 100
console.log("Third element:", mixedArray[2]); // "Rohit"

// Arrays are Mutable (You can change their elements)
// Note: Primitive data types like strings are immutable, but objects/arrays are mutable.
mixedArray[1] = 90; 
console.log("Array after mutation:", mixedArray); // [100, 90, "Rohit", true]


// ---------------------------------------------------------
// 3. ADDING & REMOVING ELEMENTS
// ---------------------------------------------------------

let arr = [10, 30, "Rohit", true];

// --- END OF ARRAY OPERATIONS (Good Performance) ---
// push(): Inserts an element at the end of the array.
arr.push(90);
arr.push("Strike");
console.log("After push:", arr);

// pop(): Removes the last element from the array.
arr.pop();
console.log("After pop:", arr);

// --- START OF ARRAY OPERATIONS (Bad Performance) ---
/*
PERFORMANCE WARNING: 
Using unshift() and shift() is not advisable for large arrays. 
Reason: If you add or remove an element at the 0th index, the JavaScript engine has to 
shift the indices of ALL subsequent elements in memory. This drastically reduces performance.
push() and pop() are much faster as they only affect the end of the array.
*/

// unshift(): Inserts an element at the starting index (0).
arr.unshift(10);
arr.unshift(50);
console.log("After unshift:", arr);

// shift(): Removes the first element from the array.
arr.shift();
console.log("After shift:", arr);


// ---------------------------------------------------------
// 4. ITERATING OVER ARRAYS (LOOPS)
// ---------------------------------------------------------

let numArr = [10, 20, 50, 90, 11];

console.log("--- Standard For Loop ---");
for (let i = 0; i < numArr.length; i++) {
    console.log(numArr[i]);
}

console.log("--- For...of Loop ---");
// Iterates directly over the values of the array.
for (let num of numArr) {
    console.log(num);
}


// ---------------------------------------------------------
// 5. COPY BY REFERENCE & CONST ARRAYS
// ---------------------------------------------------------

/*
Primitive data types (Numbers, Strings) are copied by VALUE.
Non-Primitive data types (Arrays, Objects) are copied by REFERENCE.
This means they share the same memory address in the Heap.
*/
let arr1 = [10, 20, 30];
let arr2 = arr1; // arr2 now points to the exact same memory location as arr1

arr2.push(40);
console.log("Original arr1 also changes:", arr1); // Output: [10, 20, 30, 40]

/*
Using 'const' with Arrays:
If you declare an array with const, you CAN mutate its internal values (because the memory 
address of the array itself hasn't changed).
However, you CANNOT assign a completely new array to that constant variable.
*/
const constArr = [1, 2, 3];
constArr[0] = 99; // VALID: We are changing a value inside the existing address.
// constArr = [4, 5, 6]; // INVALID: Throws an error because we are assigning a new memory address.


// ---------------------------------------------------------
// 6. SLICE VS SPLICE
// ---------------------------------------------------------

let sampleArr = [10, 30, 50, 90, 11];

// slice(startIndex, endIndex): 
// Returns a new array containing the extracted elements (endIndex is not included).
// DOES NOT modify the original array.
let slicedArr = sampleArr.slice(1, 4); 
console.log("Sliced Array:", slicedArr); // [30, 50, 90]
console.log("Original Array after slice (unchanged):", sampleArr);

// splice(startIndex, deleteCount, elementsToInsert...):
// Trims out elements from the original array and can optionally insert new ones.
// MODIFIES the original array. Returns the deleted elements.
let splicedElements = sampleArr.splice(1, 3, "Rohit", 19);
console.log("Spliced out elements:", splicedElements); // [30, 50, 90]
console.log("Original Array after splice (modified):", sampleArr); // [10, "Rohit", 19, 11]


// ---------------------------------------------------------
// 7. COMBINING ARRAYS (CONCAT VS SPREAD)
// ---------------------------------------------------------

let a1 = [10, 30];
let a2 = [90, 11];
let a3 = ["Rohit", true];

// concat(): Returns a new array by joining arrays.
let combinedConcat = a1.concat(a2, a3);
console.log("Concat Result:", combinedConcat);

// SPREAD OPERATOR (...): Highly recommended.
// It unpacks the elements of an array individually.
let spreadResult = [...a1, ...a2, ...a3];
console.log("Spread Operator Result:", spreadResult);


// ---------------------------------------------------------
// 8. CONVERTING TO STRING & SEARCHING
// ---------------------------------------------------------

let names = ["Alice", "Bob", "Charlie", "Bob"];

// toString(): Converts array to a comma-separated string.
console.log("toString:", names.toString());

// join(separator): Converts array to string, separated by the specified character.
console.log("join with space:", names.join(" "));
console.log("join with dash:", names.join("-"));

// Searching
console.log("indexOf Bob:", names.indexOf("Bob")); // First occurrence (1)
console.log("lastIndexOf Bob:", names.lastIndexOf("Bob")); // Last occurrence (3)
console.log("includes Alice:", names.includes("Alice")); // true


// ---------------------------------------------------------
// 9. SORTING ARRAYS (ASCII VS NUMBERS)
// ---------------------------------------------------------

let namesToSort = ["Alice", "Bob", "Charlie", "mohit", "Rohit"];
// Default sort() treats elements as Strings and compares character by character using ASCII values.
// Note: Capital letters (65+) come before lowercase letters (97+) in ASCII.
namesToSort.sort();
console.log("Default String Sort:", namesToSort);

// Reversing an array
namesToSort.reverse();
console.log("Reversed Array:", namesToSort);

/*
The ASCII Problem with Numbers:
If we use default sort on [1001, 32, 80, 90, 91], JS checks the first character.
'1' (ASCII 49) comes before '3' (ASCII 51), so 1001 is placed before 32.
To fix this, we pass a comparison callback function.
*/
let numbersToSort = [40, 10, 31, 71, 5, 11];

// Ascending Order:
// Rule: if (a - b) is negative, 'a' comes first. If positive, 'b' comes first.
numbersToSort.sort((a, b) => a - b);
console.log("Number Sort (Ascending):", numbersToSort);

// Descending Order:
numbersToSort.sort((a, b) => b - a);
console.log("Number Sort (Descending):", numbersToSort);


// ---------------------------------------------------------
// 10. MULTIDIMENSIONAL ARRAYS & FLATTENING
// ---------------------------------------------------------

// 3D Array
let nestedArr = [10, 30, [40, 90, [60, 19, 99], 11], 80];

// Accessing 19 in the 3D array:
console.log("Accessing nested element 19:", nestedArr[2][2][1]);

// flat(depth): Flattens nested arrays into a single-level array.
// flat(1) flattens only 1 level deep. To flatten all levels, use flat(Infinity).
let flatArr = nestedArr.flat(Infinity);
console.log("Flattened Array:", flatArr);


// ==========================================
// APPENDIX: WHY JAVASCRIPT ARRAYS ARE NOT REAL ARRAYS
// ==========================================
/*
1. A traditional array strictly holds elements of the SAME DATA TYPE. 
   JS arrays hold HETEROGENEOUS data (numbers, strings, booleans together).

2. A traditional array holds elements in CONTIGUOUS (continuous) memory blocks.
   Formula to access an element: Base Address + (Index * Size of Data).
   Example in C++: If integers take 4 bytes, memory addresses go 1000, 1004, 1008...

3. Because JS arrays hold different types of data, the "Size of Data" varies.
   A number might take 8 bytes, while a string might take 5 bytes. 
   This makes direct contiguous allocation and mathematical index fetching impossible.
   Furthermore, mutating a string to a longer string would require shifting the memory
   addresses of ALL subsequent elements.

4. CONCLUSION: To solve this, JavaScript implements Arrays as OBJECTS under the hood.
   The indices (0, 1, 2) are actually object keys stored as strings.
   You can even assign arbitrary keys to a JS array (e.g., arr.name = "Test").
   JS engines use concepts like Hash Maps / Dictionaries to store these elements dynamically.
*/