// ===== TOPIC: Arrays =====

// Creating an array
const arr5 = [1, 2, 3, 4, 5];
console.log(arr5);

// Array length
console.log(arr5.length);

// Accessing array elements
console.log(arr5[0]); // first element
console.log(arr5[arr5.length - 1]); // last element

// Adding elements to end using push()
arr5.push(6);
console.log(arr5);

// Removing last element using pop()
arr5.pop();
console.log(arr5);

// Adding elements to beginning using unshift()
arr5.unshift(0);
console.log(arr5);

// Removing first element using shift()
arr5.shift();
console.log(arr5);

// Finding index of an element
console.log(arr5.indexOf(3));

// Checking if element exists
console.log(arr5.includes(4));

// Concatenating arrays
const arr6 = [1, 2, 3];
const arr7 = [4, 5, 6];
const combinedArr = arr6.concat(arr7);
console.log(combinedArr);

// Slicing arrays (does not modify original)
const slicedArr = combinedArr.slice(2, 5);
console.log(slicedArr);

// Modifying arrays using splice() (modifies original)
combinedArr.splice(2, 3, 10, 11, 12);
console.log(combinedArr);

// push/pop is faster because unshift/shift requires moving all elements

// Iterating arrays using for loop
for (let i = 0; i < combinedArr.length; i++) {
    console.log(combinedArr[i]);
}

// Iterating arrays using forEach()
combinedArr.forEach(function(element) {
    console.log(element);
});

// Copy arrays by reference
const arr8 = [1, 2, 3];
const arr9 = arr8;
arr9[0] = 10;
console.log(arr8); // [10, 2, 3]
console.log(arr9); // [10, 2, 3]

// Copy arrays by value (spread operator)
const arr10 = [1, 2, 3];
const arr11 = [...arr10];
arr11[0] = 10;
console.log(arr10); // [1, 2, 3]
console.log(arr11); // [10, 2, 3]

// const prevents variable reassignment, but array contents can still be changed
const arr12 = [1, 2, 3];
arr12.push(4);
console.log(arr12); // [1, 2, 3, 4]

// Array map() - transform each element
const arr13 = [1, 2, 3, 4, 5];
const squaredArr = arr13.map(function(element) {
    return element * element;
});
console.log(squaredArr); // [1, 4, 9, 16, 25]

// Array filter() - keep elements that pass condition
const evenArr = arr13.filter(function(element) {
    return element % 2 === 0;
});
console.log(evenArr); // [2, 4]

// Array reduce() - accumulate elements to single value
const sumArr = arr13.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(sumArr); // 15

// Slicing arrays
const arr14 = [1, 2, 3, 4, 5];
const slicedArr2 = arr14.slice(1, 4);
console.log(slicedArr2); // [2, 3, 4]

// splice(start, deleteCount, items...) modifies original array
const arr15 = [1, 2, 3, 4, 5];
arr15.splice(2, 2, 10, 11);
console.log(arr15); // [1, 2, 10, 11, 5]

// Merge arrays with spread operator
const arr16 = [1, 2, 3];
const arr17 = [4, 5, 6];
const mergedArr = [...arr16, ...arr17];
console.log(mergedArr); // [1, 2, 3, 4, 5, 6]

// Converting array to string
const arr18 = [1, 2, 3];
const str11 = arr18.toString();
console.log(str11); // "1,2,3"
const str12 = arr18.join("-");
console.log(str12); // "1-2-3"

// Searching in array
const arr19 = [1, 2, 3, 4, 5];
const index = arr19.indexOf(3);
console.log(index); // 2
const includes = arr19.includes(3);
console.log(includes); // true

// Reversing an array
const arr20 = [1, 2, 3, 4, 5];
arr20.reverse();
console.log(arr20); // [5, 4, 3, 2, 1]

// Default sort treats numbers as strings "10" < "2"
const arr21 = [10, 2, 30];
arr21.sort();
console.log(arr21); // [10, 2, 30]

// Provide custom compare function for correct numeric sort
arr21.sort(function(a, b) {
    return a - b;
});
console.log(arr21); // [2, 10, 30]

// Sort converts to string to support many types instead of just numbers

// Custom sorting: ascending
const arr22 = [5, 2, 9, 1, 5, 6];
arr22.sort(function(a, b) {
    return a - b;
});
console.log(arr22); // [1, 2, 5, 5, 6, 9]

// Custom sorting: descending
const arr23 = [5, 2, 9, 1, 5, 6];
arr23.sort(function(a, b) {
    return b - a;
});
console.log(arr23); // [9, 6, 5, 5, 2, 1]

// Flattening nested arrays
const nestedArr = [1, [2, 3], [4, [5, 6]]];
const flattenedArr = nestedArr.flat(Infinity);
console.log(flattenedArr); // [1, 2, 3, 4, 5, 6]

// JS arrays are actually objects with special length and array methods

// Setting non-numeric keys in array just adds a property to the object
