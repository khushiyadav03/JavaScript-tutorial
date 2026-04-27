// ============================================================
// LECTURE NOTES: JavaScript - Single Threaded, Synchronous,
//    Event Loop, Web APIs, Callback Queue, Microtask Queue
// ============================================================


// ============================================================
// PART 1: SINGLE THREADED KYA HOTA HAI?
// ============================================================

/*
  THEORY:
  - JavaScript ek SINGLE THREADED language hai.
  - Single threaded ka matlab: ek baar mein SIRF EK HI TASK execute hoga.
  - Matlab first task complete hone ke baad hi second task chalega.
  - Dono parallel mein nahi chalenge - ye MULTI-THREADED ka kaam hota.
  - JavaScript MULTI-THREADED nahi hai.
*/

console.log("First");  // pehle ye chalega
console.log("Second"); // fir ye
console.log("Third");  // fir ye

// OUTPUT: First → Second → Third
// Ye parallel nahi ho raha, ek ke baad ek — this is SINGLE THREADED


// ============================================================
// PART 2: SYNCHRONOUS KYA HOTA HAI?
// ============================================================

/*
  THEORY:
  - SYNCHRONOUS matlab: tasks ek PROPER ORDER mein, step by step chalte hain.
  - Jis order mein likha hai, usi order mein execute hoga.
  - Koi skipping nahi, koi random order nahi.
  - Pehle First, fir Second, fir Third — bilkul synchronized way mein.
*/

console.log("Step 1");
console.log("Step 2");
console.log("Step 3");

// OUTPUT: Step 1 → Step 2 → Step 3
// Synchronous = Predictable, ordered execution


// ============================================================
// PART 3: HEAVY CALCULATION EXAMPLE — Single Threaded PROOF
// ============================================================

/*
  THEORY:
  - Agar JavaScript single threaded hai, toh agar koi heavy calculation
    chal rahi ho, tab tak PAGE FREEZE ho jaata hai.
  - Browser ke buttons ya UI kuch bhi respond nahi karte jab tak
    JavaScript us heavy task mein busy hai.
  - Ye prove karta hai ki JS ek baar mein sirf ek kaam karta hai.
  - Agar ye multi-threaded hoti toh calculation bhi chalti aur
    UI bhi respond karta — lekin aisa hota nahi.
*/

console.log("First");

let sum = 0;
for (let i = 0; i <= 10_000_000_000; i++) {
  sum += i; // Ye ek bhaaari calculation hai
}

console.log("Sum:", sum); // Ye tab print hoga jab loop complete ho

console.log("Last");

// OUTPUT ORDER: First → (badi der...) → Sum: [value] → Last
// Tab tak browser ka koi bhi button kaam nahi karega → SINGLE THREADED PROOF


// ============================================================
// PART 4: ASYNCHRONOUS BEHAVIOUR — setTimeout Example
// ============================================================

/*
  THEORY:
  - Agar JS synchronous hai, toh setTimeout ke baad wali line
    5 second baad hi print honi chahiye thi.
  - Lekin aisa NAHI hota — ye ASYNCHRONOUS BEHAVIOUR dikhaata hai.
  - JavaScript setTimeout ko dekh ke bolta hai:
    "Bhai isko 5 second baad run karna hai, main nahi ruk sakta,
     aage nikal jaata hoon."
  - 5 second ka timer JAVASCRIPT count nahi kar raha — BROWSER count karta hai.
  - Agar JS ye timer count karta toh pura page 5 sec ke liye freeze ho jaata.
  - Ye possible banata hai — WEB API (Browser ka gift)
*/

console.log("Hello Ji"); // pehle print hoga

setTimeout(function () {
  console.log("Timeout Executed"); // 5 second baad print hoga
}, 5000);

console.log("I am the End"); // setTimeout ke PEHLE print hoga

// OUTPUT: Hello Ji → I am the End → (5 sec baad) → Timeout Executed
// JS ne setTimeout ko Web API ko de diya aur aage nikal gaya


// ============================================================
// PART 5: DO setTimeout TIMERS PARALLEL CHAL SAKTE HAIN?
// ============================================================

/*
  THEORY:
  - Agar JS single threaded hai, toh 2 setTimeout ek saath kaise chal sakte hain?
  - Answer: JavaScript nahi chala raha parallel mein — BROWSER chala raha hai.
  - Browser MULTI-THREADED hai.
  - Browser ke paas apna timer hai. Wo dono timers simultaneously track karta hai.
  - JS ko bas kaam saunpna hai — aage nikal jaana hai.
*/

