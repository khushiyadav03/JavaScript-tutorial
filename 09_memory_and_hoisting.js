// ===== TOPIC: Memory and Hoisting =====

// JS runs line-by-line using a single thread and event loop

// Execution context manages currently running code, variables and scope

// Memory phase: Engine scans code, allocates memory and auto-assigns undefined

// Execution phase: Code runs logic assigning values line-by-line

// Function execution context manages its own inner variables and scope

// Global execution context stores global variables and runs code outside functions

// Stack tracks function calls; Heap stores dynamic objects and functions

// Stack holds primitives; Heap holds object references 

// Engine allocates memory dynamically 

// JS auto-frees unused memory using mark-and-sweep algorithm

// var appears as undefined before initialization due to hoisting

// Hoisting with var: Hoisted and initialized with undefined
// Hoisting with let/const: Hoisted but not initialized (throws ReferenceError)

// Temporal Dead Zone (TDZ): Timespan where let/const cannot be accessed

// Function expressions behave like variables (cannot run before definition)

// Function declarations hoist entire function logic
