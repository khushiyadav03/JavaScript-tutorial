// ============================================================
// JAVASCRIPT LECTURE NOTES - DOM (Document Object Model)
// ============================================================
// Is lecture mein yeh topics cover kiye gaye hain:
//   1. DOM ki zaroorat kyun padi
//   2. HTML element ko Object mein convert karna
//   3. Window - Global Object
//   4. Document Object
//   5. DOM Tree structure
//   6. Element select karne ke 5 tarike
//   7. innerHTML vs innerText vs textContent
//   8. HTML Collection aur Node List
//   9. HTML Collection ko Array mein convert karna
// ============================================================




// ============================================================
// SECTION 1: DOM KI ZAROORAT KYUN PADI
// ============================================================

// Theory:
// Jab hum sirf HTML se website banate hain, woh STATIC hoti hai.
// Us pe koi bhi manipulation nahi kar sakte -- na text change kar sakte, na delete, na add.
//
// JavaScript ek cheez bahut achhi se karta hai: OBJECTS ko manipulate karna.
// Hum object ki kisi bhi property ko badal sakte hain, delete kar sakte hain.
//
// Problem:
//   HTML element kuch aisa dikhta hai:
//   <h1 id="first" style="background-color: orange; color: brown;">Strike is coming</h1>
//
//   JavaScript seedha is "element" ke saath interact NAHI kar sakti.
//   JavaScript sirf strings, numbers, arrays, objects ke saath kaam kar sakti hai.
//
// Solution (First Principles Thinking):
//   Agar hum is HTML element ki saari information ko ek OBJECT mein convert kar dein,
//   toh JavaScript us object ko manipulate kar sakti hai.
//   Aur jab bhi hum us object mein kuch change karein, woh SEEDHA UI mein dikh jaata hai.
//
// Yahi hai DOM ka main idea:
//   HTML document ---> Object mein convert karo ---> JavaScript se manipulate karo.




// ============================================================
// SECTION 2: HTML ELEMENT KO OBJECT MEIN CONVERT KARNA - MANUAL EXAMPLE
// ============================================================

// Theory:
// Agar hume yeh HTML element manually object mein convert karna ho:
//
//   <h1 id="first" style="background-color: orange; color: brown;">Strike is coming</h1>
//
// Toh kuch aisa dikhega:

const manualObject = {
    tagName: "H1",
    id: "first",
    style: {
        backgroundColor: "orange",
        color: "brown"
    },
    textContent: "Strike is coming"
};

// Ab kyunki yeh ek object hai, hum isko manipulate kar sakte hain:
manualObject.textContent = "Hello Coder Army"; // text change kiya
manualObject.style.backgroundColor = "pink";   // background change kiya

// Yahi kaam DOM karta hai -- browser automatically HTML ko aise objects mein convert karta hai.
// Hume manually yeh conversion nahi karni padti.




// ============================================================
// SECTION 3: WINDOW - GLOBAL OBJECT
// ============================================================

// Theory:
// WINDOW ek global object hai jo BROWSER create karta hai.
// Hum developer khud window create nahi karte -- browser karta hai.
//
// Jab bhi koi JavaScript file browser mein chalti hai,
// browser ek "window" object create karke aapki JS file ke saath attach kar deta hai.
// Chahe aapki JS file completely empty ho -- window tab bhi present hogi.
//
// Window ke andar bahut saari properties aur methods hain, jaise:
//   -- window.document    (puri HTML file ka representation)
//   -- window.alert()     (browser mein popup)
//   -- window.console.log() (console mein print karna)
//   -- window.open()      (nayi tab/window kholna)
//
// IMPORTANT: window prefix lagana compulsory nahi hai.
//   window.console.log("hello") === console.log("hello")  -- dono same hain
//   window.alert("hello") === alert("hello")               -- dono same hain
//
// JavaScript automatically samajh jaata hai ki window. prefix add karna hai.
//
// console.log() JavaScript ka part nahi hai -- yeh window object se aata hai.
// Isliye humne pehle ke lecture mein kaha tha ki console.log JS ka native part nahi.

