// ============================================================
//         JAVASCRIPT SERIES - LECTURE 02
//         Topic: Memory Management - Stack, Heap, RAM
// ============================================================


// ============================================================
// PART 1: PROGRAM KO MEMORY KAHAN MILTI HAI?
// ============================================================

/*
  THEORY:
  Jab hum koi application use karte hain (Instagram, PUBG, WhatsApp),
  to wo application ka code hamare device ki Hard Disk / SSD mein
  store rehta hai permanently.

  Jab hum application ko OPEN karte hain (run karte hain):
    Step 1: OS (Operating System) us code ko Hard Disk se utha ke
            RAM (Random Access Memory) mein le aata hai.
    Step 2: CPU (Central Processing Unit) RAM mein padhe code ki
            instructions ko execute karta hai.

  Hard Disk -> Permanent Storage
  RAM       -> Temporary Storage (program band karo, data mit jaata hai)

  Hard Disk se seedha CPU mein data transfer bahut SLOW hota hai.
  RAM se CPU mein data transfer bahut FAST hota hai.
  Isliye RAM ka beech mein use hota hai.

  Typical sizes:
    Hard Disk / SSD -> 500 GB, 1 TB (permanent)
    RAM             -> 4 GB, 8 GB, 16 GB (temporary, expensive)
*/


// ============================================================
// PART 2: MEMORY UNITS - BASIC REFERENCE
// ============================================================

/*
  THEORY:
  1 Byte     = 8 bits
  1 KB       = 1024 Bytes       (2 ki power 10 bytes)
  1 MB       = 1024 KB          (2 ki power 20 bytes)
  1 GB       = 1024 MB          (2 ki power 30 bytes)
  1 TB       = 1024 GB          (2 ki power 40 bytes)
*/


// ============================================================
// PART 3: BYTE ADDRESSABLE MEMORY - CONCEPT
// ============================================================

/*
  THEORY:
  RAM ke andar data store karne ke liye ek SYSTEM chahiye hota hai
  jisse hum kisi bhi specific data ko uniquely identify kar sakein.

  PROBLEM:
  Maan lo RAM mein a = 10 aur b = 20 dono store hain.
  Agar baad mein b = 25 karna ho, to kaise pata chalega
  ki WHICH 20 ko 25 banana hai?
  Dono values same ho sakti hain. Confuse ho jayenge.

  SOLUTION: BYTE ADDRESSABLE MEMORY
  Har ek byte ko ek unique ADDRESS de do.

  Example: 16 byte RAM hai.
    Ek byte -> ek block
    Har block ka ek unique address hoga.
    Addresses: 0, 1, 2, 3, ... 15

  Ab jab a = 10 store karein:
    10 ko block number 2 mein rakha.
    a ka address -> 2

  Jab b = 25 update karna ho:
    Pehle dekho: b kis address pe hai? -> Address 8
    Seedha address 8 pe jao aur value update karo.
    Galat value update hone ka darr nahi.

  IMPORTANT:
  Code mein hum a, b, c likhte hain - yeh programmer ke liye hota hai.
  Jab code COMPILE / RUN hota hai, to a, b, c ko
  unke actual MEMORY ADDRESSES se replace kar diya jaata hai.
  Programmer ko addresses manually likhne nahi padte.
*/


// ============================================================
// PART 4: STACK AUR HEAP - DO HISSE RAM KE
// ============================================================

/*
  THEORY:
  RAM ke do major portions hote hain:
    1. STACK
    2. HEAP

  STACK:
    - Ek ke baad ek (sequential) data store hota hai
    - First data -> pehli jagah
    - Second data -> uske baad
    - Third data -> uske baad
    - Size: Bohut chhota hota hai. KB ya 1-2 MB tak
    - Data ek line mein aata jaata hai (Last In First Out)
    - Jaise tiffin boxes ke upar ek aur box rakho

  HEAP:
    - Jahan bhi khali jagah mili, wahan store karo
    - Size: Bahut bada. MB ya GB mein bhi ho sakta hai
    - Flexible - badh aur ghatt sakta hai
    - Data ka order fixed nahi hota

  DONO KA MILKAR USE KYUN?
    - Stack: Fast, sequential, fixed
    - Heap: Flexible, large, dynamic
    - Dono ki alag-alag zaroorat hoti hai - aage detail mein dekhenge
*/


