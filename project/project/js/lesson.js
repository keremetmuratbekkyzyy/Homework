
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


//converter
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

let rates = null;

const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/convertor.json');

xhr.onload = () => {
    rates = JSON.parse(xhr.response);
};

xhr.onerror = () => {
    console.error('Не удалось загрузить курс');
};

xhr.send();

function clearOthers(a, b) {
    a.value = '';
    b.value = '';
}

somInput.oninput = () => {
    if (!rates) return;

    if (somInput.value === '') {
        clearOthers(usdInput, eurInput);
        return;
    }
    const som = Number(somInput.value);

    usdInput.value = (som / rates.usd).toFixed(2);
    eurInput.value = (som / rates.eur).toFixed(2);
};


usdInput.oninput = () => {
    if (!rates) return;
    if (usdInput.value === '') {
        clearOthers(somInput, eurInput);
        return;
    }

    const usd = Number(usdInput.value);

    somInput.value = (usd * rates.usd).toFixed(2);
    eurInput.value = (usd * rates.usd / rates.eur).toFixed(2);
};

eurInput.oninput = () => {
    if (!rates) return;
    if (eurInput.value === '') {
        clearOthers(somInput, usdInput);
        return;
    }

    const eur = Number(eurInput.value);

    somInput.value = (eur * rates.eur).toFixed(2);
    usdInput.value = (eur * rates.eur / rates.usd).toFixed(2);
};




// DRY dont repaet yourself
// KISS keep it simple stupid


