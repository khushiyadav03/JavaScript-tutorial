// ============================================================
// LECTURE NOTES: JavaScript Events
// Topics: Event basics, addEventListener, Event Bubbling,
// Capture Phase, event.target, removeEventListener
// ============================================================


// ============================================================
// PART 1: WHAT ARE EVENTS?
// ============================================================

/*
  THEORY:
  - Events aapke browser aur webpage ke beech interactions hain.
  - Jab bhi user kuch karta hai, wo ek "event" trigger karta hai.

  EXAMPLES OF EVENTS:
  - Mouse click          -> click event
  - Double click         -> dblclick event
  - Mouse hover          -> mouseenter event
  - Mouse leave          -> mouseleave event
  - Keyboard input       -> keydown / keyup event
  - Page scroll          -> scroll event

  IMPORTANT:
  - Events hamesha hote rehte hain browser mein, chahe aap sunno ya na suno.
  - Tumhari zimmedari hai: KON SA event sunna hai aur KIS ELEMENT pe sunna hai.
  - Jab event suno aur response do, use "event handling" kehte hain.

  THREE PHASES OF EVENT HANDLING:
  1. EVENT: Kuch hua (click, hover, scroll etc.)
  2. EVENT LISTENER: Specific element pe specific event ko "suno"
  3. EVENT ACTION: Jab event hua, kya karna hai (callback function)
*/


// ============================================================
// PART 2: THREE WAYS TO ATTACH EVENT LISTENERS
// ============================================================

/*
  WAY 1: Inline HTML attribute (NOT RECOMMENDED)
  -------------------------------------------------
  HTML mein:
  <h1 onclick="handleClick()">Hello</h1>

  JS mein:
  function handleClick() {
    document.getElementById("first").textContent = "Clicked!";
  }

  PROBLEM:
  - JavaScript code HTML file ke andar aa jaata hai.
  - Separation of concerns toot jaati hai.
  - JS ka kaam HTML mein nahi hona chahiye.

  WAY 2: element.onclick property (NOT RECOMMENDED)
  ---------------------------------------------------
  const element = document.getElementById("first");
  element.onclick = function() { element.textContent = "Strike is coming"; };
  element.onclick = function() { element.style.backgroundColor = "pink"; };
  // PROBLEM: Doosra assignment pehle wale ko OVERWRITE kar deta hai.
  // Ek property mein ek hi value ho sakti hai.
  // Result: Sirf doosra wala chalega, pehla cancel ho jaata hai.

  WAY 3: addEventListener (RECOMMENDED - BEST)
  ----------------------------------------------
  - Multiple event listeners ek hi element pe lag sakte hain.
  - Koi overwrite nahi hota.
  - Clean separation of HTML and JS.
  - Syntax: element.addEventListener(eventType, callbackFunction)
*/

// BEST WAY - addEventListener:
const element = document.getElementById("first");

// Pehla listener - text change
element.addEventListener("click", function () {
  element.textContent = "Strike is coming";
});

// Doosra listener - background color change
// DONO chalenge, overwrite nahi hoga
element.addEventListener("click", function () {
  element.style.backgroundColor = "brown";
});

// WHY NO OVERWRITE?
// addEventListener ek method call hai, property assignment nahi.
// Har baar naya listener add hota hai, replace nahi hota.
// Jaise:
//   const obj = {};
//   obj.greet = function() {...};  // pehla set
//   obj.greet = function() {...};  // overwrite - dusra chal
//   vs
//   obj.greet(10); // method call - koi overwrite nahi


// ============================================================
// PART 3: COMMON EVENT TYPES
// ============================================================

