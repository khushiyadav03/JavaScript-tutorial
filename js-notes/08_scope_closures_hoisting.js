// ==========================================
// 08_scope_closures_hoisting.js
// Scope, Closures, Hoisting, TDZ
// ==========================================

// Concept: Hoisting
// - Variable and function declarations are moved to the top of their scope during compilation
// - var is initialized with undefined, so it returns undefined before assignment
// - let and const are hoisted but NOT initialized

// Concept: Temporal Dead Zone (TDZ)
// Warning: using let/const before their declaration results in a ReferenceError
// - The TDZ is the period between start of the block and variable declaration

// Concept: Function Hoisting
// - Function declarations are hoisted completely (can be called before defined)
// - Function expressions (e.g. const sayHi = function()...) are NOT hoisted completely

// Concept: Scope
// - Global Scope: Accessible everywhere, but risk of naming conflicts
// - Function Scope: Variables created inside a function are isolated
// - Block Scope: Variables created with let/const inside {} blocks are isolated

// Concept: Closures
// Tip: A function that remembers its outer variables even after the outer function finishes executing
// - Great for data encapsulation, private variables, and state

function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Concept: Closures for Private Variables
function createSecret() {
    let secret = "This is a secret!";
    return function() {
        return secret;
    };
}
const getSecret = createSecret();
console.log(getSecret()); // "This is a secret!"

// Concept: Bank Account with Private Balance
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount > balance) {
                return "Insufficient funds!";
            }
            balance -= amount;
            return balance;
        }
    };
}
const myAccount = createBankAccount(100);
console.log(myAccount.deposit(50)); // 150
console.log(myAccount.withdraw(30)); // 120
console.log(myAccount.withdraw(200)); // "Insufficient funds!"

// Concept: Closures in Async Programming
// - Maintaining state across time
function fetchData(url) {
    let data = null;
    setTimeout(() => {
        data = "Data fetched from " + url;
        console.log(data);
    }, 2000);
    return function() {
        return data;
    };
}
const getData = fetchData("https://api.example.com");
setTimeout(() => {
    console.log(getData()); // "Data fetched from https://api.example.com" after 2 seconds
}, 3000);
