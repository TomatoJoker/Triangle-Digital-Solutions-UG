function dynamicHeightToolbar() {
    if ($(window).width() < 1200) {
        const vh = $(window).height() * 0.01;
        $(':root').css('--vh', `${vh}px`);
    } else {
        $(':root').css('--vh', '');
    }
}

$(window).on('resize', dynamicHeightToolbar);
dynamicHeightToolbar();

const reviewWrapper = $('.js-review-slider');
const reviewSlider = reviewWrapper.find('.js-review-inner');
const reviewBtnNext = reviewWrapper.find('.js-review-btn-next');
const reviewBtnPrev = reviewWrapper.find('.js-review-btn-prev');

const swiper = new Swiper(reviewSlider[0], {
    navigation: {
        nextEl: reviewBtnNext[0],
        prevEl: reviewBtnPrev[0],
    }
});