// ===== AIRCEPTION WEBSITE JAVASCRIPT =====

// Initialize AOS (Animate On Scroll) when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeModals();
    initializeCTAButtons();
    initializeFormHandling();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    // Handle scroll effects for navigation
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu when pressing escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-background');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Update active navigation item based on scroll position
    updateActiveNavItem();
    window.addEventListener('scroll', updateActiveNavItem);
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100; // Offset for fixed navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModals() {
    const modal = document.getElementById('privacy-modal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal('privacy-modal');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal('privacy-modal');
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal('privacy-modal');
        }
    });
}

function showPrivacyPolicy() {
    showModal('privacy-modal');
}

function showTerms() {
    // Placeholder for terms modal
    alert('Terms of Service would be displayed here in a full implementation.');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus management for accessibility
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== CTA BUTTON FUNCTIONALITY =====
function initializeCTAButtons() {
    // Handle all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-footer');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Handle different CTA actions
            const buttonText = button.textContent.toLowerCase();
            
            if (buttonText.includes('demo') || buttonText.includes('schedule') || buttonText.includes('call')) {
                handleDemoRequest();
            } else if (buttonText.includes('download') || buttonText.includes('brochure')) {
                handleDownloadRequest();
            } else if (buttonText.includes('see how') || buttonText.includes('works')) {
                scrollToSection('how-it-works');
            }
        });
    });
}

function handleDemoRequest() {
    // In a real implementation, this would open a contact form or calendar booking
    showContactForm();
}

function handleDownloadRequest() {
    // In a real implementation, this would trigger a download
    alert('Brochure download would be triggered here. In a full implementation, this would download a PDF brochure.');
}

function showContactForm() {
    // Create a simple contact form modal
    const formHTML = `
        <div id="contact-modal" class="modal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('contact-modal')">&times;</span>
                <h2>Schedule a Demo</h2>
                <form id="demo-form">
                    <div style="margin-bottom: 1rem;">
                        <label for="name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name *</label>
                        <input type="text" id="name" name="name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
                        <input type="email" id="email" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="company" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Company</label>
                        <input type="text" id="company" name="company" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="phone" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone</label>
                        <input type="tel" id="phone" name="phone" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label for="message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message</label>
                        <textarea id="message" name="message" rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; resize: vertical;" placeholder="Tell us about your healthcare facility and monitoring needs..."></textarea>
                    </div>
                    <button type="submit" class="cta-primary" style="width: 100%; justify-content: center;">
                        <i class="fas fa-paper-plane"></i>
                        Send Request
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Remove existing contact modal if present
    const existingModal = document.getElementById('contact-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add form to body
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Handle form submission
    const form = document.getElementById('demo-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form);
    });
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    // Handle any existing forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(form);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (in real implementation, send to server)
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Close modal
        closeModal('contact-modal');
        
        // Log form data (remove in production)
        console.log('Form submitted:', data);
    }, 2000);
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Thank you! We'll contact you within 24 hours to schedule your demo.
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    updateActiveNavItem();
}, 10);

// Lazy loading for images (if needed)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initializeAccessibility() {
    // Handle keyboard navigation for mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
            
            // Close any open modals
            const modals = document.querySelectorAll('.modal[style*="display: block"]');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
    
    // Improve focus management
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
    
    // In a real implementation, you would send this to Google Analytics, etc.
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// ===== SOCIAL SHARING =====
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('airCeption - Cutting-Edge Ambient AI-Driven Patient Monitoring');
    const summary = encodeURIComponent('Revolutionizing continence management with ambient, AI-driven sensing technology.');
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
    
    trackEvent('Social', 'Share', 'LinkedIn');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out airCeption - revolutionary ambient AI-driven patient monitoring technology! #HealthTech #AI #PatientCare');
    
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    
    trackEvent('Social', 'Share', 'Twitter');
}

// ===== CUSTOM ANIMATIONS =====
function addCustomAnimations() {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZATION =====
// Call accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    addCustomAnimations();
    
    // Add pulse animation to primary CTA buttons
    const primaryCTAs = document.querySelectorAll('.cta-primary');
    primaryCTAs.forEach(cta => {
        cta.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        cta.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });
});

// ===== BROWSER COMPATIBILITY =====
// Polyfill for older browsers
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send errors to a logging service
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.airCeption = {
    scrollToSection,
    showPrivacyPolicy,
    showTerms,
    shareOnLinkedIn,
    shareOnTwitter,
    trackEvent
};
