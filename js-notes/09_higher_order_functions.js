// ==========================================
// 09_higher_order_functions.js
// Higher Order Functions, Map, Filter, Reduce Deep Dive
// ==========================================

// Concept: Higher Order Functions
// Tip: A function that takes a function as an argument, and/or returns a function

// - Passing and returning a function
function higherOrderFunction(func) {
    return function(...args) {
        console.log("Before calling the function");
        const result = func(...args);
        console.log("After calling the function");
        return result;
    };
}
function add(a, b) {
    return a + b;
}
const enhancedAdd = higherOrderFunction(add);
console.log(enhancedAdd(5, 10)); // "Before calling the function", 15, "After calling the function" 

// - Returning a function to double a value
function doubleValue(func) {
    return function(...args) {
        const result = func(...args);
        return result * 2;
    };
}
function getNumber() {
    return 5;
}
const doubledNumber = doubleValue(getNumber);
console.log(doubledNumber()); // 10

// Concept: forEach
const arr26 = [1, 2, 3, 4, 5];
arr26.forEach(function(element) {
    console.log(element); // 1, 2, 3, 4, 5
});

// Concept: Filter Deep Dive
const arr27 = [1, 2, 3, 4, 5];
const evenNumbers = arr27.filter(function(element) {
    return element % 2 === 0;
});
console.log(evenNumbers); // [2, 4]

// - Building a custom filter function
function customFilter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}

const arr28 = [1, 2, 3, 4, 5];
const oddNumbers = customFilter(arr28, function(element) {
    return element % 2 !== 0;
});
console.log(oddNumbers); // [1, 3, 5]

// Concept: Map Deep Dive
const arr29 = [1, 2, 3, 4, 5];
const squaredArr2 = arr29.map(function(element) {
    return element * element;
});
console.log(squaredArr2); // [1, 4, 9, 16, 25]

// Concept: Array iteration vs Objects
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 750 }
];

// - Filtering objects
const filteredProducts = products.filter(function(product) {
    return product.price > 600;
});
console.log(filteredProducts); // [{ name: "Laptop", price: 1000 }, { name: "Tablet", price: 750 }]

// - Sorting objects (custom compare)
const sortedProducts = products.sort(function(a, b) {
    return a.price - b.price;
});
console.log(sortedProducts); // [{ name: "Phone", price: 500 }, { name: "Tablet", price: 750 }, { name: "Laptop", price: 1000 }]

// - Transforming data with map
const transformedProducts = products.map(function(product) {
    return {
        productName: product.name,
        productPrice: product.price
    };
});
console.log(transformedProducts); // [{ productName: "Laptop", productPrice: 1000 }, { productName: "Phone", productPrice: 500 }, { productName: "Tablet", productPrice: 750 }]

// Concept: Reduce Deep Dive
// Tip: Reduces array to a single value using an accumulator
const arr30 = [1, 2, 3, 4, 5];
const suuum = arr30.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(suuum); // 15

// - Counting Occurrences with reduce
const names = ["Alice", "Bob", "Alice", "Charlie", "Bob"];
const nameCounts = names.reduce(function(accumulator, currentValue) {
    if (accumulator[currentValue]) {
        accumulator[currentValue]++;
    } else {
        accumulator[currentValue] = 1;
    }
    return accumulator;
}, {});
console.log(nameCounts); // { Alice: 2, Bob: 2, Charlie: 1 }

// - Calculating Totals with reduce
const items = [
    { name: "Book", price: 10 },
    { name: "Pen", price: 5 },
    { name: "Notebook", price: 15 }
];
const totalPrice = items.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue.price;
}, 0);
console.log(totalPrice); // 30