// Browser console mein yeh try kar sakte ho (yahan sirf theory hai):
// window.alert("Hello");          // popup aayega
// window.open();                  // nayi tab khuleg
// window.console.log("Hello");    // console mein print hoga




// ============================================================
// SECTION 4: DOCUMENT OBJECT
// ============================================================

// Theory:
// DOCUMENT window object ke andar ek property hai.
//   window.document === document  -- dono same object ko refer karte hain
//
// Document ke andar kya hai?
//   Aapki POORI HTML file -- objects ki form mein stored hai.
//
// Document ek object hai jiske andar:
//   -- Poora HTML code stored hai (object form mein)
//   -- Bahut saare METHODS bhi attached hain
//     jisse hum HTML elements ko easily dhundh sakte hain
//     (getElementByID, querySelector, etc.)
//
// Proof karna:
//   console.dir(document) -- aapko object format mein dikhayega
//   Uske andar documentElement property mein HTML file hogi.
//   Aur prototype ke andar getElementByID jaisi methods milenge.




// ============================================================
// SECTION 5: DOM TREE STRUCTURE
// ============================================================

// Theory:
// Poori HTML file ko ek TREE structure mein store kiya jaata hai.
// Har element ek "node" hai.
// Parent element ke baad "children" aate hain.
//
// Structure kuch aisa hai:
//
//   window (Global Object -- browser ne banaya)
//   |
//   +-- document (window ki property)
//       |
//       +-- <html> (document ka documentElement)
//           |
//           +-- <head>
//           |   |
//           |   +-- <meta>
//           |   +-- <title>
//           |
//           +-- <body>
//               |
//               +-- <h1 id="first"> --> textNode: "Strike is coming"
//               |
//               +-- <h2 id="second"> --> textNode: "It is coming on Dhanteras"
//
// Yeh tree structure hi "DOM Tree" hai.
// Har cheez object ke form mein stored hai.
// Children ko array ki form mein store kiya jaata hai (kyunki multiple ho sakte hain).
//
// Yeh sab browser automatically banata hai -- hume nahi banana padta.
// Hum sirf methods use karte hain elements dhundne ke liye.




// ============================================================
// SECTION 6: ELEMENT SELECT KARNA - METHOD 1 - getElementByID
// ============================================================

// Theory:
// document.getElementById(idName)
//   -- Aap HTML mein jis element ko id="first" dete ho,
//      us id ke basis pe usse select kar sakte ho.
//   -- Yeh ek SINGLE object return karta hai (kyunki id unique hoti hai).
//   -- Return hone wala object bahut bada hota hai -- bahut saari properties hoti hain.
//   -- typeof ka result: "object"
//
// Syntax:
//   const element = document.getElementById("idName");
//
// Pehle:
//   window.document.getElementById("first")
// Ab (window prefix optional hai):
//   document.getElementById("first")

// HTML mein maan lo yeh element hai:
// <h1 id="first" style="background-color: orange; color: brown;">Strike is coming</h1>

// Browser console mein ya JS file mein (HTML linked hone ke baad):
// const temp = document.getElementById("first");
// console.log(temp);        // H1 element dikhayega
// console.dir(temp);        // Object format mein dikhayega
// console.log(typeof temp); // "object"




// ============================================================
// SECTION 7: ELEMENT KO SELECT KARKE MANIPULATE KARNA
// ============================================================

// Theory:
// Jab element select ho jaata hai toh woh ek object ki form mein milta hai.
// Us object ki properties change karke hum HTML ko manipulate karte hain.
// Yeh change UI mein SEEDHA dikh jaata hai.
//
// Common manipulations:
//   temp.textContent = "Hello Coder Army";        -- text change karo
//   temp.style.backgroundColor = "pink";          -- background color change karo
//   temp.style.color = "blue";                    -- text color change karo
//   temp.id = "newId";                            -- id change karo
//
// Yeh kaise kaam karta hai?
//   Jab hum temp.textContent change karte hain,
//   woh object ki property update hoti hai.
//   Browser tab us object ko dekhta hai aur UI ko update kar deta hai.
//   Dono ek doosre se connected hain.

