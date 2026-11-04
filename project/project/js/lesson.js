
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


const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

let rates = null;

const inputs = {
    usd: usdInput,
    som: somInput,
    eur: eurInput
};

const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/convertor.json');

xhr.onload = function () {
    if (xhr.status === 200) {
        rates = JSON.parse(xhr.responseText);
    }
};

xhr.onerror = function () {
    console.error('Не удалось загрузить курс');
};

xhr.send();


function convertCurrency(currency) {
    if (!rates) return;

    const currentInput = inputs[currency];
    const amount = currentInput.value;

    if (amount === '') {
        Object.keys(inputs).forEach(function (key) {
            if (key !== currency) {
                inputs[key].value = '';
            }
        });
        return;
    }

    const som = Number(amount) * (rates[currency] || 1);

    Object.keys(inputs).forEach(function (key) {
        if (key !== currency) {
            inputs[key].value = (som / (rates[key] || 1)).toFixed(2);
        }
    });
}
Object.keys(inputs).forEach(function (currency) {
    inputs[currency].addEventListener('input', function () {
        convertCurrency(currency);
    });
});

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let cardId = 1;

const getCard = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then((response) => response.json())
        .then((data) => {
            const text = data.completed ? 'completed' : 'in progress';
            const color = data.completed ? 'green' : 'red';

            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${color}">${text}</p>
                <span>${data.id}</span>
            `;
        })
        .catch((error) => console.error(error));
};

btnNext.onclick = () => {
    cardId = cardId === 200 ? 1 : cardId + 1;
    getCard();
};

btnPrev.onclick = () => {
    cardId = cardId === 1 ? 200 : cardId - 1;
    getCard();
};

getCard();


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log('Posts:', data))
    .catch(error => console.error(error));




