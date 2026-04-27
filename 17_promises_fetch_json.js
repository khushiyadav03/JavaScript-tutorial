// ============================================================
//  LECTURE NOTES: JavaScript Promises
//    GitHub Users fetch + Zomato Order Flow with Promises
//    + JSON vs JS Object + Promise Chaining + .catch .finally
// ============================================================


// ============================================================
//  PART 1: PROMISE KYA HOTA HAI? — Definition
// ============================================================

/*
  OFFICIAL DEFINITION:
  "The Promise object represents the eventual completion
   or failure of an asynchronous operation and its resulting value."

  SIMPLE MEANING (Hinglish mein):
  - Promise ek OBJECT hai jo future mein milne wale result ko
    represent karta hai.
  - Jab hum kisi server se data maangte hain (fetch karte hain),
    toh JS turant ek "Promise" return kar deta hai — matlab:
    "Main abhi result nahi de sakta, par PROMISE karta hoon
     ki future mein zaroor dunga — ya toh data, ya toh reason."

  PROMISE KI 3 STATES:
  ┌──────────────┬────────────────────────────────────────────┐
  │  STATE       │  MEANING                                   │
  ├──────────────┼────────────────────────────────────────────┤
  │  PENDING     │  Request bheji hai, abhi waiting hai       │
  │  FULFILLED   │  Data aa gaya — success!                   │
  │  REJECTED    │  Data nahi mila — failure!                 │
  └──────────────┴────────────────────────────────────────────┘

  - Pending → ya toh FULFILLED hoga, ya toh REJECTED.
  - Pending state mein Promise ko READ mat karo — data hoga hi nahi.
  - Sirf Fulfilled ya Rejected state mein read karo — tab actual data hoga.
*/


// ============================================================
//  PART 2: PROMISE CONSUME KARNA — .then() ka use
// ============================================================

/*
  THEORY:
  - fetch() ek Web API hai jo kisi bhi URL se data laati hai.
  - fetch() hamesha ek PROMISE return karti hai.
  - Initially wo Promise PENDING state mein hota hai.
  - Jab response aata hai, Promise FULFILLED ya REJECTED hota hai.
  - Hum Promise ko .then() se consume karte hain:
      p1.then(function(response) { ... })
  - .then() tab chalega jab Promise fulfilled YA rejected ho — pending mein nahi.
*/

// Step 1: fetch se data maango (GitHub API example)
const p1 = fetch("https://api.github.com/users");
// p1 abhi PENDING state mein hai — is waqt agar print karein toh:
// Promise { <pending> } — koi actual data nahi hoga

// GALAT TARIKA — Pending mein seedha print:
// console.log(p1); // → Promise { <pending> }

// SAHI TARIKA — .then() se consume karo:
p1.then(function (response) {
  // 'response' mein abhi BYTE STREAM hai — seedha readable nahi
  // Browser ne convert kiya hota hai, par Node/JS mein manually convert karna hoga

  // response.json() → Bytes ko JavaScript Object mein convert karta hai
  // YEH BHI EK ASYNC TASK HAI — isliye yeh bhi Promise return karta hai
  const p2 = response.json(); // p2 bhi ek Promise hai — pending mein

  // p2 ko bhi .then() se consume karo:
  p2.then(function (data) {
    console.log("GitHub Users Data:", data); // 30 users ka array
  });
});

// NOTE: response.json() async kyun hai?
// Kyunki bytes ko JS object mein convert karna heavy calculation hai —
// encryption/decryption jaisi operations async hoti hain.
// Isliye yeh bhi Promise return karta hai (pending → fulfilled/rejected).


// ============================================================
//  PART 3: PROMISE CHAINING — Better way to write
// ============================================================

/*
  THEORY:
  - Upar wala code (p1, p2 alag-alag) kaam karta hai,
    par PROMISE CHAINING se hum ise aur clean likh sakte hain.
  - .then() ke andar agar hum kuch RETURN karte hain,
    toh uske baad DOOSRA .then() laga sakte hain — chain banati hai.
  - Har .then() ka output agla .then() ka input ban jaata hai.
  - Code flat rehta hai — callbacks ki tarah nested nahi hota.
  - Yahi Callback Hell ka solution hai!
*/

fetch("https://api.github.com/users")
  .then(function (response) {
    // response → byte stream
    return response.json(); // yeh Promise return karta hai
  })
  .then(function (data) {
    // ab data → proper JS array of 30 user objects
    console.log("Promise Chaining — Users:", data);

    // ab yahan se hum DOM manipulation kar sakte hain:
    // data[0].login       → username
    // data[0].avatar_url  → profile photo URL
    // data[0].html_url    → GitHub profile link
  });

