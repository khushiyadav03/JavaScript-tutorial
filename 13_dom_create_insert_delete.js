// ============================================================
//         JAVASCRIPT SERIES - LECTURE 13
//         Topic: DOM Manipulation - Create, Insert, Delete,
//                Edit Elements, Best Practices, Security
// ============================================================

// ============================================================
// PART 1: JAVASCRIPT KO HTML FILE SE KAISE CONNECT KAREIN?
// ============================================================

/*
  THEORY:
  JavaScript code ko HTML file ke saath connect karne ke do tarike hain:

  TARIKA 1: HTML file ke andar hi likhna (inline)
    <script>
        console.log("Hello");
    </script>
  Problem: HTML code aur JS code ek hi file mein hoga - messy lagta hai.

  TARIKA 2: Alag JS file banao, usse link karo (BEST PRACTICE)
    HTML mein: <script src="./first.js"></script>
    JS file mein apna code likho.

  BEST PRACTICE:
  - Hamesha alag .js file banao
  - Script tag ko <body> ke END mein rakho
  - Kyun end mein? Kyunki pehle HTML load hona chahiye,
    tab JS usse manipulate kar sake
  - Error nahi aayega agar aur jagah bhi likho (browser forgiving hai)
    lekin best practice end mein hai

  File structure example:
    index.html  -> HTML structure
    first.js    -> JavaScript code
    style.css   -> CSS styling
*/


// ============================================================
// PART 2: DOM KYA HOTA HAI?
// ============================================================

/*
  THEORY:
  DOM = Document Object Model

  Jab browser HTML file ko padhta hai, wo ek TREE structure banata hai.
  Is tree mein har HTML element ek NODE hota hai.
  Is tree ko hi DOM kehte hain.

  Example:
    <html>
      <body>
        <h1 id="first">Hello Coder Army</h1>
        <ul>
          <li>Item 1</li>
        </ul>
      </body>
    </html>

  DOM tree:
    document
      |-- html
            |-- body
                  |-- h1 (id="first")
                  |-- ul
                        |-- li

  JavaScript DOM ko manipulate kar sakta hai:
  - Naye elements create karna
  - Elements ko delete karna
  - Elements ki content, style, class change karna
  - Elements ko move karna

  document object = poore HTML page ka representation JavaScript mein
  Har element ek OBJECT hai jiske andar properties aur methods hote hain.
*/


// ============================================================
// PART 3: NAYA ELEMENT BANANE KA TARIKA (createElement)
// ============================================================

/*
  THEORY:
  JavaScript se naya HTML element banane ke liye:
    document.createElement("tagName")

  Yeh method ek naya element OBJECT return karta hai.
  Is object mein HTML element ki saari properties hoti hain.

  Important: Element sirf CREATE hota hai, page pe DIKHTA NAHI.
  Dikhane ke liye usse DOM mein attach karna padta hai.

  Syntax:
    const newElement = document.createElement("h2");
*/

// Example code (browser mein chalega):
/*
  const newElement = document.createElement("h2");
  console.log(newElement); // <h2></h2> dikhega - empty element
*/


// ============================================================
// PART 4: ELEMENT KE ANDAR CONTENT DALNA (textContent)
// ============================================================

/*
  THEORY:
  Element create hone ke baad uske andar text dalne ke liye:
    element.textContent = "koi bhi text";

  textContent sirf TEXT store karta hai.
  Koi HTML tags execute nahi hote - sab kuch plain text ke roop mein dikhaata hai.
  (Yeh security ke liye better hai - aage detail mein padhenge)

  Syntax:
    newElement.textContent = "Strike is Coming";
*/

// Example code (browser mein chalega):
/*
  const newElement = document.createElement("h2");
  newElement.textContent = "Strike is Coming";
  // Ab element h2 ban gaya with text inside
*/


// ============================================================
// PART 5: ELEMENT KO ID ASSIGN KARNA
// ============================================================

/*
  THEORY:
  JavaScript se kisi element ko id dena:
    element.id = "koi-naam";

  Har cheez element ke object ki property hai.
  Element ek object hai, id uski ek property hai.
  Properties ko dot notation se access karte hain.
*/

// Example code (browser mein chalega):
/*
  const newElement = document.createElement("h2");
  newElement.textContent = "Strike is Coming";
  newElement.id = "second";
  console.log(newElement); // <h2 id="second">Strike is Coming</h2>
*/


