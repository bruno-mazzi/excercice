gsap.registerPlugin(ScrollTrigger);

// function
const mq = (a) => window.matchMedia("(min-width: " + a +"px)").matches;
const noSupportHas = !CSS.supports('selector(html:has(body))');
const motionSickness = window.matchMedia('(prefers-reduced-motion: reduce)');

const init = () => {
    let slider = document.querySelector('.slider');
    let buttonFoward = document.createElement("button");
    let buttonBackward = document.createElement("button");
    let rangeInput = document.createElement('input');

    buttonFoward.textContent = "Suivant";
    buttonFoward.className = "btn-slider btn-slider-foward";

    buttonBackward.textContent = "Précédent";
    buttonBackward.className = "btn-slider btn-slider-backward";

    rangeInput.className = "range-move";
    rangeInput.type = 'range';
    rangeInput.min = 0;
    rangeInput.value = 0;
    rangeInput.setAttribute("aria-hidden", "true");
        
    slider.append(buttonFoward);
    slider.append(buttonBackward);
    slider.append(rangeInput);
}

// Nav
const animBurger = () => {
    if (!mq(768) && noSupportHas) {
        let toggleClass = document.querySelector('.menu-label');

        toggleClass.addEventListener('click', function(e) {
            toggleClass.classList.toggle('open-menu');
        });   
    }
}

// Products
//  ul to select in desktop
const animProducts = () => {
    let falseTabs = document.querySelector('.false-tabs');
    let selectedLi = document.querySelectorAll('.false-tabs li');
    let subNav = document.querySelectorAll('.products');

    falseTabs.addEventListener('click', function(e) {
        falseTabs.classList.toggle('open-false-tabs');
    });

    selectedLi.forEach(el => {
        el.addEventListener('click', function(e) {
            let dataValue = el.dataset.products;

            if(!el.classList.contains('btn-tab-active')) {
                selectedLi.forEach(e => {
                    e.classList.remove('btn-tab-active')
                });

                el.classList.add('btn-tab-active');

                subNav.forEach(e => {
                    let subNavId = e.getAttribute('id');
                    let subNavItems = e.querySelectorAll('.product');

                    if(dataValue === subNavId) {

                        e.classList.remove('sr-only');

                        if (!motionSickness.matches) {
                            gsap.fromTo(subNavItems, {opacity:0,y: -50},{opacity:1, y: 0, stagger: 0.1});
                        }

                    } else {
                        e.classList.add('sr-only');
                    }
                });
            };
        }); 
    });


    falseTabs.addEventListener('mouseleave', function(e) {
        if (falseTabs.classList.contains('open-false-tabs')) {
            falseTabs.classList.remove('open-false-tabs');
        }
    });

}

// Slider
const animSlider = () => {
    let innerSlider = document.querySelector('.inner-slider');
    let wrapper = document.querySelector('.offers');
    let offers = document.querySelectorAll('.offer');
    let offerWidth = document.querySelector('.offer').offsetWidth + 12;
    let rangeInput = document.querySelector('.range-move');
    let buttonFoward = document.querySelector('.btn-slider-foward');
    let buttonBackward = document.querySelector('.btn-slider-backward');
    
    let widthOffers = offers.length * offerWidth;
    let maxScrollLeft = widthOffers - innerSlider.clientWidth;

    rangeInput.max = maxScrollLeft;
    innerSlider.style.overflowX = 'hidden';
    wrapper.style.width = widthOffers + 'px';

    buttonFoward.addEventListener("click", (event) => {
        let scrollLeftValue = innerSlider.scrollLeft;   
        scrollLeftValue = Math.min(Math.max((scrollLeftValue + offerWidth), 0), maxScrollLeft);
        innerSlider.scrollLeft = scrollLeftValue;
        rangeInput.value = scrollLeftValue;
    });

    buttonBackward.addEventListener("click", (event) => {
        let scrollLeftValue = innerSlider.scrollLeft;
        scrollLeftValue = Math.min(Math.max((scrollLeftValue - offerWidth), 0), maxScrollLeft);
        innerSlider.scrollLeft = scrollLeftValue;
        rangeInput.value = scrollLeftValue;   
    });

    rangeInput.addEventListener("input", (event) => {
        innerSlider.scrollLeft = rangeInput.value;
    });
}

// anim
const animVisual = () => {
    let parallax = () => {
        let tl = gsap.timeline({scrollTrigger:{
            trigger:"#main",
            start:"150px 84px",
            end:"250px 250px",
            toggleActions:"restart none none reverse",
            scrub: 0.3
        }})
        .to(".main-title", {y:50})
        .to("#main", {backgroundPosition: "0px 25px"}, 0)
    }

    let scaleProducts = () => {
        let productsMore = document.querySelector('.products-more');
        let tl = gsap.timeline({ paused: true })
        .to('.products-more > *', {scale:1.05})
        .to('.icon-plus', {rotation:90, transformOrigin:"50% 50%"});

        productsMore.addEventListener('mouseover', e => {
            tl.play();
        });

        productsMore.addEventListener('mouseleave', e => {
            tl.reverse();
        });
    }

    if (!motionSickness || motionSickness.matches) {
        //doSomethingWithoutAnimation();
    } else {
        parallax();
        scaleProducts();
    }

    motionSickness.addEventListener("change", () => {
        if (motionSickness.matches) {
          //doSomethingWithoutAnimation();
        } else {
          //doSomethingWithAnimation();
        }
    });
}

// Init
window.addEventListener('DOMContentLoaded', (event) => {
    init();
    animBurger();
    animProducts();
    animSlider();
    animVisual();

    /* resize */
    addEventListener('resize', (event) => {
        animBurger();
        animProducts();
        animSlider();
    });
});