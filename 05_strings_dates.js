// Lecture 05: Strings and Date Object

const s1 = "Hello";
const s2 = 'Khushi';
const s3 = `Welcome ${s2}`;
console.log(s1, s2, s3);

let word = "Rohit";
word[0] = "M";
console.log(word); // string immutable hai

const text = "  Hello Coder Army Coder  ";
console.log(text.length);
console.log(text.trim());
console.log(text.toUpperCase());
console.log(text.toLowerCase());
console.log(text.includes("Coder"));
console.log(text.indexOf("Coder"));
console.log(text.lastIndexOf("Coder"));
console.log(text.slice(2, 7));
console.log(text.replace("Coder", "JS"));
console.log(text.replaceAll("Coder", "JS"));

const csv = "Rohit,Mohit,Khushi";
console.log(csv.split(","));

// Practical: clean user input
const emailInput = "  KHUSHI@GMAIL.COM  ";
const normalizedEmail = emailInput.trim().toLowerCase();
console.log(normalizedEmail);

const now = new Date();
console.log(now.toString());
console.log(now.toISOString());
console.log(now.toLocaleString());
console.log(now.getFullYear());
console.log(now.getMonth()); // 0-based: Jan=0
console.log(now.getDate());
console.log(now.getDay()); // 0=Sunday

const customDate = new Date(2026, 3, 27, 10, 30); // month 3 = April
console.log(customDate.toString());

const timestamp = Date.now();
console.log(timestamp);
console.log(new Date(timestamp).toString());

// Quick revision:
// Backtick supports ${} and multiline strings.
// String methods original string change nahi karte.
// getMonth() 0-based hai, getDate() 1-based.
// Server dates usually UTC/timestamp me store karna better hota hai.