// ============================================================
// PART 5: STACK AUR HEAP MEIN KAUNSA DATA KAHAN JAATA HAI?
//         (PEHLE SAMAJHO, PHIR PROVE KARENGE)
// ============================================================

/*
  THEORY:
  STACK MEIN DATA DAALTE WAQT PROBLEM:
  Maan lo stack mein a = 10 store kiya.
  Ek byte mein 10 fit ho gaya.
  Ab b = "sun" store karna hai.
  "sun" mein 3 characters hain, har character 1 byte leta hai.
  To 3 bytes chahiye.

  Stack mein problem:
    1. Agar purana b = 20 tha (1 byte), ab b = "sun" (3 bytes) karna hai.
       20 ki jagah sirf 1 byte hai. "sun" wahan fit nahi hoga.
    2. "sun" ko aage ki khali jagah mein daalna padega.
    3. B ka address badal jaayega.
    4. Ab code mein jahan bhi b likha hai, sab jagah naya address daalna padega.
       Agar b 50 jagah use hua hai to 50 jagah update karo. Bohut bada kaam.

  HEAP MEIN ADDRESSES STORE KARNA:
  Solution yeh hai:
    - Actual data (string, object, array) -> HEAP mein store karo
    - Heap mein us data ka ADDRESS -> STACK mein store karo

  Agar heap mein data ka location badla bhi, to:
    - Stack mein sirf us ek variable ka address update karo
    - Baaki code kuch nahi badlega

  Kyunki jab hum variable se data access karte hain:
    Step 1: Stack mein jao, us variable ka heap address dekho
    Step 2: Us heap address pe jao, actual data padho

  Yeh DO-STEP process thodi slow lagti hai,
  lekin code mein address update karne ki badi problem solve ho jaati hai.

  FIXED SIZE vs DYNAMIC SIZE:
  - Fixed size data (numbers jaise 10, 30): Stack mein bhi rakh sakte the
    Kyunki 10 se 20 karo - dono same bytes lete hain.
    BUT JavaScript ka rule hai: primitive data IMMUTABLE hai.
    Matlab 10 ko directly 20 nahi bana sakte.
    Naya value -> nayi memory location.
    Is vajah se number ka address bhi badal sakta hai.
    To number ko bhi heap mein rakhna better hai.

  - Dynamic size data (string, object, array): HEAP mein hi rahega.
    Kyunki inki size change hoti rehti hai.
*/


// ============================================================
// PART 6: ACTUAL MEMORY ALLOCATION - JAVASCRIPT MEIN
// ============================================================

/*
  THEORY:
  JavaScript mein jab bhi koi variable create hota hai:

  STEP 1:
  Variable ka ek entry STACK mein banta hai.
  Iss entry mein: variable ke naam ki jagah HEAP ADDRESS store hota hai.

  STEP 2:
  Actual data HEAP mein store hota hai.

  Example:
    let a = 10;
    Heap mein: Address 0xABC pe 10 store hua
    Stack mein: a ka entry -> 0xABC

    let b = 30;
    Heap mein: Address 0xABD pe 30 store hua
    Stack mein: b ka entry -> 0xABD

  Jab a = 50 karte hain:
    Rule: 10 (primitive) immutable hai, use change nahi kar sakte
    To: Heap mein nayi jagah 50 store hoga (Address: 0xAEF maan lo)
    Stack mein: a ka address update ho jaata hai -> 0xAEF
    Code mein kuch nahi badla
*/

let a = 10;  // Heap mein 10 store hua, stack mein a ka address
let b = 30;  // Heap mein 30 store hua, stack mein b ka address

// a = 50 karne par:
// - 10 wali heap location touch nahi hogi (immutable)
// - Nayi heap location pe 50 store hoga
// - Stack mein a ka address update ho jaayega
a = 50;
console.log(a); // Output: 50


// ============================================================
// PART 7: SPECIAL PRE-ALLOCATED VALUES
// ============================================================

