
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener("click", function () {
    const gmail = gmailInput.value.trim();

    if (gmailRegExp.test(gmail)) {
        gmailResult.textContent = "Gmail is valid!";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Gmail is invalid!";
        gmailResult.style.color = "red";
    }
});


const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const maxWidth = parentBlock.clientWidth - childBlock.offsetWidth;
const maxHeight = parentBlock.clientHeight - childBlock.offsetHeight;

const speed = 3;

const move = () => {
    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    if (positionX < maxWidth && positionY === 0) {
        positionX = Math.min(positionX + speed, maxWidth);
    }
    else if (positionX >= maxWidth && positionY < maxHeight) {
        positionY = Math.min(positionY + speed, maxHeight);
    }
    else if (positionY >= maxHeight && positionX > 0) {
        positionX = Math.max(positionX - speed, 0);
    }
    else if (positionX <= 0 && positionY > 0) {
        positionY = Math.max(positionY - speed, 0);
    }
    requestAnimationFrame(move);
};

move();

const secondsDisplay = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

let seconds = 0;
let timer = null;

startButton.addEventListener("click", function () {
    if (timer !== null) {
        return;
    }
    timer = setInterval(function () {
        seconds++;
        secondsDisplay.textContent = seconds;
    }, 1000);
});

stopButton.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    secondsDisplay.textContent = seconds;
});
