// Register GSAP Plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hoverElements = document.querySelectorAll('[data-hover]');
const nav = document.querySelector('.savor-nav');

// Debug check
console.log('CCS Demo Script Initialized');

// 0. Nav Scroll Effect (Glassmorphism)
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// 1. Custom Cursor Logic
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows precisely
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with smooth delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });
}

// Hover effects for cursor
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


// 2. Preloader (Robust Fail-safe)
let revealed = false;
function revealPage() {
    if (revealed) return; // Already revealed
    revealed = true;
    console.log('Revealing page...');

    try {
        if (typeof gsap === 'undefined') {
            console.error('GSAP not loaded! Skipping preloader animation.');
            forceHidePreloader();
            return;
        }

        const tl = gsap.timeline();

        // Check if preloader elements exist
        const preloaderElement = document.querySelector('.preloader');
        const loaderLine = document.querySelector('.loader-line');
        const loaderText = document.querySelector('.loader-text');

        if (preloaderElement && loaderLine && loaderText) {
            tl.to(loaderLine, {
                width: '100%',
                duration: 0.8,
                ease: 'power2.inOut'
            })
                .to(loaderText, {
                    y: -30,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.in'
                })
                .to(preloaderElement, {
                    yPercent: -100,
                    duration: 1,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        document.body.classList.add('loaded');
                        document.body.classList.remove('loading');
                    }
                });
        } else {
            // If preloader elements are missing, just mark as loaded
            forceHidePreloader();
            console.warn('Preloader elements not found. Skipping preloader animation.');
        }

        // 3. Hero Animations (only if elements exist)
        const heroContent = document.querySelector('.hero-content');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroContent) {
            tl.fromTo(heroContent,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
                , preloaderElement ? "-=0.3" : 0); // Adjust position based on whether preloader ran
        }

        if (scrollIndicator) {
            tl.fromTo(scrollIndicator,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 }
                , "-=0.8");
        }
    } catch (error) {
        console.error('Error in revealPage:', error);
        forceHidePreloader();
    }
}

function forceHidePreloader() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
    const loader = document.querySelector('.preloader');
    if (loader) loader.style.display = 'none';
}

// Trigger on load
window.addEventListener('load', revealPage);

// Fail-safe: Force reveal after 4 seconds
setTimeout(revealPage, 4000);


// 4. Scroll Animations (General)
if (typeof gsap !== 'undefined') {
    gsap.utils.toArray('[data-scroll]').forEach((element, i) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%', // Slightly adjusted start
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 5. Story Image Reveal
    const imgReveal = document.querySelector('.img-reveal');
    const storySection = document.querySelector('.story-section');
    if (imgReveal && storySection) {
        gsap.to(imgReveal, {
            scrollTrigger: {
                trigger: storySection,
                start: 'top 70%', // Slightly adjusted start
            },
            height: '0%',
            duration: 1.8,
            ease: 'expo.out'
        });
    }
}

// 6. Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block'; // Ensure it's visible before animating
                    gsap.fromTo(item,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in',
                        onComplete: () => item.style.display = 'none'
                    });
                }
            });
        });
    });
}


// 7. Cart & Toast
let currentCartCount = 0; // Renamed to avoid conflict with new 'count'
const cartDisplay = document.querySelector('.cart-count');
const addBtns = document.querySelectorAll('.btn-add');
const floatingCart = document.querySelector('.floating-cart'); // Added for jiggle animation
const toast = document.querySelector('.toast-notification');

if (addBtns.length > 0 && cartDisplay) { // Check if necessary elements exist
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCartCount++;
            cartDisplay.textContent = currentCartCount;

            // Jiggle animation on cart
            if (floatingCart && typeof gsap !== 'undefined') {
                gsap.fromTo(floatingCart,
                    { rotation: -15, scale: 1.3 },
                    { rotation: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
                );
            }

            // Show Toast
            if (toast) {
                toast.classList.add('show'); // Changed 'active' to 'show' as per instruction snippet
                setTimeout(() => toast.classList.remove('show'), 2500);
            }
        });
    });
}

// 8. Form Logic
const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (bookingForm && modal) { // Ensure both form and modal exist
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('visible');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('visible');
        bookingForm.reset();
    });
}
