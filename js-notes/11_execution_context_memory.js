// ==========================================
// 11_execution_context_memory.js
// Execution Context, Memory, Stack vs Heap
// ==========================================

// Concept: Execution Context
// - What it is: The abstract environment where JavaScript code runs
// - Global Execution Context: The default context created on startup
// - Function Execution Context: Created whenever a function is called
// - Eval Execution Context: Created when code is executed using eval()

// Concept: Two Phases of Execution
// - Memory Allocation Phase:
//   - Engine scans code to identify variable and function declarations
//   - Memory is assigned, placing undefined for variables and definition for functions
// - Execution Phase:
//   - Code is executed line by line
//   - Engine evaluates expressions, assigns variables, and handles function calls

// Concept: Call Stack and Heap Memory
// - Stack: Uses LIFO (Last-In-First-Out). Stores function calls and primitive local variables. Has a fixed size.
// - Heap: A region for dynamic memory allocation. Used for storing objects, arrays, and functions. Can grow dynamically.

// Concept: Primitives vs Objects (Memory)
// - Primitive types (numbers, strings, booleans, null, undefined) are stored directly in the Stack
// - Objects (and arrays/functions) are stored in the Heap, while a reference to the Object is stored in the Stack
// Warning: Copying an object copies the reference in the Stack, not the actual object in the Heap

// Concept: Garbage Collection
// - Automatically frees up memory when objects are no longer in use
// - The engine uses algorithms (like Mark-and-Sweep) to find objects that are no longer reachable and removes them
// - Crucial for preventing memory leaks

// Concept: Behind the Scenes execution
// - The JS code gets parsed and converted to internal representation
// - Executes single-threaded code block using event loop for async behavior