// ============================================================
// PART 6: ELEMENT KO CLASS ASSIGN KARNA - SAHI TARIKA
// ============================================================

/*
  THEORY:
  CLASS ASSIGN KARNE KE DO TARIKE HAIN:

  GALAT TARIKA (className):
    element.className = "diwali";
    element.className = "holi"; // yeh pehli class ko OVERWRITE kar deta hai

  Problem: Agar do baar className set karo to pehli class chali jaati hai.
  Workaround (theek par confusing):
    element.className += " holi"; // space zaroor do warna classes chipak jaayengi

  SAHI TARIKA (classList) - BEST PRACTICE:
    element.classList.add("diwali");   // class add karo
    element.classList.add("holi");     // ek aur class add karo (pehli nahi jaayegi)
    element.classList.remove("diwali"); // class remove karo

  Kyun className kam use karte hain:
  - Ek baar class set karo to purani class overwrite hoti hai
  - Multiple classes ke liye confusing hai
  - Mistakes hone ki zyada sambhavna

  Kyun classList better hai:
  - Multiple classes aasaani se add kar sako
  - Ek class bina doosri hataye remove kar sako
  - Cleaner aur readable code

  KYUN className NAHI aur classList KYUN:
  JavaScript mein "class" ek RESERVED KEYWORD hai.
  Classes banane ke liye use hota hai (OOP concept).
  Isliye property ka naam "class" nahi ho sakta - conflict hoga.
  Isliye "className" aur "classList" names use kiye jaate hain.

  Reserved keywords ke examples: let, const, var, if, class, function, etc.
  Kisi variable ya property ka naam reserved keyword nahi diya ja sakta.
*/

// Example code (browser mein chalega):
/*
  const el = document.createElement("h3");

  // Sahi tarika:
  el.classList.add("diwali");
  el.classList.add("holi");
  // Ab element ki 2 classes hain: diwali aur holi

  el.classList.remove("diwali");
  // Ab sirf holi class bachi
*/


// ============================================================
// PART 7: ELEMENT KI STYLING JAVASCRIPT SE KARNA
// ============================================================

/*
  THEORY:
  JavaScript se inline CSS style dene ke liye:
    element.style.propertyName = "value";

  Note: CSS properties jo hyphenated hoti hain (background-color)
  woh JavaScript mein camelCase mein likhti hain (backgroundColor).

  Examples:
    element.style.backgroundColor = "pink";
    element.style.fontSize = "20px";   // value string format mein
    element.style.color = "brown";
    element.style.fontWeight = "bold";

  Sab kuch ek object ki properties hain.
  element ke andar style object hota hai,
  style object ke andar CSS properties hoti hain.
*/

// Example code (browser mein chalega):
/*
  const newEl = document.createElement("h3");
  newEl.textContent = "Diwali aa rahi hai";
  newEl.style.backgroundColor = "pink";
  newEl.style.fontSize = "30px";
  newEl.style.color = "brown";
*/


// ============================================================
// PART 8: ELEMENT KO ATTRIBUTE SET KARNA (setAttribute)
// ============================================================

/*
  THEORY:
  Kisi element ko custom attribute dene ke liye:
    element.setAttribute("attributeName", "value");

  Attribute kya hota hai?
  HTML mein jo key-value pairs hote hain jaise id, class, style, name - yeh attributes hain.
  Aap khud bhi custom attributes bana sakte ho.

  getAttribute se attribute ki value padh sakte ho:
    element.getAttribute("attributeName"); // value return karta hai
*/

// Example code (browser mein chalega):
/*
  const el = document.createElement("div");
  el.setAttribute("hello", "ji");
  // Ab element mein ek attribute hai: hello="ji"

  console.log(el.getAttribute("id"));    // id ki value
  console.log(el.getAttribute("class")); // class ki value
  console.log(el.getAttribute("hello")); // "ji"
*/


// ============================================================
// PART 9: ELEMENT KO SELECT KARNA (getElementById)
// ============================================================

/*
  THEORY:
  Naya element create karne ke baad usse DOM mein dalene ke liye
  pehle kisi existing element ko select karna padta hai.

  TARIKE:
    document.getElementById("id-naam")  -> ek element select karo by id
    document.querySelector(".class")    -> CSS selector se select karo
    document.querySelectorAll("p")      -> sab matching elements ka NodeList

  getElementById return karta hai:
  - Element object agar element mila
  - null agar nahi mila

  Yeh element bhi ek object hai jiske andar puri DOM tree ka reference hota hai.
*/

