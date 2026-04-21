const timeElement = document.getElementById("time");
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");

function updateClock() {
    const now = new Date();

    timeElement.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    dayElement.textContent = now.toLocaleDateString("en-IN", {
        weekday: "long"
    });

    dateElement.textContent = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

updateClock();
setInterval(updateClock, 1000);
