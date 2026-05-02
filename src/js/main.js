// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

const heroSlider = document.getElementById('steadicamHero');

heroSlider.addEventListener('slid.bs.carousel', function () {
    // Find all animated elements in the active slide
    const activeSlide = heroSlider.querySelector('.carousel-item.active');
    const animatedElements = activeSlide.querySelectorAll('.animate__animated');
    
    // Refresh the animation by removing and re-adding the classes
    animatedElements.forEach((el) => {
        const animationName = [...el.classList].find(cls => cls.startsWith('animate__fadeIn'));
        el.classList.remove(animationName);
        void el.offsetWidth; // Trigger a reflow to reset CSS
        el.classList.add(animationName);
    });
});

// Function to handle navbar background transition
const handleNavbarScroll = () => {
    const header = document.querySelector('.site-header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Listen for scroll events
window.addEventListener('scroll', handleNavbarScroll);

// Run on page load in case user refreshes mid-page
document.addEventListener('DOMContentLoaded', handleNavbarScroll);