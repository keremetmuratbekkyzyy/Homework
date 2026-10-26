
const tabContents = document.querySelectorAll(".tab_content_block");
const tabButtons = document.querySelectorAll(".tab_content_item");

let currentTabIndex = 0;

function changeTab(index) {
    tabContents.forEach(function (content, i) {
        content.style.display = i === index ? "block" : "none";
    });

    tabButtons.forEach(function (button, i) {
        button.classList.toggle("tab_content_item_active", i === index);
    });

    currentTabIndex = index;
}
tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        changeTab(index);
    });
});

changeTab(0);

setInterval(function () {
    currentTabIndex++;

    if (currentTabIndex >= tabContents.length) {
        currentTabIndex = 0;
    }

    changeTab(currentTabIndex);
}, 3000);
