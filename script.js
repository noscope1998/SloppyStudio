document.addEventListener('DOMContentLoaded', () => {
    console.log('SloppyStudio website loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Enhanced Banner Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 6000;

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        // Event Listeners for Nav
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        // Event Listeners for Dots
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                startAutoSlide();
            });
        });

        startAutoSlide();
    }

    // Make Game Cards Clickable
    document.querySelectorAll('.game-card:not(.coming-soon)').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // If the user clicked a button or link specifically, let that happen (external store links)
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            // For the rest of the card, go to the internal detail page
            const pageUrl = card.getAttribute('data-url');
            if (pageUrl) {
                window.location.href = pageUrl;
            }
        });
    });

    // Testimonials Slider Logic (Scroll-based)
    const testContainer = document.querySelector('.testimonials-slider-container');
    const testCards = document.querySelectorAll('.testimonial-card');
    const prevTestBtn = document.querySelector('.prev-test');
    const nextTestBtn = document.querySelector('.next-test');

    if (testContainer && testCards.length > 0) {
        let testInterval;
        const testAutoTime = 5000;

        function getMoveAmount() {
            const cardWidth = testCards[0].offsetWidth;
            const gap = 30; // Matches CSS gap
            return cardWidth + gap;
        }

        function scrollNext() {
            const moveAmount = getMoveAmount();
            const maxScroll = testContainer.scrollWidth - testContainer.clientWidth;

            if (testContainer.scrollLeft >= maxScroll - 10) {
                testContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testContainer.scrollBy({ left: moveAmount, behavior: 'smooth' });
            }
        }

        function scrollPrev() {
            const moveAmount = getMoveAmount();
            if (testContainer.scrollLeft <= 10) {
                testContainer.scrollTo({ left: testContainer.scrollWidth, behavior: 'smooth' });
            } else {
                testContainer.scrollBy({ left: -moveAmount, behavior: 'smooth' });
            }
        }

        function startTestAuto() {
            clearInterval(testInterval);
            testInterval = setInterval(scrollNext, testAutoTime);
        }

        if (nextTestBtn) {
            nextTestBtn.addEventListener('click', () => {
                scrollNext();
                startTestAuto();
            });
        }

        if (prevTestBtn) {
            prevTestBtn.addEventListener('click', () => {
                scrollPrev();
                startTestAuto();
            });
        }

        // Mouse Drag to Scroll Logic
        let isDown = false;
        let startX;
        let scrollLeft;

        testContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            testContainer.style.cursor = 'grabbing';
            startX = e.pageX - testContainer.offsetLeft;
            scrollLeft = testContainer.scrollLeft;
            clearInterval(testInterval);
        });

        testContainer.addEventListener('mouseleave', () => {
            isDown = false;
            testContainer.style.cursor = 'grab';
            startTestAuto();
        });

        testContainer.addEventListener('mouseup', () => {
            isDown = false;
            testContainer.style.cursor = 'grab';
            startTestAuto();
        });

        testContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testContainer.offsetLeft;
            const walk = (x - startX) * 2; // Multiplier for faster scroll
            testContainer.scrollLeft = scrollLeft - walk;
        });

        startTestAuto();
    }
});
