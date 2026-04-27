// ============================================================
//  LECTURE NOTES: Async / Await in JavaScript
//    async function + await keyword + try/catch + Promise.all
//    + Zomato flow rewritten + GitHub Users Project
// ============================================================


// ============================================================
//  PART 1: async KEYWORD — Kya hota hai?
// ============================================================

/*
  THEORY:
  - async keyword ko hum kisi bhi FUNCTION ke aage lagate hain.
  - Iska matlab hota hai: "Yeh function ASYNCHRONOUS hai."
  - async function HAMESHA ek PROMISE return karta hai —
    chahe tum andar se kuch bhi return karo.
  - Agar tum andar se "Rohit" return karo, toh async function
    usse pakad ke ek Promise ke andar WRAP karke return karega.
  - Matlab: return "Rohit" → Promise { 'Rohit' }

  SYNTAX:
  async function greet() {
    return "Rohit";
  }

  ASYNC FUNCTION KA RULE:
  "Async function ALWAYS returns a Promise."
*/

// Normal function — sirf value return karta hai:
function normalGreet() {
  return "Rohit";
}
console.log(normalGreet()); // Output: Rohit

// Async function — Promise return karta hai:
async function asyncGreet() {
  return "Rohit"; // async ne ise Promise mein wrap kar diya
}
console.log(asyncGreet()); // Output: Promise { 'Rohit' }

// Promise ko consume kaise karein:
asyncGreet().then(function (data) {
  console.log("Async function output:", data); // Output: Rohit
});

// NOTE: Yeh dono bilkul same hain:
async function way1() {
  return "Rohit"; // async automatically wrap karega
}

async function way2() {
  return new Promise(function (resolve, reject) {
    resolve("Rohit"); // manually Promise bana ke return karo
  });
}
// Dono ka output same hoga → Promise { 'Rohit' }


// ============================================================
//  PART 2: await KEYWORD — Kya hota hai?
// ============================================================

/*
  THEORY:
  - await keyword ek Promise ke aage lagaate hain.
  - await ka matlab: "Jab tak yeh Promise resolve na ho jaaye,
    agle line par mat jaana."
  - await sirf ASYNC FUNCTION ke ANDAR use karo.
  - await wahan "ruko" ka kaam karta hai — par sirf us async
    function ke andar, poore program ko block nahi karta.

  await ke bina problem:
  - JS never waits for anyone — wo turant agle line pe chala jaata hai.
  - Toh agar fetch() ke baad seedha response.json() karo,
    response abhi bhi PENDING hoga → ERROR aayega.

  await ke saath solution:
  - await lagao → JS wahaan ruko → Promise resolve hone do →
    tab value milegi → tab agle line pe jao.
*/

//  GALAT TARIKA — await ke bina:
// const response = fetch("https://api.github.com/users");
// const data = response.json(); // ERROR! response abhi Promise hai (pending)

//  SAHI TARIKA — await ke saath (async function ke andar):
async function getGitHubUsers() {
  const response = await fetch("https://api.github.com/users");
  // ↑ fetch complete hone ka wait karega — tab tak aage nahi badhega

  const data = await response.json();
  // ↑ response.json() bhi async hai — iska bhi wait karega

  console.log("GitHub Users:", data);
}

getGitHubUsers(); // function call


// ============================================================
//  PART 3: await BAHAR LIKHNE KI PROBLEM
// ============================================================

/*
  THEORY:
  - Agar await ko async function ke BAHAR (global scope mein) likhte hain,
    toh poora JS PROGRAM wahan FREEZE ho jaata hai.
  - Matlab neeche wala koi bhi code — chahe wo fetch se
    BILKUL INDEPENDENT ho — woh bhi nahi chalega jab tak
    fetch complete na ho jaaye.
  - Yeh bahut BADI problem hai — page freeze ho jaata hai.

  Example of problem:
  const response = await fetch("..."); // ← program yahan RUK GAYA
  const data = await response.json();
  console.log("Hello Ji"); // ← yeh tab chalega jab upar wala done ho

  SOLUTION:
  - await ko hamesha ASYNC FUNCTION ke ANDAR use karo.
  - Async function ke andar await lagao → JS us function ke
    andar ruko, lekin BAAKI ka code normal chalta rahe.
  - Jab Web API se data aayega, tab woh async function resume hoga.

  2022 ke baad:
  - await ko top-level (module mein) use kar sakte ho.
  - Par RECOMMENDED nahi hai — async function ke andar hi raho.
*/