// PROMISE CHAINING ka flow:
// fetch() → .then(convert to JSON) → .then(use the data)
// Seedha, flat, readable — no nesting!


// ============================================================
//  PART 4: .catch() — Error Handling
// ============================================================

/*
  THEORY:
  - Kabhi-kabhi request fail ho jaati hai:
      → Internet down hai
      → Server down hai
      → DNS resolve nahi ho paya
  - In cases mein Promise REJECTED ho jaata hai.
  - Rejected cases ko hum .catch() se handle karte hain.
  - .catch() tab chalega jab koi bhi .then() mein error aaye
    YA Promise reject ho jaaye.

  IMPORTANT — REJECT kab hota hai? (Interview Question!)
  ┌──────────────────────────────────────────────────────────┐
  │  REJECTED (catch chalega):                               │
  │  → Tumhara internet down hai                             │
  │  → Server DOWN hai — respond hi nahi kar raha            │
  │  → DNS server DOWN hai (URL ko IP mein convert nahi hua) │
  ├──────────────────────────────────────────────────────────┤
  │  FULFILLED (catch NAHI chalega):                         │
  │  → Server ne 404 diya (page not found)                  │
  │  → Server ne 401 diya (unauthorized)                     │
  │  → Wrong URL diya — server ne "not found" message diya   │
  │  → API rate limit hit ho gayi                            │
  │  → Server ke paas data nahi hai                          │
  └──────────────────────────────────────────────────────────┘

  Kyun? Kyunki:
  - REJECT sirf tab hota hai jab JS SERVER SE BAAT HI NAHI KAR PAATA.
  - Agar server ne kuch bhi reply diya — chahe error hi kyun na ho —
    toh wo FULFILLED category mein aata hai.
  - Promise ka concept sirf JavaScript mein hai — server ko
    "promise" nahi pata. Server sirf HTTP responses jaanta hai.

  FULFILLED but server error case ko manually handle karo:
  - response.ok → true/false
  - Agar response.ok === false → manually error throw karo
  - throw kiya hua error → .catch() pakad lega
*/

fetch("https://api.github.com/users")
  .then(function (response) {
    // response.ok check karo — agar false hai toh data nahi aaya
    if (!response.ok) {
      throw new Error("Data is not present on server"); // .catch() pakdega
    }
    return response.json();
  })
  .then(function (data) {
    console.log("Data aaya:", data);
  })
  .catch(function (error) {
    // 2 cases yahan aayenge:
    // 1. Network/DNS/Server down → auto reject → catch
    // 2. response.ok === false → manual throw → catch
    console.log("Error:", error.message);

    // Yahan hum UI mein show kar sakte hain:
    // document.getElementById("container").textContent = error.message;
  });


// ============================================================
//  PART 5: .finally() — Hamesha Chalega
// ============================================================

/*
  THEORY:
  - .finally() Promise chain ke END mein lagaate hain.
  - Yeh HAMESHA chalta hai — chahe Promise fulfilled ho ya rejected.
  - Kab use karte hain?
      → Loader/spinner hide karna: jab bhi data aaye ya error aaye,
        loader screen se hatao.
      → Database connection close karna: data fetch hua, kaam hua,
        ab connection close karo.
      → Cleanup operations jo hamesha karni hain.

  FLOW:
  fetch() → .then() → .then() → .catch() → .finally()
  (.finally hamesha last mein chalega, regardless of success/failure)
*/

fetch("https://api.github.com/users")
  .then(function (response) {
    if (!response.ok) throw new Error("Server error");
    return response.json();
  })
  .then(function (data) {
    console.log("Data:", data);
    // loader hide karo
  })
  .catch(function (error) {
    console.log("Error:", error.message);
    // error show karo UI mein
  })
  .finally(function () {
    // HAMESHA CHALEGA — fulfilled ho ya rejected
    console.log("I am doing cleanup... (loader hide, DB disconnect etc)");
    // loader.style.display = "none"; // example
  });


// ============================================================
//  PART 6: PROMISE CREATE KARNA — new Promise()
// ============================================================

/*
  THEORY:
  - Hum khud bhi Promise create kar sakte hain.
  - Syntax: new Promise(function(resolve, reject) { ... })
  - resolve() → Promise ko FULFILLED karta hai (.then() chalega)
  - reject()  → Promise ko REJECTED karta hai (.catch() chalega)
  - resolve/reject mein koi bhi value pass kar sakte ho:
      string, number, object, array — kuch bhi.
*/

