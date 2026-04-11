// ==========================================
// 07_objects_and_prototypes.js
// Date Object, Prototypes, Sets, Maps
// ==========================================

// Concept: Date Object
const currentDate = new Date();
console.log(currentDate);
const specificDate = new Date("2022-01-01");
console.log(specificDate);
console.log(currentDate.getFullYear());
console.log(currentDate.getMonth() + 1);
console.log(currentDate.getDate());
console.log(currentDate.getHours());
console.log(currentDate.getMinutes());
console.log(currentDate.getSeconds());

// - UTC time
const utcDate = new Date(Date.UTC(2022, 0, 1));
console.log(utcDate);

// - Date formatting
const options = { year: 'numeric', month: 'long', day: 'numeric' };
console.log(currentDate.toLocaleDateString('en-US', options)); // "January 1, 2022"

// Tip: new Date() creates a date object based on the system clock
// - Date formatting with ISO and locale strings
console.log(currentDate.toISOString());
console.log(currentDate.toLocaleString());

// - Creating Custom Date
const customDate = new Date(2022, 0, 1);
console.log(customDate); // January 1, 2022

// Concept: Date Arithmetic
const date1 = new Date(2022, 0, 1);
const date2 = new Date(2022, 0, 10);
const timeDifference = date2.getTime() - date1.getTime();
const dayDifference = timeDifference / (1000 * 3600 * 24);
console.log(dayDifference); // 9

// - Date manipulation
const date3 = new Date(2022, 0, 1);
date3.setDate(date3.getDate() + 7);
console.log(date3); // January 8, 2022

const date4 = new Date(2022, 0, 1);
date4.setMonth(date4.getMonth() + 1);
console.log(date4); // February 1, 2022

// - Date comparison
const date5 = new Date(2022, 0, 1);
const date6 = new Date(2022, 0, 10);
console.log(date5 < date6); // true
console.log(date5 > date6); // false
console.log(date5.getTime() === date6.getTime()); // false

// Concept: Epoch Time
// - Number of milliseconds since January 1, 1970
const epochTime = Date.now();
console.log(epochTime); 

// - Converting epoch time to date
const dateFromEpoch = new Date(epochTime);
console.log(dateFromEpoch); // current date and time based on epoch time

// Concept: Constructor Functions and Prototypes
function Person(name, age) {
    this.name = name;
    this.age = age;
}
// - Reusable methods with prototypes
Person.prototype.greet = function() {
    return "Hello, my name is " + this.name + " and I am " + this.age + " years old.";
}
const person2 = new Person("Khushi", 25);
console.log(person2.greet()); // "Hello, my name is Khushi and I am 25 years old."

// Concept: Set (Unique Values)
const arr31 = [1, 2, 3, 2, 4, 1];
const uniqueValues = arr31.reduce(function(accumulator, currentValue) {
    if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
    }
    return accumulator;
}, []);
console.log(uniqueValues); // [1, 2, 3, 4]

// - Removing duplicates with Set
const arr32 = [1, 2, 3, 2, 4, 1];
const uniqueValuesSet = [...new Set(arr32)];
console.log(uniqueValuesSet); // [1, 2, 3, 4]

// Concept: Map (Key-Value Pairs)
const map = new Map();
map.set("name", "Khushi");
map.set("age", 25);
console.log(map.get("name")); // "Khushi"
console.log(map.get("age")); // 25

// - Advanced map operations
map.set("city", "New York");
console.log(map.has("city")); // true
map.delete("age");
console.log(map.has("age")); // false
map.clear();
console.log(map.size); // 0
