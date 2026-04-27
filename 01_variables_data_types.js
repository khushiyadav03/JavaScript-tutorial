// ============================================================
//         JAVASCRIPT SERIES - LECTURE 01
//         Topic: Variables aur Data Types
// ============================================================



// ============================================================
// PART 1: VARIABLES KYA HOTE HAIN?
// ============================================================

/*
  THEORY:
  Variable ek naam diya hua container hota hai jisme hum data store karte hain.
  Jaise ek box hota hai jiske upar label laga hota hai,
  aur usme koi cheez rakhte hain.

  JavaScript mein variable banane ke teen tarike hain:
    1. let
    2. const
    3. var (purana tarika, ab use nahi karte)
*/


// ============================================================
// PART 2: LET KEYWORD
// ============================================================

/*
  THEORY:
  let se banaya hua variable reassign ho sakta hai.
  Matlab uski value baad mein badli ja sakti hai.
  Syntax: let variableName = value;
*/

let name = "Rohit";
console.log(name); // Output: Rohit

let age = 20;
console.log(name, age); // Output: Rohit 20

// Value ko reassign karna (change karna) - bilkul valid hai
age = 30;
console.log(age); // Output: 30

// let mein same variable ko dobara declare nahi kar sakte
// let age = 50; // Yeh error dega - SyntaxError: Identifier 'age' has already been declared


// ============================================================
// PART 3: CONST KEYWORD
// ============================================================

/*
  THEORY:
  const se banaya hua variable ek baar value milne ke baad
  change nahi ho sakta.
  Const ka matlab hai "constant" - jo change nahi hogi.

  Const ke saath do rules hain:
  Rule 1: Declare karte waqt hi value deni padegi, baad mein nahi de sakte.
  Rule 2: Ek baar value assign ho gayi to dobara assign nahi hogi.

  Use case: Jab aapko pata ho ki value kabhi change nahi hogi.
*/

const accountNumber = 12312;
console.log(accountNumber); // Output: 12312

// accountNumber = 23; // Yeh error dega - TypeError: Assignment to constant variable

// const ko khali nahi chhod sakte:
// const x; // Yeh bhi error dega - SyntaxError: Missing initializer in const declaration


// ============================================================
// PART 4: VAR KEYWORD (PURANA TARIKA - AB USE NAHI KARTE)
// ============================================================

/*
  THEORY:
  var JavaScript ka purana tarika tha variable banane ka.
  Ab hum ise use nahi karte kyunki iske saath do badi problems thi:

  PROBLEM 1 - Same variable ko multiple baar declare kar sakte the:
  var a = 10;
  var a = 50; // Koi error nahi aata - yeh galat behaviour hai

  let ke saath aisa nahi hota. let mein same naam ka variable
  dobara declare karne par error aata hai - jo sahi behaviour hai.

  PROBLEM 2 - Scope ki respect nahi karta:
  var sirf do scope jaanta hai:
    a) Global scope  - poore code mein accessible
    b) Function scope - sirf function ke andar accessible

  var jo ek curly brace block ke andar banaya gaya hota hai
  usse bahar bhi access kiya ja sakta hai - yeh bahut badi problem hai.

  let aur const block scope follow karte hain:
  Agar koi variable kisi block ke andar banaya gaya hai
  to wo block ke bahar accessible nahi hoga - yeh correct behaviour hai.
*/

var a = 10;
console.log(a); // Output: 10

a = 20;
console.log(a); // Output: 20

// var ki scope problem ka example:
if (true) {
    var insideBlock = 100; // var se banaya
}
console.log(insideBlock); // Output: 100 - yeh wrong behaviour hai, bahar bhi access ho gaya

// let ki sahi scope:
if (true) {
    let insideBlockLet = 200; // let se banaya
}
// console.log(insideBlockLet); // Yeh error dega - ReferenceError: insideBlockLet is not defined
// Yeh sahi behaviour hai - block ke bahar accessible nahi


// ============================================================
// PART 5: LET vs CONST vs VAR - SUMMARY
// ============================================================