// PROBLEM — Global await (program freeze):
// const response = await fetch("..."); // freeze!
// console.log("Hello Ji"); // yeh nahi chalega jab tak fetch done na ho

//  SOLUTION — await INSIDE async function:
console.log("Hello World START"); // pehle chalega

async function fetchData() {
  // Web API ko de diya fetch ka kaam
  // Async function ke bahar wala code normal chalta rahega
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  console.log("Data inside async:", data); // baad mein chalega
}

fetchData(); // function call — yeh async hai, bahar ka code ruka nahi

console.log("Hello Ji Kaise Ho?"); // ← PEHLE print hoga, fetchData se pehle!
console.log("Hello World END");    // ← yeh bhi pehle print hoga

// OUTPUT ORDER:
// Hello World START
// Hello Ji Kaise Ho?
// Hello World END
// Data inside async: [...] ← sabse last mein (jab server se data aaya)


// ============================================================
//  PART 4: async/await — PROMISE CHAINING se COMPARISON
// ============================================================

/*
  THEORY:
  Pehle wala tarika (Promise Chaining):
    fetch("url")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  Naya tarika (async/await):
    async function getData() {
      const response = await fetch("url");
      const data = await response.json();
      console.log(data);
    }

  KYUN async/await BETTER HAI?
  1. Code bilkul SYNCHRONOUS jaisa DIKHTA hai — readable!
  2. .then().then().then() ki nesting nahi — flat code
  3. Error handling try/catch se — familiar pattern
  4. Debugging easy hai
  5. Production mein YAHI use hota hai — industry standard
*/

// Promise chaining (purana):
function getDataOldWay() {
  fetch("https://api.github.com/users")
    .then(res => res.json())
    .then(data => console.log("Old way:", data))
    .catch(err => console.log("Error:", err));
}

// async/await (naya — preferred):
async function getDataNewWay() {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  console.log("New way:", data);
}


// ============================================================
//  PART 5: try / catch — Error Handling with async/await
// ============================================================

/*
  THEORY:
  - Callback Hell mein: .catch() se handle karte the
  - Promise Chaining mein: .catch() chain mein lagaate the
  - async/await mein: try...catch block se handle karte hain

  TRY BLOCK:
  - Woh code jahan error aa sakta hai — try ke andar daalo.
  - Agar koi bhi await wala kaam fail ho → catch mein jaayega.

  CATCH BLOCK:
  - Koi bhi error → yahan pakda jaayega.
  - error.message se exact error message milta hai.

  RESPONSE.OK CHECK — Important!
  - Agar server RESPOND kiya, par data nahi diya (404, 401 etc.)
    → Promise FULFILLED hota hai (reject nahi)
  - Toh response.ok check karo:
      agar false → manually throw new Error() karo
      → catch block pakad lega
  - Agar server se BAAT HI nahi ho payi (no internet, server down, DNS fail)
    → Promise automatically REJECT → catch pakad lega

  RULES (recap from last lecture):
  → REJECTED hoga: internet down, server down, DNS fail
  → FULFILLED hoga: server ka koi bhi response — 200, 404, 401, 500 sab
*/

async function getGitHubUsersWithErrorHandling() {
  try {
    const response = await fetch("https://api.github.com/users");

    // response.ok check — server se baat ho gayi,
    // par data mila ya nahi?
    if (!response.ok) {
      throw new Error("Data is not present on server"); // → catch pakdega
    }

    const data = await response.json();
    console.log("Users:", data);

  } catch (error) {
    // Yahan 2 types ke errors aayenge:
    // 1. Network fail (auto rejected promise) → catch
    // 2. response.ok false → manually throw kiya → catch
    console.log("Error caught:", error.message);
    // Yahan UI mein error message dikhao user ko
  }
}

getGitHubUsersWithErrorHandling();


// ============================================================
//  PART 6: ZOMATO ORDER FLOW — async/await se rewrite
// ============================================================

