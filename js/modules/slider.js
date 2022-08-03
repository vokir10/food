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

export default slider;