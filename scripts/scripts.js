// function
const mq = (a) => window.matchMedia("(min-width: " + a +"px)").matches;
const noSupportHas = !CSS.supports('selector(html:has(body))');

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
    //let firstLi = document.querySelector('.false-tabs li:first-child');
    let selectedLi = document.querySelectorAll('.false-tabs li');
    let subNav = document.querySelectorAll('.products');

    falseTabs.addEventListener('click', function(e) {
        falseTabs.classList.toggle('open-false-tabs');
    });

    selectedLi.forEach(el => {
        el.addEventListener('click', function(e) {
            let dataValue = el.dataset.products;

            selectedLi.forEach(e => {
                e.classList.remove('btn-tab-active')
            });

            el.classList.add('btn-tab-active');

            subNav.forEach(e => {
                let subNavId = e.getAttribute('id');

                if(dataValue === subNavId) {
                    e.classList.remove('sr-only')
                } else {
                    e.classList.add('sr-only')
                }
            });
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

// Init
window.addEventListener('DOMContentLoaded', (event) => {
    init();
    animBurger();
    animProducts();
    animSlider();

    /* resize */
    addEventListener('resize', (event) => {
        animBurger();
        animProducts();
        animSlider();
    });
});