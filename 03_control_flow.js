// ===== TOPIC: Control Flow =====

// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}

// Do-while loop
let k = 0;
do {
    console.log(k);
    k++;
} while (k < 5);

// For-in loop (Iterating over object properties)
let person1 = { name: "Khushi", age: 25, city: "Delhi" };
for (let key in person1) {
    console.log(key + ": " + person1[key]);
}

// If-else condition
let age1 = 18;
if (age1 >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// Switch case
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

// Ternary operator
let age2 = 20;
let isAdult = age2 >= 18 ? "Yes" : "No";
console.log(isAdult); // "Yes"

// Logical AND (&&) check
let isLoggedIn = true;
let hasPermission = true;
if (isLoggedIn && hasPermission) {
    console.log("Access granted.");
}

// Logical OR (||) check
let isAdmin = false;
if (isLoggedIn || isAdmin) {
    console.log("Access granted.");
}

// Logical NOT (!) check
let isGuest = false;
if (!isGuest) {
    console.log("Welcome back!");
}