/*
  THEORY:
  Kab kya use karein?

  const  -> Jab value kabhi change nahi hogi
  let    -> Jab value baad mein change ho sakti hai
  var    -> Bilkul mat use karo (purana aur buggy hai)

  let aur const dono:
    - Same variable ko dobara declare nahi hone dete
    - Block scope follow karte hain
*/


// ============================================================
// PART 6: DATA TYPES
// ============================================================

/*
  THEORY:
  Data type bataata hai ki variable ke andar kaunse prakar ka data hai.

  JavaScript mein data types do categories mein hote hain:

  A) PRIMITIVE DATA TYPES (7 hote hain):
     1. Number
     2. String
     3. Boolean
     4. Undefined
     5. Null
     6. BigInt
     7. Symbol

  B) NON-PRIMITIVE DATA TYPES:
     1. Array
     2. Object
     3. Function

  Primitive = chhote, simple, ek value store karne wale
  Non-Primitive = bade, complex, bahut saari values store kar sakte hain
*/


// ============================================================
// PART 7: PRIMITIVE DATA TYPE 1 - NUMBER
// ============================================================

/*
  THEORY:
  Number data type mein aate hain:
    - Integer (poore numbers): 1, 2, 3, 100, -50
    - Floating point (decimal numbers): 3.14, 2.36, -1.5

  JavaScript mein integer aur float dono ek hi "number" type ke hote hain.
  C++ ya Java ki tarah alag int, float, double nahi likhna padta.

  Number type 8 bytes (64 bits) ki memory leta hai.
  Maximum value jo store ho sakti hai: 2^53 - 1
  Minimum value: -(2^53 - 1)
  Yeh isliye hai kyunki 64 bits mein floating point ko bhi
  store karna padta hai, sirf integer ke liye nahi hota.

  JavaScript khud decide karta hai ki value number type ki hai ya nahi.
  Aapko type explicitly likhna nahi padta.
*/

let numA = 10;
let numB = 2.36;
console.log(numA, numB); // Output: 10 2.36
console.log(typeof numA); // Output: number
console.log(typeof numB); // Output: number


// ============================================================
// PART 8: PRIMITIVE DATA TYPE 2 - STRING
// ============================================================

/*
  THEORY:
  String text data store karne ke liye use hoti hai.
  String ko single quotes ya double quotes mein likhte hain.

  Examples:
    "Rohit"        -> string
    'Strike'       -> string
    "Hello World"  -> string
*/

let strC = "Strike is Coming";
let strD = 'Anjali';
console.log(strC, strD); // Output: Strike is Coming Anjali
console.log(typeof strC); // Output: string


// ============================================================
// PART 9: PRIMITIVE DATA TYPE 3 - BOOLEAN
// ============================================================

/*
  THEORY:
  Boolean mein sirf do values ho sakti hain:
    - true
    - false

  Yeh tab use hota hai jab aapko koi condition check karni ho.
  Jaise: kya user logged in hai? Kya button clicked hai?
*/

let isLoggedIn = true;
let isActive = false;
console.log(isLoggedIn); // Output: true
console.log(isActive);   // Output: false
console.log(typeof isLoggedIn); // Output: boolean


// ============================================================
// PART 10: PRIMITIVE DATA TYPE 4 - UNDEFINED
// ============================================================

/*
  THEORY:
  Jab koi variable declare kiya jaye lekin usmein koi value
  assign na ki gayi ho, to JavaScript automatically us variable
  mein undefined dal deta hai.

  Undefined = Variable exist karta hai, lekin value assign nahi hui.

  Important: Undefined JavaScript ka program khud assign karta hai.
  Programmer directly undefined nahi dalta (usually).

  const ke saath undefined nahi ho sakta kyunki const ke saath
  declare karte waqt hi value deni padti hai.
*/

let userValue;
console.log(userValue); // Output: undefined
console.log(typeof userValue); // Output: undefined


// ============================================================
// PART 11: PRIMITIVE DATA TYPE 5 - NULL
// ============================================================

