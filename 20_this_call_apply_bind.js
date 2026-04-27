// ============================================================
//  LECTURE NOTES: this, call, apply, bind + Strict Mode
//    + Global Object (window vs global) + Arrow Function & this
//    + Lexical Environment Scope + Stopwatch Example
// ============================================================


// ============================================================
//  PART 1: STRICT MODE — "use strict"
// ============================================================

/*
  THEORY:
  - JavaScript ke 2 modes hote hain:
      1. NON-STRICT MODE (default, purana tarika — forggiving)
      2. STRICT MODE     (modern, strict rules — catches bugs)

  NON-STRICT MODE ki problems:
  - Aap koi variable use kar sakte ho bina declare kiye:
      b = 20; → works! (bug ka source)
  - Ek function ke 2 parameters ka naam same rakh sakte ho:
      function greet(name, name) → works! (wrong output)
  - Yeh sab SILENTLY galat kaam karta hai — production mein bug

  STRICT MODE kyun?
  - "use strict" likho file ke SABSE UPAR
  - Ab yeh galtiyan ERROR throw karengi — tumhe pata chalega turant
  - Modern JavaScript (ES5+) strict mode recommend karta hai
  - Modules (React, Node.js) mein by default strict mode ON hota hai

  STRICT MODE kya pakad leta hai:
  1. Undeclared variables → ReferenceError
  2. Duplicate parameter names → SyntaxError
  3. this → undefined (jab koi function independently call ho)
  4. Aur bahut saari common mistakes
*/

"use strict"; // ← file ke top pe likhte hain

// BINA STRICT MODE — Yeh silently kaam karta hai (BUG SOURCE):
// b = 20; → works in non-strict, bug hai!

// STRICT MODE mein yeh ERROR dega:
// b = 20; → ReferenceError: b is not defined

// DUPLICATE PARAMETERS — non-strict mein kaam karta hai:
// function greet(name, name) { console.log(name); }
// greet("Rohit", "Mohit"); → "Mohit" "Mohit" (Rohit kahan gaya!)

// STRICT MODE mein:
// SyntaxError: Duplicate parameter name not allowed in this context

// CORRECT code strict mode mein:
let a = 10;
let b = 20;
console.log(a, b); // 10 20

function greet(name1, name2) { // alag-alag naam
  console.log(name1, name2); // "Rohit" "Mohit"
}
greet("Rohit", "Mohit");


// ============================================================
// PART 2: GLOBAL OBJECT — window vs global vs globalThis
// ============================================================

/*
  THEORY:
  - JavaScript kisi bhi environment mein chale, ek GLOBAL OBJECT hota hai.
  - Yeh global object JavaScript ka part NAHI hai —
    environment (browser ya Node.js) banata hai.

  BROWSER mein:
  - Global Object ka naam: WINDOW
  - window ke andar: document, fetch, setTimeout, setInterval,
    localStorage, location, crypto, console... sab kuch
  - window ko BROWSER create karta hai (Web API)

  NODE.JS mein:
  - Global Object ka naam: GLOBAL
  - global ke andar: setTimeout, setInterval, fetch, crypto...
  - document, window NAHI hota → Node.js ko DOM ka koi concept nahi

  KYUN ALAG-ALAG NAAM?
  - Global Object JavaScript ka hissa NAHI — har environment apna naam deta hai
  - Browser ne "window" naam diya
  - Node.js ne "global" naam diya

  UNIVERSAL SOLUTION — globalThis:
  - ES2020 mein globalThis aaya
  - Kisi bhi environment mein kaam karta hai — browser, Node.js, Deno sab
  - globalThis → us environment ka global object point karta hai

  TABLE:
  ┌────────────────┬─────────────────┬───────────────────────────┐
  │  Environment   │  Global Object  │  Examples                 │
  ├────────────────┼─────────────────┼───────────────────────────┤
  │  Browser       │  window         │  window.document, fetch   │
  │  Node.js       │  global         │  global.setTimeout        │
  │  Universal     │  globalThis     │  Works everywhere         │
  └────────────────┴─────────────────┴───────────────────────────┘
*/

// Browser mein:
// console.log(window);      // → Window object (browser only)
// console.log(window.document); // → HTML document