// Example code (browser mein chalega):
/*
  // HTML mein: <h1 id="first">Hello Coder Army</h1>
  const element = document.getElementById("first");
  console.log(element); // <h1 id="first">Hello Coder Army</h1>
*/


// ============================================================
// PART 10: ELEMENT KO INSERT KARNA - AFTER AUR BEFORE
// ============================================================

/*
  THEORY:
  Ek existing element ke SAATH SAATH (bahar) naya element dalne ke liye:

  element.after(newElement)  -> element ke BAAD naya element dalo
  element.before(newElement) -> element se PEHLE naya element dalo

  Flow:
  1. Naya element create karo (createElement)
  2. Content dalo (textContent)
  3. Existing element select karo (getElementById)
  4. After ya before se insert karo

  Example:
    h1 ke baad h2 insert karna:
      const h1 = document.getElementById("first");
      h1.after(newH2Element);
    
    h1 se pehle insert karna:
      h1.before(newH2Element);
*/

// Example code (browser mein chalega):
/*
  // HTML: <h1 id="first">Hello Coder Army</h1>
  
  // Step 1: Naya element create karo
  const newElement = document.createElement("h2");
  newElement.textContent = "Strike is Coming";
  newElement.id = "second";

  // Step 2: Existing element select karo
  const h1Element = document.getElementById("first");

  // Step 3: Insert karo
  h1Element.after(newElement);  // h1 ke baad aayega
  // ya:
  // h1Element.before(newElement); // h1 se pehle aayega
*/


// ============================================================
// PART 11: ELEMENT KE ANDAR DALNA - APPEND AUR PREPEND
// ============================================================

/*
  THEORY:
  Kisi element ke ANDAR (as child) naya element dalne ke liye:

  parentElement.append(newElement)   -> LAST child ke roop mein add karo
  parentElement.prepend(newElement)  -> FIRST child ke roop mein add karo

  Yeh tab use hota hai jab element ke andar dalna ho.
  Jaise ul ke andar li add karna.

  Difference:
    after/before  -> sibling ke roop mein (bahar, saath mein)
    append/prepend -> child ke roop mein (andar)

  append ki khaasiyat:
  - Multiple elements ek saath append kar sakte ho:
    parent.append(el1, el2, el3);
  - Yeh modern method hai, multiple arguments leta hai

  CHILDREN concept:
  Jab koi element kisi ke andar hota hai to woh us element ka CHILD hota hai.
  Parent ke children ek HTML Collection (list) ke roop mein hote hain.
  element.children -> sabhi child elements
*/

// Example code (browser mein chalega):
/*
  // HTML: <ul id="listing"></ul>
  const ulElement = document.getElementById("listing");

  // Ek naya li element create karo
  const listItem = document.createElement("li");
  listItem.textContent = "Milk";

  // ul ke andar add karo (last mein)
  ulElement.append(listItem);

  // Ek aur banao
  const listItem2 = document.createElement("li");
  listItem2.textContent = "Cake";
  ulElement.append(listItem2);
  // Result: Milk, Cake (Milk pehle kyunki pehle append hua)

  // Pehle add karna:
  const listItem3 = document.createElement("li");
  listItem3.textContent = "Halwa";
  ulElement.prepend(listItem3);
  // Result: Halwa, Milk, Cake (Halwa pehle aaya)

  // Multiple ek saath:
  ulElement.append(listItem, listItem2, listItem3);
*/


// ============================================================
// PART 12: CHILDREN AUR CHILDNODES - DIFFERENCE
// ============================================================

/*
  THEORY:
  Kisi element ke children access karne ke DO tarike hain:

  element.children -> HTML Collection (sirf actual elements)
  element.childNodes -> NodeList (elements + text nodes + whitespace bhi)

  DIFFERENCE:
  HTML likhte waqt agar elements alag alag lines mein hote hain:
    <ul>
      <li>January</li>
      <li>February</li>
    </ul>
  
  children: sirf li elements dikhata hai (4 agar 4 li hain)
  childNodes: li elements + TEXT NODES (newlines, spaces) bhi dikhata hai
              Isliye count zyada aata hai (9 ya zyada)

  Kyun aisa hota hai:
  Jab aap Enter dabakar naya line pe jaate ho,
  woh newline character bhi text node ke roop mein store hota hai.
  childNodes yeh text nodes bhi dikhata hai.
  children sirf actual HTML elements dikhata hai.

  BEST PRACTICE:
  children use karo - sirf actual elements milte hain, confusing nahi hota.
  childNodes purana tarika hai - unnecessary text nodes bhi aate hain.
*/

