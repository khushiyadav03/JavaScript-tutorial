const sky = document.getElementById('sky');
const popSound = document.getElementById('popSound');
const scoreValue = document.getElementById('scoreValue');
const poppedValue = document.getElementById('poppedValue');
const missedValue = document.getElementById('missedValue');
const statusText = document.getElementById('statusText');
const resetButton = document.getElementById('resetButton');

let score = 0;
let popped = 0;
let missed = 0;
let activeBalloons = 0;

sky.addEventListener('click', (e) => {
    if (e.target !== sky) {
        return;
    }

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.dataset.state = 'floating';

    balloon.style.background = getBalloonGradient();

    const size = Math.random() * 34 + 42;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;

    const skyRect = sky.getBoundingClientRect();
    const left = e.clientX - skyRect.left - size / 2;
    const maxLeft = sky.clientWidth - size;
    balloon.style.left = `${Math.max(8, Math.min(left, maxLeft - 8))}px`;

    balloon.style.top = `${sky.clientHeight + 20}px`;
    balloon.style.setProperty('--duration', `${(Math.random() * 1.8 + 4.8).toFixed(2)}s`);
    balloon.style.setProperty('--drift-x', `${Math.floor(Math.random() * 90 - 45)}px`);

    sky.append(balloon);
    activeBalloons += 1;
    updateStatus();

    balloon.addEventListener('animationend', () => {
        if (balloon.dataset.state === 'floating') {
            balloon.dataset.state = 'missed';
            missed += 1;
            activeBalloons = Math.max(0, activeBalloons - 1);
            updateStats();
            updateStatus();
        }

        balloon.remove();
    }, { once: true });

    balloon.addEventListener('click', (event) => {
        event.stopPropagation();

        if (balloon.dataset.state !== 'floating') {
            return;
        }

        balloon.dataset.state = 'popped';
        balloon.classList.add('pop');
        score += 10;
        popped += 1;
        activeBalloons = Math.max(0, activeBalloons - 1);
        updateStats();
        updateStatus();

        popSound.currentTime = 0;
        popSound.play().catch(() => {
            // Ignore playback failures caused by browser autoplay policies.
        });

        setTimeout(() => {
            balloon.remove();
        }, 300);
    });
});

resetButton.addEventListener('click', () => {
    score = 0;
    popped = 0;
    missed = 0;
    activeBalloons = 0;

    sky.querySelectorAll('.balloon').forEach((balloon) => balloon.remove());
    updateStats();
    updateStatus('Game reset. Launch a fresh balloon whenever you are ready.');
});

function updateStats() {
    scoreValue.textContent = score;
    poppedValue.textContent = popped;
    missedValue.textContent = missed;
}

function updateStatus(customMessage) {
    if (customMessage) {
        statusText.textContent = customMessage;
        return;
    }

    if (popped === 0 && missed === 0 && activeBalloons === 0) {
        statusText.textContent = 'No balloons launched yet. Start by clicking in the sky below.';
        return;
    }

    if (activeBalloons > 0) {
        statusText.textContent = `${activeBalloons} balloon${activeBalloons > 1 ? 's are' : ' is'} floating. Pop them before they escape.`;
        return;
    }

    if (missed > popped) {
        statusText.textContent = 'A few balloons got away. Try clicking a little faster.';
        return;
    }

    statusText.textContent = 'Nice rhythm. Keep launching and popping balloons.';
}

function getBalloonGradient() {
    const hue = Math.floor(Math.random() * 360);
    return `radial-gradient(circle at 30% 30%, hsl(${hue} 100% 96%), hsl(${hue} 80% 72%) 42%, hsl(${hue} 72% 60%) 100%)`;
}
