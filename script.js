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

    // Function to animate skill bars
    function animateSkillBars() {
        const skillprogress = document.querySelectorAll('.skill-progress');
        
        skillprogress.forEach(skill => {
            if (isInViewport(skill) && !skill.classList.contains('animated')) {
                // Get the width value from the style attribute
                const width = skill.style.width;
                
                // Reset width to 0
                skill.style.width = '0%';
                
                // Add animated class to prevent re-animation
                skill.classList.add('animated');
                
                // Animate to the original width
                setTimeout(() => {
                    skill.style.transition = 'width 1s ease-in-out';
                    skill.style.width = width;
                }, 50);
            }
        });
    }

    // Initial check on page load
    animateSkillBars();

    // Check again on scroll
    window.addEventListener('scroll', animateSkillBars);

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

    // Let's Talk button scroll to contact
    window.scrollToContact = function() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

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