/*
  THEORY:
  Kuch values baar baar use hoti hain aur kabhi change nahi hoti:
    - true
    - false
    - null
    - undefined

  Optimization:
  Jab program START hota hai, tab hi in charon ke liye
  Heap mein ek baar memory allocate kar di jaati hai.

  Ab agar code mein 100 jagah "true" likha ho,
  to har baar nayi memory allocate nahi hogi.
  Sab ke sab us ek hi "true" wali heap location ko point karenge.

  Kyunki yeh values kabhi change nahi hoti (immutable hain),
  ek hi copy kaafi hai sabke liye.

  Isi tarah null aur undefined bhi ek baar hi bante hain.
  Sab variables jo null ya undefined hain,
  woh sab usi fixed location ko point karte hain.
*/

let x = true;       // x us pre-allocated "true" location ko point karta hai
let y = false;      // y us pre-allocated "false" location ko point karta hai
let z = null;       // z us pre-allocated "null" location ko point karta hai
let w;              // w us pre-allocated "undefined" location ko point karta hai

console.log(x, y, z, w); // Output: true false null undefined


// ============================================================
// PART 8: 32-BIT vs 64-BIT OPERATING SYSTEM
// ============================================================

/*
  THEORY:
  Aapne suna hoga: "32-bit OS" ya "64-bit OS".
  Iska matlab hai: us system mein MEMORY ADDRESS ka size.

  32-bit OS:
    Address ka size = 32 bits = 4 bytes
    Total unique addresses = 2 ki power 32 = 4 GB RAM tak handle kar sakta hai

  64-bit OS:
    Address ka size = 64 bits = 8 bytes
    Total unique addresses = 2 ki power 64 = Bahut zyada (terabytes mein)
    8 GB, 16 GB, 32 GB RAM sabke liye addresses available hain

  Isliye jab Chrome download karte hain to puchhta hai:
    "Windows 32-bit ya 64-bit?"
  Kyunki V8 engine machine code ke roop mein aata hai,
  aur machine code hardware/OS dependent hota hai.
  32-bit ke liye alag compiled code, 64-bit ke liye alag.
*/


// ============================================================
// PART 9: GARBAGE COLLECTOR KYA KARTA HAI?
// ============================================================

/*
  THEORY:
  Jab variables ko update karte hain, purani heap location
  kisi bhi variable ke through access nahi hoti.
  Matlab purana data "orphan" ho jaata hai - koi use nahi karta.

  Agar yeh orphan data heap mein pada raha to memory bhar jaayegi.
  Program eventually crash ho sakta hai.

  GARBAGE COLLECTOR is kaam ko sambhalta hai:
    Step 1: Stack mein jao, dekho kaunse-kaunse heap addresses
            abhi bhi kisi variable ke through accessible hain.
    Step 2: Jo accessible hain unhe "mark" karo (LIVE).
    Step 3: Heap mein jao, jo data LIVE nahi hai use DELETE karo.
    Step 4: Us freed memory ko aage ke data ke liye use karo.

  JavaScript mein programmer ko manually memory free nahi karni padti.
  Garbage collector khud yeh kaam karta hai automatically.

  C++ mein:
    new -> memory allocate karo
    delete -> memory free karo (bhool gaye to program crash)
  JavaScript mein:
    Garbage collector khud handle karta hai.
    Programmer ka kaam aasaan ho gaya.
*/


// ============================================================
// PART 10: LOOP MEIN MEMORY OPTIMIZATION - SMI (SMALL INTEGER)
// ============================================================

/*
  THEORY:
  Maan lo yeh loop chal raha hai:
*/

for (let i = 0; i < 5; i++) {
    console.log(i); // Output: 0, 1, 2, 3, 4
}

