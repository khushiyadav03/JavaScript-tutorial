const form = document.getElementById("loveForm");
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const scoreValue = document.getElementById("scoreValue");
const scoreBadge = document.getElementById("scoreBadge");
const resultMessage = document.getElementById("resultMessage");
const resultCard = document.getElementById("resultCard");

function normalizeName(name) {
    // Name ko lowercase me convert karke sirf letters rakhte hain.
    // Isse spaces, symbols aur numbers ignore ho jate hain.
    return name.toLowerCase().replace(/[^a-z]/g, "");
}

function getLetterFrequency(name) {
    // Har letter kitni baar aaya, uska count store karte hain.
    // Example: "anna" => { a: 2, n: 2 }
    return [...name].reduce((map, char) => {
        map[char] = (map[char] || 0) + 1;
        return map;
    }, {});
}

function calculateLoveScore(firstName, secondName) {
    const normalizedFirst = normalizeName(firstName);
    const normalizedSecond = normalizeName(secondName);

    // Agar dono me se koi name blank ho, to score nahi nikalenge.
    if (!normalizedFirst || !normalizedSecond) {
        return null;
    }

    const combined = normalizedFirst + normalizedSecond;
    const reversedCombined = normalizedSecond + normalizedFirst;
    const firstFreq = getLetterFrequency(normalizedFirst);
    const secondFreq = getLetterFrequency(normalizedSecond);

    let sharedLetters = 0;

    // Dono names me jo letters common hain unka total overlap nikalte hain.
    // Example: ek name me "a" 2 baar aur doosre me 1 baar hai,
    // to shared count me sirf 1 add hoga.
    Object.keys(firstFreq).forEach((char) => {
        sharedLetters += Math.min(firstFreq[char], secondFreq[char] || 0);
    });

    // Dono names me kitne alag common letters hain.
    const uniqueShared = [...new Set(normalizedFirst)].filter((char) => normalizedSecond.includes(char)).length;

    // Name lengths jitni close hongi, utna better balance score milega.
    const lengthBalance = 100 - Math.min(Math.abs(normalizedFirst.length - normalizedSecond.length) * 9, 45);

    // Letters aur unki positions se ek fixed chemistry number banaya ja raha hai.
    // Ye random nahi hai, same names par same result aayega.
    const chemistrySeed = [...combined].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 3), 0);
    const mirrorSeed = [...reversedCombined].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 5), 0);
    const chemistry = (chemistrySeed + mirrorSeed) % 101;

    // Shared letters ko thoda zyada importance di gayi hai.
    // Zyada overlap hoga to relation score better lagega.
    const overlapScore = Math.min(40, sharedLetters * 7 + uniqueShared * 5);

    // Final score alag-alag factors ke weighted mix se nikalta hai:
    // 45% overlap, 20% length balance, 35% chemistry.
    const weightedScore = Math.round(overlapScore * 0.45 + lengthBalance * 0.2 + chemistry * 0.35);

    // Score ko 18 se 99 ke beech me limit kar dete hain.
    return Math.max(18, Math.min(99, weightedScore));
}

function getResultDetails(score) {
    // Score ke hisab se badge aur message change hote hain.
    if (score >= 85) {
        return {
            badge: "Soulmate Energy",
            message: "This pairing looks seriously strong. There is warmth, balance, and a lot of spark in this playful match.",
            cardClass: "is-very-high"
        };
    }

    if (score >= 65) {
        return {
            badge: "Strong Match",
            message: "You two have a lovely connection. The chemistry feels promising and the vibe is definitely sweet.",
            cardClass: "is-high"
        };
    }

    if (score >= 45) {
        return {
            badge: "Good Potential",
            message: "There is something here worth exploring. A little patience and effort could make this bond bloom.",
            cardClass: ""
        };
    }

    return {
        badge: "Opposites Attract",
        message: "This match is a little unpredictable, but sometimes surprising pairs create the most interesting stories.",
        cardClass: ""
    };
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = name1Input.value.trim();
    const secondName = name2Input.value.trim();

    // Yahan actual love score calculate hota hai.
    const score = calculateLoveScore(firstName, secondName);

    resultCard.classList.remove("is-high", "is-very-high");

    if (score === null) {
        scoreValue.textContent = "--%";
        scoreBadge.textContent = "Need both names";
        resultMessage.textContent = "Please enter both names so the calculator has something to match.";
        return;
    }

    const details = getResultDetails(score);

    scoreValue.textContent = `${score}%`;
    scoreBadge.textContent = details.badge;
    resultMessage.textContent = `${firstName} and ${secondName}: ${details.message}`;

    if (details.cardClass) {
        resultCard.classList.add(details.cardClass);
    }
});