// Example (HTML linked hone ke baad browser mein chalega):
// const temp = document.getElementById("first");
// temp.textContent = "Hello Coder Army";   // "Strike is coming" --> "Hello Coder Army"
// temp.style.backgroundColor = "pink";    // orange --> pink




// ============================================================
// SECTION 8: innerHTML vs innerText vs textContent
// ============================================================

// Theory:
// Teen properties hain jo element ka content deti hain -- lekin teeno alag-alag hain.
//
// Maan lo HTML aisa hai:
//   <h1 id="first">
//     Strike is coming on
//     <span style="display: none;">18th October</span>
//   </h1>
//
// PROPERTY 1: innerHTML
//   -- Element ke ANDAR ka POORA HTML content return karta hai.
//   -- Span tags, styles, newlines -- sab kuch include hoga.
//   -- Example output: "\n    Strike is coming on\n    <span style="display: none;">18th October</span>\n  "
//   -- Isme HTML tags bhi dikhte hain.
//
// PROPERTY 2: innerText
//   -- Sirf woh content jo UI MEIN DISPLAY HO RAHA HAI -- wohi return karta hai.
//   -- Jo hidden hai (display: none) woh nahi aayega.
//   -- Example output: "Strike is coming on"
//   -- (18th October hidden tha toh nahi aaya)
//
// PROPERTY 3: textContent
//   -- Element ke andar ka POORA TEXT content return karta hai.
//   -- HTML tags ko ignore karta hai lekin hidden text bhi include karta hai.
//   -- Example output: "\n    Strike is coming on\n    18th October\n  "
//   -- (18th October display:none tha fir bhi aaya -- kyunki textContent UI nahi dekhta)
//
// Summary:
//   innerHTML    = HTML tags ke saath poora content
//   innerText    = Sirf jo screen pe dikh raha hai
//   textContent  = Poora text (tags ignore, hidden text include)

// Example (browser mein):
// const temp = document.getElementById("first");
// console.log(temp.innerHTML);    // poora HTML with tags
// console.log(temp.innerText);    // sirf visible text
// console.log(temp.textContent);  // poora text, tags ignore




// ============================================================
// SECTION 9: ELEMENT SELECT KARNA - METHOD 2 - getElementsByTagName
// ============================================================

// Theory:
// document.getElementsByTagName(tagName)
//   -- Ek particular tag (jaise "li", "p", "h2") ke basis pe elements select karta hai.
//   -- Ek hi tag multiple jagah use ho sakta hai -- isliye MULTIPLE elements return ho sakte hain.
//   -- Isliye yeh ek ARRAY-LIKE collection return karta hai (HTMLCollection).
//   -- HTMLCollection mein index se elements access kar sakte hain.
//   -- length property hoti hai -- for loop laga sakte hain.
//   -- for-of loop laga sakte hain.
//   -- LEKIN forEach, map, filter NAHI laga sakte -- exact array nahi hai.
//
// Note: getElement (singular) vs getElements (plural) -- naam se hi pata chalta hai
//   getElementByID --> singular (id unique hoti hai, ek hi element milega)
//   getElementsByTagName --> plural (tag multiple jagah ho sakta hai, list milegi)

// Example (browser mein):
// const list = document.getElementsByTagName("li");
// console.log(list);      // HTMLCollection [li, li, li]
// console.log(list[0]);   // pehla li element
// console.log(list.length); // 3

// for-of loop se iterate karna:
// for (let item of list) {
//     console.log(item); // har li element aayega
// }




// ============================================================
// SECTION 10: HTMLCOLLECTION KO ARRAY MEIN CONVERT KARNA
// ============================================================