/*
  THEORY — Teen tarikon ka comparison:

  TARIKA 1 — Callback Hell (bahut bura):
  placeOrder(orderDetails, function(od) {
    preparingOrder(od, function(od) {
      pickupOrder(od, function(od) {
        deliverOrder(od); // ← deeply nested!
      });
    });
  });

  TARIKA 2 — Promise Chaining (thoda better):
  placeOrder(orderDetails)
    .then(od => preparingOrder(od))
    .then(od => pickupOrder(od))
    .then(od => deliverOrder(od))
    .catch(err => console.log(err))

  TARIKA 3 — async/await (BEST — production standard):
  async function ordering() {
    const r1 = await placeOrder(orderDetails);
    const r2 = await preparingOrder(r1);
    const r3 = await pickupOrder(r2);
    const r4 = await deliverOrder(r3);
  }
  → Seedha, flat, readable — bilkul synchronous jaisa lagta hai!

  YEH KAISA KAAM KARTA HAI:
  - placeOrder ko await karo → jab ho jaaye → r1 mein data
  - r1 ko preparingOrder ko de do → await → r2 mein data
  - r2 ko pickupOrder ko de do → await → r3 mein data
  - r3 ko deliverOrder ko de do → await → r4 mein data
  - Ek bhi step doosre ke pehle nahi chalega — guaranteed sequence!
*/

// Order details object
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

// Step functions (Promise return karte hain — same as last lecture):
function placeOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Payment in Progress... ₹${orderDetails.totalCost}`);
    setTimeout(function () {
      if (Math.random() > 0.1) {
        orderDetails.status = true;
        console.log("Payment Received! Order Placed.");
        resolve(orderDetails);
      } else {
        reject("Payment Failed!");
      }
    }, 3000);
  });
}

function preparingOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Preparing: ${orderDetails.foodItems.join(", ")}`);
    setTimeout(function () {
      if (Math.random() > 0.05) {
        orderDetails.token = Math.floor(Math.random() * 1000);
        console.log(`Order Prepared! Token: ${orderDetails.token}`);
        resolve(orderDetails);
      } else {
        reject("Food unavailable at restaurant!");
      }
    }, 3000);
  });
}

function pickupOrder(orderDetails) {
  return new Promise(function (resolve, reject) {
    console.log(`Delivery boy heading to ${orderDetails.restaurantLocation}`);
    setTimeout(function () {
      if (Math.random() > 0.05) {
        orderDetails.received = true;
        console.log(`Order Picked Up! Token: ${orderDetails.token}`);
        resolve(orderDetails);
      } else {
        reject("Delivery boy couldn't reach restaurant!");
      }
    }, 3000);
  });
}

function deliverOrder(orderDetails) {
  return new Promise(function (resolve) {
    console.log(`On the way to ${orderDetails.customerLocation}`);
    setTimeout(function () {
      orderDetails.deliveryStatus = true;
      console.log("Order Delivered Successfully!");
      resolve(orderDetails);
    }, 3000);
  });
}

// ─────────────────────────────────────────────────────────
// ASYNC/AWAIT VERSION — Clean, readable, production-grade
// ─────────────────────────────────────────────────────────

async function ordering() {
  try {
    // Step 1: Place order, wait for it to complete
    const response1 = await placeOrder(orderDetails);

    // Step 2: Prepare order using result from step 1
    const response2 = await preparingOrder(response1);

    // Step 3: Pickup order using result from step 2
    const response3 = await pickupOrder(response2);

    // Step 4: Deliver order using result from step 3
    const response4 = await deliverOrder(response3);

    // Final: Print complete order summary
    console.log("Final Order Details:", response4);

  } catch (error) {
    // Kisi bhi step mein rejection → yahan aayega
    console.log("Order Failed:", error);
    // Yahan user ko notify karo, refund initiate karo etc.
  }
}

ordering();

// COMPARISON:
// Callback Hell:    3 levels of nesting, hard to read
// Promise Chaining: .then().then() chain, okay but still verbose
// async/await:      Reads like normal sync code — CLEANEST!


// ============================================================
//  PART 7: Promise.all() — Parallel Execution
// ============================================================

