// ============================================================
//  LECTURE NOTES: Callback Hell in JavaScript
//    Real-life example: Zomato Order Flow Simulation
// ============================================================


// ============================================================
//  PART 1: QUICK RECAP — JavaScript ka Nature
// ============================================================

/*
  THEORY:
  - JavaScript ek SINGLE THREADED, SYNCHRONOUS language hai.
  - Lekin JavaScript kabhi bhi apna code BLOCK nahi hone deta.
  - Agar usse lagta hai ki "yahan wait karna padega" —
    jaise setTimeout, fetch, ya event listener —
    toh wo use Web API ko de deta hai aur AAGE nikal jaata hai.
  - Yahi behavior ASYNCHRONOUS TASKS handle karne ke liye
    hame CALLBACKS use karne pe majboor karta hai.
  - Aur jab bahut saare callbacks ek ke andar ek nest ho jaate hain,
    tab wo situation CALLBACK HELL kehlaati hai.
*/


// ============================================================
//  PART 2: CALLBACK FUNCTION — Quick Refresher
// ============================================================

/*
  THEORY:
  - Callback Function wo function hota hai jo
    EK DOOSRE FUNCTION KO ARGUMENT KE ROOP MEIN PASS KIYA JAATA HAI.
  - Jab main kisi async task ke khatam hone ka wait karna chahta hoon,
    tab main ek callback pass karta hoon ki:
    "Jab tera kaam ho jaaye, yeh function chala dena."

  Example:
  function greet(name, callback) {
    console.log("Hello " + name);
    callback(); // callback ko call kiya
  }

  greet("Khushi", function() {
    console.log("Callback chala!");
  });
*/


// ============================================================
//  PART 3: ZOMATO APP KA FLOW — Problem Statement
// ============================================================

/*
  THEORY — Order Flow:
  User ne cart mein add kiya: Pizza, Biryani, Coke

  Step 1: Place Order     → Payment gateway pe lo, payment clear karo
  Step 2: Prepare Order   → Restaurant ko notify karo, khana banao
  Step 3: Pickup Order    → Delivery boy ko bhejo restaurant tak
  Step 4: Deliver Order   → Delivery boy customer tak pohonche

  IMPORTANT:
  - Yeh saare steps SEQUENTIALLY hone chahiye.
  - Step 2 Step 1 ke complete hone ke BAAD hi shuru hona chahiye.
  - Agar hum inhe seedha ek ke baad ek call karein (without callbacks),
    JavaScript ka async nature inhe simultaneously shuru kar dega —
    jo bilkul GALAT hai.
  - Solution: CALLBACK FUNCTIONS — pehle wale ke andar agla call karo.
*/


// ============================================================
//  PART 4: ORDER DETAILS OBJECT
// ============================================================

/*
  THEORY:
  - Jab bhi user order place karta hai, ek ORDER DETAILS object
    create hota hai jisme sari information hoti hai:
    orderId, food items, total cost, customer info, locations etc.
  - Yeh details aage saare functions mein PASS ON hoti rehti hain
    taaki har step ko pata rahe wo kya kaam kar raha hai.
*/

const orderDetails = {
  orderId: 101,
  foodItems: ["Pizza", "Biryani", "Coke"],
  totalCost: 620,
  customerName: "Rohit",
  customerLocation: "Dwarka",
  restaurantLocation: "Delhi",
  // yeh fields aage update hongi:
  status: false,        // payment done?
  received: false,      // delivery boy ne pick kiya?
  deliveryStatus: false // delivered?
};


// ============================================================
//  PART 5: FUNCTIONS — Zomato Order Simulation
// ============================================================

// ─────────────────────────────────────────────
// STEP 1: placeOrder — Payment Gateway
// ─────────────────────────────────────────────

/*
  THEORY:
  - Pehla kaam: User ki payment process karo.
  - Hum yahan setTimeout se 3-second ki delay simulate kar rahe hain.
  - Real app mein yahan actual payment API hogi.
  - Jab payment complete ho jaaye, TAB CALLBACK call karo.
  - Callback ke saath orderDetails bhi pass karo taaki
    agle step ko pata rahe kya prepare karna hai.
*/

function placeOrder(orderDetails, callback) {
  console.log(`💳 Payment is in Progress... ₹${orderDetails.totalCost}`);

  setTimeout(function () {
    // 3 second baad payment complete maan lo
    orderDetails.status = true; // payment mark as done ✅

    console.log("✅ Payment is Received and Order has been Placed!");

    // Ab callback ko call karo — yaani agle step ko shuru karo
    // orderDetails bhi saath bhej rahe hain
    callback(orderDetails);

  }, 3000);
}

