// ==========================================
// 10_DOM_and_events.js
// DOM & Events
// ==========================================

// DOM kya hai?
// DOM = HTML page ka tree structure jise JS control kar sakta hai
// Matlab: JS se hum webpage ka content, style, aur behavior change kar sakte hain


// ================= 1. ELEMENT SELECT KARNA =================

// id se
const heading = document.getElementById("first");

// class se
const items = document.getElementsByClassName("myClass");

// CSS selector (best method)
const firstPara = document.querySelector("h2");

// multiple elements
const allListItems = document.querySelectorAll("li");


// ================= 2. CONTENT CHANGE =================

// HTML ke saath
heading.innerHTML = "<i>Changed Heading</i>";

// sirf text (visible)
heading.innerText = "New Text";

// pura text (hidden + visible)
heading.textContent = "Full Text";


// ================= 3. STYLE CHANGE =================

heading.style.color = "blue";
heading.style.fontSize = "30px";


// ================= 4. EVENTS =================

// click event
heading.addEventListener("click", function() {
    console.log("Heading clicked");
});


// ================= 5. NEW ELEMENT CREATE =================

const newDiv = document.createElement("div");
newDiv.textContent = "Main naya element hoon";

// add to body
document.body.appendChild(newDiv);


// ================= 6. REMOVE ELEMENT =================

// heading.remove();


// ================= 7. CLASS HANDLE =================

heading.classList.add("active");
heading.classList.remove("active");
heading.classList.toggle("active");


// ================= 8. ATTRIBUTES =================

heading.setAttribute("title", "This is heading");
console.log(heading.getAttribute("title"));


// ================= FINAL DIFFERENCE =================

// innerHTML → HTML ke saath content
// innerText → sirf visible text
// textContent → pura text (hidden + visible)

// querySelector → pehla match
// querySelectorAll → sab match
// getElementById → id se
// getElementsByClassName → class se
// addEventListener → event handle karna
// createElement → naya element banana
// appendChild → element ko add karna
// remove → element ko remove karna
// classList → class handle karna
// setAttribute/getAttribute → attributes handle karna
// style → inline style change karna