// Example code (browser mein chalega):
/*
  const ul = document.getElementById("listing");
  
  console.log(ul.children);    // HTML Collection - sirf li elements
  console.log(ul.childNodes);  // NodeList - li + text nodes (newlines)

  // Pehle child ko access karna:
  console.log(ul.children[0]);   // pehla li element
  console.log(ul.children[1]);   // doosra li element
*/


// ============================================================
// PART 13: SPECIFIC POSITION PE INSERT KARNA (CHILDREN KE BEECH)
// ============================================================

/*
  THEORY:
  Agar mujhe kisi specific child ke baad element dalna ho
  (na pehle, na aakhir mein - beech mein):

  TARIKA:
  1. Parent element select karo
  2. Parent ke children access karo
  3. Jis child ke baad dalna hai us child ko index se select karo
  4. Us child par .after() lagao

  Example: Milk ke baad Paneer dalna ho (Milk index 0 pe hai):
    parentElement.children[0].after(newListItem);

  children ek list jaisi cheez hai, index se koi bhi child access kar sakte ho.
*/

// Example code (browser mein chalega):
/*
  const ulEl = document.getElementById("listing");

  const paneerItem = document.createElement("li");
  paneerItem.textContent = "Paneer";

  // Milk (index 0) ke baad Paneer dalo
  ulEl.children[0].after(paneerItem);
  // Result: Milk, Paneer, (baaki elements)
*/


// ============================================================
// PART 14: REAL WORLD PATTERN - ARRAY SE DOM MEIN DATA DALNA
// ============================================================

/*
  THEORY:
  Real world mein backend se data ARRAY ke format mein aata hai.
  Us data ko UI mein display karna hota hai.
  Iske liye loop + DOM manipulation use karte hain.

  SIMPLE TARIKA (Theek hai lekin OPTIMAL NAHI):
*/

// Example code (browser mein chalega):
/*
  const foodArray = ["Milk", "Halwa", "Paneer", "Tofu", "Tea"];
  const ulElement = document.getElementById("listing");

  for (const food of foodArray) {
      const listItem = document.createElement("li");
      listItem.textContent = food;
      ulElement.append(listItem); // Har baar UI update hota hai - SLOW
  }
*/

/*
  YEH KYUN BURA HAI:
  - Har append() ke saath browser UI ko recalculate karta hai
  - Layout calculation hoti hai (element kahan dikhega?)
  - Painting hoti hai (screen pe draw karna)
  - 1000 elements hote to 1000 baar yeh heavy process
  - Aapka page slow ho jaata hai
*/


// ============================================================
// PART 15: DOCUMENT FRAGMENT - BEST PRACTICE FOR PERFORMANCE
// ============================================================

/*
  THEORY:
  DOCUMENT FRAGMENT ek virtual container hai.
  Yeh ACTUAL DOM mein nahi hota - memory mein hota hai.
  Sare elements pehle fragment mein daalo, phir ek baar DOM mein dalo.

  Faayda:
  - Fragment ke andar add karne se UI update NAHI hota
  - Jab sab taiyar ho jaaye, ek baar mein sab UI mein jaata hai
  - Sirf 1 bar layout calculation aur painting
  - Bahut FAST hota hai

  Syntax:
    const fragment = document.createDocumentFragment();
    // elements banao aur fragment mein daalo
    fragment.append(listItem);
    // jab sab ready ho:
    parentElement.append(fragment);

  BINA FRAGMENT: N elements = N baar UI update
  FRAGMENT KE SAATH: N elements = sirf 1 baar UI update
*/

// Example code (browser mein chalega):
/*
  const foodArray = ["Milk", "Halwa", "Paneer", "Tofu", "Tea"];
  const ulElement = document.getElementById("listing");

  // Fragment create karo
  const fragment = document.createDocumentFragment();

  for (const food of foodArray) {
      const listItem = document.createElement("li");
      listItem.textContent = food;
      fragment.append(listItem); // Fragment mein add - UI disturb nahi
  }

  // Ek baar mein sab UI mein dalo
  ulElement.append(fragment); // Sirf 1 baar UI update
*/

