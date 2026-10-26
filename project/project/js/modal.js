
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal_close");

function showModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 5) {
        showModal();
        window.removeEventListener("scroll", handleScroll);
    }
}

window.addEventListener("scroll", handleScroll);

modalClose.addEventListener("click", closeModal);



setTimeout(function () {
    showModal();
}, 10000);


modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});
