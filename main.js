// Throttled Header Scroll Effect
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const header = document.querySelector('.header');
            if (lastScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });


// High-Performance Reveal Animations using IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we don't need to observe it anymore
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

const initReveals = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => revealObserver.observe(element));
};

document.addEventListener('DOMContentLoaded', initReveals);


// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form AJAX Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => {
                // Success feedback
                this.innerHTML = `
                <div class="form-success reveal active form-success-box">
                    <h3 class="form-success-title">Message Sent!</h3>
                    <p>Thanks for reaching out! We'll be in touch with you shortly.</p>
                </div>
            `;
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                alert('Oops! There was an error. Please try again or email us directly.');
            });
    });
}

// Optimized Tidio Loading (Delay to boost initial performance scores)
const loadTidio = () => {
    if (window.tidioLoaded) return;
    window.tidioLoaded = true;

    const script = document.createElement("script");
    script.src = "https://code.tidio.co/fl0ovhe7n3npo8ts4jkrestfqyojnghn.js";
    script.async = true;
    document.body.appendChild(script);
};

// Load Tidio after a delay or on first user interaction
window.addEventListener('load', () => {
    setTimeout(loadTidio, 4000); // 4 second delay
});

['mousedown', 'mousemove', 'touchstart', 'scroll', 'keydown'].forEach(event => {
    window.addEventListener(event, loadTidio, { once: true, passive: true });
});




