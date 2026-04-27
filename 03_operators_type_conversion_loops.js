// ============================================================
//         JAVASCRIPT SERIES - LECTURE 03
//         Topic: Operators, Type Conversion, Loops, If-Else,
//                Logical Operators, Floating Point Problem
// ============================================================

// ============================================================
// PART 1: ARITHMETIC OPERATORS
// ============================================================

console.log(2 + 5);   // Output: 7
console.log(2 - 5);   // Output: -3
console.log(2 * 5);   // Output: 10
console.log(6 / 2);   // Output: 3
console.log(5 % 2);   // Output: 1  (5 ko 2 se divide karo, remainder 1 hai)
console.log(5 ** 2);  // Output: 25  (5 ka square = 5 * 5)
console.log(5 ** 3);  // Output: 125 (5 ka cube = 5 * 5 * 5)


// ============================================================
// PART 2: ASSIGNMENT OPERATORS
// ============================================================

let x = 20;
let y = 10;

x = x + y;
console.log(x); // Output: 30

x = 20;
x += y;
console.log(x); // Output: 30 (same result, shortcut way)

x = 20;
x -= y;
console.log(x); // Output: 10

x = 20;
x *= y;
console.log(x); // Output: 200

x = 20;
x %= y;
console.log(x); // Output: 0 (20 ko 10 se divide karo, remainder 0)


// ============================================================
// PART 3: COMPARISON OPERATORS
// ============================================================

let p = 20;
let q = 10;

console.log(p > q);   // Output: true  (20 bada hai 10 se)
console.log(p < q);   // Output: false (20 chhota nahi hai 10 se)
console.log(p >= q);  // Output: true  (20 greater than or equal to 10)
console.log(p <= q);  // Output: false (20 less than or equal to nahi hai 10 se)
console.log(p == q);  // Output: false (20 aur 10 equal nahi hain)
console.log(p === q); // Output: false (strict check, equal nahi hain)
console.log(4 != 5);  // Output: true  (4 aur 5 equal nahi hain)
console.log(5 != 5);  // Output: false (5 aur 5 equal hain)


// ============================================================
// PART 4: DOUBLE EQUAL (==) vs TRIPLE EQUAL (===)
// ============================================================

let num = 20;
let str = "20";

console.log(num == str);  // Output: true  (type convert hoke compare hua)
console.log(num === str); // Output: false (type alag hai, strict check)

let n1 = 20;
let n2 = 20;
console.log(n1 === n2); // Output: true (same type, same value)

let n3 = 20;
let n4 = 10;
console.log(n3 === n4); // Output: false (same type, alag value)


// ============================================================
// PART 5: STRING TO NUMBER CONVERSION
// ============================================================

let strVal = "121";
let converted = Number(strVal);
console.log(converted);          // Output: 121
console.log(typeof converted);   // Output: number

let invalidStr = "121AC";
let invalidConverted = Number(invalidStr);
console.log(invalidConverted);   // Output: NaN (Not a Number)

console.log(Number(null));       // Output: 0
console.log(Number(undefined));  // Output: NaN
console.log(Number(true));       // Output: 1
console.log(Number(false));      // Output: 0
console.log(Number(""));         // Output: 0


// ============================================================
// PART 6: NaN (NOT A NUMBER)
// ============================================================

/*
  THEORY:
  NaN ka matlab hai "Not a Number".
  Yeh ek special value hai jo tab aati hai jab:
    1. Invalid string ko number mein convert karo: Number("abc") -> NaN
    2. 0 ko 0 se divide karo: 0/0 -> NaN
       (kyunki 0/0 ka answer 0 bhi ho sakta hai, 1 bhi, infinity bhi,
       koi definite answer nahi aata - to NaN)

  Interesting fact:
    typeof NaN -> "number" aata hai (yeh ek JavaScript quirk hai)
    NaN === NaN -> false aata hai (NaN khud se bhi equal nahi hota)
*/

console.log(0 / 0);                // Output: NaN
console.log(typeof NaN);           // Output: "number" (quirk hai)
console.log(Number("abc"));        // Output: NaN

// NaN ka special behaviour:
console.log(NaN === NaN);          // Output: false (hamesha false)


// ============================================================
// PART 7: NUMBER TO STRING CONVERSION
// ============================================================

let numVal = 10;
let numToStr = String(numVal);
console.log(numToStr);           // Output: "10"
console.log(typeof numToStr);    // Output: string

// Boolean to String
console.log(String(true));       // Output: "true"  (string hai, boolean nahi)
console.log(String(false));      // Output: "false"
console.log(String(null));       // Output: "null"
console.log(String(undefined));  // Output: "undefined"


// ============================================================
// PART 8: ANY VALUE TO BOOLEAN CONVERSION
// ============================================================

