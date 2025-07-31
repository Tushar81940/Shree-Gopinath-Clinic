// Dental Clinic Website JavaScript

// Testimonials data
const testimonials = [
    {
        name: "Meera Sharma",
        location: "Dehradun",
        rating: 5,
        text: "Dr. Sudha helped my mother smile again pain-free. Her gentle approach and expertise made all the difference. The dental implants look and feel so natural!",
        treatment: "Dental Implants"
    },
    {
        name: "Rajesh Kumar",
        location: "Indra Nagar",
        rating: 5,
        text: "Her hands are magic. I was terrified of dental procedures, but Dr. Sudha made my root canal completely painless. Highly recommend!",
        treatment: "Root Canal"
    },
    {
        name: "Priya Patel",
        location: "Clement Town",
        rating: 5,
        text: "The smile designing treatment transformed my confidence completely. Dr. Sudha understood exactly what I wanted and delivered perfect results.",
        treatment: "Smile Designing"
    },
    {
        name: "Vinod Singh",
        location: "Saharanpur Road",
        rating: 5,
        text: "15 years of experience really shows! Professional, caring, and honest pricing. The entire family now comes here for dental care.",
        treatment: "Family Dentistry"
    },
    {
        name: "Anita Bhatt",
        location: "Mussoorie Road",
        rating: 5,
        text: "Dr. Sudha's gentle approach with children is amazing. My son actually looks forward to dental visits now!",
        treatment: "Pediatric Care"
    }
];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const testimonialCard = document.querySelector('.testimonial-card');
const testimonialText = document.querySelector('.testimonial-text');
const testimonialAuthor = document.querySelector('.testimonial-author');
const navDots = document.querySelectorAll('.nav-dot');
const appointmentForm = document.getElementById('appointmentForm');
const whatsappWidget = document.getElementById('whatsappWidget');
const floatingBtn = document.querySelector('.floating-btn');

// Current testimonial index
let currentTestimonialIndex = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTestimonials();
    initializeFormHandling();
    initializeWhatsAppWidget();
    initializeSmoothScrolling();
    setMinDateForAppointment();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            mobileNavLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Testimonials carousel
function initializeTestimonials() {
    // Auto-rotate testimonials
    setInterval(rotateTestimonials, 5000);

    // Manual navigation with dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonialIndex = index;
            updateTestimonial();
            updateNavDots();
        });
    });

    // Initial update
    updateTestimonial();
    updateNavDots();
}

function rotateTestimonials() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
    updateNavDots();
}

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    
    if (testimonialText && testimonialAuthor) {
        testimonialText.textContent = `"${testimonial.text}"`;
        
        testimonialAuthor.innerHTML = `
            <div class="author-info">
                <div class="author-name">${testimonial.name}</div>
                <div class="author-location">${testimonial.location}</div>
                <div class="author-treatment">${testimonial.treatment}</div>
            </div>
        `;
    }
}

function updateNavDots() {
    navDots.forEach((dot, index) => {
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Form handling
function initializeFormHandling() {
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.service || !data.date) {
        showToast('Please fill all required fields', 'error');
        return;
    }
    
    // Create WhatsApp message
    const message = `Hello Dr. Sudha Singh,\n\nI would like to book an appointment:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || 'Not provided'}\nService Needed: ${data.service}\nPreferred Date: ${data.date}\nPreferred Time: ${data.time || 'Not specified'}\nAdditional Message: ${data.message || 'None'}\n\nThank you!`;

    const whatsappUrl = `https://wa.me/917579165045?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    alert('Your appointment is booked!');
    appointmentForm.reset();
}

// WhatsApp widget functionality
function initializeWhatsAppWidget() {
    if (floatingBtn) {
        floatingBtn.addEventListener('click', toggleWhatsApp);
    }
}

function toggleWhatsApp() {
    if (whatsappWidget) {
        whatsappWidget.classList.toggle('active');
    }
}

// WhatsApp integration functions
function openWhatsApp() {
    const message = "Hello Dr. Sudha Singh, I would like to book an appointment or have a query about dental services.";
    const whatsappUrl = `https://wa.me/917579165045?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close widget if open
    if (whatsappWidget) {
        whatsappWidget.classList.remove('active');
    }
}

function openWhatsAppWithFormData() {
    // Get form data
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const service = document.getElementById('service')?.value || '';
    const date = document.getElementById('date')?.value || '';
    const time = document.getElementById('time')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    // Create customized message
    let whatsappMessage = "Hello Dr. Sudha Singh,\n\nI would like to book an appointment with the following details:\n\n";
    
    if (name) whatsappMessage += `👤 *Name:* ${name}\n`;
    if (phone) whatsappMessage += `📞 *Phone:* ${phone}\n`;
    if (email) whatsappMessage += `📧 *Email:* ${email}\n`;
    if (service) whatsappMessage += `🦷 *Service Needed:* ${service}\n`;
    if (date) whatsappMessage += `📅 *Preferred Date:* ${date}\n`;
    if (time) whatsappMessage += `⏰ *Preferred Time:* ${time}\n`;
    if (message) whatsappMessage += `💬 *Additional Message:* ${message}\n`;
    
    whatsappMessage += "\nPlease confirm my appointment. Thank you!";
    
    const whatsappUrl = `https://wa.me/917579165045?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close widget if open
    if (whatsappWidget) {
        whatsappWidget.classList.remove('active');
    }
}

function bookAppointment() {
    // Scroll to appointment section
    const appointmentSection = document.getElementById('contact');
    if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function callNow() {
    window.location.href = "tel:+917579165045";
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
            }
        });
    });
}

// Set minimum date for appointment form
function setMinDateForAppointment() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
    `;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

});



// Intersection Observer for animations
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
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-mini');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu close on outside click
document.addEventListener('click', function(e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Keyboard navigation for testimonials
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
        updateNavDots();
    } else if (e.key === 'ArrowRight') {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
        updateNavDots();
    }
});

// Form validation
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation listeners
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ef4444';
                showToast('Please enter a valid 10-digit phone number', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showToast('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('btn-cta')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Add hover effects for better UX
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.service-card, .feature-card, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
});

// Export functions for global access
window.openWhatsApp = openWhatsApp;
window.bookAppointment = bookAppointment;
window.callNow = callNow;
window.toggleWhatsApp = toggleWhatsApp;
window.handleAppointmentSubmit = handleAppointmentSubmit;