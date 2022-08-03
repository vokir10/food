import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import timer from './modules/timer';
import form from './modules/form';
import calculator from './modules/calculator';
import slider from './modules/slider';
import {showModal} from './modules/modal'; 
document.addEventListener('DOMContentLoaded', () => { //пока не загрузится вся страница
    const modalTimerId = setTimeout(()=>showModal('.modal', modalTimerId), 50000);
    
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal', modalTimerId);
    cards();
    calculator();
    form('form',modalTimerId);
    timer('.timer','2022-08-10');  
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total',
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner' 
    });    
});