console.log(Boolean(10));    // Output: true
console.log(Boolean(-10));   // Output: true
console.log(Boolean(0));     // Output: false (sirf 0 false hai)
console.log(Boolean(""));    // Output: false (empty string false hai)
console.log(Boolean("hi"));  // Output: true
console.log(Boolean(null));  // Output: false
console.log(Boolean(undefined)); // Output: false


// ============================================================
// PART 10: ECMASCRIPT - JAVASCRIPT KE RULES KAUN BANATA HAI?
// ============================================================

/*
  THEORY:
  JavaScript ke rules ECMAScript (ECMA-262) standard banata hai.

  Kya hota hai iska matlab:
  - Alag alag browsers (Chrome, Firefox, Safari) JavaScript ko
    apne tarike se implement karte hain.
  - Chrome mein V8 engine hai.
  - Firefox mein SpiderMonkey hai.
  - Har browser apna implementation kar sakta hai.

  Lekin PROBLEM yeh hai ki agar rules alag hon to:
    null ko number mein convert karne par Chrome 0 de aur
    Firefox NaN de to code browser par differently behave karega.

  ECMAScript is problem ka solution hai:
  - ECMAScript define karta hai ki JavaScript kaise behave karegi
  - Sab browsers ko ECMAScript standard follow karna padta hai
  - Implementation apne tarike se karo, lekin result same hona chahiye

  ECMAScript ka latest version check karo:
  https://tc39.es/ecma262/
*/


// ============================================================
// PART 11: FLOATING POINT PROBLEM - COMPUTER SCIENCE KI
//          CLASSICAL PROBLEM
// ============================================================

let a = 0.1;
let b = 0.2;
let c = a + b;

console.log(c);           // Output: 0.30000000000000004 (expected tha 0.3)
console.log(c === 0.3);   // Output: false (expected tha true)

/*
  KYUN HOTA HAI YEH:

  Computers sirf binary (0 aur 1) mein kaam karte hain.
  Jab bhi koi decimal number store karna ho, use binary mein convert karna padta hai.

  DECIMAL TO BINARY CONVERSION (decimal numbers ke liye):
  Method: Repeatedly 2 se multiply karo.
          Decimal point se pehle wali value note karo.
          Jab tak point ke baad 0 na aaye.

  0.25 ko binary mein convert karna:
    0.25 * 2 = 0.5   -> note: 0
    0.5  * 2 = 1.0   -> note: 1
    0.0  * 2 = 0     -> stop (point ke baad 0 aaya)
  Result: 0.01 (binary)

  0.2 ko binary mein convert karna:
    0.2 * 2 = 0.4    -> note: 0
    0.4 * 2 = 0.8    -> note: 0
    0.8 * 2 = 1.6    -> note: 1
    0.6 * 2 = 1.2    -> note: 1
    0.2 * 2 = 0.4    -> note: 0  (loop shuru ho gaya)
    0.4 * 2 = 0.8    -> ...repeat...
  Result: 0.001100110011... (kabhi khatam nahi hota)

  Jaise 1/3 = 0.333333... kabhi khatam nahi hota decimal mein,
  waise hi 0.2 kabhi khatam nahi hota binary mein.

  0.1 ka bhi same problem hai - binary mein exact nahi aata.

  TO KYA HOTA HAI:
  Computer 64 bits mein number store karta hai.
  Infinite repeating binary ko 64 bits mein fit karna padta hai.
  To ek approximate value store hoti hai, exact nahi.

  Jab 0.1 (approximate) + 0.2 (approximate) karo:
  Result bhi approximate aata hai: 0.30000000000000004
  Aur 0.3 (approximate stored) alag hota hai.
  Isliye 0.1 + 0.2 === 0.3 false aata hai.

  SOLUTION - LECTURER KI APPROACH (Bina library ke):
  Numbers ko directly numbers ki tarah treat karne ki jagah,
  STRINGS ki tarah treat karo.

  Logic:
    "0.1" + "0.2" seedha add nahi karo as numbers.
    Last character "1" aur last character "2" pakdo.
    Unhe Number() se number mein convert karo: 1 aur 2.
    Add karo: 1 + 2 = 3.
    Wapas String() se string mein convert karo: "3".
    Decimal point ka dhyan rakho.
    Result: "0.3"

  Alag lengths handle karne ke liye:
    "1.34" + "2.341"
    Chhoti length wali mein zeros pad karo:
    "1.340" + "2.341"
    Ab character by character add karo.

  Yeh ek approach hai. Real world mein libraries use hoti hain
  jaise: decimal.js, big.js, toFixed() method etc.
*/


// ============================================================
// PART 12: IF - ELSE IF - ELSE (MULTIPLE CONDITIONS)
// ============================================================

let userAge = 20;

if (userAge < 18) {
    console.log("Kid");
} else if (userAge >= 60) {
    console.log("Old");
} else {
    console.log("Young");
}
// Output: Young

