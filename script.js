// Main JavaScript for WIGGLENWOW website

document.addEventListener('DOMContentLoaded', function() {
    console.log('WIGGLENWOW website loaded 🚀');
    
    // Initialize all interactive features
    initCategoryAccordions();
    initHoverEffects();
    initTrustSection();
    initWeeklyHighlight();
    initSmoothScrolling();
    initClickTracking();
    
    // Add some visual effects on load
    addLoadAnimations();
});

// Category Accordion Functionality
function initCategoryAccordions() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Close all categories except the first one
    categoryCards.forEach((card, index) => {
        if (index === 0) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Add click event to category headers
    categoryCards.forEach(card => {
        const header = card.querySelector('.category-header');
        
        header.addEventListener('click', () => {
            // Close all other categories
            categoryCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current category
            card.classList.toggle('active');
            
            // Add animation class
            card.classList.add('clicked');
            setTimeout(() => {
                card.classList.remove('clicked');
            }, 300);
        });
    });
}

// Hover Effects for Interactive Elements
function initHoverEffects() {
    // Social cards hover effect
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
    
    // Product links hover effect
    const productLinks = document.querySelectorAll('.product-link');
    
    productLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(4px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .social-btn, .highlight-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Trust Section Interactions
function initTrustSection() {
    const trustSection = document.querySelector('.trust-section');
    const principles = document.querySelectorAll('.principle');
    
    // Animate principles on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                principles.forEach((principle, index) => {
                    setTimeout(() => {
                        principle.style.opacity = '1';
                        principle.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (trustSection) {
        observer.observe(trustSection);
    }
    
    // Initial state
    principles.forEach(principle => {
        principle.style.opacity = '0';