// ─────────────────────────────────────────────
// STEP 2: preparingOrder — Kitchen ko notify karo
// ─────────────────────────────────────────────

/*
  THEORY:
  - Jab payment ho gayi, restaurant ko notify karo ki khana banana shuru karo.
  - foodItems array ko display karein — kya-kya banana hai.
  - 3 seconds baad khana ready maan lo.
  - Jab khana ban jaaye, TAB callback call karo agle step ke liye.
  - orderDetails forward karo delivery boy tak.
*/

function preparingOrder(orderDetails, callback) {
  console.log(`🍽️  Your Food Preparation Started for: ${orderDetails.foodItems.join(", ")}`);

  setTimeout(function () {
    // khana ban gaya, token assign karo delivery ke liye
    orderDetails.token = Math.floor(Math.random() * 1000); // random token

    console.log(`✅ Your Order is now Prepared! Token Number: ${orderDetails.token}`);

    // Agle step ko shuru karo
    callback(orderDetails);

  }, 3000);
}

// ─────────────────────────────────────────────
// STEP 3: pickupOrder — Delivery Boy ko bhejo
// ─────────────────────────────────────────────

/*
  THEORY:
  - Delivery boy ko restaurant ka address aur token number bata do.
  - Wo restaurant jaayega aur token number dikhake order utha le aayega.
  - 3 seconds mein wo restaurant pahonch gaya aur order pick kar liya (simulate).
  - Jab order pick ho jaaye, TAB callback call karo.
  - orderDetails aage pass karo.

  IMPORTANT — Hard Code mat karo:
  - Kabhi bhi functions mein next function ka naam hard code mat karo.
  - Kyunki kuch restaurants ka apna delivery system hota hai.
  - Kuch customers khud pickup karne aate hain.
  - Isliye function REUSABLE rehni chahiye — callback ke through flexibility do.
*/

function pickupOrder(orderDetails, callback) {
  console.log(`🛵  Delivery Boy is on the way to pick up order from ${orderDetails.restaurantLocation}`);

  setTimeout(function () {
    orderDetails.received = true; // order received by delivery boy ✅

    console.log(`📦 I have Picked up the Order! (Token: ${orderDetails.token})`);

    // Agle step ko shuru karo
    callback(orderDetails);

  }, 3000);
}

// ─────────────────────────────────────────────
// STEP 4: deliverOrder — Customer tak pahoncho
// ─────────────────────────────────────────────

/*
  THEORY:
  - Delivery boy ab customer ki location ki taraf nikal gaya.
  - 3 seconds mein customer ke ghar pahonch gaya (simulate).
  - Order deliver ho gaya — deliveryStatus: true mark karo.
  - Yeh humara FINAL STEP hai — is mein koi aur callback nahi.
*/

function deliverOrder(orderDetails) {
  console.log(`I am on my way to deliver the order to ${orderDetails.customerLocation}`);

  setTimeout(function () {
    orderDetails.deliveryStatus = true; // delivered

    console.log("Order Delivered Successfully!");
    console.log("Final Order Summary:", orderDetails);

  }, 3000);
}


// ============================================================
// PART 6: CALLBACK HELL — Yahi hai problem
// ============================================================

/*
  THEORY — Callback Hell kya hai?
  - Jab ek callback ke andar doosra callback ho,
    us callback ke andar teesra, us ke andar chautha —
    tab is structure ko CALLBACK HELL ya "Pyramid of Doom" kehte hain.

  - Dekho neeche ka code:
    placeOrder ke andar → preparingOrder ka callback
      preparingOrder ke andar → pickupOrder ka callback
        pickupOrder ke andar → deliverOrder ka callback

  - Callback ke andar callback ke andar callback...
    Yahi hai Callback Hell!

  3 MAJOR PROBLEMS of Callback Hell:

  1. CODE READABILITY ISSUE:
     - Code padhna aur samajhna bahut mushkil ho jaata hai.
     - Ek function call samajhne ke liye pura tree trace karna padta hai.
     - Production mein aisa code likhna bilkul galat practice hai.
     - Code aise likho ki sabko easily samajh aaye — readable ho.

  2. DEBUGGING ISSUE:
     - Agar kisi ek step mein error aaye (jaise restaurant ke paas 
       food item hi nahi tha, ya delivery boy ka accident ho gaya)
       toh exactly kahan error aaya — yeh pata karna bahut mushkil ho jaata hai.
     - Kyunki saare steps ek doosre pe dependent hain.
     - Error handling bhi har level pe alag karni padti hai.

  3. INVERSION OF CONTROL:
     - Jab main apna callback kisi aur ke function mein pass karta hoon,
       mujhe TRUST karna padta hai ki wo mera function zaroor call karega.
     - Agar doosri team bhool gayi call karna?
     - Ya kisi ne galti se wo line delete kar di?
     - Toh mere baaki saare steps fail ho jaayenge.
     - Main apne hi code ka control kho deta hoon — yahi Inversion of Control hai.
*/