// Theory:
// HTMLCollection exact array nahi hai -- isliye forEach, map, filter nahi chalta.
// Agar inhe use karna ho toh spread operator se real array mein convert karo.
//
// Spread operator (...) -- humne pehle padha tha -- array ko "tod" ke elements bahar nikalta hai.
// Yahan hum HTMLCollection ko tod ke ek nayi real array mein daal rahe hain.

// Example (browser mein):
// const list = document.getElementsByTagName("li");
// const realArray = [...list];    // spread operator se array mein convert kiya
// console.log(realArray);         // ab yeh proper array hai
// realArray.forEach(item => console.log(item)); // ab forEach chalega




// ============================================================
// SECTION 11: ELEMENT SELECT KARNA - METHOD 3 - getElementsByClassName
// ============================================================

// Theory:
// document.getElementsByClassName(className)
//   -- HTML elements pe class="" attribute hota hai.
//   -- Ek hi class multiple elements pe ho sakti hai.
//   -- Isliye yeh bhi HTMLCollection return karta hai (array-like).
//   -- Index se access kar sakte hain.
//
// Note: class name ke aage dot (.) nahi lagaate -- sirf class ka naam dete hain.

// HTML mein maan lo:
// <h2 class="third">...</h2>
// <ul class="third">...</ul>

// Example (browser mein):
// const classBased = document.getElementsByClassName("third");
// console.log(classBased);    // HTMLCollection [h2.third, ul.third]
// console.log(classBased[0]); // pehla element




// ============================================================
// SECTION 12: ELEMENT SELECT KARNA - METHOD 4 - querySelector
// ============================================================

// Theory:
// document.querySelector(cssSelector)
//   -- CSS selector syntax use karta hai -- bilkul waise jaise CSS file mein likhte hain.
//   -- Tag: "h1", "li", "p"
//   -- ID: "#first" (hash ke saath)
//   -- Class: ".third" (dot ke saath)
//   -- Sirf PEHLA matching element return karta hai (singular).
//   -- Return hone wala ek single object hai.
//
// Agar multiple same-type elements hain aur pehla chahiye -- querySelector use karo.

// Example (browser mein):
// document.querySelector("h1");        // pehla h1 tag wala element
// document.querySelector("#first");    // id="first" wala element
// document.querySelector(".third");    // class="third" wala pehla element




// ============================================================
// SECTION 13: ELEMENT SELECT KARNA - METHOD 5 - querySelectorAll
// ============================================================

// Theory:
// document.querySelectorAll(cssSelector)
//   -- querySelector jaisa hi -- CSS selector syntax use karta hai.
//   -- Lekin SARE matching elements return karta hai (not just the first one).
//   -- NodeList return karta hai (HTMLCollection nahi).
//   -- NodeList bhi array-like hai -- index se access kar sakte hain.
//   -- for-of laga sakte hain, forEach bhi laga sakte hain (HTMLCollection se zyada powerful).
//   -- Lekin map, filter direct nahi chalte -- array mein convert karna padega.
//
// HTMLCollection vs NodeList:
//   HTMLCollection -- getElementsByTagName, getElementsByClassName se milta hai
//     -- forEach, map, filter NAHI chalta
//   NodeList       -- querySelectorAll se milta hai
//     -- forEach CHALTA HAI, lekin map, filter NAHI chalta
//   Dono ko spread operator se real array mein convert kar sakte hain.

// Example (browser mein):
// const listA = document.querySelectorAll("h2");  // sab h2 elements
// console.log(listA);     // NodeList [h2, h2]
// console.log(listA[0]);  // pehla h2

// NodeList ko real array mein convert karna:
// const arr = [...listA];
// console.log(arr);   // ab proper array hai, map/filter bhi chalega




// ============================================================
// SECTION 14: ELEMENT KI PROPERTY CHANGE KARNA - MANIPULATION
// ============================================================

