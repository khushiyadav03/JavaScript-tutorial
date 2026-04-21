const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const result = document.getElementById("result");

const olympicTime = new Date(2028, 6, 14).getTime();

function formatUnit(value) {
    return String(value).padStart(2, "0");
}

function updateCountdown() {
    const currentTime = Date.now();
    let timer = olympicTime - currentTime;

    if (timer <= 0) {
        daysElement.textContent = "000";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        result.textContent = "The countdown is complete. The event day has arrived.";
        return;
    }

    const day = Math.floor(timer / (1000 * 60 * 60 * 24));
    timer %= 1000 * 60 * 60 * 24;
    const hour = Math.floor(timer / (1000 * 60 * 60));
    timer %= 1000 * 60 * 60;
    const minute = Math.floor(timer / (1000 * 60));
    timer %= 1000 * 60;
    const second = Math.floor(timer / 1000);

    daysElement.textContent = String(day).padStart(3, "0");
    hoursElement.textContent = formatUnit(hour);
    minutesElement.textContent = formatUnit(minute);
    secondsElement.textContent = formatUnit(second);
    result.textContent = `${day} days, ${hour} hours, ${minute} minutes, and ${second} seconds left until the event begins.`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