/*
  THEORY:
  - addEventListener mein pehla argument: event type (string)
  - Bahut saare event types available hain.
  - Inhe yaad karne ki zarurat nahi - MDN docs se dekh lo.

  COMMON MOUSE EVENTS:
  - "click"       : Single click
  - "dblclick"    : Double click
  - "mouseenter"  : Mouse element ke andar aaye
  - "mouseleave"  : Mouse element se bahar jaaye
  - "mousemove"   : Mouse element ke andar move kare

  COMMON KEYBOARD EVENTS:
  - "keydown"     : Key dabaye
  - "keyup"       : Key chhodein
  - "keypress"    : Key press (deprecated)

  COMMON FORM EVENTS:
  - "submit"      : Form submit ho
  - "change"      : Input value change ho
  - "input"       : Har keystroke pe fire ho
  - "focus"       : Element pe focus aaye
  - "blur"        : Element se focus hata
*/

// Click event example:
element.addEventListener("click", function () {
  element.textContent = "Strike is Coming";
});

// Double click example:
element.addEventListener("dblclick", function () {
  element.textContent = "Double clicked!";
});

// MouseEnter example (hover pe trigger):
element.addEventListener("mouseenter", function () {
  element.style.backgroundColor = "brown";
});

// MouseLeave example (mouse bahar jaaye tab):
element.addEventListener("mouseleave", function () {
  element.style.backgroundColor = "";
});


// ============================================================
// PART 4: LOOPING OVER CHILDREN - Multiple Listeners efficiently
// ============================================================

/*
  THEORY:
  - Agar parent ke andar 5 children hain, aur sabpe event listener lagana ho,
    toh manually 5 baar likhna mehnat hai aur bad practice.
  - Better approach: Parent select karo, children iterate karo.

  element.children:
  - Kisi bhi element ke saare direct children milte hain.
  - HTMLCollection return hoti hai (array-like, iterable with for...of).

  APPROACH:
  1. Parent element select karo.
  2. parent.children se saare children lo.
  3. for...of loop se har child pe addEventListener lagao.
*/

const parent = document.getElementById("parent");

// Saare children pe event listener lagana:
for (let child of parent.children) {
  child.addEventListener("click", function () {
    child.textContent = "I am Clicked";
  });
}

// PROBLEM with this approach:
// - 5 children = 5 event listeners attach hue.
// - 100 children = 100 event listeners.
// - Yeh memory efficient nahi hai.
// - Better solution: Event Bubbling + Event Delegation (Part 6 mein)


// ============================================================
// PART 5: EVENT BUBBLING AND CAPTURE PHASE
// ============================================================

/*
  THEORY - DOM TREE:
  - Jab page load hota hai, browser ek DOM tree banata hai.
  - Structure: window -> document -> html -> body -> div -> ...
  - Har element apne parent ke andar hota hai.
  - Jab aap kisi element pe click karte ho, browser teen phases mein kaam karta hai.

  THREE PHASES:
  1. CAPTURE PHASE (top to bottom):
     - Window se start ho ke target element tak neeche aata hai.
     - By default: capture phase listeners NAHI chalte.

  2. TARGET PHASE:
     - Jis element pe click kiya woh "target" hai.
     - Yahan pe event land hota hai.

  3. BUBBLING PHASE (bottom to top):
     - Target se wapas upar jaata hai (child -> parent -> grandparent -> window)
     - By default: event listeners BUBBLING PHASE mein chalte hain.

  WHY DOES BUBBLING HAPPEN?
  - Agar aapne child pe click kiya, aur parent pe event listener hai,
    toh parent ka listener bhi chalega - kyunki child parent ke ANDAR hai.
  - Common sense: Agar grandparent ke andar kuch click hua,
    toh grandparent ko bhi pata chalna chahiye.

  DEMO SETUP:
  HTML structure:
  <div id="grandparent">       <- 300x300 orange
    <div id="parent">          <- 200x200 red
      <div id="child">         <- 100x100 green
      </div>
    </div>
  </div>
*/

const grandparent = document.getElementById("grandparent");

// Teen elements pe event listener:
grandparent.addEventListener("click", function () {
  console.log("Grandparent is Clicked");
});