// Theory:
// Jab bhi koi element select ho jaata hai (getElementByID ya koi bhi method se),
// us object ki properties directly change karke HTML manipulate kar sakte hain.
// Yeh change seedha browser ke UI mein reflect hota hai.
//
// Common properties:
//   element.textContent = "new text"          -- text content change karo
//   element.innerHTML = "<b>bold text</b>"    -- HTML content change karo
//   element.style.backgroundColor = "pink"    -- background color change karo
//   element.style.color = "blue"              -- text color change karo
//   element.id = "newId"                      -- id change karo
//   element.className = "newClass"            -- class change karo

// Example (browser mein):
// const temp = document.getElementById("first");
// temp.textContent = "Hello Coder Army";     // text change hua
// temp.style.backgroundColor = "pink";       // background change hua
// temp.id = "rohan";                         // id change hui
// console.log(temp.id);                      // "rohan"




// ============================================================
// SECTION 15: 5 SELECTION METHODS KA COMPARISON - QUICK REFERENCE
// ============================================================

// Theory:
//
// METHOD 1: document.getElementById("idName")
//   -- ID ke basis pe select karo
//   -- Return: Single object (id unique hoti hai)
//   -- Jab use karo: Ek specific element chahiye ho
//
// METHOD 2: document.getElementsByTagName("tagName")
//   -- Tag ke basis pe select karo (li, h1, p, etc.)
//   -- Return: HTMLCollection (array-like, forEach/map nahi chalta)
//   -- Jab use karo: Ek hi tag type ke sab elements chahiye ho
//
// METHOD 3: document.getElementsByClassName("className")
//   -- Class ke basis pe select karo
//   -- Return: HTMLCollection (array-like, forEach/map nahi chalta)
//   -- Jab use karo: Ek hi class ke sab elements chahiye ho
//
// METHOD 4: document.querySelector("cssSelector")
//   -- CSS selector syntax (tag, #id, .class)
//   -- Return: Single object (sirf pehla matching element)
//   -- Jab use karo: Specific CSS selector se ek element chahiye ho
//
// METHOD 5: document.querySelectorAll("cssSelector")
//   -- CSS selector syntax (tag, #id, .class)
//   -- Return: NodeList (array-like, forEach chalta hai, map nahi)
//   -- Jab use karo: CSS selector se sab matching elements chahiye ho
//
// CONVERSION TIP:
//   HTMLCollection aur NodeList dono ko real Array mein convert karne ka tarika:
//   const realArr = [...htmlCollectionOrNodeList];
//   Ab map, filter, reduce sab chalega.




// ============================================================
// SECTION 16: DOM KI FULL PICTURE - EKDUM SIMPLE SUMMARY
// ============================================================

// Theory:
// QUESTION: DOM kya hai?
//
// SIMPLE ANSWER:
// Humare paas JavaScript hai jo objects manipulate kar sakti hai.
// Humare paas HTML file hai jo JavaScript seedha manipulate NAHI kar sakti.
//
// SOLUTION (DOM):
// HTML file ko OBJECT mein convert kar do.
// Ek baar object ban gaya, JavaScript us pe kuch bhi kar sakti hai.
// Aur yeh changes seedha UI mein dikh jaate hain.
//
// YEH CONVERSION KAUN KARTA HAI?
// Browser -- window object ke through.
// Window ke andar document hota hai.
// Document ke andar poori HTML file object form mein hoti hai.
// Browser yeh sab automatically karta hai -- hume nahi karna padta.
//
// HUM KYA KARTE HAIN?
// Sirf selection methods use karte hain (getElementByID, querySelector, etc.)
// Aur fir us object ki properties change karte hain.
//
// ISLIYE:
// Koi bhi cheez samajh na aaye -- "object" socho.
// Window -- object
// Document -- object
// HTML element -- object
// Har cheez object hai. Ek baar yeh mindset set ho gaya, DOM simple ho jaata hai.

// Homework (lecture mein diya gaya):
// HTMLCollection aur NodeList mein exact difference kya hai?
// Research karo aur dono ki properties compare karo.