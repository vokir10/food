/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    const result = document.querySelector('.calculating__result span');
    let sex= 'female',
        height, weight, age, 
        ratio= 1.375;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex'); 
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio'); 
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio',1.375);
    }

    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id')===localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        });
    }

    initLocalSetting('#gender div','calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent='____';
            return;
        }
        
        if(sex == 'female'){
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
        }else{
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
        }
    }

    
    
    function getStaticInformation(selector, acriveClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem=>{
            elem.addEventListener('click',(e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                elements.forEach(elem =>{
                    elem.classList.remove(acriveClass);
                });
    
                e.target.classList.add(acriveClass);
                calcTotal();
            });
        });
    }
    calcTotal()
    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div  ','calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () =>{

            if(input.value.match(/\D/g)){
                input.style.border = "2px solid red";
            }else{
                input.style.border = "none";
            }
    
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price})=>{
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        })

    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector,modalTimerId){
    const form = document.querySelectorAll(formSelector);
    
    const message = {
        loading: 'img/form/spinner.svg  ',
        success: 'Спасибо, все получилось!',
        fail: 'Что-то пошло не так...'
    };

    form.forEach(item =>{
        bindPostData(item);
    });

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    

    function bindPostData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();//убераем стандартные настройки

            const statusMessage = document.createElement('img');//создаем блок с статусом отправки
            statusMessage.src = message.loading;//присваеваем класс
            statusMessage.style.cssText=`
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);//добавляем еллемент к форме

            const formData = new FormData(form); //формируем данные из формы

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //превращаем данные с формы в массив массивов а потом превращаем масив массивов в обьект и транфсормируем его в json

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data);//выводим в консоль что отправили
                showThanksModal(message.success);//заполняем статус отправки
                statusMessage.remove();//удаляем статус через 2 секунды
            })
            .catch(() =>{
                showThanksModal(message.fail); 
            }).finally(()=>{
                form.reset();//очищаем форму
            });
            
            
            
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML =`
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
function showModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearTimeout(modalTimerId);
    }
    
}
function modal(triggerSelector, modalSelector, modalTimerId){
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(element => {
        element.addEventListener('click',() => showModal(modalSelector,modalTimerId));
    });

    modal.addEventListener('click',(e)=>{
        if(e.target == modal || e.target.getAttribute('data-close')==''){
           closeModal(modalSelector);
        }
    });
   
    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    function modalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll',modalByScroll);
        }
    }
    window.addEventListener('scroll',modalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){

    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          currentSlide = document.querySelector(currentCounter),
          totalSlide = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 0.5+'s';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
    dotsArr = [];
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(dots);

    for(let i = 0; i<slides.length; i++){
        const dot =document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);
        dot.style.cssText =`
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if(i==0){
            dot.style.opacity =1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }
    function setTotal(){
        if(slides.length<10){
            totalSlide.textContent = '0'+ slides.length;
        }else{
        totalSlide.textContent = slides.length;
        }
    }
    setTotal();
    function setCurrent(){
        if(slideIndex<10){
            currentSlide.textContent = '0'+ slideIndex;
        }else{
            currentSlide.textContent = slideIndex;
        }
    }
    next.addEventListener('click', ()=>{
        if(offset == +width.replace(/\D/g,'')*(slides.length-1)){
            offset = 0;
        } else{
            offset += +width.replace(/\D/g,'');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex==slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }
        setCurrent();

        dotsArr.forEach(item => item.style.opacity = 0.5);
        dotsArr[slideIndex-1].style.opacity = 1;
    });
    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = +width.replace(/\D/g,'')*(slides.length-1);
        } else{
            offset -= +width.replace(/\D/g,'');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex==1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }
        setCurrent();
        dotsArr.forEach(item => item.style.opacity = '0.5');
        dotsArr[slideIndex-1].style.opacity = 1;
    });

    dotsArr.forEach(dot =>{
        dot.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex=slideTo;
            offset = +width.replace(/\D/g,'')*(slideTo-1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrent();

            dotsArr.forEach(item => item.style.opacity = '0.5');
            dotsArr[slideIndex-1].style.opacity = 1;
        });
    });

    // slides.forEach((item, i)=>{
    //     if(i>0){
    //         item.classList.add('hide');      
    //     }
    // });    
    // function setTotal(){
    //     if(slides.length<10){
    //         totalSlide.textContent = '0'+ slides.length;
    //     }else{
    //     totalSlide.textContent = slides.length;
    //     }
    // }
    // function setCurrent(i){
    //     if(i<10){
    //         currentSlide.textContent = '0'+ i;
    //     }else{
    //         currentSlide.textContent = i;
    //     }
    // }

    // let i = 1;

    // prev.addEventListener('click',()=>{
    //     slides[i-1].classList.remove('show');
    //     slides[i-1].classList.add('hide');
    //     i--;
    //     if(i<=0){
    //         i=slides.length;
    //     }
    //     setCurrent(i);
    //     slides[i-1].classList.add('show');
    //     slides[i-1].classList.remove('hide');
    //     console.log(i);
    // });
    // next.addEventListener('click',()=>{
    //     slides[i-1].classList.remove('show');
    //     slides[i-1].classList.add('hide');
    //     i++;
    //     if(i>slides.length){
    //         i=1;
    //     }
    //     setCurrent(i);
    //     slides[i-1].classList.add('show');
    //     slides[i-1].classList.remove('hide');
    //     console.log(i);
    // });
    // setTotal();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabcontentSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector), //берем все типы питания с правой колонки
    tabsContent = document.querySelectorAll(tabcontentSelector), //берем все блоки таба в нем находится вся структура что нужно изменить
    tabsParent = document.querySelector(tabsParentSelector);//берем родительский класс правой колонки с типами питаниия 

    function hideTabContent(){//скрываем все табы что бы не было каши
    tabsContent.forEach(item =>{
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });//скрываем табы

    tabs.forEach(item =>{
        item.classList.remove(activeClass);
    });//скрываем класс активности в типах питания
    }

    function showTabContent(i = 0){//показываем таб
    tabsContent[i].classList.add('show', 'fade');// добавляем класс видимости
    tabsContent[i].classList.remove('hide');//удаляем класс невидимости
    tabs[i].classList.add(activeClass);// добавляем класс активности определного типа питания
    }

    hideTabContent();//скрываем табы
    showTabContent();// добавляем один первый таб по умолчанию

    tabsParent.addEventListener('click', (event) => {// ставим обработчик событий на клик по родительскому классу всех типов питания 
    const target = event.target;// отслеживаем на какой елемент мы кликнули в родительском классе

    if(target && target.classList.contains(tabsSelector.slice(1))){// если мы кликнули на елемент у которого есть класс tabheader__item
        tabs.forEach((item, i)=>{//перебираем все типы питания
            if(target == item){// если елемент на который кликнули совпадает с типом питания
                hideTabContent();// прячем все табы
                showTabContent(i); // показываем таб который надо
            }   
        });
    }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000*60*60*24)),
              hours = Math.floor(t / (1000*60*60) % 24),
              minutes =Math.floor((t/1000/60)%60),
              seconds = Math.floor((t/1000)%60);
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num<0){
            return '00';
        }
        if(num >= 0 && num<10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock,1000);
        
        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async(url, data)=>{
    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
     });

    return await res.json();
     
}

async function getResource(url){
    let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");







 
document.addEventListener('DOMContentLoaded', () => { //пока не загрузится вся страница
    const modalTimerId = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 50000);
    
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form',modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer','2022-08-10');  
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map