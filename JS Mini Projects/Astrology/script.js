const zodiacSigns = [
    { name: "Aries", startDate: "03-21", endDate: "04-19" },
    { name: "Taurus", startDate: "04-20", endDate: "05-20" },
    { name: "Gemini", startDate: "05-21", endDate: "06-20" },
    { name: "Cancer", startDate: "06-21", endDate: "07-22" },
    { name: "Leo", startDate: "07-23", endDate: "08-22" },
    { name: "Virgo", startDate: "08-23", endDate: "09-22" },
    { name: "Libra", startDate: "09-23", endDate: "10-22" },
    { name: "Scorpio", startDate: "10-23", endDate: "11-21" },
    { name: "Sagittarius", startDate: "11-22", endDate: "12-21" },
    { name: "Capricorn", startDate: "12-22", endDate: "01-19" },
    { name: "Aquarius", startDate: "01-20", endDate: "02-18" },
    { name: "Pisces", startDate: "02-19", endDate: "03-20" }
];

const victimCardCompliments = {
    Aries: "You act tough, but deep down you just want someone to understand your chaos.",
    Taurus: "You carry so much silently and still show up like nothing happened.",
    Gemini: "You pretend it does not hurt, but your mind replays everything at 2AM.",
    Cancer: "You give so much love, yet somehow feel the most unseen.",
    Leo: "You shine for everyone, but rarely feel appreciated the same way.",
    Virgo: "You fix everyone else's life while quietly neglecting your own heart.",
    Libra: "You keep the peace, even when it costs your own happiness.",
    Scorpio: "You trust deeply, but when broken, you never fully recover.",
    Sagittarius: "You laugh it off, but you carry hidden emotional scars.",
    Capricorn: "You stay strong for everyone, but who is strong for you?",
    Aquarius: "You feel everything, but no one really gets your depth.",
    Pisces: "You live in dreams because reality has not always been kind to you."
};

const recommendations = {
    Aries: "Channel your energy into something productive like the gym, coding, or a new challenge.",
    Taurus: "Step out of your comfort zone today, even if it is just a small change.",
    Gemini: "Focus on one task at a time. Your mind deserves clarity.",
    Cancer: "Set emotional boundaries. Not everyone deserves your softness.",
    Leo: "Take a break from seeking validation and appreciate yourself first.",
    Virgo: "Stop overthinking. Done is better than perfect.",
    Libra: "Make one decision today without asking anyone else.",
    Scorpio: "Let go of grudges. They are just heavy baggage.",
    Sagittarius: "Pause and reflect before jumping to the next adventure.",
    Capricorn: "Rest is not laziness. Recharge without guilt.",
    Aquarius: "Express your thoughts. Your ideas deserve to be heard.",
    Pisces: "Ground yourself and turn your dreams into small actions."
};

const predictions = {
    Aries: "A new opportunity is coming your way. Be ready to act fast.",
    Taurus: "Stability is building in your life, especially financially.",
    Gemini: "A surprising conversation will shift your perspective.",
    Cancer: "Emotional clarity is on the horizon. Things will make sense soon.",
    Leo: "Recognition is coming, just stay consistent.",
    Virgo: "Your hard work will finally start showing results.",
    Libra: "Balance will return, especially in relationships.",
    Scorpio: "A transformation phase is beginning. Embrace it.",
    Sagittarius: "An exciting journey or change is approaching.",
    Capricorn: "Your discipline will soon pay off in a big way.",
    Aquarius: "A creative breakthrough is closer than you think.",
    Pisces: "Something you wished for quietly is about to unfold."
};

const signThemes = {
    Aries: "Bold Fire",
    Taurus: "Grounded Grace",
    Gemini: "Dual Spark",
    Cancer: "Soft Intuition",
    Leo: "Solar Glow",
    Virgo: "Refined Earth",
    Libra: "Velvet Balance",
    Scorpio: "Magnetic Depth",
    Sagittarius: "Wild Horizon",
    Capricorn: "Steady Climb",
    Aquarius: "Future Flow",
    Pisces: "Dream Tide"
};

function getZodiacSign(day, month) {
    const date = `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    for (const sign of zodiacSigns) {
        if (sign.startDate <= sign.endDate) {
            if (date >= sign.startDate && date <= sign.endDate) {
                return sign.name;
            }
        } else if (date >= sign.startDate || date <= sign.endDate) {
            return sign.name;
        }
    }

    return "Unknown";
}

function formatName(firstName, lastName) {
    return `${firstName.trim()} ${lastName.trim()}`
        .replace(/\s+/g, " ")
        .trim();
}

function isValidDateParts(day, month, year) {
    const candidate = new Date(year, month - 1, day);

    return (
        candidate.getFullYear() === year &&
        candidate.getMonth() === month - 1 &&
        candidate.getDate() === day
    );
}

function generateHoroscope(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const birthDate = document.getElementById("birthDate").value;
    const errorMessage = document.getElementById("errorMessage");
    const resultCard = document.getElementById("resultCard");

    errorMessage.textContent = "";

    if (!birthDate) {
        errorMessage.textContent = "Please select your birth date.";
        resultCard.classList.add("hidden");
        return;
    }

    const [yearValue, monthValue, dayValue] = birthDate.split("-");
    const year = parseInt(yearValue, 10);
    const month = parseInt(monthValue, 10);
    const day = parseInt(dayValue, 10);

    if (!isValidDateParts(day, month, year)) {
        errorMessage.textContent = "Please enter a valid birth date.";
        resultCard.classList.add("hidden");
        return;
    }

    const zodiacSign = getZodiacSign(day, month);
    const fullName = formatName(firstName, lastName);

    document.getElementById("name").innerText = `${fullName} - ${signThemes[zodiacSign]}`;
    document.getElementById("sign").innerText = zodiacSign;
    document.getElementById("compliment").innerText = victimCardCompliments[zodiacSign];
    document.getElementById("recommendation").innerText = recommendations[zodiacSign];
    document.getElementById("prediction").innerText = predictions[zodiacSign];

    resultCard.classList.remove("hidden");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
