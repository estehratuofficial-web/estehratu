// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initStickyHeader();
    initSmoothScrolling();
    initTestimonialCarousel();
    initMobileMenu();
    initScrollAnimations();
    initCTAButtons();
});

// Sticky Header Functionality
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Only target anchor links that don't contain .html
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href*=".html"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    console.log('Carousel elements:', { track, cards: cards.length, prevBtn, nextBtn });
    
    if (!track || !cards.length || !prevBtn || !nextBtn) {
        console.log('Missing carousel elements');
        return;
    }
    
    let currentIndex = 0;
    let cardWidth = cards[0].offsetWidth + 30; // Including gap
    const maxIndex = Math.max(0, cards.length - 1); // Show 1 card at a time for better mobile experience
    
    console.log('Initial values:', { cardWidth, maxIndex, cardsLength: cards.length });
    
    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        console.log('Updated carousel:', { currentIndex, translateX });
    }
    
    function nextSlide() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }
    
    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 3000);
    
    // Event listeners with better error handling
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next button clicked');
            clearInterval(autoPlayInterval);
            nextSlide();
            autoPlayInterval = setInterval(nextSlide, 3000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev button clicked');
            clearInterval(autoPlayInterval);
            prevSlide();
            autoPlayInterval = setInterval(nextSlide, 3000);
        });
    }
    
    // Pause auto-play on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 3000);
    });
    
    // Responsive carousel
    window.addEventListener('resize', function() {
        cardWidth = cards[0].offsetWidth + 30;
        updateCarousel();
    });
    
    // Initial setup
    updateCarousel();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = navMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't interfere with external links
            const href = this.getAttribute('href');
            if (href && (href.includes('.html') || href.startsWith('http') || this.hasAttribute('data-external'))) {
                // Let external links work normally
                return;
            }
            
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.highlight-card, .menu-card, .testimonial-card, .story-text, .queen-character');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// CTA Button Functionality
function initCTAButtons() {
    // WhatsApp integration
    const whatsappButtons = document.querySelectorAll('.franchise-btn, .cta-button');
    const whatsappNumber = '6285936127055'; // Es Teh Ratu WhatsApp number
    
    whatsappButtons.forEach(button => {
        if (button.classList.contains('franchise-btn')) {
            button.addEventListener('click', function() {
                const message = encodeURIComponent('Halo! Saya tertarik dengan peluang franchise Es Teh Ratu. Bisa minta informasi lebih lanjut?');
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            });
        } else {
            button.addEventListener('click', function() {
                const message = encodeURIComponent('Halo! Saya ingin memesan Es Teh Ratu. Bisa minta informasi menu dan harga?');
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            });
        }
    });
    
    // Menu order buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-card').querySelector('h3').textContent;
            const price = this.closest('.menu-card').querySelector('.price').textContent;
            const message = encodeURIComponent(`Halo! Saya ingin memesan ${menuItem} (${price}). Terima kasih!`);
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    });
    
    // Smooth scroll for "Lihat Menu" button
    const menuViewButton = document.querySelector('.btn-secondary');
    if (menuViewButton) {
        menuViewButton.addEventListener('click', function() {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = menuSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Add CSS animations for scroll effects
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .highlight-card.animate-element {
        transition-delay: 0.1s;
    }
    
    .highlight-card:nth-child(2).animate-element {
        transition-delay: 0.2s;
    }
    
    .highlight-card:nth-child(3).animate-element {
        transition-delay: 0.3s;
    }
    
    .menu-card.animate-element {
        transition-delay: 0.1s;
    }
    
    .menu-card:nth-child(2).animate-element {
        transition-delay: 0.2s;
    }
    
    .menu-card:nth-child(3).animate-element {
        transition-delay: 0.3s;
    }
    
    .menu-card:nth-child(4).animate-element {
        transition-delay: 0.4s;
    }
    
    .menu-card:nth-child(5).animate-element {
        transition-delay: 0.5s;
    }
    
    .menu-card:nth-child(6).animate-element {
        transition-delay: 0.6s;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu ul {
            flex-direction: column;
            gap: 20px;
        }
        
        .nav-menu a {
            font-size: 1.1rem;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.batik-pattern, .tea-cup');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('batik-pattern') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const teaCup = document.querySelector('.tea-cup');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 400);
    
    setTimeout(() => {
        if (heroButtons) heroButtons.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 600);
    
    setTimeout(() => {
        if (teaCup) teaCup.style.animation = 'fadeInRight 1s ease forwards, float 3s ease-in-out infinite 1s';
    }, 800);
});

// Add keyframe animations
const keyframeStyle = document.createElement('style');
keyframeStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px) rotate(-5deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotate(-5deg);
        }
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-buttons,
    .tea-cup {
        opacity: 0;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-buttons,
    .loaded .tea-cup {
        opacity: 1;
    }
`;
document.head.appendChild(keyframeStyle);
