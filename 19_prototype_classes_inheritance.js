// ============================================================
//  LECTURE NOTES: Prototype & Classes in JavaScript
//    Prototype Chain + Inheritance + Classes + super + extends
//    + Object.create + DRY Principle + __proto__
// ============================================================


// ============================================================
// PART 1: THE BIG QUESTION — Yeh methods aaye kahan se?
// ============================================================

/*
  THEORY — Mystery ye hai:
  - Jab hum koi Object banate hain, usme kuch methods hoti hain
    jo humne kabhi likhi hi nahi — jaise:
      → object.hasOwnProperty()
      → object.toString()
      → array.length
      → array.sort()
      → array.map()
      → function.call()
  - Yeh sab aaye kahan se? Humne toh define nahi kiya!
  - Answer: PROTOTYPE CHAIN ki wajah se.

  PROTOTYPE KYA HAI?
  - Har object ka ek "parent" hota hai jise PROTOTYPE kehte hain.
  - Agar koi property/method object mein nahi milti,
    toh JS ek level UPAR jaata hai — prototype mein dekhta hai.
  - Fir uske prototype mein dekhta hai...
  - Yeh chain tab khatam hoti hai jab NULL milta hai.
  - Yahi process: PROTOTYPE CHAIN.
*/

// Ek basic object banao:
const person = {
  name: "Rohit",
  age: 38,
  greet: function () {
    console.log("Hello Ji!");
  }
};

// Humne hasOwnProperty define nahi kiya — fir bhi kaam karta hai!
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("names")); // false — "names" nahi hai

// toString bhi humne nahi banaya — fir bhi kaam karta hai!
console.log(person.toString()); // [object Object]

// YEH MAGIC KAISE HUA? → Prototype ki wajah se (aage samjhenge)


// ============================================================
// PART 2: __proto__ — Prototype Chain manually dekhna
// ============================================================

/*
  THEORY:
  - Har object ke andar ek hidden link hota hai: __proto__
  - __proto__ us object ko point karta hai jisko prototype kehte hain.
  - Agar koi property current object mein nahi milti →
    JS __proto__ follow karke ek level upar jaata hai.
  - Yeh chain NULL par jaake khatam hoti hai.

  SYNTAX: obj.__proto__
  → Yeh current object ka prototype (parent) dikhata hai.

  NOTE: __proto__ ko normal code mein use mat karo —
  yeh sirf samajhne ke liye hai. Production mein
  Object.getPrototypeOf() use karte hain.
*/

const obj1 = {
  name: "Rohit",
  age: 38,
  greet: function () {
    console.log("Hello Ji!");
  }
};

const obj2 = {
  account: 30
};

// obj2 ke paas "name" property nahi hai:
console.log(obj2.name); // undefined

// Ab hum obj2 ka prototype obj1 ko set karte hain:
obj2.__proto__ = obj1;
// Ab obj2 → obj1 ko point kar raha hai (linked!)

// MAGIC: ab obj2 ko "name" milti hai — obj1 se!
console.log(obj2.name);    // "Rohit"
console.log(obj2.account); // 30 (apni khud ki)
console.log(obj2.age);     // 38 (obj1 se inherited)

// KAISE KAAM KIA:
// 1. obj2.name dhundha → obj2 ke andar nahi mila
// 2. __proto__ follow kiya → obj1 mein gaya
// 3. obj1 mein "name" mila → "Rohit" return kiya


// ============================================================
// PART 3: Object.prototype — Sab ka MOOL (Root)
// ============================================================

/*
  THEORY:
  - Jab bhi hum koi bhi object banate hain (literal {} se),
    toh JS automatically us object ka __proto__ set kar deta hai:
      myObj.__proto__ = Object.prototype
  - Object.prototype ke andar yeh built-in methods hain:
      → hasOwnProperty()
      → toString()
      → valueOf()
      → isPrototypeOf()
      → aur bahut saare...
  - Isliye hum kisi bhi object par in methods ko call kar sakte hain.
  - Object.prototype ka __proto__ → NULL hai (chain khatam)

  DIAGRAM:
  myObj → Object.prototype → null
*/