const parentEl = document.getElementById("parent");
parentEl.addEventListener("click", function () {
  console.log("Parent is Clicked");
});

const childEl = document.getElementById("child");
childEl.addEventListener("click", function () {
  console.log("Child is Clicked");
});

// WHEN CHILD IS CLICKED, OUTPUT IS:
// Child is Clicked      <- target phase
// Parent is Clicked     <- bubbling
// Grandparent is Clicked <- bubbling

// WHY? Because:
// - Child clicked -> child ka listener chala
// - Child parent ke andar hai -> parent ka listener bhi chala
// - Parent grandparent ke andar hai -> grandparent ka listener bhi chala


// ============================================================
// PART 6: THIRD ARGUMENT OF addEventListener - useCapture
// ============================================================

/*
  THEORY:
  - addEventListener ka THIRD argument: useCapture (boolean)
  - By default: false (bubbling phase mein listener chalta hai)
  - If true: capture phase mein listener chalta hai

  SYNTAX:
  element.addEventListener(eventType, callback, useCapture)
  element.addEventListener("click", function(){}, false) // DEFAULT - bubbling
  element.addEventListener("click", function(){}, true)  // capture phase

  DIFFERENCE:
  - false (default): Listener BUBBLING mein chalega.
    Order: child -> parent -> grandparent
  - true: Listener CAPTURE mein chalega.
    Order: grandparent -> parent -> child
    (kyunki capture top-to-bottom jaata hai)

  MIXING true and false:
  - Agar kuch listeners ka capture true hai aur kuch ka false:
    - Pehle capture phase walk hoga (top to bottom)
    - Jo bhi element ka capture=true hai, woh tab chalega
    - Phir bubbling hoga (bottom to top)
    - Jo bhi element ka capture=false hai, woh tab chalega

  REAL WORLD USE:
  - Capture phase ko aap bahut kam use karte ho.
  - By default false hi rehne do.
  - Kabhi-kabhi specific order chahiye tab true use ho sakta hai.
*/

// Default behavior (false) - bubbling:
grandparent.addEventListener("click", function () {
  console.log("Grandparent - Bubble");
}, false); // same as not writing it

// Capture phase - true:
grandparent.addEventListener("click", function () {
  console.log("Grandparent - Capture");
}, true);

// WITH ALL THREE SET TO TRUE:
// Click on child -> Output order:
// Grandparent (capture first, top-down)
// Parent (capture)
// Child (capture / target)
// Then bubbling starts bottom-up but capture=true means skip in bubble
// (simplified: order reverses when all are true)


// ============================================================
// PART 7: EVENT OBJECT - "e" parameter
// ============================================================

/*
  THEORY:
  - Jab event trigger hota hai, browser automatically ek EVENT OBJECT
    banata hai aur callback function ko pass karta hai.
  - Is object mein event ke baare mein poori information hoti hai.
  - Aap koi bhi naam de sakte ho: e, event, evt - convention hai "e".

  WHAT'S INSIDE EVENT OBJECT:
  - e.type         : Event ka type (e.g. "click", "mouseenter")
  - e.target       : Wo exact element jisne event trigger kiya
  - e.clientX      : Mouse ka X coordinate (screen pe)
  - e.clientY      : Mouse ka Y coordinate (screen pe)
  - e.key          : Keyboard ka key name (keydown event mein)
  - e.preventDefault() : Default browser behavior rok do (form submit etc.)
  - e.stopPropagation(): Bubbling rok do

  KEY DIFFERENCE:
  - e.target    : Wo element jispe actually click hua (innermost)
  - e.currentTarget : Wo element jispe listener attached hai

  Example:
  Agar grandparent pe listener hai aur child pe click hua:
  - e.target = child element
  - e.currentTarget = grandparent element
*/

