// =====================================================================
// RANDOM QUOTE GENERATOR LOGIC
// =====================================================================

// STEP 1: Select the elements we need to change in our HTML
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// STEP 2: Create an array of Quote Objects
// An array [] holds multiple objects {}. Each object holds a single quote and its author.
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
];

// STEP 3: Create a function to pick and display a random quote
function getNewQuote() {
    // Generate a random number from 0 to the length of our array (7)
    // Math.random() gives a decimal between 0 and 1.
    // Multiplying by quotes.length gives a decimal up to 6.99...
    // Math.floor() rounds it down to a whole number (0, 1, 2, 3, 4, 5, or 6).
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Pick the quote object from the array using the random number
    const selectedQuote = quotes[randomIndex];
    
    // Update the text content of our HTML elements with the new quote data
    quoteText.textContent = selectedQuote.text;
    quoteAuthor.textContent = "- " + selectedQuote.author;
}

// STEP 4: Add an Event Listener so that the button triggers the getNewQuote function
newQuoteBtn.addEventListener('click', function() {
    // 4.1 Fade out effect to make the transition look smooth
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    // 4.2 Wait for the fade out to finish (400 milliseconds), then swap text and fade in
    setTimeout(() => {
        getNewQuote();
        // Fade the text back in
        quoteText.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
    }, 400); // 400ms delay matches our CSS transition time
});
