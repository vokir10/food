import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests',json)
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
        showModal('.modal', modalTimerId);

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
            closeModal('.modal');
        },4000);
    }
}

export default form;