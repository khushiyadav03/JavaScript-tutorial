// Lecture 10: Scope and Closure

// Scope = variable kahan accessible hai.
const globalName = "Khushi"; // global scope

function showName() {
  const localMessage = "Inside function"; // function scope
  console.log(globalName, localMessage);
}
showName();
// console.log(localMessage); // Error

if (true) {
  const blockValue = 100; // block scope
  console.log(blockValue);
}
// console.log(blockValue); // Error

// Scope chain: JS pehle local me dhundhta hai, phir outer scopes me.
const value = "global";
function outer() {
  const value = "outer"; // shadowing
  function inner() {
    console.log(value); // nearest value milegi: outer
  }
  inner();
}
outer();

// Closure = inner function outer function ke variables yaad rakhta hai.
function createCounter() {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// Practical: private bank balance
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount <= 0) return "Invalid amount";
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient balance";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(500);
console.log(account.deposit(200));
console.log(account.withdraw(100));
console.log(account.getBalance());
console.log(account.balance); // undefined, balance private hai

// Quick revision:
// Global scope: sab jagah available.
// Function scope: function ke andar.
// Block scope: {} ke andar with let/const.
// Closure: function apne outer variables ko remember karta hai.