/*
  THEORY:
  - Kabhi kabhi hamare paas aise tasks hote hain jo ek doosre
    par DEPENDENT NAHI hote — lekin hum unhe await se
    SEQUENTIALLY likh dete hain.
  - Yeh SLOW karta hai — kyunki pehle A ka wait, fir B ka wait, fir C...

  PROBLEM EXAMPLE:
  const comments = await fetchComments(userId);
  const photos   = await fetchPhotos(userId);
  const chats    = await fetchChats(userId);
  // ↑ Yeh TEENO independent hain! Par ek ke baad ek chal rahe hain.
  // Total time = A ka time + B ka time + C ka time

  SOLUTION — Promise.all():
  - Promise.all([p1, p2, p3]) → teeno Promises ko PARALLEL mein chalata hai
  - Jab teeno resolve ho jaate hain → tab result milta hai
  - Total time = max(A, B, C) — sabse slow wale ka time
  - Result ek ARRAY mein aata hai: [comments, photos, chats]

  REAL WORLD USE CASES:
  → Multiple database connections ek saath banana
  → Multiple APIs se data ek saath fetch karna
  → Multiple files ek saath upload karna
  → Multiple resources ek saath load karna

  IMPORTANT: Agar koi ek bhi Promise REJECT ho gaya →
  Promise.all() turant REJECT ho jaata hai.
  (Sabka data chahiye → ek bhi fail → sab fail)

  SYNTAX:
  const [result1, result2, result3] = await Promise.all([
    fetchComments(userId),
    fetchPhotos(userId),
    fetchChats(userId)
  ]);
*/

//  SLOW — Sequential (unnecessary wait):
async function getUserDataSlow(userId) {
  const comments = await fetch(`https://api.example.com/comments/${userId}`);
  // ↑ pehle yeh complete hone do

  const photos = await fetch(`https://api.example.com/photos/${userId}`);
  // ↑ fir yeh — lekin yeh comments par depend nahi karta!

  const chats = await fetch(`https://api.example.com/chats/${userId}`);
  // ↑ fir yeh — yeh bhi independent hai!

  // Total time = A + B + C (bahut slow!)
}

//  FAST — Parallel with Promise.all():
async function getUserDataFast(userId) {
  try {
    const [commentsRes, photosRes, chatsRes] = await Promise.all([
      fetch(`https://api.example.com/comments/${userId}`),
      fetch(`https://api.example.com/photos/${userId}`),
      fetch(`https://api.example.com/chats/${userId}`)
      // ↑ Teeno ek saath shuru ho gayi — parallel!
    ]);

    // Jab teeno resolve ho jaayein:
    const comments = await commentsRes.json();
    const photos   = await photosRes.json();
    const chats    = await chatsRes.json();

    console.log("All data fetched in parallel:", { comments, photos, chats });
    // Total time = max(A, B, C) — much faster!

  } catch (error) {
    console.log("One of the requests failed:", error.message);
    // Ek bhi fail → sab fail → catch mein
  }
}

// Another common Promise.all() example — GitHub users fetch:
async function fetchMultipleApis() {
  try {
    const [usersRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users"),
      fetch("https://api.github.com/repositories")
    ]);

    const users = await usersRes.json();
    const repos = await reposRes.json();

    console.log("Users:", users);
    console.log("Repos:", repos);

  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
}


// ============================================================
// PART 8: GitHub Users PROJECT — async/await + DOM
// ============================================================

/*
  THEORY — Project Overview:
  - 30 GitHub users ki photos, usernames aur profile links
    ek web page par display karana.
  - Data source: https://api.github.com/users
  - Data format: Array of 30 user objects, har ek mein:
      → login       → username
      → avatar_url  → profile photo URL
      → html_url    → GitHub profile link
      → url         → individual user API (extra details ke liye)

  FLOW:
  1. fetch() se 30 users ka data laao
  2. response.json() se JS Object mein convert karo
  3. for...of loop se har user ke liye DOM element banao
  4. DOM mein append karo

  YEH CODE BROWSER MEIN CHALEGA (Node.js mein nahi)
*/