// Node.js mein:
// console.log(global);      // → Global object (Node only)
// console.log(global.document); // → undefined (DOM nahi hai Node mein!)

// Universal — dono mein kaam karta hai:
console.log(globalThis); // → window (browser) ya global (Node.js)

// PROOF — Node mein window nahi hota:
// console.log(window); // ReferenceError: window is not defined (in Node.js)

// PROOF — Browser mein global nahi hota:
// console.log(global); // ReferenceError: global is not defined (in browser)


// ============================================================
// PART 3: "this" KEYWORD — Global Scope mein kya point karta hai?
// ============================================================

/*
  THEORY:
  - "this" keyword ka value CONTEXT pe depend karta hai —
    kahan use kiya, kaise use kiya.
  - Global scope mein "this" ka behavior environment pe depend karta hai.

  GLOBAL SCOPE MEIN "this":

  NODE.JS:
  → "this" ek EMPTY OBJECT {} point karta hai
  → Strict mode ho ya non-strict — dono mein same
  → Reason: Node.js module system ki wajah se (backend mein detail mein)

  BROWSER:
  → "this" WINDOW OBJECT point karta hai
  → Strict mode ho ya non-strict — dono mein same

  SUMMARY TABLE:
  ┌────────────────────────┬────────────────┬────────────────────┐
  │  Where                 │  Strict Mode   │  Non-Strict Mode   │
  ├────────────────────────┼────────────────┼────────────────────┤
  │  Global Scope (Node)   │  {}            │  {}                │
  │  Global Scope (Browser)│  window        │  window            │
  └────────────────────────┴────────────────┴────────────────────┘
*/

// Global scope mein this:
console.log(this);
// Node.js mein: {} (empty object)
// Browser mein: Window object


// ============================================================
// PART 4: "this" INSIDE REGULAR FUNCTION — Behavior
// ============================================================

/*
  THEORY:
  - Jab "this" kisi regular function ke andar hota hai,
    toh uska value depend karta hai:
      → Kisi ne function ko invoke kiya?
      → Strict mode hai ya nahi?

  RULE: Jab function call karte ho, pehle DEKHO —
  function ke LEFT mein kaun hai?
  → Jo left mein hai, "this" usi ko point karta hai.
  → Agar left mein kuch NAHI → strict/non-strict decide karta hai.

  CASE 1: Kisi ne invoke kiya (dot notation):
  user.greet()  → this = user object
  user2.greet() → this = user2 object

  CASE 2: Koi invoke NAHI kar raha (independent call):
  greet() → function independently call hui

  NON-STRICT MODE mein:
  → this = Global Object (window/global)

  STRICT MODE mein:
  → this = undefined (kyunki kisi ne invoke nahi kiya!)

  SUMMARY TABLE:
  ┌──────────────────────────────────┬──────────────────┬────────────┐
  │  Situation                       │  Non-Strict      │  Strict    │
  ├──────────────────────────────────┼──────────────────┼────────────┤
  │  obj.method() called             │  obj             │  obj       │
  │  func() called independently     │  Global Object   │  undefined │
  └──────────────────────────────────┴──────────────────┴────────────┘
*/

// CASE 1 — "this" points to invoking object:
const user = {
  name: "Rohit",
  age: 38,
  greet: function () {
    console.log(this); // → user object
    console.log(`Hi! ${this.name}`); // Hi! Rohit
  }
};
user.greet(); // user ne invoke kiya → this = user

// CASE 2 — Koi invoke nahi kar raha:
function greetIndependent() {
  console.log(this);
  // Non-strict: Global Object
  // Strict: undefined
}
greetIndependent(); // Strict mode mein: undefined


// ============================================================
// PART 5: "this" — PROBLEM WITHOUT DRY PRINCIPLE
// ============================================================

/*
  THEORY:
  - Agar hum ek function ko multiple objects mein copy karte hain,
    toh memory waste hoti hai aur code repeat hota hai.
  - 100 users ke liye 100 baar greet function → 100x memory!
  - DRY: Don't Repeat Yourself → ek baar likho, baar-baar use karo.

  SOLUTION:
  - Function ko ek baar define karo (bahar).
  - call() use karke different objects ke saath use karo.
  - call() batata hai: "Yeh function chalao aur 'this' ko
    is specific object ki taraf point karo."
*/

