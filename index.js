// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sidebar interaction
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Animate progress bar on load
window.addEventListener('load', function() {
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '78%';
        }
    }, 1500);
});

// Enhanced hover effects for cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
});

// Animate floating orbs
function animateOrbs() {
    const orbs = document.querySelectorAll('.blur-orb');
    orbs.forEach((orb, index) => {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        
        orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        setTimeout(() => {
            orb.style.transform = 'translate(0px, 0px)';
        }, 3000 + index * 1000);
    });
}

// Run orb animation every 8 seconds
setInterval(animateOrbs, 8000);

// Parallax effect for background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelector('.background-effects').style.transform = `translateY(${rate}px)`;
});

// Dynamic gradient animation
let gradientAngle = 0;
function animateGradient() {
    gradientAngle += 0.5;
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        heroTitle.style.background = `linear-gradient(${gradientAngle}deg, #3b82f6, #8b5cf6, #ec4899)`;
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.webkitTextFillColor = 'transparent';
        heroTitle.style.backgroundClip = 'text';
    }
}

// Run gradient animation
setInterval(animateGradient, 100);
// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // handle the data
    
    // Simulate form submission (replace with actual submission logic)
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
});

// Add floating animation to form inputs
const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to submit button
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function(e) {
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

///////////////////////// showcase ///////////////////////
// Add some interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const finalNumber = stat.textContent;
            if (finalNumber.includes('K')) {
                animateNumber(stat, parseInt(finalNumber) * 1000, 'K+');
            } else if (finalNumber.includes('%')) {
                animateNumber(stat, parseFloat(finalNumber), '%');
            } else {
                stat.textContent = finalNumber;
            }
        });
    };

    const animateNumber = (element, target, suffix) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                if (suffix === 'K+') {
                    element.textContent = Math.floor(target / 1000) + 'K+';
                } else {
                    element.textContent = target + suffix;
                }
                clearInterval(timer);
            } else {
                if (suffix === 'K+') {
                    element.textContent = Math.floor(current / 1000) + 'K+';
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }
        }, 50);
    };

    // Trigger animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.stats-grid'));

    // Handle iframe interactions
    const iframe = document.querySelector('.product-iframe');
    const overlay = document.querySelector('.iframe-overlay');

    iframe.addEventListener('load', function() {
        console.log('Product demo loaded successfully');
    });

    // Add click tracking for CTA buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href === '#') {
                e.preventDefault();
                console.log('CTA clicked:', this.textContent.trim());
                // Here you would typically track the interaction
            }
        });
    });
});

