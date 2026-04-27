// =====================================================================
// TO-DO LIST LOGIC
// This file contains the Javascript code to make the To-Do List interactive!
// =====================================================================

// STEP 1: Select the HTML elements we need to interact with.
// We use 'document.getElementById' to find elements by their 'id' attribute in the HTML.
const taskInput = document.getElementById('taskInput'); // The text box where users type
const addBtn = document.getElementById('addBtn');       // The 'Add' button
const taskList = document.getElementById('taskList');   // The <ul> list where tasks are shown

// STEP 2: Create a function that adds a new task.
// This function will run whenever the user tries to add a task.
function addTask() {
    // 2.1 Get the text typed by the user.
    // '.trim()' removes any extra spaces at the beginning and end of the text.
    const taskText = taskInput.value.trim();

    // 2.2 Validate the input. Make sure the user didn't just hit add on an empty box.
    if (taskText === '') {
        alert('Please enter a valid task!');
        return; // 'return' stops the function early so an empty task isn't added.
    }

    // STEP 3: Create new HTML elements for the new task inside Javascript.
    
    // Create an <li> (list item) element to hold the task.
    const li = document.createElement('li');
    li.classList.add('task-item'); // Add our CSS class so it looks nice.

    // Create a <span> element to hold the actual text of the task.
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText; // Put the user's text inside the span.

    // Create a <button> element that will act as the delete button.
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'; // The text on the button.
    deleteBtn.classList.add('delete-btn'); // Add our CSS class for the delete button.

    // STEP 4: Assemble the pieces!
    // Bring the span (text) and button (delete) inside our list item (li).
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    // Add the completed list item (li) to the main list (<ul>) on the page.
    taskList.appendChild(li);

    // STEP 5: Clean up.
    // Empty the input box so the user can easily type their next task.
    taskInput.value = '';

    // STEP 6: Add Event Listeners for interactivity inside the new task.

    // 6.1 Mark as Completed using a 'click' listener on the text span.
    taskSpan.addEventListener('click', function() {
        // 'classList.toggle' adds the 'completed' class if it's missing, 
        // or removes it if it's already there. 
        // This gives it the strikethrough effect because of our CSS!
        li.classList.toggle('completed');
    });

    // 6.2 Delete the task using a 'click' listener on the delete button.
    deleteBtn.addEventListener('click', function() {
        // 'removeChild' deletes the entire list item (li) from the page.
        taskList.removeChild(li);
    });
}

// STEP 7: Connect the 'addTask' function to the user's actions!

// 7.1 Listen for a click on the 'Add' button.
addBtn.addEventListener('click', addTask);

// 7.2 Listen for the 'Enter' key being pressed inside the text box.
taskInput.addEventListener('keydown', function(event) {
    // If the key the user pressed was 'Enter', then add the task!
    if (event.key === 'Enter') {
        addTask();
    }
});
