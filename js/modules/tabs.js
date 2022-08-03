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

export default tabs;