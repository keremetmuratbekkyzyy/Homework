
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



// CONVERTER

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

let rates = null;

const inputs = {
    usd: usdInput,
    som: somInput,
    eur: eurInput
};

async function getRates() {
    try {
        const response = await fetch('../data/convertor.json');

        if (!response.ok) {
            throw new Error('Не удалось загрузить курсы валют');
        }

        rates = await response.json();

    } catch (error) {
        console.error('Ошибка конвертера:', error);
    }
}

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

getRates();


const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let cardId = 1;

async function getCard() {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${cardId}`
        );

        if (!response.ok) {
            throw new Error('Ошибка загрузки карточки');
        }

        const data = await response.json();

        const text = data.completed ? 'completed' : 'in progress';
        const color = data.completed ? 'green' : 'red';

        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${color}">${text}</p>
            <span>${data.id}</span>
        `;

    } catch (error) {
        console.error('Ошибка Card Switcher:', error);
    }
}

btnNext.onclick = () => {
    cardId = cardId === 200 ? 1 : cardId + 1;
    getCard();
};

btnPrev.onclick = () => {
    cardId = cardId === 1 ? 200 : cardId - 1;
    getCard();
};

getCard();


// FETCH POSTS
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => { console.log(data); })
    .catch((error) => console.error(error));




const searchInput = document.querySelector('#searchInput')
const searchButton = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather'
const WEATHER_API_KEY = '291aa3950880603684e43c6cc36aed88'

searchButton.onclick = async () => {
    if (searchInput.value !== '') {
        try {
            const response = await fetch(`${WEATHER_API}?q=${searchInput.value}&units=metric&lang=ru&appid=${WEATHER_API_KEY}`)
            const data = await response.json()

            if (data.name) {
                city.style.color = 'white'
                city.innerHTML = data.name
                temp.innerHTML = Math.round(data.main.temp) + '&deg;C'
            } else {
                city.innerHTML = 'Город не найден'
                city.style.color = 'red'
                temp.innerHTML = ''
            }
        } catch (error) {
            console.error(error)
        }

        searchInput.value = ''
    } else {
        city.innerHTML = 'Введите название города!'
        city.style.color = 'red'
        temp.innerHTML = ''
    }
}







