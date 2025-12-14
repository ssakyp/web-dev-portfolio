// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// ============================================
// Smooth Scrolling for CTA Button
// ============================================
const ctaButton = document.getElementById('ctaButton');

ctaButton.addEventListener('click', () => {
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// Animated Counter for Statistics
// ============================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counter = entry.target.querySelector('.counter');
            animateCounter(counter);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

// ============================================
// Animated Skill Bars
// ============================================
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillBarObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillBarObserver.observe(bar);
});

// ============================================
// Project Modal
// ============================================
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');

const projectData = {
    ecommerce: {
        title: 'E-Commerce Website',
        description: 'A fully responsive online store built with modern web technologies. Features include product browsing, shopping cart management, user authentication, and secure payment integration.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Payment API', 'LocalStorage'],
        features: [
            'Responsive design for all devices',
            'Product filtering and search',
            'Shopping cart with real-time updates',
            'User account management',
            'Secure checkout process'
        ]
    },
    weather: {
        title: 'Weather App',
        description: 'Real-time weather application that provides current conditions and 5-day forecasts. Users can search by city or use geolocation to get local weather information.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Weather API', 'Geolocation API'],
        features: [
            'Current weather conditions',
            '5-day weather forecast',
            'Location-based weather',
            'Search by city name',
            'Interactive weather maps'
        ]
    },
    taskmanager: {
        title: 'Task Manager',
        description: 'A productivity application for managing daily tasks and to-dos. Features drag-and-drop functionality, task categorization, and data persistence using localStorage.',
        technologies: ['React', 'JavaScript', 'CSS Grid', 'LocalStorage', 'Drag & Drop API'],
        features: [
            'Create, edit, and delete tasks',
            'Drag and drop task organization',
            'Task categories and priorities',
            'Persistent data storage',
            'Search and filter tasks'
        ]
    },
    portfolio: {
        title: 'Portfolio Template',
        description: 'A modern, customizable portfolio template designed for creative professionals. Features smooth animations, responsive design, and easy customization options.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Responsive Design'],
        features: [
            'Modern and clean design',
            'Smooth scroll animations',
            'Fully responsive layout',
            'Easy to customize',
            'Optimized performance'
        ]
    }
};

// Open modal when clicking project buttons
document.querySelectorAll('.project-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = e.target.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            modalTitle.textContent = project.title;
            modalBody.innerHTML = `
                <p><strong>Description:</strong></p>
                <p>${project.description}</p>
                <p><strong>Technologies Used:</strong></p>
                <ul>
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
                <p><strong>Key Features:</strong></p>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
            
            projectModal.classList.add('active');
            projectModal.removeAttribute('hidden');
            
            // Trap focus inside modal
            modalClose.focus();
        }
    });
});

// Close modal
const closeModal = () => {
    projectModal.classList.remove('active');
    setTimeout(() => {
        projectModal.setAttribute('hidden', '');
    }, 300);
};

modalClose.addEventListener('click', closeModal);

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// Contact Form Validation and Submission
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    errorMessage.textContent = message;
};

const clearError = (input) => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    formGroup.classList.remove('error');
    errorMessage.textContent = '';
};

const validateForm = () => {
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Clear previous errors
    clearError(name);
    clearError(email);
    clearError(message);
    
    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        
        setTimeout(() => {
            formStatus.textContent = 'Message sent successfully! Thank you for contacting me.';
            formStatus.classList.add('success');
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }, 1500);
    }
});

// Real-time validation
['name', 'email', 'message'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => {
        validateForm();
    });
    
    field.addEventListener('input', () => {
        if (field.parentElement.classList.contains('error')) {
            clearError(field);
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
        scrollToTopButton.removeAttribute('hidden');
    } else {
        scrollToTopButton.classList.remove('visible');
        if (!scrollToTopButton.classList.contains('visible')) {
            setTimeout(() => {
                scrollToTopButton.setAttribute('hidden', '');
            }, 300);
        }
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ============================================
// Add Animations on Scroll
// ============================================
const fadeElements = document.querySelectorAll('.project-card, .skill-category');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(element);
});

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add keyboard navigation support
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
});

// ============================================
// Performance Optimization - Lazy Loading
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