// Promise create karna:
const myPromise = new Promise(function (resolve, reject) {
  // Yahan async kaam karo — jaise setTimeout, fetch etc.
  // Jab kaam ho jaaye:
  resolve({ name: "Rohit", age: 30 }); // FULFILLED → .then() chalega
  // reject("Something went wrong"); // REJECTED → .catch() chalega
});

// Promise consume karna:
myPromise
  .then(function (data) {
    console.log("Resolved data:", data); // { name: "Rohit", age: 30 }
  })
  .catch(function (error) {
    console.log("Rejected:", error);
  });

// resolve → .then() handle karega
// reject  → .catch() handle karega


// ============================================================
//  PART 7: JSON vs JavaScript Object — Important Difference!
// ============================================================

/*
  THEORY:
  - JSON ka full form: JavaScript Object Notation
  - CONFUSION: "JSON mein JavaScript hai toh sirf JS samajhti hai?"
    → BILKUL GALAT! JSON ek UNIVERSAL FORMAT hai.
    → Python, C++, Java, Rust, Go — SABHI languages JSON samajhti hain.
    → JavaScript Object sirf JavaScript samajhti hai.

  JSON vs JS Object DIFFERENCES:
  ┌─────────────────────────┬──────────────────────────────────┐
  │  JSON                   │  JavaScript Object               │
  ├─────────────────────────┼──────────────────────────────────┤
  │  Sab keys DOUBLE QUOTE  │  Keys bina quotes ke bhi chal    │
  │  mein honi chahiye      │  jaati hain                      │
  ├─────────────────────────┼──────────────────────────────────┤
  │  undefined allowed NAHI │  undefined allowed hai           │
  ├─────────────────────────┼──────────────────────────────────┤
  │  Functions allowed NAHI │  Functions allowed hain          │
  ├─────────────────────────┼──────────────────────────────────┤
  │  Trailing comma NAHI    │  Trailing comma allowed hai      │
  ├─────────────────────────┼──────────────────────────────────┤
  │  Sirf STRING format hai │  Actual JS Object hai            │
  └─────────────────────────┴──────────────────────────────────┘

  JSON kyun use karte hain?
  - 2 alag languages ko aapas mein data share karna ho toh ek
    COMMON FORMAT chahiye — JSON woh common format hai.
  - Example: Frontend (JavaScript) ↔ Backend (Python/Java/C++)
    Dono JSON samajhte hain — toh data exchange JSON mein hoga.
  - JSON ultimately ek STRING hai jise bytes mein convert karke
    internet pe travel karaya jaata hai.
*/

// JavaScript Object:
const jsObject = {
  name: "Rohit",      // key bina quotes ke — JS mein okay
  age: 30,
  address: "Dwarka",
  c: undefined        // undefined — JS mein okay, JSON mein ignored
};

// JS Object → JSON (string) mein convert karna:
const jsonString = JSON.stringify(jsObject);
console.log("JSON String:", jsonString);
// Output: {"name":"Rohit","age":30,"address":"Dwarka"}
// Note: 'c: undefined' ko JSON.stringify ignore kar deta hai
// Note: Sabhi keys automatically double quotes mein aa jaati hain

// JSON (string) → JS Object mein convert karna:
const backToObject = JSON.parse(jsonString);
console.log("Back to JS Object:", backToObject);
// Output: { name: 'Rohit', age: 30, address: 'Dwarka' }

// Manual JSON string (sirf string hai yeh):
const manualJson = '{"name":"Rohit","age":30,"address":"Dwarka"}';
// Note: DOUBLE quotes compulsory hain JSON string mein
// Note: Koi trailing comma NAHI — error aayega

const parsedFromManual = JSON.parse(manualJson);
console.log("Parsed manual JSON:", parsedFromManual);


// ============================================================
//  PART 8: ZOMATO ORDER FLOW — Callback Hell ko
//            Promises se solve karna
// ============================================================

/*
  THEORY — Callback Hell ki problems yaad karo:
  1. Code readability khatam ho jaati thi
  2. Debugging mushkil ho jaati thi
  3. Inversion of Control — apna code kisi aur ke haath saunp dete the

  PROMISE SOLUTION:
  - Har function ek PROMISE RETURN KARE.
  - .then() chain use karo — callbacks ki nesting nahi hogi.
  - Har .then() tab chalega jab pehla kaam pura ho jaaye.
  - Hum khud control mein hain — kisi aur par depend nahi.
*/