element.addEventListener("click", function (e) {
  console.log(e);           // Full event object
  console.log(e.type);      // "click"
  console.log(e.target);    // Exactly which element was clicked
  console.log(e.clientX);   // X coordinate
  console.log(e.clientY);   // Y coordinate
});


// ============================================================
// PART 8: e.stopPropagation() - Bubbling rokna
// ============================================================

/*
  THEORY:
  - By default, event bubble hota hai child se parent ki taraf.
  - Agar aap bubbling rokna chahte ho, use karo: e.stopPropagation()
  - Jis element pe ye likha, uske aage bubble nahi karega.

  USE CASE:
  - Agar child pe click kiya aur sirf child ka listener chalna chahiye,
    parent ka nahi, toh child ke callback mein stopPropagation() likho.

  NOTE:
  - stopPropagation() sirf propagation rokta hai.
  - Wo element khud ka listener zaroor chalega.
  - Sirf parent/grandparent tak jaana rok deta hai.
*/

childEl.addEventListener("click", function (e) {
  e.stopPropagation(); // Ab event bubble nahi karega parent ko
  console.log("Child clicked - bubble stopped here");
});

// Ab grandparent aur parent ke listeners nahi chalenge
// Sirf child ka chala


// ============================================================
// PART 9: EVENT DELEGATION - Sabse efficient approach
// ============================================================

/*
  THEORY:
  - Event Delegation ka concept: Parent pe ek hi event listener lagao,
    aur e.target se pata karo ki kis child pe event hua.
  - Bubbling ki wajah se ye possible hai.
  - Koi bhi child click hoga, event bubble hokar parent tak aayega.
  - Parent apne listener mein e.target se check kar sakta hai
    ki internally kis child pe click hua tha.

  BENEFITS:
  1. Memory efficient: Sirf EK event listener, 100 children ke liye bhi.
  2. Dynamic elements: Baad mein add hone wale elements ke liye bhi kaam karta hai.
     (Kyunki listener parent pe hai, child pe nahi.)
  3. Less code.

  e.target:
  - Wo exact element jispe click hua.
  - Agar grandparent pe listener hai aur child pe click hua,
    toh e.target = child element.
  - e.target.textContent -> us child ka text
  - e.target.id          -> us child ki id
  - e.target.classList   -> us child ki classes

  COMPARISON:
  - WITHOUT delegation: 5 children = 5 listeners (memory waste)
  - WITH delegation:    5 children = 1 listener on parent (efficient)
*/

// WITHOUT event delegation (less efficient):
for (let child of parent.children) {
  child.addEventListener("click", function () {
    child.textContent = "I am Clicked";
  });
}

// WITH event delegation (BETTER):
const parentContainer = document.getElementById("parent");

parentContainer.addEventListener("click", function (e) {
  // e.target = jo bhi child click hua
  console.log(e.target); // Exactly which child was clicked

  // Us specific child ka text change karo:
  e.target.textContent = "I am Clicked";
});

// REAL POWER: e.target se aap specific children ko filter bhi kar sakte ho:
parentContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("child")) {
    // Sirf "child" class wale elements pe action lo
    e.target.textContent = "I am Clicked";
  }
});


// ============================================================
// PART 10: removeEventListener - Event listener hatana
// ============================================================

/*
  THEORY:
  - Kabhi kabhi event listener lagane ke baad use hatana bhi padta hai.
  - Use case: Ek baar click ke baad dobara click na ho sake.
  - Syntax: element.removeEventListener(eventType, callbackReference)

  IMPORTANT RULE:
  - removeEventListener mein SAME callback reference pass karni padti hai.
  - Agar aapne anonymous function diya addEventListener mein,
    toh removeEventListener se REMOVE NAHI HOGA.
  - Kyunki do alag anonymous functions alag objects hote hain -
    unki memory alag hoti hai, JS unhe SAME nahi maanta.

  WRONG WAY (does NOT work):
  element.addEventListener("click", function() { ... });
  element.removeEventListener("click", function() { ... });
  // Dono alag functions hain - same nahi - remove fail

  CORRECT WAY:
  function handleClick() { ... }
  element.addEventListener("click", handleClick);    // same reference
  element.removeEventListener("click", handleClick); // same reference - works!
*/