console.log("Hello Ji");

setTimeout(function () {
  console.log("Timeout Executed ONE"); // 5 sec baad
}, 5000);

setTimeout(function () {
  console.log("Timeout Executed TWO"); // 6 sec baad (5+1 = 1 sec baad ONE ke baad)
}, 6000);

console.log("I am the End");

// OUTPUT:
// Hello Ji
// I am the End
// (5 sec baad) → Timeout Executed ONE
// (1 sec baad) → Timeout Executed TWO
// Dono timers parallel chal rahe the — Browser ki wajah se


// ============================================================
// PART 6: WEB API KYA HOTI HAI?
// ============================================================

/*
  THEORY:
  - WEB API simply ek FUNCTION CALL hai — kuch nahi!
  - Humein andar ka code nahi pata, bas function call karte hain aur
    kaam ho jaata hai.
  - Examples:
      → arr.push(10)    — push ka andar ka code nahi pata, bas kaam ho gaya
      → arr.map(...)    — map kaise kaam karti hai andar, nahi pata
      → arr.sort()      — konsa sorting algorithm laga, nahi pata
      → console.log()   — screen pe print kaise hua, nahi pata
      → document.getElementById() — DOM se element kaise aaya, nahi pata
  - Ye sab WEB API calls hain — function call karo, kaam ho jaata hai.

  - WEB API ka access kaun deta hai? → BROWSER (Window Object ke through)
  - Window Object browser create karta hai aur hmare code mein chipka deta hai.
  - Window Object ke andar:
      → setTimeout, setInterval
      → DOM API (document.getElementById etc)
      → fetch API
      → localStorage
      → console
      → location
      → crypto ... aur bahut kuch

  - BROWSER is MULTI-THREADED → wo parallel mein bahut saare kaam kar sakta hai.
  - JavaScript is SINGLE-THREADED → ek kaam ek baar.
  - Jo kaam JS nahi kar sakta (async tasks), wo Web API ke hawaale kar deta hai.
*/

// Example 1: Array methods — ye sab Web API calls hain
let arr = [100, 90, 70];
arr.push(10);               // Web API call — push ka andar ka code nahi pata
arr.sort();                 // Web API call — sorting algorithm nahi pata
arr.map((x) => x * 10);    // Web API call — map ka implementation nahi pata

// Example 2: Console — ye bhi Web API hai
console.log("Ye bhi Web API call hai!"); // console.log ka code kisi ne likha hai

// Example 3: setTimeout — Browser ki Web API
setTimeout(() => {
  console.log("Timer by Browser, not JS");
}, 2000);

// Example 4: DOM — Web API
// document.getElementById("btn") — DOM API hai, Browser ke paas DOM tree hota hai


// ============================================================
// PART 7: CALL STACK — JavaScript ka kaam kaise hota hai
// ============================================================

/*
  THEORY:
  - Jab bhi JS ka koi code run hota hai, sabse pehle
    GLOBAL EXECUTION CONTEXT create hota hai.
  - Ye Global Execution Context CALL STACK ke andar push hota hai.
  - JavaScript line by line code padhta hai aur execute karta hai.
  - Jaise hi koi function aata hai, wo Call Stack mein push hota hai.
  - Kaam hone ke baad pop ho jaata hai (LIFO — Last In First Out).
  - Jaise hi saara code complete, Global Execution Context bhi hata diya jaata hai.
  - JavaScript kabhi bhi CALL STACK ko BLOCK nahi hone deta.
  - Koi bhi async task aaya? → Web API ko de do → aage nikal jaao.
*/

// Call Stack ka basic flow:
console.log(1); // Global EC mein aaya, execute, hataya
console.log(2); // same
console.log(3); // same

// Call Stack: [GEC] → console(1) pop → console(2) pop → console(3) pop → GEC pop
// Simple synchronous flow 


// ============================================================
//  PART 8: CALLBACK QUEUE (Task Queue)
// ============================================================

/*
  THEORY:
  - Jab browser ka timer complete ho jaata hai (ya koi event ho jaata hai),
    toh us callback function ko directly Call Stack mein nahi dala jaata.
  - Pehle use CALLBACK QUEUE (Task Queue) mein daala jaata hai.
  - Callback Queue ek line (queue) ki tarah hai — FIFO (First In First Out).
  - Yahan se EVENT LOOP Call Stack mein dalta hai — par tab jab Stack EMPTY ho.

  Kaunse callbacks Callback Queue mein jaate hain?
    → setTimeout ke callbacks
    → setInterval ke callbacks
    → Event Listeners ke callbacks (button click etc)
*/