// Order Details Object
const orderDetails = {
  orderId: 101,
  foodItems: ["Pizza", "Biryani", "Coke"],
  totalCost: 620,
  customerName: "Rohit",
  customerLocation: "Dwarka",
  restaurantLocation: "Delhi",
  status: false,
  token: null,
  received: false,
  deliveryStatus: false
};

// ─────────────────────────────────────────────────────────
// STEP 1: placeOrder — Promise return karega
// ─────────────────────────────────────────────────────────

/*
  THEORY:
  - Function ek NEW PROMISE return karta hai.
  - Async kaam (setTimeout simulate) ke andar:
      → Success: resolve(orderDetails) call karo
      → Failure: reject("reason") call karo
  - Jab resolve hoga → .then() chalega
  - Jab reject hoga → .catch() chalega
  - 10% chance of payment failure simulate kiya hai.
*/

function placeOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Payment is in Progress... ₹${orderDetails.totalCost}`);

    setTimeout(function () {
      // 90% success, 10% failure simulate
      if (Math.random() > 0.1) {
        orderDetails.status = true;
        console.log("Payment Received and Order Placed!");
        resolve(orderDetails); // → .then() chalega
      } else {
        reject("Payment Failed! Please try again."); // → .catch() chalega
      }
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────
// STEP 2: preparingOrder — Promise return karega
// ─────────────────────────────────────────────────────────

/*
  THEORY:
  - Yeh function tabhi call hoga jab placeOrder ka Promise resolve hoga.
  - Isko bhi ek Promise return karna hai taaki agle step ko
    .then() se chain kar sakein.
  - 5% chance of food unavailability simulate kiya hai.
*/

function preparingOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Food Preparation Started: ${orderDetails.foodItems.join(", ")}`);

    setTimeout(function () {
      if (Math.random() > 0.05) {
        orderDetails.token = Math.floor(Math.random() * 1000);
        console.log(`Order Prepared! Token: ${orderDetails.token}`);
        resolve(orderDetails); // → next .then() chalega
      } else {
        reject("Food item not available at restaurant!"); // → .catch()
      }
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────
// STEP 3: pickupOrder — Promise return karega
// ─────────────────────────────────────────────────────────

/*
  THEORY:
  - Delivery boy restaurant se order pick karega.
  - Yeh bhi Promise return karega.
  - 5% chance of delivery boy being unable to reach.
*/

function pickupOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Delivery Boy heading to ${orderDetails.restaurantLocation} for pickup`);

    setTimeout(function () {
      if (Math.random() > 0.05) {
        orderDetails.received = true;
        console.log(`Order Picked Up! (Token: ${orderDetails.token})`);
        resolve(orderDetails); // → next .then() chalega
      } else {
        reject("Delivery Boy unable to reach restaurant!"); // → .catch()
      }
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────
// STEP 4: deliverOrder — Final step (Promise return optional)
// ─────────────────────────────────────────────────────────

/*
  THEORY:
  - Yeh final step hai — customer ke ghar deliver karna.
  - Iske baad koi aur step nahi hai toh chain khatam.
*/

function deliverOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`On the way to deliver at ${orderDetails.customerLocation}`);

    setTimeout(function () {
      orderDetails.deliveryStatus = true;
      console.log("Order Delivered Successfully!");
      resolve(orderDetails); // final resolve
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────
// PROMISE CHAINING — Callback Hell GONE!
// ─────────────────────────────────────────────────────────

/*
  THEORY — Callback Hell vs Promise Chaining:

  CALLBACK HELL (purana tarika — complex, nested):
  placeOrder(orderDetails, function(od) {
    preparingOrder(od, function(od) {
      pickupOrder(od, function(od) {
        deliverOrder(od);
      });
    });
  });

  PROMISE CHAINING (naya tarika — flat, readable):
  placeOrder(orderDetails)
    .then(preparingOrder)
    .then(pickupOrder)
    .then(deliverOrder)
    .then(...)
    .catch(...)
    .finally(...)

  FAYDE:
  1.  Code readable hai — flat structure, no nesting
  2.  Debugging easy hai — ek jagah .catch() sab errors pakdega
  3.  Inversion of Control NAHI — main khud control mein hoon
     (main doosre function ko apna callback nahi de raha)
  4.  Har step independent hai — easily modify kar sakte hain
*/

placeOrder(orderDetails)
  .then(function (od) {
    return preparingOrder(od); // step 1 done → step 2 shuru
  })
  .then(function (od) {
    return pickupOrder(od); // step 2 done → step 3 shuru
  })
  .then(function (od) {
    return deliverOrder(od); // step 3 done → step 4 shuru
  })
  .then(function (finalOrderDetails) {
    console.log("Final Order Summary:", finalOrderDetails);
  })
  .catch(function (error) {
    // Kisi bhi step mein reject → seedha yahan aayega
    console.log("Order Failed:", error);
    // Yahan hum user ko notify kar sakte hain, refund initiate kar sakte hain
  })
  .finally(function () {
    // Hamesha chalega — success ho ya failure
    console.log("Order process completed (cleanup done).");
    // Loader hide karo, connection close karo etc.
  });


// ============================================================
//  PART 9: SHORTHAND PROMISE CHAINING — Arrow functions
// ============================================================

/*
  THEORY:
  - Upar wale code ko aur short likh sakte hain.
  - Jab .then() mein sirf ek function call hai aur uski value return kar rahe ho,
    toh arrow function se seedha pass kar sakte ho.
  - Yeh exactly same kaam karta hai — bas syntax short hai.
*/

// Short version (same result):
placeOrder(orderDetails)
  .then(od => preparingOrder(od))
  .then(od => pickupOrder(od))
  .then(od => deliverOrder(od))
  .then(final => console.log("Done:", final))
  .catch(err => console.log("Error:", err))
  .finally(() => console.log("Cleanup done."));


// ============================================================
//  PART 10: GITHUB USERS UI — DOM + Promises (Browser only)
// ============================================================

/*
  THEORY:
  - Ek baar Promise se data aa jaaye, toh DOM manipulation karo.
  - Data ek array hai — for loop se sab users display karo.
  - Yeh code BROWSER mein chalega (Node.js mein nahi).
*/

// (Browser environment mein chalega)
/*
fetch("https://api.github.com/users")
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  })
  .then(data => {
    const parent = document.getElementById("first");

    // Saare 30 users display karo
    for (let i = 0; i < data.length; i++) {
      const img = document.createElement("img");
      img.src = data[i].avatar_url;       // user ki photo
      img.style.width = "50px";
      img.style.height = "50px";
      img.title = data[i].login;          // hover pe username
      img.onclick = () => window.open(data[i].html_url); // click pe GitHub profile
      parent.appendChild(img);
    }
  })
  .catch(error => {
    const parent = document.getElementById("first");
    parent.textContent = `Failed to load: ${error.message}`;
  })
  .finally(() => {
    // loader.style.display = "none"; // loader hide karo
    console.log("Fetch operation completed.");
  });
*/


// ============================================================
// QUICK SUMMARY — Sab kuch ek jagah
// ============================================================

/*
  ┌─────────────────────────────────────────────────────────────┐
  │  CONCEPT              │  EXPLANATION                        │
  ├─────────────────────────────────────────────────────────────┤
  │  Promise              │  Future result ka ek object         │
  ├─────────────────────────────────────────────────────────────┤
  │  Pending              │  Request gayi, wait kar rahe hain   │
  ├─────────────────────────────────────────────────────────────┤
  │  Fulfilled            │  Data aa gaya — success             │
  ├─────────────────────────────────────────────────────────────┤
  │  Rejected             │  Network/Server/DNS down — failure  │
  ├─────────────────────────────────────────────────────────────┤
  │  .then()              │  Fulfilled ya data aane par chalega │
  ├─────────────────────────────────────────────────────────────┤
  │  .catch()             │  Rejection ya error par chalega     │
  ├─────────────────────────────────────────────────────────────┤
  │  .finally()           │  HAMESHA chalega — success ya fail  │
  ├─────────────────────────────────────────────────────────────┤
  │  resolve()            │  Promise fulfill karo (success)     │
  ├─────────────────────────────────────────────────────────────┤
  │  reject()             │  Promise reject karo (failure)      │
  ├─────────────────────────────────────────────────────────────┤
  │  Promise Chaining     │  .then().then().then() — flat code  │
  ├─────────────────────────────────────────────────────────────┤
  │  response.json()      │  Bytes → JS Object (bhi async hai)  │
  ├─────────────────────────────────────────────────────────────┤
  │  JSON.stringify()     │  JS Object → JSON string            │
  ├─────────────────────────────────────────────────────────────┤
  │  JSON.parse()         │  JSON string → JS Object            │
  ├─────────────────────────────────────────────────────────────┤
  │  response.ok          │  true = data mila, false = error    │
  └─────────────────────────────────────────────────────────────┘

  REJECT KAB HOTA HAI? (Interview answer):
  → Internet down
  → Server down (respond hi nahi kar raha)
  → DNS server down (URL → IP resolve nahi hua)
  → Baki SAB FULFILLED hota hai — chahe 404 ho, 500 ho, data na ho

*/