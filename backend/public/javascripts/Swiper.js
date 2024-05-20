var mySwiper;



function initSwiper() {
    var screenWidth = window.innerWidth;
    var slidesToShow = screenWidth >= 768 ? 8 : 3; // 8 slides cho màn hình lớn hơn hoặc bằng 768px, 3 slides cho màn hình nhỏ hơn

    if (mySwiper) {
        mySwiper.destroy(true, true);
    }

    mySwiper = new Swiper('.swiper-container', {
        slidesPerView: slidesToShow,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 2000,
        direction: 'horizontal',
    });
}

initSwiper();

window.addEventListener('resize', function () {
    initSwiper();
});