setTimeout(() => {
  console.log("Main Callback Queue se aaya hoon");
}, 1000);

// Ye callback 1 sec baad Callback Queue mein push hoga
// Event Loop dekh ke Call Stack mein daalega jab Stack empty ho


// ============================================================
// PART 9: EVENT LOOP
// ============================================================

/*
  THEORY:
  - Event Loop ka kaam hai continuously check karte rehna:
      1. Kya Microtask Queue mein kuch hai? (HIGH PRIORITY)
      2. Kya Callback Queue mein kuch hai?
      3. Kya Call Stack EMPTY hai?

  - Agar Call Stack EMPTY hai aur Queue mein callback hai,
    toh Event Loop us callback ko Call Stack mein push kar deta hai.

  - Event Loop ISILIYE pehle Stack empty hone ka wait karta hai taaki
    OUTPUT PREDICTABLE rahe.
    (Agar beech mein ghusa diya toh kabhi different order mein aayega,
     kabhi alag — unpredictable hoga.)

  - Event Loop ka kaam in one line:
    "Callback Queue ya Microtask Queue mein dekho,
     agar Call Stack khali hai toh callback wahan daalo."
*/

console.log("START"); // 1. Pehle ye

setTimeout(() => {
  console.log("TIMEOUT — Callback Queue se"); // 3. Baad mein (Stack empty hone par)
}, 0); // 0ms bhi immediately nahi chalta — Queue mein jaata hai pehle!

console.log("END"); // 2. Fir ye

// OUTPUT: START → END → TIMEOUT
// Ye prove karta hai Event Loop ka kaam — timeout 0ms hone ke bawajood
// Call Stack empty hone ka wait karna pada


// ============================================================
// PART 10: MICROTASK QUEUE — Higher Priority
// ============================================================

/*
  THEORY:
  - Ek aur queue hoti hai — MICROTASK QUEUE
  - Iski PRIORITY Callback Queue se ZYADA hoti hai.
  - Event Loop pehle Microtask Queue check karta hai,
    agar wahan kuch hai toh pehle usse Call Stack mein daalta hai.
  - Baad mein Callback Queue check karta hai.

  Kya jaata hai Microtask Queue mein?
    → fetch() ke callbacks (Promise-based operations)
    → .then(), .catch(), .finally() ke callbacks
    → queueMicrotask() se add kiye gaye tasks
    → async/await ke baad ka code

  Kya jaata hai Callback Queue mein?
    → setTimeout ke callbacks
    → setInterval ke callbacks
    → Event Listener ke callbacks (click, keypress etc)

  PRIORITY ORDER:
    Microtask Queue > Callback Queue
*/

console.log("Script Start");

setTimeout(() => {
  console.log("setTimeout — Callback Queue (LOW priority)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise .then() — Microtask Queue (HIGH priority)");
});

console.log("Script End");

// OUTPUT:
// Script Start
// Script End
// Promise .then() — Microtask Queue (HIGH priority)  ← pehle!
// setTimeout — Callback Queue (LOW priority)          ← baad mein

// Proof: Microtask Queue > Callback Queue


// ============================================================
// PART 11: FETCH API — Real World Async Example
// ============================================================

/*
  THEORY:
  - fetch() ka kaam hai kisi baahari server se data laana.
    Jaise GitHub ke servers se user data laana.
  - JavaScript fetch() ko Web API ko de deta hai aur aage nikal jaata hai.
  - Jab data aa jaata hai, fetch ka callback Microtask Queue mein jaata hai.
  - Event Loop us callback ko Call Stack mein daalta hai jab Stack empty ho.

  - Agar JS fetch ke liye WAIT karta, toh page FREEZE ho jaata jab tak
    server se response na aaye (1 sec, 5 sec, 10 sec...).
  - Isliye ye async hai — Web API handle karta hai, JS aage chalti rehti hai.
*/

console.log("Start the Operation");

fetch("https://api.github.com/users") // Web API ko de diya
  .then(function (response) {
    return response.json(); // response ko JSON mein convert karo
  })
  .then(function (data) {
    // Ye MICROTASK QUEUE mein jaayega — HIGH PRIORITY
    console.log("GitHub User Info:", data);
  });

