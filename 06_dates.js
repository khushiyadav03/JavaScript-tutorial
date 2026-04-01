// ===== TOPIC: Dates =====

// Date object
const currentDate = new Date();
console.log(currentDate);
const specificDate = new Date("2022-01-01");
console.log(specificDate);
console.log(currentDate.getFullYear());
console.log(currentDate.getMonth() + 1);
console.log(currentDate.getDate());
console.log(currentDate.getHours());
console.log(currentDate.getMinutes());
console.log(currentDate.getSeconds());

// UTC time
const utcDate = new Date(Date.UTC(2022, 0, 1));
console.log(utcDate);

// Date formatting
const options = { year: 'numeric', month: 'long', day: 'numeric' };
console.log(currentDate.toLocaleDateString('en-US', options)); // "January 1, 2022"

// new Date() creates Date object from the OS clock

// Date formating with ISO and locale strings
console.log(currentDate.toISOString());
console.log(currentDate.toLocaleString());

// Extracting date components
console.log(currentDate.getFullYear());
console.log(currentDate.getMonth() + 1);
console.log(currentDate.getDate());
console.log(currentDate.getHours());
console.log(currentDate.getMinutes());
console.log(currentDate.getSeconds());

// Creating custom date
const customDate = new Date(2022, 0, 1);
console.log(customDate); // January 1, 2022

// Date arithmetic
const date1 = new Date(2022, 0, 1);
const date2 = new Date(2022, 0, 10);
const timeDifference = date2.getTime() - date1.getTime();
const dayDifference = timeDifference / (1000 * 3600 * 24);
console.log(dayDifference); // 9

// Date manipulation
const date3 = new Date(2022, 0, 1);
date3.setDate(date3.getDate() + 7);
console.log(date3); // January 8, 2022

const date4 = new Date(2022, 0, 1);
date4.setMonth(date4.getMonth() + 1);
console.log(date4); // February 1, 2022

// Date comparison
const date5 = new Date(2022, 0, 1);
const date6 = new Date(2022, 0, 10);
console.log(date5 < date6); // true
console.log(date5 > date6); // false
console.log(date5.getTime() === date6.getTime()); // false

// Moment.js/date-fns libraries help with advanced date formatting

// Epoch time
const epochTime = Date.now();
console.log(epochTime); // Milliseconds elapsed since Jan 1, 1970 UTC

// Epoch time is standard time format in computers

// UTC gives uniform timezone; Epoch helps calculate time easily

// Converting epoch time to date
const dateFromEpoch = new Date(epochTime);
console.log(dateFromEpoch); // Date from epoch
