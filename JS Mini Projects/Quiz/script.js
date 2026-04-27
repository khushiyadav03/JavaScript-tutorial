// =====================================================================
// QUIZ GAME LOGIC
// =====================================================================

// STEP 1: Define our quiz questions in an Array of Objects.
// Each object holds the question, options, and the correct answer id.
const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    }
];

// STEP 2: Select all the HTML elements we need to interact with
const quizContainer = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer'); // Grabs all radio inputs in a NodeList
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

// STEP 3: Setup variables to keep track of the current question and score
let currentQuiz = 0; // Starts at the first question in the array (index 0)
let score = 0;

// STEP 4: Initialize the very first quiz question
loadQuiz();

// This function loads a new question onto the screen
function loadQuiz() {
    // 4.1 First, untick any previously selected radio buttons
    deselectAnswers();

    // 4.2 Get the current question object from the array using our current index
    const currentQuizData = quizData[currentQuiz];

    // 4.3 Replace the text in the HTML elements to show the new question and options
    questionEl.textContent = currentQuizData.question;
    a_text.textContent = currentQuizData.a;
    b_text.textContent = currentQuizData.b;
    c_text.textContent = currentQuizData.c;
    d_text.textContent = currentQuizData.d;
}

// Helper function to uncheck all radio buttons before loading a new question
function deselectAnswers() {
    // Array.forEach loops through all items in our NodeList of radio inputs
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

// Helper function to figure out which radio button the user checked
function getSelected() {
    let answer = undefined;
    
    // Loop over each radio button to see if its "checked" property is true
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id; // Get the id (a, b, c, or d)
        }
    });

    return answer; // Returns the ID of the selected radio button, or undefined if none are selected
}

// STEP 5: What happens when the user clicks 'Submit Answer'?
submitBtn.addEventListener('click', () => {
    // 5.1 Determine which option was selected by calling our helper function
    const answer = getSelected();

    // 5.2 Validate that the user actually picked an option (answer is not undefined)
    if(answer) {
        // Check if the answer matches the correct answer in our quizData array
        if(answer === quizData[currentQuiz].correct) {
            score++; // Increase score by 1
        }

        // 5.3 Move exactly 1 question forward
        currentQuiz++;

        // 5.4 Check if there are more questions left
        if(currentQuiz < quizData.length) {
            // If yes, load the next question
            loadQuiz();
        } else {
            // 5.5 If no more questions, replace the entire inner HTML with the final score and a reload button
            quizContainer.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h2>You answered ${score}/${quizData.length} questions correctly!</h2>
                    <br>
                    <button onclick="location.reload()" style="border-radius: 8px;">Reload / Play Again</button>
                </div>
            `;
        }
    } else {
        // Alert if the user tries to submit without choosing anything
        alert("Please select an answer!");
    }
});