/*
  BINA OPTIMIZATION KE KYA HOTA:
  Har iteration mein:
    - Heap mein nayi memory location dhundho (slow process)
    - Wahan new value store karo
    - Stack mein i ka address update karo

  100 iterations = 100 baar heap mein jagah dhundho = SLOW

  HEAP MEIN JAGAH DHUNDNA KYUN SLOW HAI:
  Heap mein koi fixed order nahi hota.
  Pura heap scan karna padta hai ki kahan space available hai.
  Yeh time leta hai.
  Stack mein toh sequential hota hai (next slot seedha mil jaata hai).

  OPTIMIZATION - SMI (Small Integer) CONCEPT:
  V8 engine ek smart trick use karta hai.

  Ek memory address 32 bits (ya 64 bits) ka hota hai.
  Agar 32-bit address mein:
    - Pehle 31 bits mein actual NUMBER store kar do
    - Last 1 bit ko "tag" ki tarah use karo

  Tag system:
    Last bit = 0 -> Yeh address nahi, yeh khud ek SMALL INTEGER hai
    Last bit = 1 -> Yeh ek ACTUAL HEAP ADDRESS hai, wahan jao

  Iska matlab:
  Agar i = 3 hai, to address mein hi 3 store ho jaata hai.
  Alag se heap mein memory allocate karne ki zaroorat hi nahi.

  Jab loop i++ karta hai:
    - Heap mein nahi jaana (address ki last bit 0 hai)
    - Seedha address mein stored number ko +1 kar do
    - Bohut fast hota hai

  SMI ki range (31-bit signed integer):
    Maximum positive value: +2 ki power 30
    Maximum negative value: -2 ki power 30
    (Ek bit sign ke liye: 0 = positive, 1 = negative)

  Jo numbers is range se bahar hain (bade numbers ya floats):
    Unke liye normal heap allocation hoti hai.
    Lekin loops mein typically chhote numbers hi use hote hain.

  ARRAY ELEMENT ADDRESS FORMULA:
  Jab ek array hota hai, har element continuously memory mein hota hai.
  Kisi bhi element ka address nikalna:
    Address = Base Address + (Index * Size of one element)

  Example:
    Base address = 1000
    Size of number = 8 bytes (JavaScript mein)
    3rd element (index 2) ka address = 1000 + (2 * 8) = 1016

  Seedha formula se address calculate ho jaata hai.
  Ek ek karke dhundna nahi padta.
*/


// ============================================================
// PART 11: COMPLETE SUMMARY - KIS DATA KO KAHAN MEMORY MILTI HAI
// ============================================================

/*
  THEORY:
  STACK KE ANDAR:
  - Sirf ADDRESSES store hote hain (heap addresses)
  - SMI (Small Integers) seedhe address ke andar stored hote hain
    (last bit 0 hoti hai unki)
  - Koi actual data nahi (SMI ke alawa)

  HEAP KE ANDAR (sab kuch yahan jaata hai):
  - Numbers (jo SMI range se bahar hain)
  - Strings (dynamic size, kabhi bhi badh sakti hai)
  - Booleans (true, false - pre-allocated, ek hi baar)
  - Null (pre-allocated, ek hi baar)
  - Undefined (pre-allocated, ek hi baar)
  - Objects (mutable, size badh sakta hai)
  - Arrays (mutable, elements add/remove hote hain)
  - Functions

  FLOW:
  1. Variable declare hota hai
  2. Actual data HEAP mein store hota hai
  3. Us heap data ka ADDRESS -> STACK mein store hota hai
  4. Jab data access karna ho -> Stack se address lo -> Heap pe jao
  5. Data update karna ho (primitive): Nayi heap location banti hai
  6. Data update karna ho (non-primitive): Same location pe modify hota hai
  7. Koi variable jo data point nahi kar raha -> Garbage Collector delete karta hai

  ADDRESS KE LAST BIT SE PATA CHALTA HAI:
  Last bit = 0 -> Is address mein hi ek small number hai, heap pe mat jao
  Last bit = 1 -> Yeh ek real heap address hai, wahan jao actual data ke liye
*/


// ============================================================
// PART 12: PRIMITIVE vs NON-PRIMITIVE - MEMORY BEHAVIOUR
// ============================================================

/*
  THEORY: PRIMITIVE (IMMUTABLE + PASS BY VALUE)

  Jab primitive variable ki value copy karte hain:
    let p = 10;
    let q = p;

  - q ke liye alag heap location banti hai
  - q mein 10 ka naya address aata hai
  - Dono ke addresses alag hain
  - Ek mein change karo, doosre pe effect nahi

  Yeh hai PASS BY VALUE / COPY BY VALUE
*/

let p = 10;
let q = p;   // q ke liye alag memory, 10 ki copy
q = 20;      // sirf q badla

console.log(p); // Output: 10 (p nahi badla)
console.log(q); // Output: 20