// (Browser environment mein chalega):
/*
async function displayGitHubUsers() {
  try {
    const response = await fetch("https://api.github.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub users");
    }

    const data = await response.json();

    // Parent container select karo
    const parent = document.getElementById("first");

    // Har user ke liye card banao
    for (let user of data) {
      // Main wrapper div
      const element = document.createElement("div");
      element.classList.add("user"); // CSS class attach

      // Profile image
      const img = document.createElement("img");
      img.src = user.avatar_url; // user ki photo ka URL

      // Username heading
      const username = document.createElement("h2");
      username.textContent = user.login; // user ka username

      // Profile link
      const anchor = document.createElement("a");
      anchor.href = user.html_url;         // GitHub profile link
      anchor.textContent = "Visit Profile";
      anchor.target = "_blank";            // naye tab mein khulega

      // Sab ko element ke andar daalo
      element.append(img, username, anchor);

      // Element ko page par daalo
      parent.append(element);
    }

  } catch (error) {
    // Error display karo UI mein
    const parent = document.getElementById("first");
    parent.textContent = `Error: ${error.message}`;
  }
}

displayGitHubUsers();
*/


// ============================================================
// PART 9: INDIVIDUAL USER DETAILS — Nested API Call
// ============================================================

/*
  THEORY:
  - Pehle humne 30 users ki list fetch ki.
  - Ab agar kisi user par click karen → us user ki
    DETAILED INFORMATION fetch kar sakte hain.
  - GitHub ka individual user API:
      https://api.github.com/users/{username}
  - Yahan milega: name, followers, following, Twitter, bio etc.

  APPROACH:
  - user.url → us user ki individual API ka link hota hai.
  - Click event listen karo → us URL se data fetch karo.
  - Naya UI dono show karo.
*/

// Individual user detail fetch:
async function fetchUserDetail(userApiUrl) {
  try {
    const response = await fetch(userApiUrl); // e.g., user.url
    if (!response.ok) throw new Error("User not found");

    const userDetail = await response.json();

    console.log("Name:", userDetail.name);
    console.log("Followers:", userDetail.followers);
    console.log("Following:", userDetail.following);
    console.log("Bio:", userDetail.bio);
    // ...aur jo bhi dikhana ho

  } catch (error) {
    console.log("Error:", error.message);
  }
}

// fetchUserDetail("https://api.github.com/users/mojombo");


// ============================================================
// QUICK SUMMARY — Sab kuch ek jagah
// ============================================================

/*
  ┌──────────────────────────────────────────────────────────────┐
  │  CONCEPT          │  EXPLANATION                             │
  ├──────────────────────────────────────────────────────────────┤
  │  async function   │  Hamesha Promise return karta hai        │
  ├──────────────────────────────────────────────────────────────┤
  │  await            │  Promise resolve hone tak ruko           │
  ├──────────────────────────────────────────────────────────────┤
  │  await bahar      │  Poora program FREEZE — mat karo!        │
  ├──────────────────────────────────────────────────────────────┤
  │  await andar      │  Sirf async function freeze → baaki      │
  │  async function   │  code normal chalta rahe                 │
  ├──────────────────────────────────────────────────────────────┤
  │  try { }          │  Yahan async kaam karo                   │
  ├──────────────────────────────────────────────────────────────┤
  │  catch(err) { }   │  Koi bhi error → yahan aayega            │
  ├──────────────────────────────────────────────────────────────┤
  │  response.ok      │  Server ne valid data diya ya nahi?      │
  ├──────────────────────────────────────────────────────────────┤
  │  throw new Error  │  Manually error throw karo → catch       │
  ├──────────────────────────────────────────────────────────────┤
  │  Promise.all([])  │  Multiple Promises PARALLEL mein chalao  │
  ├──────────────────────────────────────────────────────────────┤
  │  Sequential await │  A + B + C ka time → SLOW                │
  ├──────────────────────────────────────────────────────────────┤
  │  Promise.all()    │  max(A, B, C) ka time → FAST             │
  └──────────────────────────────────────────────────────────────┘

  EVOLUTION:
  Callback Hell → Promise Chaining → async/await
  (worst)          (better)          (BEST — use this always)

  WHEN TO USE WHAT:
  → Sequential tasks (step 1 depends on step 2):
      → async/await with sequential awaits

  → Independent tasks (no dependency between them):
      → Promise.all() for parallel execution

  PRODUCTION RULE:
  → async/await + try/catch + response.ok check
  → Yahi sab jagah use hota hai — frontend aur backend dono mein.
*/
