var hamburger = document.querySelector('#pull');
var body = document.querySelector('body');

hamburger.addEventListener('click', showMenu);

function showMenu() {
    body.classList.toggle('show-nav');
    event.preventDefault();
}

var hambLinks = document.querySelectorAll('nav ul a');

for( var i = 0; i < hambLinks.length; i++) {
    hambLinks[i].addEventListener('click', closeMenu)
}

function closeMenu() {
    body.classList.toggle('show-nav');
}