// PROBLEM — Same function har jagah copy paste:
const user1_bad = {
  name: "Rohit",
  greet: function () { console.log(`Hi ${this.name}`); } // copy!
};
const user2_bad = {
  name: "Mohit",
  greet: function () { console.log(`Hi ${this.name}`); } // copy!
};
// 100 users = 100 baar function → 100x memory waste

// SOLUTION — Ek function, DRY principle:
function greetFn() {
  console.log(`Hi ${this.name}`);
}
// Ab greetFn ko call() se reuse karo


// ============================================================
// PART 6: call() — Function Reuse karna
// ============================================================

/*
  THEORY:
  - call() ek built-in method hai jo har function ke paas hota hai.
  - SYNTAX: functionName.call(thisValue, arg1, arg2, ...)
  - PEHLA argument: Kisi object ko pass karo → "this" usi ko point karega
  - BAAKI arguments: Function ke normal parameters mein jaate hain

  KAISE KAAM KARTA HAI:
  - greet.call(user) → greet function chala aur this = user
  - greet.call(user2) → greet function chala aur this = user2
  - Ek hi function, alag-alag objects ke saath!

  FAYDA:
  1. Memory efficient: function sirf ek baar create hua
  2. DRY principle follow: code repeat nahi
  3. Flexible: kisi bhi object ke saath use kar sakte ho
  4. Tumhara control: tum decide karte ho "this" kya hoga
*/

const userA = { name: "Rohit", age: 30 };
const userB = { name: "Mohit", age: 10 };

function greet() {
  console.log(`Hi! ${this.name}`);
}

// call() se different objects ke saath use karo:
greet.call(userA); // Hi! Rohit → this = userA
greet.call(userB); // Hi! Mohit → this = userB

