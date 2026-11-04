
// CARDS
const cardsList = document.querySelector('.cards_list');

async function getCards() {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts'
        );

        if (!response.ok) {
            throw new Error('Ошибка загрузки карточек');
        }

        const data = await response.json();

        data.forEach((post) => {
            const card = document.createElement('div');
            card.classList.add('post_card');

            card.innerHTML = `
                <span class="post_id">Post #${post.id}</span>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <span class="post_user">User ID: ${post.userId}</span>
            `;

            cardsList.append(card);
        });

    } catch (error) {
        console.error(error);
        cardsList.textContent = 'Не удалось загрузить карточки';
    }
}

getCards();
