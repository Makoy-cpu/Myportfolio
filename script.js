function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.add('hidden');
        slide.classList.remove('active');
    });

    indicators.forEach(indicator => {
        indicator.classList.remove('bg-blue-500');
        indicator.classList.add('bg-gray-300');
    });

    slides[index].classList.remove('hidden');
    slides[index].classList.add('active');

    indicators[index].classList.remove('bg-gray-300');
    indicators[index].classList.add('bg-blue-500');

    currentSlide = index;
}

    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Initialize
    showSlide(0);
}

// Update your DOMContentLoaded function to ensure proper initialization order
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSkillAnimations();
    initFormSubmission();
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Update date and time display
    function updateDateTime() {
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const currentTime = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        const dateElement = document.getElementById('current-date');
        const timeElement = document.getElementById('current-time');
        
        if (dateElement) dateElement.textContent = currentDate;
        if (timeElement) timeElement.textContent = currentTime;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.mindset-item, .portfolio-item, .timeline-content');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Initialize carousel
    setTimeout(() => {
        initCarousel();
    }, 500); // Small delay to ensure DOM is fully rendered
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
});

