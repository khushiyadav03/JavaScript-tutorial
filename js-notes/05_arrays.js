// ==========================================
// 05_arrays.js
// Array Creation, Methods, Iteration, Sorting
// ==========================================

// Concept: Creating an Array
const arr5 = [1, 2, 3, 4, 5];
console.log(arr5);

// - Array length
console.log(arr5.length);

// - Accessing elements
console.log(arr5[0]); // first element
console.log(arr5[arr5.length - 1]); // last element

// Concept: push/pop/shift/unshift
// - Adding elements to the end using push()
arr5.push(6);
console.log(arr5);

// - Removing the last element using pop()
arr5.pop();
console.log(arr5);

// - Adding elements to the beginning using unshift()
// Warning: shift/unshift are inefficient for large arrays because elements must be re-indexed
arr5.unshift(0);
console.log(arr5);

// - Removing the first element using shift()
arr5.shift();
console.log(arr5);

// Concept: Finding Elements
// - Finding index using indexOf()
console.log(arr5.indexOf(3));

// - Checking existence using includes()
console.log(arr5.includes(4));

// Concept: Concatenating and Slicing Arrays
const arr6 = [1, 2, 3];
const arr7 = [4, 5, 6];
const combinedArr = arr6.concat(arr7);
console.log(combinedArr);

// - slice() does NOT modify original array
const slicedArr = combinedArr.slice(2, 5);
console.log(slicedArr);

// - splice() MODIFIES original array, removes and inserts elements
combinedArr.splice(2, 3, 10, 11, 12);
console.log(combinedArr);

// Concept: Iterating over Arrays
// - Using for loop
for (let i = 0; i < combinedArr.length; i++) {
    console.log(combinedArr[i]);
}

// - Using forEach() method
combinedArr.forEach(function(element) {
    console.log(element);
});

// Concept: Copying Arrays
// - Copy by reference
const arr8 = [1, 2, 3];
const arr9 = arr8;
arr9[0] = 10;
console.log(arr8); // [10, 2, 3]
console.log(arr9); // [10, 2, 3]

// - Copy by value (using spread operator)
const arr10 = [1, 2, 3];
const arr11 = [...arr10];
arr11[0] = 10;
console.log(arr10); // [1, 2, 3]
console.log(arr11); // [10, 2, 3]

// Concept: using const with arrays
// Tip: const prevents reassignment, but array elements can still be mutated
const arr12 = [1, 2, 3];
arr12.push(4);
console.log(arr12); // [1, 2, 3, 4]

// Concept: Array Methods map(), filter(), reduce()
const arr13 = [1, 2, 3, 4, 5];
const squaredArr = arr13.map(function(element) {
    return element * element;
});
console.log(squaredArr); // [1, 4, 9, 16, 25]

const evenArr = arr13.filter(function(element) {
    return element % 2 === 0;
});
console.log(evenArr); // [2, 4]

const sumArr = arr13.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(sumArr); // 15

// Concept: Slicing and Splicing Arrays
const arr14 = [1, 2, 3, 4, 5];
const slicedArr2 = arr14.slice(1, 4);
console.log(slicedArr2); // [2, 3, 4]

const arr15 = [1, 2, 3, 4, 5];
arr15.splice(2, 2, 10, 11);
console.log(arr15); // [1, 2, 10, 11, 5]

// Concept: Merge Arrays with Spread Operator
const arr16 = [1, 2, 3];
const arr17 = [4, 5, 6];
const mergedArr = [...arr16, ...arr17];
console.log(mergedArr); // [1, 2, 3, 4, 5, 6]

// Concept: Converting Array to String
const arr18 = [1, 2, 3];
const str11 = arr18.toString();
console.log(str11); // "1,2,3"
const str12 = arr18.join("-");
console.log(str12); // "1-2-3"

// Concept: Searching in Array
const arr19 = [1, 2, 3, 4, 5];
const index = arr19.indexOf(3);
console.log(index); // 2
const includes = arr19.includes(3);
console.log(includes); // true

// Concept: Reversing an Array
const arr20 = [1, 2, 3, 4, 5];
arr20.reverse();
console.log(arr20); // [5, 4, 3, 2, 1]

// Concept: Array Sorting
// KEY NOTE: default sort treats numbers as strings
const arr21 = [10, 2, 30];
arr21.sort();
console.log(arr21); // [10, 2, 30] 

// - Correct sorting of numbers by passing a compare function
arr21.sort(function(a, b) {
    return a - b;
});
console.log(arr21); // [2, 10, 30] 

// - Custom sorting: ascending order
const arr22 = [5, 2, 9, 1, 5, 6];
arr22.sort(function(a, b) {
    return a - b;
});
console.log(arr22); // [1, 2, 5, 5, 6, 9]

// - Custom sorting: descending order
const arr23 = [5, 2, 9, 1, 5, 6];
arr23.sort(function(a, b) {
    return b - a;
});
console.log(arr23); // [9, 6, 5, 5, 2, 1]

// Concept: Flattening nested arrays
const nestedArr = [1, [2, 3], [4, [5, 6]]];
const flattenedArr = nestedArr.flat(Infinity);
console.log(flattenedArr); // [1, 2, 3, 4, 5, 6]

// Concept: Array Behavior vs Objects
// - JS Arrays are actually objects with special capabilities
// - They can hold mixed types and dynamically size