// ──────────────────────────────────────────────────
// CALLBACK HELL IN ACTION — Zomato Order Flow
// ──────────────────────────────────────────────────

placeOrder(orderDetails, function (orderDetails) {
  // ↑ Step 1 complete hone ke baad yeh callback chalega

  preparingOrder(orderDetails, function (orderDetails) {
    // ↑ Step 2 complete hone ke baad yeh callback chalega

    pickupOrder(orderDetails, function (orderDetails) {
      // ↑ Step 3 complete hone ke baad yeh callback chalega

      deliverOrder(orderDetails);
      // ↑ Step 4 — final step, koi callback nahi

      // Dekho kitna ghusaa hua (nested) code hai!
      // Yeh sirf 4 steps hai — real app mein 10-15 steps bhi ho sakte hain.
      // Tab toh aur bhi zyada "hell" hoga
    });
  });
});

// ============================================================
// EXPECTED OUTPUT (steps 3 second gap ke saath aayenge):
//
//  Payment is in Progress... ₹620
//  Payment is Received and Order has been Placed!
//   Your Food Preparation Started for: Pizza, Biryani, Coke
//  Your Order is now Prepared! Token Number: [random]
//   Delivery Boy is on the way to pick up order from Delhi
//  I have Picked up the Order! (Token: [random])
//  I am on my way to deliver the order to Dwarka
//  Order Delivered Successfully!
//  Final Order Summary: { ...orderDetails }
// ============================================================


// ============================================================
//  PART 7: WRONG WAY — Aise mat karo 
// ============================================================

/*
  THEORY:
  Galti #1 — Functions ko seedha ek ke baad ek call karna:

    placeOrder(orderDetails, callback);
    preparingOrder(orderDetails, callback); // GALAT

  - JavaScript ka async nature dono ek saath shuru kar dega.
  - Payment complete hone se pehle hi food preparation start ho jaayegi.

  Galti #2 — Callback ke andar directly function call karna (without wrapping):

    placeOrder(orderDetails, preparingOrder(orderDetails, callback));
    // GALAT — yeh function call hai, callback nahi

  - Yahan preparingOrder() immediately call ho jaayega
    ARGUMENT evaluate hote waqt hi.
  - Isliye hamesha ek wrapper function banao:
    placeOrder(orderDetails, function(od) { preparingOrder(od, cb); });
*/


// ============================================================
//  PART 8: WHAT'S NEXT? — Callback Hell ka Solution
// ============================================================

/*
  THEORY:
  Callback Hell ki inhi problems ko solve karne ke liye
  JavaScript mein do powerful cheezein aayi:

  1. PROMISES:
     - Ek object jo future mein milne wale result ko represent karta hai.
     - "Main tumhe promise karta hoon — ya toh result dunga ya reason bataunga."
     - .then() aur .catch() se chaining hoti hai — nesting nahi.
     - Code readable aur flat rehta hai.

  2.  ASYNC / AWAIT:
     - Promises ko aur bhi readable tarike se likhne ka method.
     - Code bilkul synchronous jaisa DIKHTA hai, behave async karta hai.
     - Production mein YAHI use kiya jaata hai — best practice.
     - Try-catch se errors handle hoti hain — simple aur clean.

  EVOLUTION:
  Callback Hell → Promises → Async/Await
  (purana)       (better)    (best)

*/


// ============================================================
//  QUICK SUMMARY — Callback Hell
// ============================================================

/*
  ┌─────────────────────────────────────────────────────────────┐
  │  CONCEPT            │  EXPLANATION                          │
  ├─────────────────────────────────────────────────────────────┤
  │  Callback Function  │  Argument ke roop mein pass hua       │
  │                     │  function                             │
  ├─────────────────────────────────────────────────────────────┤
  │  Callback Hell      │  Callback ke andar callback ke andar  │
  │                     │  callback... deeply nested structure  │
  ├─────────────────────────────────────────────────────────────┤
  │  Problem 1          │  Code readability khatam ho jaati hai │
  ├─────────────────────────────────────────────────────────────┤
  │  Problem 2          │  Debugging bahut mushkil ho jaati hai │
  ├─────────────────────────────────────────────────────────────┤
  │  Problem 3          │  Inversion of Control — apne code ka  │
  │                     │  control kho dete ho                  │
  ├─────────────────────────────────────────────────────────────┤
  │  Solution           │  Promises → Async/Await               │
  └─────────────────────────────────────────────────────────────┘
*/