/*
  THEORY: NON-PRIMITIVE (MUTABLE + PASS BY REFERENCE)

  Jab non-primitive variable ko doosre mein assign karte hain:
    let obj1 = { name: "Mohan", age: 20 };
    let obj2 = obj1;

  - obj2 ke liye NAYI heap location NAHI banti
  - obj2 ka stack entry bhi usi heap address ko point karta hai
    jo obj1 ka hai
  - Dono ek hi data share karte hain
  - obj2 se change karo, obj1 mein bhi dikhai dega

  Yeh hai PASS BY REFERENCE

  KYUN AISA KIYA GAYA:
  Ek bada object maan lo 5 MB data le raha hai.
  Agar copy banate to:
    obj1 -> 5 MB
    obj2 -> 5 MB aur (copy)
    obj3 -> 5 MB aur (ek aur copy)
  RAM bhar jaati.

  Reference rakhne se:
    obj1, obj2, obj3 sab -> 5 MB (ek hi data)
  Memory save hoti hai.
*/

let obj1 = { name: "Mohan", age: 20 };
let obj2 = obj1;   // reference copy, nayi heap location nahi bani

obj2.name = "Rohan";  // ek hi heap data pe change hua

console.log(obj1.name); // Output: Rohan (obj1 mein bhi dikha)
console.log(obj2.name); // Output: Rohan (same data share karte hain)


// ============================================================
// PART 13: IMMUTABILITY PROOF
// ============================================================

/*
  THEORY:
  Primitive data type ka individual character / part change nahi hota.
  Yeh JavaScript ka rule hai.
*/

let str = "Rohit";
str[0] = "M";         // koshish ki "M" se replace karne ki
console.log(str);     // Output: Rohit (nahi badla, immutable hai)

// Nayi value assign karna alag baat hai:
str = "Mohan";        // Nayi heap location pe "Mohan" store hua
console.log(str);     // Output: Mohan
// Purana "Rohit" apni jagah pada hai, touch nahi hua
// Garbage Collector baad mein use clean karegi (koi point nahi kar raha)


// ============================================================
// PART 14: REAL WORLD FLOW - EK EXAMPLE
// ============================================================

/*
  THEORY:
  let name = "Rohit";

  Internally kya hota hai:
    1. Heap mein jagah dhundho
    2. "Rohit" wahan store karo -> maan lo address 0x1A2B mila
    3. Stack mein: name -> 0x1A2B store karo

  name = "Rohan" karna ho to:
    1. 0x1A2B pe "Rohit" hai - TOUCH NAHI KARENGE (immutable)
    2. Heap mein nayi jagah dhundho
    3. "Rohan" wahan store karo -> maan lo address 0x1C2D mila
    4. Stack mein: name -> 0x1C2D (address update ho gaya)

  Ek baat dhyan do: Code mein "name" lika hai, compile time pe
  "name" ki jagah uska stack address aa jaata hai.
  Phir wahan se heap address milta hai.
  Phir heap pe actual data.

  Yeh sab V8 engine internally handle karta hai.
  Programmer sirf: let name = "Rohit" likhta hai.
*/

let userName = "Rohit";
console.log(userName); // Output: Rohit

userName = "Rohan";
console.log(userName); // Output: Rohan


// ============================================================
// SUMMARY OF THIS LECTURE
// ============================================================

/*
  1. Program ka code Hard Disk mein hota hai.
     Run karne pe RAM mein aata hai. CPU execute karta hai.

  2. RAM ke do hisse hain: Stack aur Heap.

  3. Stack: Sequential, chhota, fast, addresses store karta hai.
     Heap: Random, bada, flexible, actual data store karta hai.

  4. Har variable ka actual data HEAP mein hota hai.
     Uska address STACK mein hota hai.

  5. Primitive data IMMUTABLE hai - change nahi hota, nayi copy banti hai.
     Non-Primitive data MUTABLE hai - same location pe change hota hai.

  6. true, false, null, undefined program start pe pre-allocate hote hain.
     Sab variables jo yeh values rakhte hain, usi jagah point karte hain.

  7. SMI (Small Integer) optimization: Chhote numbers seedhe address mein
     store ho jaate hain. Heap allocation nahi hoti. Loop fast hote hain.

  8. Garbage Collector: Jo data koi point nahi kar raha use heap se
     delete kar deta hai. Memory free karta hai. Program crash nahi hota.

  9. 32-bit OS: Address 4 bytes ka, max 4 GB RAM.
     64-bit OS: Address 8 bytes ka, bahut zyada RAM handle hoti hai.
*/