// function
const mq = (a) => window.matchMedia("(min-width: " + a +"px)").matches;
const noSupportHas = !CSS.supports('selector(html:has(body))');

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
    if (mq(768)) {
        let falseTabs = document.querySelector('.false-tabs');
        let firstLi = document.querySelector('.false-tabs li:first-child');
        let selectedLi = document.querySelectorAll('.false-tabs li');
        let subNav = document.querySelectorAll('.products');

        falseTabs.addEventListener('click', function(e) {
            falseTabs.classList.toggle('open-false-tabs');
        });

        selectedLi.forEach(el => {
            el.addEventListener('click', function(e) {
                let selectedValue = el.textContent;
                let dataValue = el.dataset.products;
                let firstLiContent = firstLi.textContent;
                let firstLiData = firstLi.dataset.products;

                el.textContent = firstLiContent;
                el.dataset.products = firstLiData;
                firstLi.textContent = selectedValue;
                firstLi.dataset.products = dataValue;

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
}

// Slider
const animSlider = () => {
    let slider = document.querySelector('.slider');
    let wrapper = document.querySelector('.offers');
    let offers = document.querySelectorAll('.offer');

    slider.style.overflow = 'scroll';
    wrapper.style.width = offers.length * 341 + 'px';
}

// Init
window.addEventListener('DOMContentLoaded', (event) => {
    animBurger();
    animProducts();
    animSlider();

    /* resize */
    addEventListener('resize', (event) => {
        //console.log("test3") 
    });
});