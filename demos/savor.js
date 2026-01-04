// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hoverElements = document.querySelectorAll('[data-hover]');
const nav = document.querySelector('.savor-nav');

// 0. Nav Scroll Effect (Glassmorphism)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 1. Custom Cursor Logic
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

// Hover effects for cursor
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


// 2. Preloader (Refined)
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.loader-line', {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut'
    })
        .to('.loader-text', {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in'
        })
        .to('.preloader', {
            yPercent: -100,
            duration: 1.2,
            ease: 'expo.inOut',
            onComplete: () => document.body.classList.add('loaded')
        })
        // 3. Hero Animations
        .fromTo('.hero-content',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
            , "-=0.5")
        .fromTo('.scroll-indicator',
            { opacity: 0 },
            { opacity: 1, duration: 1 }
            , "-=1");
});


// 4. Scroll Animations (General)
gsap.utils.toArray('[data-scroll]').forEach((element, i) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// 5. Story Image Reveal
gsap.to('.img-reveal', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 60%',
    },
    height: '0%',
    duration: 1.8,
    ease: 'expo.out'
});


// 6. Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                gsap.to(item, { display: 'block', opacity: 1, scale: 1, duration: 0.5 });
            } else {
                gsap.to(item, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => item.style.display = 'none' });
            }
        });
    });
});


// 7. Cart & Toast
let cartCount = 0;
const cartDisplay = document.querySelector('.cart-count');
const addBtns = document.querySelectorAll('.btn-add');
const toast = document.querySelector('.toast-notification');

addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        cartDisplay.textContent = cartCount;

        // Jiggle animation on cart
        gsap.fromTo('.floating-cart',
            { rotation: -15, scale: 1.3 },
            { rotation: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
        );

        // Show Toast
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 2500);
    });
});

// 8. Form Logic
const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        bookingForm.reset();
    });
}
