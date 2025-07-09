// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling (front-end only for now)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    this.reset();
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Header background opacity on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
});

// Animate elements on scroll (Intersection Observer)
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.grid > div, .bg-empire-gray, .bg-empire-dark > div');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('#hero h1 .text-empire-gold');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service pricing hover effects
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'scale(1)';
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn, a[class*="bg-empire-gold"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .btn, a[class*="bg-empire-gold"] {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Language switching functionality
let currentLanguage = 'en';

// Initialize language system on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    changeLanguage(savedLanguage);
    
    // Setup language menu toggle
    const languageBtn = document.getElementById('language-btn');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle('hidden');
        });
        
        // Close language menu when clicking outside
        document.addEventListener('click', function() {
            languageMenu.classList.add('hidden');
        });
        
        // Prevent menu from closing when clicking inside it
        languageMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Change language function
function changeLanguage(language) {
    if (!translations[language]) {
        console.warn(`Translation for language "${language}" not found`);
        return;
    }
    
    currentLanguage = language;
    
    // Update current language display
    const currentLangDisplay = document.getElementById('current-lang');
    if (currentLangDisplay) {
        const langMap = { en: 'EN', fr: 'FR', ar: 'ع' };
        currentLangDisplay.textContent = langMap[language] || language.toUpperCase();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[language], key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update page direction for Arabic
    if (language === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
        document.body.style.fontFamily = 'Arial, sans-serif'; // Better Arabic font support
    } else {
        document.documentElement.dir = 'ltr';
        document.body.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
        document.body.style.fontFamily = ''; // Reset to default
    }
    
    // Update page meta tags
    updateMetaTags(language);
    
    // Save language preference
    localStorage.setItem('preferred-language', language);
    
    // Close language menu
    const languageMenu = document.getElementById('language-menu');
    if (languageMenu) {
        languageMenu.classList.add('hidden');
    }
}

// Update meta tags for SEO
function updateMetaTags(lang) {
    const titles = {
        en: "The Empire - Digital Network of Content & Creativity | EmperialCoder",
        fr: "The Empire - Réseau Numérique de Contenu et Créativité | EmperialCoder", 
        ar: "الإمبراطورية - شبكة رقمية للمحتوى والإبداع | EmperialCoder"
    };
    
    const descriptions = {
        en: "Explore The Empire's network of specialized content websites and hire EmperialCoder for professional web development, logo design, and custom software solutions. Based in Tunisia.",
        fr: "Explorez le réseau de sites web de contenu spécialisé de The Empire et engagez EmperialCoder pour le développement web professionnel, design de logo, et solutions logicielles personnalisées. Basé en Tunisie.",
        ar: "استكشف شبكة الإمبراطورية من مواقع المحتوى المتخصص واستعن بـ EmperialCoder للتطوير الاحترافي للمواقع وتصميم الشعارات والحلول البرمجية المخصصة. مقرها في تونس."
    };
    
    // Update page title
    document.title = titles[lang];
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descriptions[lang]);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', titles[lang]);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descriptions[lang]);
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', titles[lang]);
    
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', descriptions[lang]);
}

// Helper function to get nested translation
function getNestedTranslation(translations, key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], translations);
}

// Make changeLanguage function globally available
window.changeLanguage = changeLanguage;