// Object.prototype ke andar kya hai:
console.log(Object.prototype);
// → hasOwnProperty, toString, valueOf, isPrototypeOf... sab milega

// Kisi bhi object ka __proto__ = Object.prototype hoga:
const simpleObj = { a: 1 };
console.log(simpleObj.__proto__ === Object.prototype); // true

// Chain ka end:
console.log(Object.prototype.__proto__); // null — yahan chain khatam hoti hai


// ============================================================
// PART 4: Array Prototype Chain — length, sort kahan se aaya
// ============================================================

/*
  THEORY:
  - Array ek special type ka object hai.
  - Jab hum array banate hain, toh:
      myArr.__proto__ = Array.prototype
  - Array.prototype ke andar yeh sab methods hain:
      → push, pop, map, filter, sort, slice, splice,
        find, forEach, length... aur bahut saare

  - Array.prototype ka __proto__ = Object.prototype
  - Object.prototype ka __proto__ = null

  POORI CHAIN:
  myArr → Array.prototype → Object.prototype → null

  ISLIYE:
  - myArr.sort()              → Array.prototype mein milta hai
  - myArr.length              → Array.prototype mein milta hai
  - myArr.hasOwnProperty()   → Object.prototype mein milta hai
  - myArr.toString()          → Object.prototype mein milta hai
    (Array.prototype mein apna toString bhi hai — woh pehle milega)
*/

const arr = [10, 20, 30];

// Yeh humne define nahi kiya — prototype se aaya:
console.log(arr.length);      // 3 → Array.prototype.length
console.log(arr.sort());      // sorted → Array.prototype.sort()
console.log(arr.toString());  // "10,20,30" → Array.prototype.toString()

// toString ki journey:
// arr → Array.prototype (toString FOUND here) → returned!

// hasOwnProperty ki journey:
// arr → Array.prototype (nahi mila) → Object.prototype (FOUND!) → returned!

// Prototype chain dekhna:
console.log(arr.__proto__ === Array.prototype);             // true
console.log(arr.__proto__.__proto__ === Object.prototype);  // true
console.log(arr.__proto__.__proto__.__proto__);             // null

// Array.prototype ke andar kya hai:
console.log(Array.prototype);
// → push, pop, map, filter, sort, slice... sab dikhega


// ============================================================
// PART 5: Function Prototype Chain
// ============================================================

/*
  THEORY:
  - Functions bhi objects hain JavaScript mein!
  - Jab hum function banate hain:
      myFunc.__proto__ = Function.prototype
  - Function.prototype ka __proto__ = Object.prototype
  - Isliye function bhi ek object hai → "typeof function" is "function"
    lekin iska type OBJECT bhi hai.

  CHAIN:
  myFunc → Function.prototype → Object.prototype → null

  Function.prototype ke andar:
  → call(), apply(), bind(), toString()... yeh sab milta hai
*/

function ab() {
  console.log("Hello!");
}

// Function ka prototype:
console.log(ab.__proto__ === Function.prototype);             // true
console.log(ab.__proto__.__proto__ === Object.prototype);     // true
console.log(ab.__proto__.__proto__.__proto__);                // null

// Isliye function ko bhi object kehte hain:
// Function.prototype → Object.prototype → null


// ============================================================
// PART 6: COMPLETE PROTOTYPE CHAIN DIAGRAM
// ============================================================