// WRONG - Does not work:
parentContainer.addEventListener("click", function (e) {
  e.target.textContent = "Clicked";
});
parentContainer.removeEventListener("click", function (e) {
  e.target.textContent = "Clicked";
});
// Ye remove nahi karega - dono alag anonymous functions hain

// CORRECT - Named function reference use karo:
function handleClick(e) {
  e.target.textContent = "I am Clicked";

  // Agar sirf ek baar click handle karna ho:
  parentContainer.removeEventListener("click", handleClick);
  // Ab dobara click karo toh kuch nahi hoga
}

parentContainer.addEventListener("click", handleClick);
// Pehli baar click hoga -> handleClick chalega -> fir listener remove ho jaayega


// ============================================================
// PART 11: COMPLETE FLOW SUMMARY
// ============================================================

/*
  WHEN USER CLICKS AN ELEMENT, BROWSER DOES THIS:

  Step 1 - CAPTURE PHASE (top to bottom):
  - window -> document -> html -> body -> ... -> target element
  - Agar kisi element ka useCapture = true hai, uska listener chalega.

  Step 2 - TARGET PHASE:
  - Target element pe event fire hota hai.

  Step 3 - BUBBLING PHASE (bottom to top):
  - target -> parent -> grandparent -> body -> html -> document -> window
  - Agar kisi element ka useCapture = false (default), uska listener chalega.
  - Agar beech mein kisi ka e.stopPropagation() hai, bubble wahan ruk jaata hai.

  SUMMARY TABLE:
  -------------------------------------------------------------------
  Situation                            | Behavior
  -------------------------------------------------------------------
  addEventListener with no 3rd arg     | Bubble phase (default)
  addEventListener("click", fn, false) | Bubble phase (explicit)
  addEventListener("click", fn, true)  | Capture phase
  e.stopPropagation()                  | Stop bubbling at this element
  e.target                             | Innermost clicked element
  e.currentTarget                      | Element with listener attached
  removeEventListener(type, fn)        | Remove listener (same fn ref needed)
  -------------------------------------------------------------------

  THREE WAYS TO ADD EVENTS (best to worst):
  1. addEventListener()          -> Recommended always
  2. element.onclick = function  -> Overwrites, use only for single listeners
  3. Inline HTML onclick=""      -> Never use in production
*/


// ============================================================
// PART 12: PRACTICAL COMPLETE EXAMPLE - Event Delegation
// ============================================================

/*
  SCENARIO:
  - Parent div ke andar 5 colored children divs hain.
  - Kisi bhi child pe click karo toh us child ka text "I am Clicked" ho jaaye.
  - Sirf parent pe ek event listener use karo.
*/

// HTML (reference):
// <div id="parent">
//   <div id="child1" class="child">First</div>
//   <div id="child2" class="child">Second</div>
//   <div id="child3" class="child">Third</div>
//   <div id="child4" class="child">Fourth</div>
//   <div id="child5" class="child">Fifth</div>
// </div>

const parentDiv = document.getElementById("parent");

parentDiv.addEventListener("click", function (e) {
  // e.target = jo child click hua
  // Sirf "child" class wale pe action lo
  if (e.target !== parentDiv) {
    // Direct parent click ko ignore karo
    e.target.textContent = "I am Clicked";
  }
});

// RESULT:
// - Child1 click -> "I am Clicked" shows on child1
// - Child3 click -> "I am Clicked" shows on child3
// - Sirf ek listener, saare children handle ho gaye


// ============================================================
// END OF LECTURE NOTES - JavaScript Events
// ============================================================