import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // 1. SAFE TEAM SLIDER
    const teamContainer = document.querySelector(".teamCarousel");
    const section = document.querySelector('#teamSection');
    
    if (teamContainer && section) {
        const teamSwiper = new Swiper(".teamCarousel", {
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
                    teamSwiper.params.autoplay.delay = 3000;
                } else {
                    teamSwiper.autoplay.stop();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(section);
    }

    // 2. SAFE HERO SLIDER
    const heroSlider = document.getElementById('steadicamHero');
    if (heroSlider) {
        heroSlider.addEventListener('slid.bs.carousel', function () {
            const activeSlide = heroSlider.querySelector('.carousel-item.active');
            const animatedElements = activeSlide.querySelectorAll('.animate__animated');
            animatedElements.forEach((el) => {
                const animationName = [...el.classList].find(cls => cls.startsWith('animate__fadeIn'));
                el.classList.remove(animationName);
                void el.offsetWidth; 
                el.classList.add(animationName);
            });
        });
    }
});

// 3. NAVBAR SCROLL (Always runs if header exists)
const handleNavbarScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return; 

    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('load', handleNavbarScroll);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Form submitted safely!");
            // Add your email handling logic here
        });
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    
    // Smoothly exit once the page is ready
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Remove from DOM after transition to save memory
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2200); // 2.2s allows the "boot" animation to finish
});