/*
  OPTIMIZATION COMPARISON:
  1000 items, bina fragment:
    - 1000 baar layout calculation
    - 1000 baar painting
    - Page slow
  
  1000 items, fragment ke saath:
    - 1 baar layout calculation
    - 1 baar painting
    - Page fast
*/


// ============================================================
// PART 16: ELEMENT KO DELETE KARNA (remove)
// ============================================================

/*
  THEORY:
  Kisi element ko page se hatane ke liye:
    element.remove();

  Pehle element select karo, phir remove() call karo.
  Element DOM se hat jaata hai aur screen pe nahi dikhta.

  Syntax:
    const el = document.getElementById("first");
    el.remove();
*/

// Example code (browser mein chalega):
/*
  // HTML: <h1 id="first">Hello Coder Army</h1>
  const h1ToDelete = document.getElementById("first");
  h1ToDelete.remove();
  // h1 ab page pe nahi dikhega
*/


// ============================================================
// PART 17: PURANA TARIKA - insertAdjacentElement
// ============================================================

/*
  THEORY:
  Yeh purana (older) tarika hai element insert karne ka.
  Modern tarik hain: after(), before(), append(), prepend()
  Lekin code mein kabhi kabhi purana tarika dikhega - isliye jaanna chahiye.

  Syntax:
    element.insertAdjacentElement(position, newElement);

  Positions:
    "afterbegin"  -> element ke andar, FIRST child se pehle (prepend jaisa)
    "beforeend"   -> element ke andar, LAST child ke baad (append jaisa)
    "beforebegin" -> element se pehle, BAHAR (before jaisa)
    "afterend"    -> element ke baad, BAHAR (after jaisa)

  Confusion kyun aata hai:
  - Position names yaad rakhne padte hain
  - Modern tarike zyada readable hain

  RECOMMENDATION: Modern tarike use karo (after, before, append, prepend).
  Purane tarike tab jaano jab purana code padhna ho.
*/

// Example code (browser mein chalega):
/*
  const ulEl = document.getElementById("listing");
  const newItem = document.createElement("li");
  newItem.textContent = "Help";

  // Purana tarika:
  ulEl.insertAdjacentElement("afterbegin", newItem);
  // Modern tarika (better):
  ulEl.prepend(newItem);
  // Dono same kaam karte hain

  // Aur positions:
  // "beforeend"   = append
  // "beforebegin" = before
  // "afterend"    = after
*/


// ============================================================
// PART 18: innerHTML vs textContent - SECURITY KI BAAT
// ============================================================

/*
  THEORY:
  Element mein content dalne ke DO tarike hain:
    element.textContent = "content";  -> sirf text store karta hai
    element.innerHTML = "content";    -> HTML tags bhi execute karta hai

  DIFFERENCE:
  textContent: Jo bhi likho woh TEXT ke roop mein dikhta hai.
               Koi bhi HTML tag EXECUTE nahi hota - as it is text dikhta hai.
               SAFE hai.

  innerHTML: Jo bhi likho woh HTML ke roop mein interpret hota hai.
             Agar koi HTML tag likha to wo EXECUTE ho jaata hai.
             DANGEROUS hai agar user ka data daal rahe ho.

  Example:
    let content = "<h2>Hello</h2>";

    el.textContent = content;
    // Screen pe dikhega: <h2>Hello</h2> (as plain text)

    el.innerHTML = content;
    // Screen pe dikhega: Hello (as heading - h2 execute hua)

  SECURITY PROBLEM - XSS (Cross Site Scripting):
  Maan lo Instagram pe koi user yeh comment karta hai:
    <img src="http://hacker-server.com/steal.jpg">
  
  Agar aap is comment ko innerHTML se display karoge:
  - Browser us image ko load karne jaayega hacker ke server pe
  - Hacker server request aane pe cookies ya tokens maang sakta hai
  - Aapka token hacker ke paas aa jaata hai
  - Hacker aapka account access kar leta hai
  - ACCOUNT HACK

  Agar aap same comment ko textContent se display karoge:
  - Browser sirf text dikhayega: <img src="http://hacker-server.com/steal.jpg">
  - Koi request nahi jaayegi
  - Koi danger nahi
  - SAFE

  RULE:
  User ka data (comments, user input) -> HAMESHA textContent use karo
  Apna khud ka content (creator ka) -> innerHTML use kar sakte ho
*/

