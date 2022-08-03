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

export default modal;
export {closeModal, showModal};