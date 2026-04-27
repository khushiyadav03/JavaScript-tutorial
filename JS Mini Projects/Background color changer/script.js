// =====================================================================
// BACKGROUND COLOR CHANGER LOGIC
// =====================================================================

// STEP 1: Select the HTML elements we need to interact with.
const changeBtn = document.getElementById('changeBtn'); // The button
const colorName = document.getElementById('colorName'); // The text showing the hex code

// We create an array containing all possible hexadecimal characters.
// Hex values go from 0-9 and A-F.
const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

// STEP 2: Create a function that generates a random hex code.
function getRandomHexColor() {
    let hexColor = '#'; // Hex colors always start with a '#'
    
    // Hex colors have 6 characters after the #. So we run a loop 6 times.
    for (let i = 0; i < 6; i++) {
        // Generate a random number from 0 to 15 (because array length is 16)
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        
        // Add the random character from our array to the hexColor string
        hexColor += hexCharacters[randomIndex];
    }
    
    return hexColor; // Return the full color like '#A13F5B'
}

// STEP 3: Create an event listener for our button click
changeBtn.addEventListener('click', function() {
    // 3.1 Get a random color by calling our function
    const newColor = getRandomHexColor();
    
    // 3.2 Change the background color of the body tag
    document.body.style.backgroundColor = newColor;
    
    // 3.3 Update the text on the page so the user sees the new hex code
    colorName.textContent = newColor;
});
