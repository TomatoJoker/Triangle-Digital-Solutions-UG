dynamicHeightToolbar();
window.addEventListener("resize", function () {
    dynamicHeightToolbar();
});

function dynamicHeightToolbar() {
    if (window.innerWidth < 1200) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else {
        document.documentElement.style.removeProperty('--vh');
    }
}

const reviewWrapper = document.querySelector('.js-review-slider');
const reviewSlider = reviewWrapper.querySelector('.js-review-inner');
const reviewBtnNext = reviewWrapper.querySelector('.js-review-btn-next');
const reviewBtnPrev = reviewWrapper.querySelector('.js-review-btn-prev');

const swiper = new Swiper(reviewSlider, {
    navigation: {
        nextEl: reviewBtnNext,
        prevEl: reviewBtnPrev,
    }
});
