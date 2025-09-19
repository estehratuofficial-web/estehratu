// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initCTAButtons();
    initScrollAnimations();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// CTA Button Functionality
function initCTAButtons() {
    // WhatsApp integration
    const whatsappNumber = '6285936127055'; // Es Teh Ratu WhatsApp number
    
    // Primary CTA buttons (Pesan Sekarang)
    const orderButtons = document.querySelectorAll('.btn-primary');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = encodeURIComponent('Halo! Saya ingin memesan Es Teh Ratu setelah membaca cerita brand Anda. Bisa minta informasi menu dan harga?');
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    });
    
    // Secondary CTA buttons (Bergabung Jadi Mitra)
    const partnerButtons = document.querySelectorAll('.btn-secondary');
    partnerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = encodeURIComponent('Halo! Saya tertarik untuk bergabung sebagai mitra Es Teh Ratu. Bisa minta informasi lengkap tentang program kemitraan?');
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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
    const animateElements = document.querySelectorAll('.value-card, .story-text, .testimonial-content');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// Add CSS animations for scroll effects
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-card.animate-element {
        transition-delay: 0.1s;
    }
    
    .value-card:nth-child(2).animate-element {
        transition-delay: 0.2s;
    }
    
    .value-card:nth-child(3).animate-element {
        transition-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroImage = document.querySelector('.hero-tea-image');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 400);
    
    setTimeout(() => {
        if (heroImage) heroImage.style.animation = 'fadeInRight 1s ease forwards, gentle-float 4s ease-in-out infinite 1s';
    }, 600);
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
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-tea-image {
        opacity: 0;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-tea-image {
        opacity: 1;
    }
`;
document.head.appendChild(keyframeStyle);