userAge = 78;
if (userAge < 18) {
    console.log("Kid");
} else if (userAge >= 60) {
    console.log("Old");
} else {
    console.log("Young");
}
// Output: Old


// ============================================================
// PART 13: FOR LOOP
// ============================================================

for (let i = 0; i < 10; i++) {
    console.log(i); // Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}


// ============================================================
// PART 14: WHILE LOOP
// ============================================================

let i = 0;
while (i < 10) {
    console.log(i); // Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    i++;
}


// ============================================================
// PART 15: DO-WHILE LOOP
// ============================================================

let j = 0;
do {
    console.log(j); // Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    j++;
} while (j < 10);


// ============================================================
// PART 16: LOGICAL OPERATORS
// ============================================================

// AND examples:
console.log(true && true);   // Output: true
console.log(true && false);  // Output: false
console.log(false && true);  // Output: false
console.log(false && false); // Output: false

// OR examples:
console.log(true || true);   // Output: true
console.log(true || false);  // Output: true
console.log(false || true);  // Output: true
console.log(false || false); // Output: false


// ============================================================
// PART 17: SHORT CIRCUIT EVALUATION (AND &&)
// ============================================================

/*
  THEORY:
  JavaScript lazy evaluation karta hai - unnecessary kaam nahi karta.

  AND (&&) ka short circuit:
  - Pehli value check karo.
  - Agar pehli value FALSY hai: Seedha pehli value return karo.
    (Doosri value dekhne ki zaroorat nahi, AND mein ek false = poora false)
  - Agar pehli value TRUTHY hai: Doosri value return karo.
    (Doosri value final result decide karegi)

  Yeh optimization hai - unnecessary checks se bacho.
*/

let r1 = "Rohit" && "Mohit";
console.log(r1); // Output: Mohit
// "Rohit" truthy hai, to AND doosri value "Mohit" return karta hai

let r2 = "" && "Mohit";
console.log(r2); // Output: "" (empty string)
// "" falsy hai, to AND pehli value "" hi return karta hai
// Doosri value dekhi hi nahi

let r3 = 0 && 20;
console.log(r3); // Output: 0
// 0 falsy hai, to pehli value 0 return ho gayi

let r4 = 10 && 20;
console.log(r4); // Output: 20
// 10 truthy hai, to doosri value 20 return ho gayi

/*
  RULE SUMMARY for &&:
  - Pehli value falsy hai  -> pehli value return (second nahi dekha)
  - Pehli value truthy hai -> doosri value return (final decision second ka)
*/


// ============================================================
// PART 18: SHORT CIRCUIT EVALUATION (OR ||)
// ============================================================

/*
  THEORY:
  OR (||) ka short circuit AND se opposite hota hai:
  - Pehli value check karo.
  - Agar pehli value TRUTHY hai: Seedha pehli value return karo.
    (OR mein ek true = poora true, doosri dekhne ki zaroorat nahi)
  - Agar pehli value FALSY hai: Doosri value return karo.
    (Doosri value final result decide karegi)

  Yeh bahut use hota hai default value set karne ke liye.
  Example: let name = userInput || "Default Name";
  Agar userInput falsy hai to "Default Name" use hoga.
*/

let s1 = 10 || 20;
console.log(s1); // Output: 10
// 10 truthy hai, to OR pehli value 10 return karta hai

let s2 = 0 || 20;
console.log(s2); // Output: 20
// 0 falsy hai, to OR doosri value 20 return karta hai

let s3 = "" || "Mohit";
console.log(s3); // Output: Mohit
// "" falsy hai, to doosri value "Mohit" return hogi

let s4 = "Rohit" || "Mohit";
console.log(s4); // Output: Rohit
// "Rohit" truthy hai, to pehli value return hogi

/*
  RULE SUMMARY for ||:
  - Pehli value truthy hai -> pehli value return (second nahi dekha)
  - Pehli value falsy hai  -> doosri value return (final decision second ka)

  PRACTICAL USE CASE:
  let username = "" || "Guest";
  console.log(username); // Output: Guest
  Agar user ne kuch nahi diya (empty string) to default "Guest" set ho jaata hai
*/

// Default value pattern:
let userInput = "";
let displayName = userInput || "Guest";
console.log(displayName); // Output: Guest

userInput = "Rohit";
displayName = userInput || "Guest";
console.log(displayName); // Output: Rohit


// ============================================================
// PART 19: NULL AUR UNDEFINED KE SAATH COMPARISON - SPECIAL RULES
// ============================================================

/*
  THEORY:
  Kuch special rules hain null aur undefined ke comparison ke liye.

  RULE 1: null == undefined
  - null aur undefined loosely equal hote hain (== se)
  - Sirf ek doosre ke equal hain, aur kisi ke nahi
  - null == 0 -> false
  - null == "" -> false
  - null == false -> false
  - null == undefined -> TRUE (yeh sirf ek cheez ke equal hai)
  - null === undefined -> false (strict check mein type alag hai)
*/

console.log(null == undefined);  // Output: true  (special rule)
console.log(null === undefined); // Output: false (strict, type alag)
console.log(null == 0);          // Output: false
console.log(null == "");         // Output: false
console.log(null == false);      // Output: false

/*
  RULE 2: Comparison operators (>, <, >=, <=) ke saath null
  - Jab bhi >, <, >=, <= operators hote hain
  - null ko NUMBER mein convert kar diya jaata hai
  - null ka number equivalent: 0
  - to: null >= 0 -> 0 >= 0 -> true
  - to: null <= 0 -> 0 <= 0 -> true
  - to: null > 0  -> 0 > 0  -> false
  - to: null < 0  -> 0 < 0  -> false
*/

console.log(null >= 0);  // Output: true  (null -> 0, 0 >= 0 true)
console.log(null <= 0);  // Output: true  (null -> 0, 0 <= 0 true)
console.log(null > 0);   // Output: false (null -> 0, 0 > 0 false)
console.log(null < 0);   // Output: false (null -> 0, 0 < 0 false)

/*
  RULE 3: Comparison operators ke saath undefined
  - undefined ko NUMBER mein convert karne par NaN aata hai
  - NaN ka kisi bhi cheez se comparison hamesha false hota hai
  - to: undefined >= 0 -> NaN >= 0 -> false
  - to: undefined <= 0 -> NaN <= 0 -> false
  - to: undefined == 0 -> false (sirf null ke equal hai)
*/

console.log(undefined >= 0);  // Output: false (undefined -> NaN, NaN >= 0 false)
console.log(undefined <= 0);  // Output: false
console.log(undefined == 0);  // Output: false
console.log(null > undefined); // Output: false (NaN involved)


// ============================================================
// PART 20: STRING COMPARISON
// ============================================================

console.log("Rohit" > "Mohit");  // Output: true
// R ka ASCII = 82, M ka ASCII = 77
// 82 > 77, isliye "Rohit" > "Mohit"

console.log("Rohit" > "mohit"); // Output: false
// R ka ASCII = 82, m (small) ka ASCII = 109
// 82 < 109, isliye "Rohit" < "mohit" -> false

console.log("10" > "9");  // Output: false
// "1" ka ASCII = 49, "9" ka ASCII = 57
// 49 < 57, isliye "10" < "9" as strings


// ============================================================
// PART 21: MIXED TYPE COMPARISON WITH > < >= <=
// ============================================================

console.log("10" >= 10);   // Output: true  (string "10" -> number 10)
console.log(true > 0);     // Output: true  (true -> 1, 1 > 0)
console.log("" >= 0);      // Output: true  ("" -> 0, 0 >= 0)
console.log(10 >= true);   // Output: true  (true -> 1, 10 >= 1)

// ============================================================
// SUMMARY OF LECTURE 04
// ============================================================

/*
  1. ARITHMETIC OPERATORS: +, -, *, /, %, **
     % (modulus) remainder deta hai.

  2. ASSIGNMENT OPERATORS: =, +=, -=, *=, /=, %=
     x += y means x = x + y (shortcut)

  3. COMPARISON OPERATORS: >, <, >=, <=, ==, ===, !=
     == -> loose (type convert hoti hai)
     === -> strict (pehle type check, phir value)
     Hamesha === use karo.

  4. TYPE CONVERSION:
     Number()  -> number mein convert
     String()  -> string mein convert
     Boolean() -> boolean mein convert
     null -> 0 (number mein), "null" (string mein), false (boolean mein)
     undefined -> NaN (number mein), "undefined" (string mein), false (boolean mein)

  5. NaN: Not a Number, typeof NaN = "number", NaN === NaN is false.

  6. FLOATING POINT PROBLEM:
     0.1 + 0.2 === 0.3 -> false
     Kyunki decimals binary mein exact store nahi hote, approximate hote hain.

  7. IF-ELSE: Condition check karo, ek block chalao.
     if -> else if -> else (ek waqt mein sirf ek chalta hai)

  8. LOOPS: Ek kaam baar baar karo.
     for -> initialization; condition; update
     while -> condition pehle, phir kaam
     do-while -> kaam pehle, condition baad mein

  9. LOGICAL OPERATORS: &&, ||
     && -> dono true to true, short circuit: first false -> return first
     || -> ek true to true, short circuit: first true -> return first

  10. SPECIAL NULL/UNDEFINED RULES:
      null == undefined -> true
      null >= 0 -> true (null -> 0)
      undefined >= 0 -> false (undefined -> NaN)

  11. STRING COMPARISON: ASCII value se compare hota hai.
*/