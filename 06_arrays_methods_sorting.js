// Lecture 06: Arrays and Array Methods

const marks = [100, 50, 70, 80];
console.log(marks.length);
console.log(marks[0]);

marks[1] = 60;
marks.push(90);
marks.pop();
marks.unshift(10);
marks.shift();
console.log(marks);

for (let i = 0; i < marks.length; i++) console.log(marks[i]);
for (const mark of marks) console.log(mark);

const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1); // reference share hua

const arr3 = [...arr1];
arr3.push(5);
console.log(arr1, arr3);

const nums = [10, 20, 30, 40, 50];
console.log(nums.slice(1, 3));
console.log(nums);
console.log(nums.splice(1, 2, 99));
console.log(nums);

const names = ["Riya", "Khushi", "Aman", "Riya"];
console.log(names.join(" - "));
console.log(names.indexOf("Riya"));
console.log(names.lastIndexOf("Riya"));
console.log(names.includes("Aman"));
console.log(names.sort());

const scores = [80, 32, 1001, 90, 5];
console.log(scores.sort());
console.log(scores.sort((a, b) => a - b));
console.log(scores.sort((a, b) => b - a));

const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());
console.log(nested.flat(2));

// Quick revision:
// push/pop end operations, shift/unshift start operations.
// slice copy part, splice mutates original.
// spread creates shallow copy or combines arrays.
// sort numbers with comparator.
// Arrays are objects and reference based.