/*
  DIAGRAM — Pura picture:

  ┌──────────────────────────────────────────────────────────────────┐
  │                    PROTOTYPE CHAIN                               │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  myObject  ──__proto__──►  Object.prototype  ──__proto__──► null │
  │                            (hasOwnProperty,                      │
  │                             toString, valueOf)                   │
  │                                                                  │
  │  myArray   ──__proto__──►  Array.prototype   ──__proto__──► ↑    │
  │                            (push, pop, map,                      │
  │                             filter, sort, length)                │
  │                                                                  │
  │  myFunc    ──__proto__──►  Function.prototype ──__proto__──► ↑   │
  │                            (call, apply, bind)                   │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  SEARCHING PROCESS (koi property/method dhundhna):
  1. Pehle: current object mein dhoondha → mila? → use karo
  2. Nahi mila → __proto__ follow karo → ek level upar jao
  3. Wahan bhi nahi mila → aur upar jao
  4. null aa gaya → property exist hi nahi karta → undefined/error

  ISLIYE array ko object kyon kehte hain?
  → Kyunki array apni properties Object.prototype se INHERIT karta hai.
  → Har array ek OBJECT hai — sirf ek special type ka.

  DRY PRINCIPLE: Don't Repeat Yourself
  → hasOwnProperty, toString sirf Object.prototype mein likha hai.
  → Array.prototype aur Function.prototype usse re-write nahi karte.
  → Bas pointer (link) set karte hain → chain follow karke access milta hai.
  → Memory bachti hai, code repeat nahi hota.
*/


// ============================================================
// PART 7: PROBLEM WITHOUT CLASSES — Code Repeat hona
// ============================================================

/*
  THEORY — Problem:
  - Agar hum multiple similar objects banate hain manually,
    toh code repeat hota hai.
  - Har ek object mein same method bar bar likhna padta hai.
  - Yeh:
      1. Memory waste karta hai (har object apna alag method store karta hai)
      2. Code messy hota hai
      3. DRY principle toota — Don't Repeat Yourself

  EXAMPLE (Problem):
  const obj1 = { name: "Rohit", age: 30, greet: function(){...} }
  const obj2 = { name: "Mohit", age: 20, greet: function(){...} } // repeat!
  const obj3 = { name: "Mohan", age: 10, greet: function(){...} } // repeat!
  // greet function 3 baar copy ho gaya → memory waste!
*/

// GALAT TARIKA (code repeat):
const obj_1 = {
  name: "Rohit", age: 30,
  greet: function () { console.log(`Hello ${this.name}`); } // repeat!
};
const obj_2 = {
  name: "Mohit", age: 20,
  greet: function () { console.log(`Hello ${this.name}`); } // repeat!
};
const obj_3 = {
  name: "Mohan", age: 10,
  greet: function () { console.log(`Hello ${this.name}`); } // repeat!
};
// greet function memory mein 3 baar exist karti hai → wasteful!


// ============================================================
// PART 8: CLASSES — Blueprint banao, DRY follow karo
// ============================================================

/*
  THEORY — Class kya hai?
  - Class ek BLUEPRINT hai — ek template hai.
  - Yeh define karta hai ki ek "type" ka object kaisa dikhega:
      → Kaunsi properties hongi?
      → Kaunse methods honge?
  - Class se hum "new" keyword se objects (instances) banate hain.

  CLASS KI INTERNAL WORKING (Behind the scenes):
  - Jab hum class Person banate hain:
      1. Person.prototype create ho jaata hai
      2. Usme saare METHODS daale jaate hain (sirf methods, properties nahi)
      3. Jab new Person() karte hain:
          a. Ek EMPTY OBJECT banta hai
          b. Us empty object ka __proto__ → Person.prototype set hota hai
          c. constructor call hota hai
          d. "this" → woh empty object ko point karta hai
          e. this.name, this.age → empty object mein properties add hoti hain
          f. Woh object return ho jaata hai

  KYUN METHODS PROTOTYPE MEIN? PROPERTIES OBJECT MEIN?
  - Properties (name, age) har object ke liye ALAG VALUE hoti hain
    → isliye har object apni properties khud rakhta hai
  - Methods (greet, sayHi) har object ke liye SAME hota hai
    → isliye sirf BAAR BAAR likhne ki zarurat nahi
    → prototype mein ek baar likho — sab share karenge!
    → DRY principle follow hua

  CONSTRUCTOR KYA HAI?
  - Ek special method jo class mein likhte hain.
  - Jab new ClassName() likhte hain → constructor AUTOMATIC call hota hai.
  - Kaam: properties ko initial values dena (initialize karna).
  - this → naye empty object ko point karta hai.
  - this.name = name → empty object mein "name" property create hoti hai.
*/

