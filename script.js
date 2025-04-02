// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show-mobile');
        
        // Add the mobile menu styles dynamically if they don't exist yet
        if (!document.getElementById('mobile-styles')) {
            const mobileStyles = document.createElement('style');
            mobileStyles.id = 'mobile-styles';
            mobileStyles.textContent = `
                .show-mobile {
                    display: flex !important;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: white;
                    padding: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
            `;
            document.head.appendChild(mobileStyles);
        }
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission (placeholder - would need backend integration)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            organization: document.getElementById('organization') ? document.getElementById('organization').value : '',
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            interest: document.getElementById('interest') ? document.getElementById('interest').value : ''
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message (in a real implementation, you'd send this to a server)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Check if we're on the main page with anchor links or on a separate page
const isMainPage = window.location.pathname === '/' || 
                   window.location.pathname === '/index.html' || 
                   window.location.pathname.endsWith('index.html');

// Smooth scrolling for anchor links (only on the main page)
if (isMainPage) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling (for better UX)
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Add animation when elements come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.problem-card, .benefit-card, .tech-feature, .partner, .mission-point, .stat-card, .tech-highlight, .partner-card, .funding-option, .testimonial-card, .process-step, .benefit-stat-item, .benefit-point, .community-benefit');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Add the animation styles dynamically if they don't exist yet
                if (!document.getElementById('animation-styles')) {
                    const animationStyles = document.createElement('style');
                    animationStyles.id = 'animation-styles';
                    animationStyles.textContent = `
                        .animated {
                            animation: fadeInUp 0.6s ease forwards;
                        }
                        
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `;
                    document.head.appendChild(animationStyles);
                }
            }
        }
    });
};

// FAQ Toggle Functionality (if FAQ section exists)
const faqItems = document.querySelectorAll('.faq-question');
if (faqItems.length > 0) {
    faqItems.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Check if this FAQ is already open
            const isOpen = faqItem.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If the clicked FAQ wasn't open before, open it
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Initial run to animate elements already in view
window.addEventListener('load', animateOnScroll);