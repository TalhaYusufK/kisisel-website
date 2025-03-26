// Scroll animation for fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    // Handle scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Show elements that are in viewport on load
    checkFadeElements();
    
    // Listen for scroll events
    window.addEventListener('scroll', checkFadeElements);
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Smooth scroll for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Specifically handle the scroll indicator in the hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const timelineSection = document.querySelector('#timeline');
            
            if (timelineSection) {
                window.scrollTo({
                    top: timelineSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Animate timeline items sequentially
    const timelineItems = document.querySelectorAll('.timeline-item');
    let delay = 0;
    
    function animateTimelineSequentially() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                if (isElementInViewport(item)) {
                    item.classList.add('visible');
                }
            }, delay + (index * 150)); // Stagger the animations
        });
    }
    
    // Initial check for timeline items
    setTimeout(animateTimelineSequentially, 500);
    
    // Check again on scroll for timeline items
    window.addEventListener('scroll', function() {
        animateTimelineSequentially();
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.2}px`;
        }
    });
}); 