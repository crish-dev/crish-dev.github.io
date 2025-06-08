// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Mobile Navigation
    window.hamburg = function() {
        const navbar = document.querySelector(".dropdown");
        navbar.style.transform = "translateY(0px)";
    }

    window.cancel = function() {
        const navbar = document.querySelector(".dropdown");
        navbar.style.transform = "translateY(-500px)";
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth < 884) {
                    cancel();
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission (example - would need backend implementation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // You would typically send this data to a server
            alert('Thanks for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});

// Function to animate skill bars when they come into view
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skillLevel => {
        if (isInViewport(skillLevel) && !skillLevel.classList.contains('animated')) {
            // Get the skill percentage from data attribute
            const skillPercentage = skillLevel.getAttribute('data-skill');
            
            // Add animated class to prevent re-animation
            skillLevel.classList.add('animated');
            
            // Animate the width with a slight delay for better effect
            setTimeout(() => {
                skillLevel.style.width = skillPercentage + '%';
            }, 200);
        }
    });
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Run animation on scroll and initial load
document.addEventListener('DOMContentLoaded', function() {
    // Initial check
    setTimeout(animateSkillBars, 500);
    
    // Check on scroll
    window.addEventListener('scroll', throttle(animateSkillBars, 100));
});

// Throttle function to optimize scroll performance
function throttle(func, wait) {
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

// Alternative approach using Intersection Observer (more efficient)
const observeSkillBars = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const skillLevel = entry.target;
                const skillPercentage = skillLevel.getAttribute('data-skill');
                
                skillLevel.classList.add('animated');
                
                setTimeout(() => {
                    skillLevel.style.width = skillPercentage + '%';
                }, 300);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });

    document.querySelectorAll('.skill-level').forEach(skill => {
        observer.observe(skill);
    });
};

// Use Intersection Observer if supported, fallback to scroll listener
if (window.IntersectionObserver) {
    document.addEventListener('DOMContentLoaded', observeSkillBars);
}