class Person {
  constructor(name, age) {
    // constructor → values initialize karta hai
    // "this" → abhi-abhi bana hua empty object ko point karta hai
    this.name = name; // empty object mein "name" property create hui
    this.age = age;   // empty object mein "age" property create hui
    // Yeh properties har object ke liye ALAG hongi
  }

  // Yeh method → Person.prototype mein jaayega (object mein nahi!)
  greet() {
    console.log(`Hello! My name is ${this.name}`);
  }

  getAge() {
    console.log(`${this.name} is ${this.age} years old`);
  }
}

// Objects (instances) banao:
const person1 = new Person("Rohit", 20);
const person2 = new Person("Mohit", 10);

// Properties access:
console.log(person1.name); // "Rohit" — person1 ki khud ki property
console.log(person2.name); // "Mohit" — person2 ki khud ki property
console.log(person1.age);  // 20

// Method call:
person1.greet();   // "Hello! My name is Rohit"
person2.greet();   // "Hello! My name is Mohit"
person1.getAge();  // "Rohit is 20 years old"

// BEHIND THE SCENES:
// person1 → { name: "Rohit", age: 20 }
//   person1.__proto__ → Person.prototype → { greet, getAge }
//     Person.prototype.__proto__ → Object.prototype → { hasOwnProperty... }
//       Object.prototype.__proto__ → null

// PROOF: method Person.prototype mein hai, person1 mein nahi:
console.log(person1.hasOwnProperty("name"));  // true (apni property)
console.log(person1.hasOwnProperty("greet")); // false (prototype mein hai)
console.log(Person.prototype);                 // { greet, getAge } dikhega


// ============================================================
// PART 9: "this" keyword — Kya point karta hai?
// ============================================================

/*
  THEORY:
  - "this" constructor ke andar ek naya EMPTY OBJECT point karta hai
    jo abhi-abhi "new" se bana hai.
  - this.name = name → us empty object mein "name" property add hoti hai.
  - Jab constructor complete hota hai → woh object return ho jaata hai.

  SIMPLE RULE:
  - new Person("Rohit", 20) → ek empty {} bana
  - this → us {} ko point kiya
  - this.name = "Rohit" → {} ke andar name property bani
  - this.age = 20       → {} ke andar age property bani
  - Result: { name: "Rohit", age: 20 }
  - Yahi person1 hai!
*/

// "this" ka demonstration:
class Demo {
  constructor(value) {
    console.log("this initially is:", this); // {} (empty object)
    this.value = value; // empty object mein property add ho rahi hai
    console.log("this after:", this); // { value: "hello" }
  }
}

const demoObj = new Demo("hello");
// Output:
// this initially is: Demo {}
// this after: Demo { value: 'hello' }


// ============================================================
// PART 10: INHERITANCE — extends + super
// ============================================================

/*
  THEORY — Inheritance kya hai?
  - Agar ek class dusri class ki properties/methods use karna chahti hai,
    toh hum EXTENDS use karte hain.
  - Example: Customer ek Person hi hai — naam, age hoga +
    account number, balance bhi hoga.
  - Toh Customer ko Person ki properties dobara likhne ki zarurat nahi.
  - extends se Person ki sab properties/methods inherit kar lo!

  extends kaise kaam karta hai:
  - class Customer extends Person
    → Customer.prototype.__proto__ = Person.prototype
    → Customer ke objects Person ke methods bhi access kar sakte hain

  super() kya hai?
  - Jab child class ka constructor chalta hai, toh PARENT class ka
    constructor call karna hota hai — taaki parent ki properties
    initialize ho sakein.
  - super(name, age) → Person ka constructor call ho jaata hai
    → this.name = name, this.age = age wahan set ho jaate hain.
  - super() ko constructor mein PEHLE call karna MANDATORY hai.

  MEMORY EFFICIENCY:
  - Person.prototype mein: greet() sirf ek baar
  - Customer.prototype mein: checkBalance(), deposit() sirf ek baar
  - Koi bhi customer object in methods ko share karta hai — memory save!
*/