console.log("End of Operation"); // ye fetch se PEHLE print hoga

// OUTPUT:
// Start the Operation
// End of Operation
// GitHub User Info: [... data ...] ← (jab server se data aaya)

// JS ne fetch ka wait nahi kiya — aage nikal gayi


// ============================================================
// PART 12: EVENT LISTENERS — Async Behavior
// ============================================================

/*
  THEORY:
  - addEventListener bhi Web API hai.
  - JS keh deta hai: "Button click hua toh mujhe batana"
  - Phir aage nikal jaata hai — wahan RUKTA NAHI.
  - Browser (multi-threaded) teeno buttons ko simultaneously LISTEN karta hai.
  - Jab koi button click hota hai, uska callback Callback Queue mein jaata hai.
  - Event Loop us callback ko Call Stack mein daalega jab Stack empty ho.

  - JavaScript ke liye IMPOSSIBLE tha ek saath 3 buttons listen karna
    (single threaded jo hai!).
  - Browser ki wajah se possible hai — MULTI-THREADED browser.
*/

// (Browser environment mein chalega — Node.js mein nahi)
// const btn1 = document.getElementById("button1");
// const btn2 = document.getElementById("button2");
// const btn3 = document.getElementById("button3");

// btn1.addEventListener("click", function () {
//   console.log("Button 1 is Clicked"); // Callback Queue mein jaayega
// });

// btn2.addEventListener("click", function () {
//   console.log("Button 2 is Clicked"); // Callback Queue mein jaayega
// });

// btn3.addEventListener("click", function () {
//   console.log("Button 3 is Clicked"); // Callback Queue mein jaayega
// });

// Teeno buttons simultaneously listen ho rahe hain — Browser ki wajah se


// ============================================================
//  COMPLETE FLOW SUMMARY
// ============================================================

/*
  STEP BY STEP FLOW JAB ASYNC CODE CHALTA HAI:

  1. Saara code CALL STACK mein aata hai (Global Execution Context).

  2. JavaScript line by line padhta hai:
     → Synchronous tasks? → Direct Call Stack mein execute karo.
     → Async tasks (setTimeout, fetch, addEventListener)?
       → WEB API ko de do → JS aage nikal jaao.

  3. Web API (Browser) us async task ko handle karta hai:
     → Timer count karta hai (setTimeout/setInterval ke liye)
     → Network request bheji (fetch ke liye)
     → Event listen karta hai (addEventListener ke liye)

  4. Jab async kaam complete hota hai (timer khatam, data aaya, button clicked):
     → Callback Queue (setTimeout, setInterval, events ke liye)
     → Microtask Queue (fetch/Promise ke liye) — HIGH PRIORITY

  5. EVENT LOOP continuously dekhta rehta hai:
     → Pehle: Microtask Queue mein kuch hai? → Stack empty hai? → Stack mein daalo
     → Fir: Callback Queue mein kuch hai? → Stack empty hai? → Stack mein daalo

  6. JavaScript us callback ko Run karta hai jab wo Call Stack mein aata hai.

  RESULT:
  → JavaScript — Single Threaded + Synchronous (apne code ke liye)
  → Browser — Multi-Threaded (async kaam ke liye)
  → Web API — Bridge between JS and Browser
  → Callback Queue + Microtask Queue — Waiting room for callbacks
  → Event Loop — Traffic police 🚦 jo queue se stack mein daalta hai

  JAVASCRIPT KA EK HI SIDDHANT:
  "Main kisi ke liye NAHI RUKUNGA."
  Async? → Web API lo, aage niklo.
*/


// ============================================================
// QUICK REFERENCE: Kya Kahan Jaata Hai?
// ============================================================

/*
  ┌─────────────────────────────────────────────────────────┐
  │  CODE TYPE              │  QUEUE                        │
  ├─────────────────────────────────────────────────────────┤
  │  setTimeout callback    │  Callback Queue (Low)         │
  │  setInterval callback   │  Callback Queue (Low)         │
  │  addEventListener cb    │  Callback Queue (Low)         │
  │  fetch / Promise .then  │  Microtask Queue (HIGH)       │
  │  async/await            │  Microtask Queue (HIGH)       │
  │  queueMicrotask()       │  Microtask Queue (HIGH)       │
  └─────────────────────────────────────────────────────────┘

  Priority: Microtask Queue > Callback Queue
*/
