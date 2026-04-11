// ==========================================
// 03_control_flow.js
// Loops, Conditionals, Short Circuiting
// ==========================================

// Concept: For Loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Concept: While Loop
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}

// Concept: Do-While Loop
// Tip: Executes block at least once before checking condition
let k = 0;
do {
    console.log(k);
    k++;
} while (k < 5);

// Concept: For-In Loop
// - Used for iterating over object properties
let person1 = { name: "Khushi", age: 25, city: "Delhi" };
for (let key in person1) {
    console.log(key + ": " + person1[key]);
}

// Concept: If-Else Condition
let age1 = 18;
if (age1 >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// Concept: Switch Case
let day = 3;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
}

// Concept: Ternary Operator
let age2 = 20;
let isAdult = age2 >= 18 ? "Yes" : "No";
console.log(isAdult); // "Yes"

// Concept: Logical AND (&&)
let isLoggedIn = true;
let hasPermission = true;
if (isLoggedIn && hasPermission) {
    console.log("Access granted.");
}

// Concept: Logical OR (||)
let isAdmin = false;
if (isLoggedIn || isAdmin) {
    console.log("Access granted.");
}

// Concept: Logical NOT (!)
let isGuest = false;
if (!isGuest) {
    console.log("Welcome back!");
}