// Arguments bhi pass kar sakte ho:
function incrementAge(value, newName) {
  this.age += value;
  this.name = newName;
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

// call(thisObject, arg1, arg2, ...)
incrementAge.call(userA, 5, "Rohit Kumar");   // Age: 35, Name: Rohit Kumar
incrementAge.call(userB, 10, "Mohit Sharma"); // Age: 20, Name: Mohit Sharma

// COMPARISON:
// Normal:  greet()           → this = undefined (strict) ya global (non-strict)
// call:    greet.call(user)  → this = user (humne decide kiya!)


// ============================================================
// PART 7: apply() — call jaisa, par array mein arguments
// ============================================================

/*
  THEORY:
  - apply() bilkul call() jaisa hai — sirf ek fark:
  - call()  → arguments INDIVIDUALLY pass karo: call(obj, arg1, arg2)
  - apply() → arguments ARRAY mein pass karo: apply(obj, [arg1, arg2])

  SYNTAX: functionName.apply(thisValue, [arg1, arg2, ...])

  KAB USE KARO?
  - Jab tumhare paas arguments already ek array mein hon.
  - Jab tumhe spread karna ho array ko function arguments mein.
  - Mathematically: Math.max.apply(null, [1,2,3]) → 3
*/

function updateUser(value, newName) {
  this.age += value;
  this.name = newName;
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

const userC = { name: "Mohan", age: 15 };

// call() — arguments individually:
// updateUser.call(userC, 10, "Mohan Lal");

// apply() — arguments array mein:
updateUser.apply(userC, [10, "Mohan Lal"]); // same result!
// → Name: Mohan Lal, Age: 25

// COMPARISON:
// call(obj, arg1, arg2)   → individual arguments
// apply(obj, [arg1, arg2]) → array of arguments
// Dono ka kaam SAME hai — sirf syntax ka fark


// ============================================================
// PART 8: bind() — Baad mein call karne ke liye
// ============================================================

/*
  THEORY:
  - call() aur apply() → TURANT function execute karte hain
  - bind() → function execute NAHI karta — sirf ek BOUND copy banata hai

  SYNTAX: const newFunc = functionName.bind(thisValue, arg1, arg2, ...)

  KAISE KAAM KARTA HAI:
  - bind() → ek NAYA FUNCTION return karta hai jisme "this" already fix hai
  - Baad mein jab bhi chahiye, us naye function ko call karo
  - Arguments bhi fix kar sakte ho (partial application)

  KAB USE KARO?
  - Jab function ko future mein use karna ho (event listeners mein)
  - Jab "this" ko pehle se fix karna ho
  - Jab function ko callback ke roop mein pass karna ho

  COMPARISON:
  ┌──────────┬────────────────────────────────────────────────────┐
  │  Method  │  Behavior                                          │
  ├──────────┼────────────────────────────────────────────────────┤
  │  call()  │  Turant execute karo, arguments individually       │
  │  apply() │  Turant execute karo, arguments array mein         │
  │  bind()  │  Bound function return karo, baad mein execute     │
  └──────────┴────────────────────────────────────────────────────┘
*/

const userD = { name: "Mohit", age: 10 };

function showUser(value, newName) {
  this.age += value;
  this.name = newName;
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

// bind() → abhi execute nahi hoga, sirf bind karega:
const boundFn = showUser.bind(userD, 10, "Mohit Sharma");
console.log(boundFn); // → [Function: bound showUser] (function reference)

// Baad mein jab chahiye, call karo:
boundFn(); // → Name: Mohit Sharma, Age: 20
// Ab execute hua!

// PRACTICAL USE — Event listener mein (Browser):
// button.addEventListener("click", showUser.bind(userD, 5, "New Name"));
// → click hone par showUser chalega with userD as this


// ============================================================
// PART 9: ARROW FUNCTION aur "this" — Kya hota hai?
// ============================================================

/*
  THEORY:
  - Arrow function ke paas KHUD KA "this" NAHI HOTA.
  - Yeh statement bohot important hai — bahut logo ko nahi pata.
  - Regular function: "this" ko runtime pe decide karta hai
    (kaun invoke kar raha hai usi ko point karta hai)
  - Arrow function: "this" ko LEXICAL ENVIRONMENT se leta hai
    (apne BAHAR wale scope se borrow karta hai)

  LEXICAL ENVIRONMENT KYA HAI?
  - Jahan arrow function DEFINE kiya gaya hai us surrounding scope ka "this"
  - Arrow function kehta hai: "Mujhe this chahiye — main apne bahar wale
    environment mein dhundhta hoon."
  - Agar bahar mein bhi nahi mila → aur bahar, aur bahar...
  - Jab tak kuch mil na jaaye

  KYUN ARROW FUNCTION BANAYA GAYA?
  - Purane zamaane mein nested functions mein "this" ka problem tha
  - "const that = this" jaisi tricks use karni padti thi
  - Arrow function ne yeh problem solve kar diya!

  RULE (yaad rakho):
  - Regular function: this = jo invoke kare
  - Arrow function:   this = jo bahar wale scope mein ho (lexical)
*/

// EXAMPLE 1 — Arrow function global scope mein:
const greetArrow = () => {
  console.log(this);
  // Node.js: {} (global scope ka this)
  // Browser: window object (global scope ka this)
};
greetArrow();

// EXAMPLE 2 — Regular function vs Arrow function comparison:
const user2 = {
  name: "Rohit",

  // Regular function — koi invoke kare toh this = user2
  greetRegular: function () {
    console.log("Regular:", this.name); // "Rohit"
  },

  // Arrow function — bahar ka scope ka this lega
  greetArrow: () => {
    console.log("Arrow:", this); // {} (Node) ya window (Browser)
    // user2 ka this NAHI milega!
    // Kyunki arrow function yahan define hua global scope mein
    // aur global scope ka this = {} ya window
  }
};

user2.greetRegular(); // → "Rohit" (user2 ne invoke kiya)
user2.greetArrow();   // → {} ya window (lexical environment se liya)

// EXAMPLE 3 — Nested function problem (purana tarika):
const objOld = {
  name: "Rohit",
  greet: function () {
    // Yahan this = objOld (objOld ne invoke kiya)
    console.log("Outer this:", this.name); // Rohit

    function innerFn() {
      // Yahan this = ??? (kisi ne invoke nahi kiya)
      // Strict: undefined, Non-strict: Global Object
      console.log("Inner this (PROBLEM):", this); // galat!
    }
    innerFn(); // independent call — this wahi nahi jo chahiye tha!

    // PURANI TRICK — "const that = this":
    const that = this; // yahan this = objOld
    function innerFnFixed() {
      console.log("Fixed with 'that':", that.name); // Rohit
    }
    innerFnFixed();
  }
};
objOld.greet();


// ============================================================
// PART 10: ARROW FUNCTION — Real Solution to Nested Problem
// ============================================================

/*
  THEORY:
  - Arrow function ne "const that = this" trick ki zarurat khatam kar di.
  - Arrow function apne LEXICAL SCOPE ka "this" use karta hai.
  - Matlab jis function ke andar arrow function define hua,
    us function ka "this" lega.
  - Yahi hai arrow function ka SABSE BADA USE CASE!
*/

// PROBLEM — Regular nested function mein this ka galat hona:
const objProblem = {
  name: "Rohit",
  greet: function () {
    console.log("Outer:", this.name); // Rohit

    function meet() {
      // Kisi ne invoke nahi kiya → this = undefined (strict) ya global
      console.log("Inner meet:", this); // undefined ya Global
    }
    meet();
  }
};
objProblem.greet();

// SOLUTION — Arrow function use karo:
const objSolution = {
  name: "Rohit",
  greet: function () {
    // Yahan this = objSolution (greet ko objSolution ne invoke kiya)
    console.log("Outer:", this.name); // Rohit

    const meet = () => {
      // Arrow function: khud ka this nahi → bahar wale ka leta hai
      // Bahar wala = greet function ka scope → this = objSolution!
      console.log("Inner meet (Arrow):", this.name); // Rohit
    };
    meet();
  }
};
objSolution.greet(); // Rohit, Rohit — dono sahi!


// ============================================================
// PART 11: STOPWATCH EXAMPLE — Real World Use Case
// ============================================================

/*
  THEORY:
  - setInterval ke andar regular function dalte the toh problem aati thi.
  - setInterval khud function ko invoke karta hai → this = setInterval context
  - Yeh woh nahi jo hum chahte the!
  - Arrow function se yeh problem solve ho gayi.
*/

// PURANA TARIKA — Regular function (Problem):
const stopwatchOld = {
  seconds: 0,
  start: function () {
    // Yahan this = stopwatchOld

    setInterval(function () {
      // Yahan this = ??? (setInterval ne invoke kiya)
      // Non-strict: Global Object (NaN dega!)
      // Strict: undefined (Error!)
      this.seconds++; // galat this! NaN ya Error
      console.log(this.seconds); // NaN NaN NaN...
    }, 1000);
  }
};
// stopwatchOld.start(); // ← NaN problem hogi

// PURANI TRICK — "const that = this":
const stopwatchThat = {
  seconds: 0,
  start: function () {
    const that = this; // yahan this = stopwatchThat
    setInterval(function () {
      that.seconds++; // that se access karo
      console.log(that.seconds); // 1, 2, 3...
    }, 1000);
  }
};

// MODERN TARIKA — Arrow function:
const stopwatch = {
  seconds: 0,
  start: function () {
    // Yahan this = stopwatch (start ko stopwatch ne invoke kiya)

    setInterval(() => {
      // Arrow function: khud ka this nahi → bahar se lega
      // Bahar = start function → this = stopwatch
      this.seconds++;
      console.log(this.seconds); // 1, 2, 3, 4...
    }, 1000);
  }
};

// stopwatch.start(); // → 1, 2, 3, 4... (sahi output!)
// Arrow function ne automatically sahi "this" use kiya!


// ============================================================
// PART 12: "this" in CLASS Constructor
// ============================================================

/*
  THEORY:
  - Jab "new" keyword use karte ho → ek EMPTY OBJECT banta hai
  - Constructor ke andar "this" → us naye empty object ko point karta hai
  - this.name = name → empty object mein "name" property add hoti hai
  - Yahi Class lecture mein bhi dekha tha!

  STEPS:
  1. new Person("Rohit", 20) → {} create hua (empty)
  2. this → us {} ko point karta hai
  3. this.name = "Rohit" → {} mein "name" add hua
  4. this.age = 20 → {} mein "age" add hua
  5. Result: { name: "Rohit", age: 20 } → yahi person1 hai

  TABLE:
  ┌─────────────────────────────┬────────────────────────────────┐
  │  Where                      │  "this" points to              │
  ├─────────────────────────────┼────────────────────────────────┤
  │  Class constructor (new)    │  Newly created empty object    │
  └─────────────────────────────┴────────────────────────────────┘
*/

class Person {
  constructor(name, age) {
    // "new" ne ek {} banaya → this → us {} ko point karta hai
    this.name = name; // {} mein "name" add hua
    this.age = age;   // {} mein "age" add hua
  }

  greet() {
    console.log(`Hi! I'm ${this.name}, ${this.age} years old`);
  }
}

const p1 = new Person("Rohit", 20);
console.log(p1); // Person { name: 'Rohit', age: 20 }
p1.greet(); // Hi! I'm Rohit, 20 years old


// ============================================================
// PART 13: DOM Events + "this" (Browser only)
// ============================================================

/*
  THEORY:
  - DOM event listener mein "this" ka behavior:

  REGULAR FUNCTION mein:
  - "this" → woh DOM element jis par event hua
  - Example: button click → this = that specific button element
  - Kaam aata hai: "kaunse button pe click hua?"

  ARROW FUNCTION mein:
  - Arrow function ka khud ka "this" nahi → lexical scope se lega
  - Bahar ka scope = global → this = window
  - Button ka reference NAHI milega!

  RULE:
  - DOM events mein REGULAR FUNCTION use karo
    agar tume "this" se element chahiye
  - Arrow function use karo agar element nahi chahiye
    aur bahar ka "this" chahiye
*/

// (Browser environment mein chalega):
/*
const btn = document.getElementById("first");

// Regular function — this = button element:
btn.addEventListener("click", function () {
  console.log(this); // → <button id="first">...</button>
  this.style.backgroundColor = "blue"; // button ka color change
});

// Arrow function — this = window:
btn.addEventListener("click", () => {
  console.log(this); // → window object (button nahi!)
});
*/


// ============================================================
// COMPLETE SUMMARY TABLE — "this" Behavior
// ============================================================

/*
  ┌────────────────────────────────────┬──────────────────┬──────────────────┐
  │  Situation                         │  Non-Strict      │  Strict Mode     │
  ├────────────────────────────────────┼──────────────────┼──────────────────┤
  │  Global scope (Node.js)            │  {} empty obj    │  {} empty obj    │
  │  Global scope (Browser)            │  window          │  window          │
  ├────────────────────────────────────┼──────────────────┼──────────────────┤
  │  Regular fn — obj.method()         │  obj             │  obj             │
  │  Regular fn — method() independent │  Global Object   │  undefined       │
  ├────────────────────────────────────┼──────────────────┼──────────────────┤
  │  Arrow function                    │  Lexical scope   │  Lexical scope   │
  │                                    │  (outer env)     │  (outer env)     │
  ├────────────────────────────────────┼──────────────────┼──────────────────┤
  │  Class constructor (new)           │  New empty {}    │  New empty {}    │
  ├────────────────────────────────────┼──────────────────┼──────────────────┤
  │  DOM event (regular fn)            │  DOM element     │  DOM element     │
  │  DOM event (arrow fn)              │  window          │  window          │
  └────────────────────────────────────┴──────────────────┴──────────────────┘

  ┌──────────┬─────────────────────────────────────────────────────────────┐
  │  Method  │  Description                                                │
  ├──────────┼─────────────────────────────────────────────────────────────┤
  │  call()  │  Turant execute, args individually → func.call(obj, a, b)   │
  │  apply() │  Turant execute, args as array   → func.apply(obj, [a, b])  │
  │  bind()  │  Bound function return, baad mein call → func.bind(obj)()   │
  └──────────┴─────────────────────────────────────────────────────────────┘

  ARROW FUNCTION KA SABSE IMPORTANT RULE:
  → "Mujhe khud ka 'this' nahi, main apne LEXICAL SCOPE (bahar wale) se lunga"
  → Yahi reason hai stopwatch, setTimeout, setInterval mein arrow function
    better hai — automatically sahi "this" milta hai!

  globalThis:
  → Browser mein bhi kaam karta hai, Node.js mein bhi
  → window ya global dono ko ek se point karta hai
*/