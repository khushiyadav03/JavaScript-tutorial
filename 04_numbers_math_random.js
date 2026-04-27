// Lecture 04: Numbers, Math and Random

const price = 344.6821;
console.log(price.toFixed(2));     // "344.68", string return hoti hai
console.log(price.toPrecision(5)); // "344.68", total 5 digits
console.log((123).toString());     // "123"

// new Number() avoid karo. Ye primitive nahi, object banata hai.
const a = new Number(20);
const b = new Number(20);
console.log(a == b); // false, references different
console.log(Boolean(new Number(0))); // true, object truthy hota hai

console.log(Math.PI);
console.log(Math.abs(-10));
console.log(Math.sqrt(25));
console.log(Math.max(3, 9, 1));
console.log(Math.min(3, 9, 1));
console.log(Math.ceil(4.2));
console.log(Math.floor(4.9));
console.log(Math.round(4.5));
console.log(Math.random());

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Dice:", randomInt(1, 6));
console.log("OTP:", randomInt(1000, 9999));

const prizes = ["Pen", "Book", "Laptop", "Nothing"];
const randomPrize = prizes[randomInt(0, prizes.length - 1)];
console.log(randomPrize);

// Security note: Math.random() secure nahi hota. OTP/banking/security ke liye crypto APIs use karte hain.

// Quick revision:
// toFixed/toPrecision string return karte hain.
// Range formula: Math.floor(Math.random() * (max - min + 1)) + min
// new Number() avoid karo.