/*
  THEORY:
  Null ka matlab hai ki programmer ne intentionally bol diya hai
  ki is variable mein abhi koi value nahi hai.

  Null vs Undefined ka fark:
  - Undefined: JavaScript khud assign karta hai jab value na di gayi ho
  - Null: Programmer khud intentionally assign karta hai

  Real world example - Weather API:
  Maan lo aapne Dwarka ka temperature fetch karne ka request bheja.
  Teen possible replies aa sakte hain:
    1. Temperature mila -> 25 return karo (actual value)
    2. Dwarka exist karta hai lekin abhi temperature nahi mil raha
       -> null return karo (exist karta hai, par value available nahi)
    3. Dwarka database mein exist hi nahi karta
       -> undefined return karo (cheez hi nahi hai)

  Ek aur example - Train tracking:
    Train exist karti hai, location mil rahi hai     -> value return karo
    Train exist karti hai, location nahi mil rahi    -> null return karo
    Yeh train number exist hi nahi karta             -> undefined return karo

  typeof null ek famous JavaScript bug hai:
  typeof null = "object" (yeh galat hai, hona chahiye tha "null")
  Lekin yeh bug itna purana hai ki fix karne par purane code toot sakte hain
  isliye ise jaan bujhkar nahi sudhara gaya.
*/

let weather = null;
console.log(weather);        // Output: null
console.log(typeof weather); // Output: object  <- Yeh ek known bug hai JavaScript ka


// ============================================================
// PART 12: PRIMITIVE DATA TYPE 6 - BIGINT
// ============================================================

/*
  THEORY:
  Number type sirf 2^53 - 1 tak ke numbers store kar sakta hai
  kyunki wo 8 bytes mein integer aur floating point dono handle karta hai.

  Agar aapko usse bhi bada integer store karna ho to BigInt use karte hain.
  BigInt likhne ke liye number ke baad "n" lgate hain.

  Example: 9999999999999999n
*/

let bigNumber = 9007199254740993n;
console.log(bigNumber);        // Output: 9007199254740993n
console.log(typeof bigNumber); // Output: bigint


// ============================================================
// PART 13: PRIMITIVE DATA TYPE 7 - SYMBOL
// ============================================================

/*
  THEORY:
  Symbol har baar ek naya aur unique value create karta hai.
  Chahe aap same description dein, dono symbols alag-alag honge.

  Iska use case advanced topics (jaise objects ke private keys)
  mein hota hai. Abhi ke liye sirf yeh samajho ki:
  Symbol ek unique identifier create karta hai.
*/

const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1); // Output: Symbol(id)
console.log(id2); // Output: Symbol(id)
console.log(id1 === id2); // Output: false (dono alag-alag hain)
console.log(typeof id1);  // Output: symbol


// ============================================================
// PART 14: NON-PRIMITIVE DATA TYPE 1 - ARRAY
// ============================================================

/*
  THEORY:
  Array ek container hai jisme bahut saari values ek saath rakhi ja sakti hain.
  Array mein alag-alag type ki values bhi daal sakte hain.

  Syntax: let arr = [value1, value2, value3];

  Iska use tab hota hai jab bahut saara related data ek jagah rakhna ho.
  Jaise: 100 students ke marks ek jagah store karna.
*/

let arr = [10, 20, 11, "Rohit", true];
console.log(arr); // Output: [ 10, 20, 11, 'Rohit', true ]
console.log(typeof arr); // Output: object  <- Array bhi ek object hai (iske baare mein aage padhenge)


// ============================================================
// PART 15: NON-PRIMITIVE DATA TYPE 2 - OBJECT
// ============================================================

/*
  THEORY:
  Object key-value pairs mein data store karta hai.
  Isse data meaningful ho jaata hai.

  Bina object ke agar data aaye:
    "Rohit", 12312, 18, "General"
  Toh samajh nahi aata ki kaunsi value kya hai.

  Object se agar same data aaye:
    { name: "Rohit", accountNumber: 12312, age: 18, category: "General" }
  Toh har value ka meaning clear ho jaata hai.

  Syntax: let obj = { key: value, key2: value2 };

  Object ki kisi bhi key ki value access karne ka tarika:
    objectName.keyName
*/

let user = {
    name: "Rohit",
    accountNumber: 12312,
    age: 18,
    category: "General"
};
console.log(user);           // Output: { name: 'Rohit', accountNumber: 12312, age: 18, category: 'General' }
console.log(user.name);      // Output: Rohit
console.log(user.age);       // Output: 18
console.log(typeof user);    // Output: object

