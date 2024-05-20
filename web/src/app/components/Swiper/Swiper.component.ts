// // src/app/swiper/swiper.component.ts
// import { Component, AfterViewInit, HostListener } from '@angular/core';
// import Swiper, { Autoplay, SwiperOptions } from 'swiper';
// import 'swiper/swiper-bundle.min.css';

// Swiper.use([Autoplay]);

// @Component({
//   selector: 'app-swiper',
//   templateUrl: './swiper.component.html',
//   styleUrls: ['./swiper.component.css']
// })
// export class SwiperComponent implements AfterViewInit {
//   private mySwiper: Swiper | undefined;

//   constructor() {}

//   ngAfterViewInit(): void {
//     this.initSwiper();
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: Event) {
//     this.initSwiper();
//   }

//   private initSwiper(): void {
//     const screenWidth = window.innerWidth;
//     const slidesToShow = screenWidth >= 768 ? 8 : 3;

//     if (this.mySwiper) {
//       this.mySwiper.destroy(true, true);
//     }

//     const swiperOptions: SwiperOptions = {
//       slidesPerView: slidesToShow,
//       spaceBetween: 10,
//       loop: true,
//       autoplay: {
//         delay: 2000,
//         disableOnInteraction: false
//       },
//       speed: 2000,
//       direction: 'horizontal'
//     };

//     this.mySwiper = new Swiper('.swiper-container', swiperOptions);
//   }
// }
