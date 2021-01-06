'use strict';

window.onload = function() {
    let menuTrigger = document.querySelector('.header__menu'),
        closeMenuButton = document.querySelector('.side-nav__close'),
        darkerCurtain = document.querySelector('.page__darker'),
        pageBody = document.querySelector('body');

    menuTrigger.addEventListener('click', function() {
        pageBody.classList.toggle('open-nav');
    })
    closeMenuButton.addEventListener('click', function() {
        pageBody.classList.toggle('open-nav');
    })
    darkerCurtain.addEventListener('click', function() {
        pageBody.classList.toggle('open-nav');
    })
}