// Object ki value change kar sakte hain (kyunki non-primitive mutable hote hain)
user.name = "Rohan";
console.log(user.name); // Output: Rohan


// ============================================================
// PART 16: NON-PRIMITIVE DATA TYPE 3 - FUNCTION
// ============================================================

/*
  THEORY:
  Function ek block of code hota hai jo ek specific kaam karta hai.
  Jab bhi woh kaam karna ho, function ko call karte hain.

  JavaScript mein function bhi ek data type hai.
  Aur sabse khaas baat: function ko kisi variable mein store kar sakte hain.
  Yeh feature JavaScript ko dusri languages se alag banata hai.

  Syntax:
    function functionName() {
        // code here
    }
    functionName(); // function call
*/

function add() {
    return "Hello";
}

console.log(add()); // Output: Hello
console.log(typeof add); // Output: function

// Function ko variable mein store karna:
let s = add;
console.log(s);   // Output: [Function: add]
console.log(s()); // Output: Hello (aise bhi call kar sakte hain)


// ============================================================
// PART 17: TYPEOF OPERATOR
// ============================================================

/*
  THEORY:
  typeof operator se kisi bhi variable ya value ka data type
  pata kiya ja sakta hai.

  Syntax: typeof variableName

  Summary of typeof results:
    number    -> "number"
    string    -> "string"
    boolean   -> "boolean"
    undefined -> "undefined"
    null      -> "object"  (famous bug hai JavaScript ka)
    bigint    -> "bigint"
    symbol    -> "symbol"
    array     -> "object"  (array bhi object hai)
    object    -> "object"
    function  -> "function"
*/

console.log(typeof 10);          // Output: number
console.log(typeof "Hello");     // Output: string
console.log(typeof true);        // Output: boolean
console.log(typeof undefined);   // Output: undefined
console.log(typeof null);        // Output: object (bug)
console.log(typeof 999n);        // Output: bigint
console.log(typeof Symbol());    // Output: symbol
console.log(typeof [1, 2, 3]);   // Output: object
console.log(typeof {});          // Output: object
console.log(typeof function(){}); // Output: function


// ============================================================
// PART 18: PRIMITIVE DATA TYPES - IMMUTABLE HOTE HAIN
// ============================================================

/*
  THEORY:
  Immutable ka matlab hai: ek baar create ho jaane ke baad,
  original value ko change nahi kiya ja sakta.

  Confusion: Agar primitive immutable hai to yeh kaise kaam karta hai?
    let a = 10;
    a = 20;
    console.log(a); // 20 aa jaata hai

  Iska matlab yeh nahi ki 10 badal ke 20 ban gaya.
  Asal mein kya hua:

  Step 1: a = 10 likha
    -> Memory mein ek nayi jagah 10 store hua
    -> 'a' us jagah ko point karne laga

  Step 2: a = 20 likha
    -> Memory mein ek NAYI jagah 20 store hua (10 waali jagah NAHI badli)
    -> 'a' ab nayi jagah (20 wali) ko point karne laga

  10 apni jagah pe as it is pada raha, use kisi ne chheda nahi.

  PROOF - String ke individual character ko change karne ki koshish:
*/

let str = "Rohit";
console.log(str[0]); // Output: R

str[0] = "M"; // Yeh koi error nahi deta lekin kaam bhi nahi karta
console.log(str); // Output: Rohit (badla nahi, kyunki primitive immutable hai)

// Agar value assign karein to naya string banta hai, purana nahi badlta:
str = "Mohan";
console.log(str); // Output: Mohan (naya string create hua, "Rohit" nahi badla)


// ============================================================
// PART 19: PASS BY VALUE (PRIMITIVE DATA TYPES)
// ============================================================

/*
  THEORY:
  Jab hum ek primitive variable ki value doosre variable mein copy karte hain,
  to value ki ek COPY banti hai.

  Dono variables alag-alag memory locations ko point karte hain.
  Ek mein change karne se doosre mein koi fark nahi padta.

  Ise kehte hain: Pass by Value / Copy by Value
*/

let x = 10;
let y = x; // y mein x ki value COPY ho gayi

y = 20; // sirf y badla

