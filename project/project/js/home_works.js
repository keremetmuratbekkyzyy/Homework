
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


const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let position = 0;

function moveBlock() {
    const parentWidth = parentBlock.clientWidth;
    const childWidth = childBlock.offsetWidth;

    if (position <= parentWidth - childWidth) {
        childBlock.style.left = position + "px";
        position++;

        setTimeout(moveBlock, 10);
    }
}

moveBlock();
