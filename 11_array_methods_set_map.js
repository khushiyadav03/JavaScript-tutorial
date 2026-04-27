// ============================================================
// LECTURE 11: forEach, filter, map, reduce, Set, Map
// Simple notes + practical implementation
// ============================================================


// ============================================================
// 1. forEach()
// ============================================================

/*
  forEach array ke har element par ek callback function chalata hai.

  Syntax:
  arr.forEach((element, index, array) => {});

  element mandatory hota hai.
  index aur array optional hote hain.

  Important:
  forEach mostly tab use hota hai jab hume array ke elements par
  koi action perform karna ho, jaise print karna ya sum banana.
*/

const numbers = [10, 20, 30, 5, 90, 87];

numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

let sum = 0;

numbers.forEach((num) => {
  sum += num;
});

console.log("Sum using forEach:", sum);


// ============================================================
// 2. filter()
// ============================================================

/*
  filter array se selected elements nikalta hai.

  Callback true return kare to element new array me chala jata hai.
  Callback false return kare to element skip ho jata hai.

  Original array change nahi hota.
  filter hamesha ek new array return karta hai.
*/

const greaterThan25 = numbers.filter((num) => num > 25);
console.log("Numbers greater than 25:", greaterThan25);


// ============================================================
// 3. Custom filter method behind the scenes
// ============================================================

/*
  Array ka filter method internally kuch aise kaam karta hai:
  - array ke har element par loop chalta hai
  - callback ko current element diya jata hai
  - agar callback true de, to element answer array me push hota hai
  - last me answer array return hota hai

  Note:
  Array.prototype me custom method add karna generally recommended nahi hota,
  kyunki future JavaScript methods ke naam se clash ho sakta hai.
  Ye sirf understanding ke liye hai.
*/

Array.prototype.myFilter = function (callback) {
  const answer = [];

  for (const item of this) {
    if (callback(item)) {
      answer.push(item);
    }
  }

  return answer;
};

const customFiltered = numbers.myFilter((num) => num > 25);
console.log("Custom filter:", customFiltered);


// ============================================================
// 4. map()
// ============================================================

/*
  map array ke har element ko transform karta hai.

  filter me kuch elements select hote hain.
  map me har element ka output banta hai.

  Original array change nahi hota.
  map hamesha same length ka new array return karta hai.
*/

const doubledNumbers = numbers.map((num) => num * 2);
console.log("Doubled numbers:", doubledNumbers);


// ============================================================
// 5. Practical data: filter + sort + map chaining
// ============================================================

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200, inStock: true },
  { id: 2, name: "Headphones", category: "Electronics", price: 200, inStock: true },
  { id: 3, name: "Book", category: "Education", price: 20, inStock: false },
  { id: 4, name: "Smartphone", category: "Electronics", price: 800, inStock: true },
  { id: 5, name: "Monitor", category: "Electronics", price: 300, inStock: false },
  { id: 6, name: "Keyboard", category: "Electronics", price: 80, inStock: true },
  { id: 7, name: "Mouse", category: "Electronics", price: 40, inStock: true },
];

/*
  Real-world example:
  Hume sirf woh products chahiye jinka price 50 se zyada hai.
  Phir unhe price ke descending order me sort karna hai.
  Last me sirf name aur price show karna hai.
*/

const visibleProducts = products
  .filter((product) => product.price > 50)
  .sort((a, b) => b.price - a.price)
  .map((product) => ({
    name: product.name,
    price: product.price,
  }));

console.log("Visible products:", visibleProducts);


// ============================================================
// 6. reduce()
// ============================================================

/*
  reduce array ko process karke ek final value return karta hai.

  Syntax:
  arr.reduce((accumulator, currentValue) => {
    return updatedAccumulator;
  }, initialValue);

  accumulator:
  - previous result store karta hai

  currentValue:
  - current element hota hai

  Use case:
  - total price
  - total marks
  - cart total
*/

const totalPrice = products.reduce((acc, product) => {
  return acc + product.price;
}, 0);

console.log("Total price:", totalPrice);

const inStockTotal = products.reduce((acc, product) => {
  if (product.inStock) {
    return acc + product.price;
  }

  return acc;
}, 0);

console.log("In-stock total:", inStockTotal);

const cart = [
  { item: "Bhindi", price: 200 },
  { item: "Son Papdi", price: 40 },
  { item: "Milk", price: 60 },
];

const cartTotal = cart.reduce((acc, product) => acc + product.price, 0);
console.log("Cart total:", cartTotal);


// ============================================================
// 7. Set
// ============================================================

/*
  Set ek collection hai jo sirf unique values store karta hai.
  Duplicate values automatically remove ho jati hain.

  Useful methods:
  - add(value)
  - has(value)
  - delete(value)
  - clear()
  - size
*/

const duplicateValues = [10, 20, 30, 10, 25, 15, 10, 20];
const uniqueSet = new Set(duplicateValues);

uniqueSet.add(11);
console.log("Unique set:", uniqueSet);
console.log("Has 20:", uniqueSet.has(20));

uniqueSet.delete(10);
console.log("After deleting 10:", uniqueSet);
console.log("Set size:", uniqueSet.size);

/*
  Real-world use:
  Duplicate emails remove karna.
*/

const emails = ["ro@gmail.com", "ra@gmail.com", "mo@gmail.com", "ro@gmail.com"];
const uniqueEmails = [...new Set(emails)];

console.log("Unique emails:", uniqueEmails);

for (const email of uniqueEmails) {
  console.log("Email:", email);
}


// ============================================================
// 8. Map data structure
// ============================================================

/*
  Map key-value pairs store karta hai.

  Object me keys mostly string/symbol hoti hain.
  Map me key kisi bhi type ki ho sakti hai:
  string, number, boolean, array, object.

  Useful methods:
  - set(key, value)
  - get(key)
  - has(key)
  - delete(key)
  - clear()
  - size
*/

const userMap = new Map([
  ["Rohit", 40],
  [2, "Number key"],
  [true, "Boolean key"],
]);

const arrayKey = [10, 30, 11];
const objectKey = { name: "Manish", age: 20 };

userMap.set(arrayKey, "Array as key");
userMap.set(objectKey, false);

console.log("Map size:", userMap.size);
console.log("Rohit value:", userMap.get("Rohit"));
console.log("Has true key:", userMap.has(true));
console.log("Array key value:", userMap.get(arrayKey));
console.log("Object key value:", userMap.get(objectKey));

for (const [key, value] of userMap) {
  console.log("Map entry:", key, value);
}


// ============================================================
// Quick Revision
// ============================================================

/*
  forEach:
  Har element par action perform karta hai. New array return nahi karta.

  filter:
  Condition true ho to element select hota hai. New filtered array milta hai.

  map:
  Har element ko transform karta hai. Same length ka new array milta hai.

  reduce:
  Array se ek final value banata hai, jaise total sum.

  Set:
  Sirf unique values store karta hai.

  Map:
  Key-value pair store karta hai. Key kisi bhi type ki ho sakti hai.
*/