console.log(x); // Output: 10 (x nahi badla)
console.log(y); // Output: 20 (sirf y badla)

/*
  Memory mein kya hua:
    x -> [10]  (alag jagah)
    y -> [10]  (alag jagah, copy hai)
    y = 20 karne par:
    y -> [20]  (nayi jagah, x wali jagah nahi badli)
    x -> [10]  (same hai)
*/


// ============================================================
// PART 20: NON-PRIMITIVE DATA TYPES - MUTABLE HOTE HAIN
// ============================================================

/*
  THEORY:
  Mutable ka matlab hai: original data ko directly change kiya ja sakta hai.

  Non-primitive data types (array, object) mutable hote hain.
  Inke original data ko modify kiya ja sakta hai.
*/

// Array ko mutate karna:
let myArr = [10, 20, 30, 40];
myArr.push(90);    // end mein 90 add kiya
myArr[0] = 70;     // pehla element 10 se 70 kar diya
console.log(myArr); // Output: [ 70, 20, 30, 40, 90 ]

// Object ko mutate karna:
let obj = { name: "Mohan", age: 20 };
obj.name = "Rohan"; // directly change kar diya
console.log(obj);   // Output: { name: 'Rohan', age: 20 }


// ============================================================
// PART 21: PASS BY REFERENCE (NON-PRIMITIVE DATA TYPES)
// ============================================================

/*
  THEORY:
  Jab hum ek non-primitive variable ko doosre mein assign karte hain,
  to VALUE COPY nahi hoti, REFERENCE copy hota hai.

  Matlab dono variables ek hi memory location ko point karte hain.
  Ek mein change karne se doosre mein bhi change dikhega.

  Ise kehte hain: Pass by Reference

  KYUN aisa kiya gaya?
  Kyunki non-primitive data types bahut bada data hold kar sakte hain.
  Maan lo ek object mein 500 properties hain jo 5 MB le rahi hain.
  Agar hum copy karte to:
    original   -> 5 MB
    copy 1     -> 5 MB
    copy 2     -> 5 MB
  ... baar baar copy banaate to memory barbad hoti.

  Is problem se bachne ke liye dono variables ek hi data ko
  refer karte hain. Koi copy nahi banti.
  Memory ek hi baar use hoti hai.
*/

let obj1 = { name: "Mohan", age: 20 };
let obj2 = obj1; // obj2 ne obj1 ka REFERENCE copy kiya, nayi copy nahi bani

obj2.name = "Rohan"; // obj2 ke through change kiya

console.log(obj1); // Output: { name: 'Rohan', age: 20 }  <- obj1 bhi badal gaya
console.log(obj2); // Output: { name: 'Rohan', age: 20 }  <- same data point kar rahe hain

/*
  Memory mein kya hua:
    obj1 -> memory location X mein { name: "Mohan", age: 20 }
    obj2 -> same memory location X ko point karta hai

    obj2.name = "Rohan" karne par:
    memory location X mein data change hua -> { name: "Rohan", age: 20 }

    Kyunki obj1 aur obj2 dono same location X ko point kar rahe hain,
    dono ko change dikhta hai.

    Primitive mein aisa nahi hota kyunki wahan copy banti hai.
    Non-primitive mein aisa hota hai kyunki wahan reference hota hai.
*/


// ============================================================
// PART 22: PRIMITIVE vs NON-PRIMITIVE - FINAL SUMMARY
// ============================================================

/*
  PRIMITIVE DATA TYPES:
  - Number, String, Boolean, Undefined, Null, BigInt, Symbol
  - Immutable hote hain (original value change nahi hoti)
  - Pass by Value hota hai (copy banti hai)
  - Chota size lete hain memory mein
  - typeof se apna khud ka type batate hain
    (sirf null ek exception hai jo "object" batata hai - bug hai)

  NON-PRIMITIVE DATA TYPES:
  - Array, Object, Function
  - Mutable hote hain (original data change ho sakta hai)
  - Pass by Reference hota hai (reference share hota hai, copy nahi banti)
  - Bada data store kar sakte hain
  - typeof se sab "object" batate hain
    (function ek exception hai jo "function" batata hai,
     lekin internally woh bhi object hi hai - aage padhenge)
*/