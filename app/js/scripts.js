var hamburger = document.querySelector('#pull');
var body = document.querySelector('body');

hamburger.addEventListener('click', showMenu);

function showMenu() {
    body.classList.toggle('show-nav');
    event.preventDefault();
}