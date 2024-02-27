var submitButton = document.getElementById('start_btn');
var insectSelect = document.getElementById('insectSelect');
var startGame = document.getElementById('startScreen');
var insectBtn = document.getElementsByClassName('insectBtn');
var gameArea = document.getElementById('playContainer');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const timeoutMsg = document.getElementById('timeoutMsg');
let seconds = 0;
let score = 0;
let selected_insect = {};

// hide and show screens
function showScreen() {
    if (submitButton.click) {
        insectSelect.style.display = "block";
        startGame.style.display = "none";
    }
}

// Get selected insect in playground

function getInsect(id) {
    gameArea.style.display = "block";
    insectSelect.style.display = "none";

    const insectImage = document.getElementById(id).src;
    // const insect = document.getElementById('insect');
    // insect.src = insectImage;

    selected_insect.src = insectImage;
    selected_insect.alt = id;

    generateInsect();
}

// Generate insect when click on insect
function generateInsect() {
    const { x, y } = getRandomLocation();

    const insect = document.createElement('div');
    insect.classList.add('insect'); // Add the 'insect' class for styling

    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;

    const randomRotation = Math.random() * 360;

    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${randomRotation}deg)" />`;

    insect.addEventListener('click', catchInsect);
    gameArea.appendChild(insect);
    
    increaseTime();

    
}

// Choose Random location for insect with window height and width
function getRandomLocation() {
    const width = window.innerWidth - 100; // Adjusted to prevent insects from going out of screen
    const height = window.innerHeight - 100; // Adjusted to prevent insects from going out of screen

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };

}

// catch insect and generate new insect
function catchInsect() {
    increaseScore();
    
    this.classList.add('caught');
    const { x, y } = getRandomLocation(); // Get random position
    generateInsect(x, y); // Generate a new insect at the random position
    this.remove();
    addInsects();
}

function addInsects() {
    setTimeout(generateInsect, 1000);
    setTimeout(generateInsect, 1500);
}

// Count Score for catch insect and display message on high score
function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}

// Timer for Catch insect
function increaseTime() {

    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;  
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
    if (s >= 30) {
        timeoutMsg.classList.add('visible');
    }
}