class Customer extends Person {
  // extends → Customer ab Person ki sab properties/methods inherit karta hai

  constructor(name, age, accountNumber, balance) {
    // super() → Parent (Person) ke constructor ko call karta hai
    // Pehle parent ki properties initialize karo
    super(name, age); // Person ka constructor → this.name, this.age set hota hai

    // Fir Customer ki apni properties:
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Customer ke apne methods:
  checkBalance() {
    return this.balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ₹${amount}. New Balance: ₹${this.balance}`);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient balance!");
    } else {
      this.balance -= amount;
      console.log(`Withdrawn ₹${amount}. Remaining: ₹${this.balance}`);
    }
  }
}

// Customer object banao:
const customer1 = new Customer("Mohan", 20, 12, 540);

// Customer ki apni properties:
console.log(customer1.name);          // "Mohan" (Person se inherited)
console.log(customer1.age);           // 20 (Person se inherited)
console.log(customer1.accountNumber); // 12
console.log(customer1.balance);       // 540

// Person ke methods — Customer bhi use kar sakta hai:
customer1.greet();    // "Hello! My name is Mohan" (Person.prototype se)

// Customer ke khud ke methods:
console.log(customer1.checkBalance()); // 540
customer1.deposit(100);    // Deposited ₹100. New Balance: ₹640
customer1.withdraw(200);   // Withdrawn ₹200. Remaining: ₹440
customer1.withdraw(1000);  // Insufficient balance!

// CHAIN:
// customer1 → Customer.prototype → Person.prototype → Object.prototype → null
console.log(customer1.__proto__ === Customer.prototype);             // true
console.log(customer1.__proto__.__proto__ === Person.prototype);     // true
console.log(customer1.__proto__.__proto__.__proto__ === Object.prototype); // true


// ============================================================
// PART 11: Object.create() — Dusra tarika prototype link karne ka
// ============================================================

/*
  THEORY:
  - Object.create(proto) ek naya object banata hai
    jiska __proto__ aapke diye hue object par set hota hai.
  - Yeh ek alternative tarika hai prototype link karne ka.
  - __proto__ wali approach se ZYADA CLEAN hai.

  SYNTAX:
  const newObj = Object.create(existingObj);
  → newObj ka prototype = existingObj
  → newObj existingObj ki sab properties access kar sakta hai.
*/

const baseObj = {
  name: "Rohit",
  age: 20
};

// Object.create se naya object banao:
const childObj = Object.create(baseObj);
// childObj ka __proto__ → baseObj

// childObj apni property:
childObj.account = 100;

// baseObj ki properties access karna:
console.log(childObj.name);    // "Rohit" → baseObj se mila
console.log(childObj.age);     // 20 → baseObj se mila
console.log(childObj.account); // 100 → childObj ki apni

// PROOF:
console.log(childObj.__proto__ === baseObj); // true


// ============================================================
// PART 12: FULL PROTOTYPE CHAIN — Final Visualization
// ============================================================

/*
  COMPLETE CHAIN VISUALIZATION:

  ┌─────────────────────────────────────────────────────────────────┐
  │                   COMPLETE PROTOTYPE CHAIN                      │
  ├─────────────────────────────────────────────────────────────────┤
  │                                                                 │
  │  customer1                                                      │
  │  { name, age, accountNumber, balance }                          │
  │  __proto__ ─────────────────────────────┐                       │
  │                                         ▼                       │
  │                               Customer.prototype                │
  │                               { checkBalance, deposit,          │
  │                                 withdraw }                      │
  │                               __proto__ ────────────────┐       │
  │                                                         ▼       │
  │                                               Person.prototype  │
  │                                               { greet, getAge } │
  │                                               __proto__ ───┐    │
  │                                                            ▼    │
  │                                               Object.prototype  │
  │                                               { hasOwnProperty, │
  │                                                 toString... }   │
  │                                               __proto__ → null  │
  └─────────────────────────────────────────────────────────────────┘

  SEARCHING: customer1.greet()
  1. customer1 mein "greet" → nahi mila
  2. Customer.prototype mein "greet" → nahi mila
  3. Person.prototype mein "greet" → MILA! → execute kiya

  SEARCHING: customer1.hasOwnProperty("name")
  1. customer1 mein → nahi mila
  2. Customer.prototype → nahi mila
  3. Person.prototype → nahi mila
  4. Object.prototype → MILA! → execute kiya
*/


// ============================================================
// QUICK SUMMARY — Sab kuch ek jagah
// ============================================================

/*
  ┌──────────────────────────────────────────────────────────────────┐
  │  CONCEPT            │  EXPLANATION                               │
  ├──────────────────────────────────────────────────────────────────┤
  │  Prototype          │  Har object ka "parent" — methods/props    │
  │                     │  wahan se inherit hoti hain                │
  ├──────────────────────────────────────────────────────────────────┤
  │  __proto__          │  Object ka prototype dekhna (sirf          │
  │                     │  understanding ke liye, use mat karo)      │
  ├──────────────────────────────────────────────────────────────────┤
  │  Prototype Chain    │  obj → obj.prototype → ... → null          │
  │                     │  Property/method isi chain mein dhundhte   │
  ├──────────────────────────────────────────────────────────────────┤
  │  Object.prototype   │  Sab ka mool — hasOwnProperty, toString    │
  ├──────────────────────────────────────────────────────────────────┤
  │  Array.prototype    │  push, pop, map, filter, sort, length      │
  ├──────────────────────────────────────────────────────────────────┤
  │  Function.prototype │  call, apply, bind                         │
  ├──────────────────────────────────────────────────────────────────┤
  │  class              │  Object banane ka BLUEPRINT                │
  ├──────────────────────────────────────────────────────────────────┤
  │  constructor()      │  Properties initialize karne ka method     │
  ├──────────────────────────────────────────────────────────────────┤
  │  new Keyword        │  {} banata hai + constructor call karta hai│
  ├──────────────────────────────────────────────────────────────────┤
  │  this (class mein)  │  Naye bane empty object ko point karta hai │
  ├──────────────────────────────────────────────────────────────────┤
  │  extends            │  Child class → Parent class inherit karo   │
  ├──────────────────────────────────────────────────────────────────┤
  │  super()            │  Parent ka constructor call karo           │
  ├──────────────────────────────────────────────────────────────────┤
  │  Object.create()    │  Proto link karne ka clean tarika          │
  ├──────────────────────────────────────────────────────────────────┤
  │  DRY Principle      │  Don't Repeat Yourself — methods prototype │
  │                     │  mein ek baar, sab share karte hain        │
  └──────────────────────────────────────────────────────────────────┘

  KYUN ARRAY/FUNCTION KO OBJECT KEHTE HAIN?
  → Array apni sari properties Object.prototype se inherit karta hai.
  → Function bhi Object.prototype se inherit karta hai.
  → Dono ki chain aakhir mein Object.prototype → null par khatam hoti hai.
  → Isliye JS mein "almost everything is an object."

  CLASSES BEHIND THE SCENES:
  → class sirf SYNTACTIC SUGAR hai — andar se prototype hi use hota hai.
  → Methods → ClassName.prototype mein jaate hain (DRY follow)
  → Properties → har object ke andar (har object ki alag values)
*/