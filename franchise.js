// Franchise Page JavaScript

// WhatsApp Integration
function selectPackage(packageType) {
    let message = '';
    let packageName = '';
    let price = '';
    
    switch(packageType) {
        case 'ekonomis':
            packageName = 'Paket Booth Ekonomis';
            price = 'Rp1.800.000';
            message = `Halo! Saya tertarik dengan paket ${packageName} (${price}). Bisa tolong berikan informasi lebih detail tentang paket ini?`;
            break;
        case 'sedang':
            packageName = 'Paket Booth Gerobak';
            price = 'Rp2.800.000';
            message = `Halo! Saya tertarik dengan paket ${packageName} (${price}). Bisa tolong berikan informasi lebih detail tentang paket ini?`;
            break;
        case 'sultan':
            packageName = 'Paket Booth Kontainer';
            price = 'Rp5.300.000';
            message = `Halo! Saya tertarik dengan paket ${packageName} (${price}). Bisa tolong berikan informasi lebih detail tentang paket ini?`;
            break;
    }
    
    const whatsappNumber = '6285936127055'; // Es Teh Ratu WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Back to Home function
function orderWhatsApp() {
    window.location.href = 'index.html';
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to package cards
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add loading animation
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add sticky header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});
