// Reasons I love you
const loveReasons = [
    "Your smile lights up my entire world 🌟",
    "You make me want to be a better person every day 💫",
    "Your laugh is my favorite sound in the universe 😊",
    "You see beauty in things others miss 🌸",
    "Your kindness touches everyone around you 💝",
    "You make ordinary moments feel magical ✨",
    "Your strength inspires me when I'm weak 💪",
    "You listen with your whole heart 💖",
    "Your dreams are as beautiful as you are 🌙",
    "You make me feel like I'm home wherever you are 🏠",
    "Your creativity amazes me constantly 🎨",
    "You bring out the best in everyone you meet 🌺",
    "Your hugs feel like safety and love combined 🤗",
    "You make me believe in forever 💍",
    "Your passion for life is contagious 🔥",
    "You turn my chaos into peace 🕊️",
    "Your heart is pure gold 💛",
    "You make me laugh until my cheeks hurt 😂",
    "Your intelligence captivates me 🧠",
    "You love me even when I'm difficult 💜",
    "The way you care for others shows your beautiful soul 🌷",
    "You make me feel like the luckiest person alive 🍀",
    "Your support gives me courage to chase my dreams 🚀",
    "You find joy in the smallest moments 🦋",
    "Your love feels like coming home after a long journey 🏡"
];

let currentReasonIndex = 0;
let reasonsShown = 0;

// Make the function global so the onclick can access it
window.showNewReason = function() {
    console.log("Showing new reason!"); // Debug log
    const reasonElement = document.getElementById('currentReason');
    const counterElement = document.getElementById('reasonCounter');
    
    if (!reasonElement || !counterElement) {
        console.error("Could not find reason elements!");
        return;
    }
    
    reasonElement.style.opacity = '0';
    
    setTimeout(() => {
        reasonElement.textContent = loveReasons[currentReasonIndex];
        reasonElement.style.opacity = '1';
        reasonsShown++;
        counterElement.textContent = `Reasons discovered: ${reasonsShown}`;
        currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
    }, 300);
}

// Floating hearts on mouse move
let heartTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(heartTimeout);
    heartTimeout = setTimeout(() => {
        createFloatingHeart(e.clientX, e.clientY);
    }, 200);
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.5 ? '💖' : '💕';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Create starfield
function createStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
}

// Secret message (triple-click on the main title)
let clickCount = 0;
let clickTimer;

document.addEventListener("DOMContentLoaded", () => {
    createStarfield();
    
    // Set up the reason button event listener
    const reasonButton = document.getElementById('reasonButton');
    if (reasonButton) {
        reasonButton.addEventListener('click', showNewReason);
    }
    
    // Secret message triple-click
    document.querySelector('main > h1').addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 800);
        } else if (clickCount === 3) {
            clearTimeout(clickTimer);
            document.getElementById('secretMessage').style.display = 'block';
            clickCount = 0;
        }
    });
});

function closeSecret() {
    document.getElementById('secretMessage').style.display = 'none';
}