// Example code (browser mein chalega):
/*
  const div = document.createElement("div");

  // SAFE tarika:
  const userComment = "<img src='hacker-site.com/steal.jpg'>";
  div.textContent = userComment;
  // Sirf text dikhega, image load nahi hogi

  // UNSAFE tarika (mat karo agar user ka data hai):
  div.innerHTML = userComment;
  // Image load hogi hacker ke server se - DANGEROUS
*/


// ============================================================
// PART 19: COMPLETE FLOW - REAL WORLD EXAMPLE
// ============================================================

/*
  THEORY:
  Ek poora example jo sab cheezein cover karta hai:
  Backend se data aaya (array mein), usse list mein display karo.
*/

// Example code (browser mein chalega):
/*
  // Backend se aaya data (array):
  const comments = [
      "Bahut achha lecture tha!",
      "Mujhe yeh samajh aa gaya.",
      "Please aur topics cover karo.",
      "Great content!",
      "Thank you for explaining."
  ];

  // Step 1: Parent element select karo
  const commentsList = document.getElementById("comments-list");

  // Step 2: Fragment create karo (best practice)
  const fragment = document.createDocumentFragment();

  // Step 3: Loop chalao, har comment ke liye element banao
  for (const comment of comments) {
      const li = document.createElement("li");
      li.textContent = comment;  // textContent use karo - SAFE
      // li.innerHTML = comment; // KABHI MAT KARO agar user ka data hai
      li.classList.add("comment-item");  // class add karo
      li.style.marginBottom = "10px";    // styling
      fragment.append(li);               // fragment mein daalo
  }

  // Step 4: Ek baar mein DOM mein daalo (optimal)
  commentsList.append(fragment);
*/


// ============================================================
// SUMMARY OF LECTURE 05
// ============================================================

/*
  1. JS HTML SE CONNECT KARNA:
     <script src="./file.js"></script>
     Body ke end mein rakho - best practice.

  2. DOM (Document Object Model):
     HTML ka tree structure, har element ek object hai.
     JavaScript se manipulate kar sakte ho.

  3. ELEMENT CREATE KARNA:
     document.createElement("tagName") -> naya element object return karta hai

  4. CONTENT DALNA:
     element.textContent = "text"  -> text content (SAFE)
     element.innerHTML = "html"    -> HTML execute karta hai (CAREFUL)

  5. ID, CLASS, STYLE:
     element.id = "naam"
     element.classList.add("className")   -> class add
     element.classList.remove("className") -> class remove
     element.style.backgroundColor = "red" -> CSS style

  6. ATTRIBUTE:
     element.setAttribute("name", "value")
     element.getAttribute("name")

  7. ELEMENT SELECT KARNA:
     document.getElementById("id")
     document.querySelector(".class")

  8. INSERT KARNA:
     element.after(newEl)   -> baad mein, same level pe
     element.before(newEl)  -> pehle, same level pe
     parent.append(child)   -> andar, last mein
     parent.prepend(child)  -> andar, first mein

  9. CHILDREN ACCESS KARNA:
     element.children    -> sirf elements (use karo)
     element.childNodes  -> elements + text nodes (confusing)

  10. DELETE KARNA:
      element.remove() -> element DOM se hat jaata hai

  11. DOCUMENT FRAGMENT (BEST PRACTICE):
      const frag = document.createDocumentFragment();
      // loop mein elements fragment mein daalo
      parent.append(frag); // ek baar mein sab
      - Kyun: UI sirf 1 baar update hoti hai instead of N baar
      - Performance bahut better hoti hai

  12. SECURITY - innerHTML vs textContent:
      User data -> HAMESHA textContent
      innerHTML -> sirf apna trusted content
      Warna: XSS attack ho sakta hai -> account hack

  13. PURANA TARIKA (jaanne ke liye):
      insertAdjacentElement(position, element)
      Positions: "afterbegin", "beforeend", "beforebegin", "afterend"
      Modern methods better hain.

  CLASS KEYWORD RESERVED KYU:
  JavaScript mein "class" keyword reserved hai (OOP ke liye).
  Isliye DOM property "className" aur "classList" use karti hai.
*/