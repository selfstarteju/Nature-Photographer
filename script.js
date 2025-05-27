// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 4500); // Wait for tree animation to complete
});

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const natureStats = document.querySelector('.nature-stats');
    if (natureStats) {
        statsObserver.observe(natureStats);
    }
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Image modal functionality
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title || 'Nature Photography';
    modalDescription.textContent = description || 'Captured with love for nature 🌿';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add click events to gallery items
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            const location = this.querySelector('p').textContent;
            openModal(img.src, title, location);
        });
    });
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('🌿 Please fill in all fields to send your message!');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.submit-btn');
    const originalText = submitButton.querySelector('.btn-text').textContent;
    
    submitButton.querySelector('.btn-text').textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(`🌱 Thank you ${name}! Your message about "${subject}" has been sent. I'm excited to connect with you and will get back to you soon! 🌿`);
        this.reset();
        submitButton.querySelector('.btn-text').textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.story-card, .interest-item, .gallery-item, .contact-method');
    
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title, .interests-title');
    sectionTitles.forEach(title => {
        title.classList.add('slide-in-left');
        observer.observe(title);
    });
    
    // Section subtitles animation
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    sectionSubtitles.forEach(subtitle => {
        subtitle.classList.add('fade-in');
        observer.observe(subtitle);
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Floating leaves
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, index) => {
        const speed = 0.1 + (index * 0.05);
        leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Photo frames
    const frames = document.querySelectorAll('.floating-frame');
    frames.forEach((frame, index) => {
        const speed = 0.05 + (index * 0.02);
        frame.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Nature elements
    const elements = document.querySelectorAll('.nature-element');
    elements.forEach((element, index) => {
        const speed = 0.08 + (index * 0.03);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Enhanced image loading with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

// Add nature sound effects (optional - can be enabled)
function playNatureSound(soundType) {
    // This would play nature sounds on interactions
    // Commented out as it requires audio files
    /*
    const audio = new Audio(`sounds/${soundType}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    */
}

// Add click sound effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .filter-btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Optional: play nature sound
            // playNatureSound('leaf-rustle');
        });
    });
});

// Dynamic greeting based on time of day
function setDynamicGreeting() {
    const hour = new Date().getHours();
    const welcomeBadge = document.querySelector('.welcome-badge span:last-child');
    
    if (welcomeBadge) {
        if (hour >= 5 && hour < 12) {
            welcomeBadge.textContent = 'Good morning, nature lover! 🌅';
        } else if (hour >= 12 && hour < 17) {
            welcomeBadge.textContent = 'Good afternoon, explorer! ☀️';
        } else if (hour >= 17 && hour < 21) {
            welcomeBadge.textContent = 'Good evening, adventurer! 🌇';
        } else {
            welcomeBadge.textContent = 'Welcome to my nature world 🌙';
        }
    }
}

// Apply dynamic greeting on load
document.addEventListener('DOMContentLoaded', setDynamicGreeting);

// Add seasonal theme changes
function setSeasonalTheme() {
    const month = new Date().getMonth();
    const root = document.documentElement;
    
    if (month >= 2 && month <= 4) {
        // Spring theme
        root.style.setProperty('--accent-green', '#90EE90');
        root.style.setProperty('--flower-pink', '#FFB6C1');
    } else if (month >= 5 && month <= 7) {
        // Summer theme
        root.style.setProperty('--accent-green', '#32CD32');
        root.style.setProperty('--sky-blue', '#87CEEB');
    } else if (month >= 8 && month <= 10) {
        // Autumn theme
        root.style.setProperty('--accent-green', '#DAA520');
        root.style.setProperty('--sunset-orange', '#FF8C00');
    } else {
        // Winter theme
        root.style.setProperty('--accent-green', '#708090');
        root.style.setProperty('--sky-blue', '#B0C4DE');
    }
}

// Apply seasonal theme on load
document.addEventListener('DOMContentLoaded', setSeasonalTheme);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Tejas Nature Photography website loaded successfully! 🌿');
    
    // Add loading states to placeholder images
    const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');
    placeholderImages.forEach(img => {
        img.style.filter = 'blur(2px)';
        img.addEventListener('load', function() {
            this.style.filter = 'none';
        });
    });
    
    // Add hover effects to nature elements
    const natureElements = document.querySelectorAll('.butterfly, .flower, .bird, .nature-element');
    natureElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.btn, .submit-btn');
    rippleButtons.forEach(button => {
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
`;
document.head.appendChild(style);