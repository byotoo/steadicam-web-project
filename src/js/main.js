import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TEAM SLIDER (Existing)
    const teamContainer = document.querySelector(".teamCarousel");
    const teamSection = document.querySelector('#teamSection');
    
    if (teamContainer && teamSection) {
        const teamSwiper = new Swiper(".teamCarousel", {
            modules: [Autoplay],
            slidesPerView: 1.2,
            spaceBetween: 24,
            speed: 1000,
            autoplay: false,
            breakpoints: {
                768: { slidesPerView: 2.5 },
                1200: { slidesPerView: 3.8 }
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    teamSwiper.autoplay.start();
                } else {
                    teamSwiper.autoplay.stop();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(teamSection);
    }

    // 2. VIDEO SWIPER (Modified for Infinite Peeking & Autoplay)
        /*
    ============================================
    RECENT VIDEOS SWIPER
    ============================================
    */

    const videoContainer =
        document.querySelector('.video-swiper')

    if (videoContainer) {

        /*
        ============================================
        VIDEO HELPERS
        ============================================
        */

        const pauseAllVideos = (swiper) => {

            swiper.slides.forEach(slide => {

                const video =
                    slide.querySelector('video')

                if (!video) return

                video.pause()

            })
        }


        const playActiveVideo = (swiper) => {

            const activeSlide =
                swiper.slides[swiper.activeIndex]

            if (!activeSlide) return

            const video =
                activeSlide.querySelector('video')

            if (!video) return

            /*
            ============================================
            SAFE AUTOPLAY
            ============================================
            */

            video.muted = true
            video.playsInline = true

            const playPromise = video.play()

            if (playPromise !== undefined) {

                playPromise.catch(() => {

                    console.log(
                        'Autoplay prevented'
                    )

                })
            }
        }



        /*
        ============================================
        INIT SWIPER
        ============================================
        */

        const videoSwiper = new Swiper('.video-swiper', {

            modules: [
                Navigation,
                Pagination,
                Autoplay
            ],

            initialSlide: 0,

            centeredSlides: true,

            loop: true,

            speed: 900,

            watchSlidesProgress: true,

            loopAdditionalSlides: 5,

            grabCursor: true,

            spaceBetween: 10,

            slidesPerView: 1.1,

            breakpoints: {

                768: {
                    slidesPerView: 1.3,
                    spaceBetween: 15
                },

                1200: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                }
            },

            /*
            ============================================
            AUTOPLAY
            ============================================
            */

            autoplay: {

                delay: 7000,

                disableOnInteraction: false,

                pauseOnMouseEnter: true
            },

            /*
            ============================================
            PAGINATION
            ============================================
            */

            pagination: {

                el: '.swiper-pagination',

                clickable: true
            },

            /*
            ============================================
            NAVIGATION
            ============================================
            */

            navigation: {

                nextEl: '.swiper-button-next',

                prevEl: '.swiper-button-prev'
            },

            /*
            ============================================
            EVENTS
            ============================================
            */

            on: {

                /*
                ============================================
                INIT
                ============================================
                */

                init: function () {

                    pauseAllVideos(this)

                    playActiveVideo(this)
                },

                /*
                ============================================
                SLIDE CHANGE END
                ============================================
                */

                slideChangeTransitionEnd: function () {

                    pauseAllVideos(this)

                    playActiveVideo(this)
                }
            }
        })
    }

    // 3. HERO SLIDER ANIMATION (Existing)
    const heroSlider = document.getElementById('steadicamHero');
    if (heroSlider) {
        heroSlider.addEventListener('slid.bs.carousel', function () {
            const activeSlide = heroSlider.querySelector('.carousel-item.active');
            const animatedElements = activeSlide.querySelectorAll('.animate__animated');
            animatedElements.forEach((el) => {
                const animationName = [...el.classList].find(cls => cls.startsWith('animate__fadeIn'));
                if (animationName) {
                    el.classList.remove(animationName);
                    void el.offsetWidth; 
                    el.classList.add(animationName);
                }
            });
        });
    }

    // 4. CONTACT FORM (Existing)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Form submitted safely!");
        });
    }
});

// NAVBAR & LOADER logic (Remains the same)
const handleNavbarScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return; 
    header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('load', handleNavbarScroll);

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => { loader.style.display = 'none'; }, 800);
        }, 2200); 
    }
});