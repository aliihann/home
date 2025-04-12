// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const contactForm = document.querySelector('.contact-form');
const searchForm = document.querySelector('.search-form');

// Initialize active testimonial index
let activeTestimonialIndex = 0;

// Theme Switcher
function initTheme() {
  // Check for saved user preference, if any
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  document.body.className = savedTheme;
  themeSwitch.checked = savedTheme === 'dark-theme';
}

function toggleTheme() {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  }
}

// Mobile Navigation Toggle
function toggleNavigation() {
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
    hamburger.classList.remove('active');
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.right = '0';
    navLinks.style.backgroundColor = 'var(--card-bg)';
    navLinks.style.padding = '20px';
    navLinks.style.borderRadius = 'var(--radius-md)';
    navLinks.style.boxShadow = '0 5px 15px var(--shadow)';
    navLinks.style.width = '200px';
    navLinks.style.zIndex = '1000';
    hamburger.classList.add('active');
  }
}

// Testimonial Slider
function showTestimonial(index) {
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Ensure index is within bounds
  if (index < 0) {
    activeTestimonialIndex = testimonialCards.length - 1;
  } else if (index >= testimonialCards.length) {
    activeTestimonialIndex = 0;
  } else {
    activeTestimonialIndex = index;
  }
  
  testimonialCards[activeTestimonialIndex].classList.add('active');
  dots[activeTestimonialIndex].classList.add('active');
}

// Go to next testimonial
function nextTestimonial() {
  showTestimonial(activeTestimonialIndex + 1);
}

// Go to previous testimonial
function prevTestimonial() {
  showTestimonial(activeTestimonialIndex - 1);
}

// Auto-play testimonials
function startTestimonialAutoplay() {
  testimonialsInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

// Form submission handling
function handleContactFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service-select').value;
  const message = document.getElementById('message').value;
  const privacyConsent = document.getElementById('privacy').checked;
  
  // Simple form validation
  if (!name || !phone || !privacyConsent) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }
  
  // Simulate form submission
  const formData = {
    name,
    phone,
    email,
    service,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Log form data (for this example, in a real app you would send to a server)
  console.log('Form submission:', formData);
  
  // Show success message
  alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
  
  // Reset form
  e.target.reset();
}

// Handle search form submission
function handleSearchFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const propertyType = document.getElementById('property-type').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  
  // In a real app, you would redirect to search results page with these parameters
  console.log('Search parameters:', { propertyType, location, price });
  
  // Show message for the demo
  alert('Поиск выполнен. В реальном приложении здесь бы отобразились результаты поиска.');
}

// Animation when elements come into view
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .property-card, .section-header, .about-content, .contact-content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
        toggleNavigation();
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Event Listeners
  themeSwitch.addEventListener('change', toggleTheme);
  hamburger.addEventListener('click', toggleNavigation);
  prevBtn.addEventListener('click', prevTestimonial);
  nextBtn.addEventListener('click', nextTestimonial);
  
  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Form submissions
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }
  
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearchFormSubmit);
  }
  
  // Start testimonial autoplay
  startTestimonialAutoplay();
  
  // Initialize animations
  animateOnScroll();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Stop testimonial autoplay on mouse hover
  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialsInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      startTestimonialAutoplay();
    });
  }
});

// Sticky header effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px var(--shadow)';
    header.style.backdropFilter = 'blur(10px)';
    header.style.backgroundColor = document.body.classList.contains('light-theme') 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(18, 18, 18, 0.9)';
  } else {
    header.style.boxShadow = '0 2px 10px var(--shadow)';
    header.style.backdropFilter = 'blur(0)';
    header.style.backgroundColor = document.body.classList.contains('light-theme')
      ? 'var(--light-card-bg)'
      : 'var(--dark-card-bg)';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (
    window.innerWidth <= 768 && 
    navLinks.style.display === 'flex' && 
    !navLinks.contains(e.target) && 
    !hamburger.contains(e.target)
  ) {
    toggleNavigation();
  }
});

// Adjust navigation on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && navLinks.style.display === 'flex') {
    navLinks.removeAttribute('style');
    hamburger.classList.remove('active');
  }
});