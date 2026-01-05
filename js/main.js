// Main JavaScript for BioTechnology S.A. website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    
    if (preloader && progressBar) {
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Hide preloader after a short delay
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    
                    // Remove preloader from DOM after animation
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 500);
                }, 300);
            }
            progressBar.style.width = `${progress}%`;
        }, 100);
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    function updateScrollToTopButton() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', updateScrollToTopButton);
        updateScrollToTopButton(); // Initial check
    }
    
    // Animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Floating card tilt effect
    const floatingCard = document.querySelector('.floating-card');
    
    if (floatingCard) {
        floatingCard.addEventListener('mousemove', function(e) {
            const cardWidth = floatingCard.offsetWidth;
            const cardHeight = floatingCard.offsetHeight;
            const centerX = floatingCard.offsetLeft + cardWidth / 2;
            const centerY = floatingCard.offsetTop + cardHeight / 2;
            const mouseX = e.pageX - centerX;
            const mouseY = e.pageY - centerY;
            
            const rotateX = (mouseY / cardHeight) * 10;
            const rotateY = -(mouseX / cardWidth) * 10;
            
            floatingCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        floatingCard.addEventListener('mouseleave', function() {
            floatingCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            setTimeout(() => {
                floatingCard.style.transform = '';
            }, 300);
        });
    }
    
    // Инициализация всех слайдеров
    setTimeout(() => {
        initializeSliders();
    }, 100);
    
    // Mobile navigation toggle for small screens
    function handleMobileNavigation() {
        if (window.innerWidth <= 768) {
            const navList = document.querySelector('.nav-list');
            const logo = document.querySelector('.logo');
            
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = `
                  
                `;
                
                // Add CSS for mobile menu button
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu-btn {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 30px;
                        height: 21px;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        z-index: 1001;
                    }
                    
                    .burger-line {
                        width: 100%;
                        height: 3px;
                        background-color: var(--primary-color);
                        border-radius: 3px;
                        transition: var(--transition);
                    }
                    
                    .mobile-menu-btn.active .burger-line:nth-child(1) {
                        transform: rotate(45deg) translate(6px, 6px);
                    }
                    
                    .mobile-menu-btn.active .burger-line:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active .burger-line:nth-child(3) {
                        transform: rotate(-45deg) translate(6px, -6px);
                    }
                    
                    @media (min-width: 769px) {
                        .mobile-menu-btn {
                            display: none;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                menuBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    navList.classList.toggle('show');
                    this.classList.toggle('active');
                });
                
                // Insert button after logo
                if (logo && logo.parentNode) {
                    logo.parentNode.insertBefore(menuBtn, logo.nextSibling);
                }
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (navList.classList.contains('show') && 
                        !navList.contains(e.target) && 
                        !menuBtn.contains(e.target)) {
                        navList.classList.remove('show');
                        menuBtn.classList.remove('active');
                    }
                });
                
                // Close menu when clicking on a link
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        navList.classList.remove('show');
                        menuBtn.classList.remove('active');
                    });
                });
            }
        } else {
            // Remove mobile menu button on larger screens
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) {
                menuBtn.remove();
            }
            
            // Ensure nav list is visible
            const navList = document.querySelector('.nav-list');
            if (navList) {
                navList.classList.remove('show');
                navList.style.display = 'flex';
            }
        }
    }
    
    // Handle mobile navigation on load and resize
    handleMobileNavigation();
    window.addEventListener('resize', handleMobileNavigation);
    
    // Add current year to footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    const navList = document.querySelector('.nav-list');
                    if (mobileMenuBtn && navList.classList.contains('show')) {
                        navList.classList.remove('show');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('Initialization complete');
});

// Функция для инициализации всех слайдеров
function initializeSliders() {
    console.log('Initializing all sliders...');
    
    // Инициализация первого слайдера (проблема)
    initializeProblemSlider();
    
    // Инициализация квадратного слайдера (технология)
    initializeSquareSlider();
}

// Инициализация слайдера в разделе проблемы
function initializeProblemSlider() {
    console.log('Initializing problem slider...');
    
    const problemSlider = document.querySelector('.problem-slider .slider-track');
    const problemSlides = document.querySelectorAll('.problem-slider .slide');
    const problemPrevBtn = document.querySelector('.problem-slider-container .prev-btn');
    const problemNextBtn = document.querySelector('.problem-slider-container .next-btn');
    const problemDots = document.querySelectorAll('.problem-slider-container .dot');
    
    console.log('Problem slider elements:', {
        slider: problemSlider,
        slides: problemSlides.length,
        prevBtn: problemPrevBtn,
        nextBtn: problemNextBtn,
        dots: problemDots.length
    });
    
    if (problemSlider && problemSlides.length > 0) {
        let currentProblemSlide = 0;
        const totalProblemSlides = problemSlides.length;
        let problemSlideInterval;
        
        function updateProblemSlider() {
            problemSlider.style.transform = `translateX(-${currentProblemSlide * 100}%)`;
            
            problemSlides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentProblemSlide);
            });
            
            problemDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentProblemSlide);
            });
        }
        
        function nextProblemSlide() {
            currentProblemSlide = (currentProblemSlide + 1) % totalProblemSlides;
            updateProblemSlider();
        }
        
        function prevProblemSlide() {
            currentProblemSlide = (currentProblemSlide - 1 + totalProblemSlides) % totalProblemSlides;
            updateProblemSlider();
        }
        
        function startProblemSlider() {
            stopProblemSlider();
            problemSlideInterval = setInterval(nextProblemSlide, 5000);
        }
        
        function stopProblemSlider() {
            if (problemSlideInterval) {
                clearInterval(problemSlideInterval);
            }
        }
        
        // Добавляем обработчики для кнопок
        if (problemNextBtn) {
            problemNextBtn.addEventListener('click', (e) => {
                console.log('Problem next button clicked');
                e.preventDefault();
                e.stopPropagation();
                nextProblemSlide();
                startProblemSlider();
            });
        } else {
            console.error('Next button not found for problem slider');
        }
        
        if (problemPrevBtn) {
            problemPrevBtn.addEventListener('click', (e) => {
                console.log('Problem prev button clicked');
                e.preventDefault();
                e.stopPropagation();
                prevProblemSlide();
                startProblemSlider();
            });
        } else {
            console.error('Prev button not found for problem slider');
        }
        
        // Добавляем обработчики для точек
        problemDots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                console.log('Problem dot clicked, slide index:', slideIndex);
                currentProblemSlide = slideIndex;
                updateProblemSlider();
                startProblemSlider();
            });
        });
        
        // Автоматическое перелистывание
        startProblemSlider();
        
        // Остановка при наведении на слайдер
        const problemSliderContainer = document.querySelector('.problem-slider');
        if (problemSliderContainer) {
            problemSliderContainer.addEventListener('mouseenter', stopProblemSlider);
            problemSliderContainer.addEventListener('mouseleave', startProblemSlider);
            
            // Остановка при касании на мобильных устройствах
            problemSliderContainer.addEventListener('touchstart', stopProblemSlider);
            problemSliderContainer.addEventListener('touchend', () => {
                setTimeout(startProblemSlider, 3000);
            });
        }
        
        updateProblemSlider();
        console.log('Problem slider initialized successfully');
    } else {
        console.error('Problem slider elements not found');
    }
}

// Инициализация квадратного слайдера
function initializeSquareSlider() {
    console.log('Initializing square slider...');
    
    const squareSlider = document.querySelector('.square-slider .square-slider-track');
    const squareSlides = document.querySelectorAll('.square-slide');
    const squarePrevBtn = document.querySelector('.square-slider-container .prev-btn');
    const squareNextBtn = document.querySelector('.square-slider-container .next-btn');
    const squareDots = document.querySelectorAll('.square-slider-container .square-dot');
    
    console.log('Square slider elements:', {
        slider: squareSlider,
        slides: squareSlides.length,
        prevBtn: squarePrevBtn,
        nextBtn: squareNextBtn,
        dots: squareDots.length
    });
    
    if (squareSlider && squareSlides.length > 0) {
        let currentSquareSlide = 0;
        const totalSquareSlides = squareSlides.length;
        let squareSlideInterval;
        
        function updateSquareSlider() {
            squareSlider.style.transform = `translateX(-${currentSquareSlide * 100}%)`;
            
            squareSlides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSquareSlide);
            });
            
            squareDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSquareSlide);
            });
        }
        
        function nextSquareSlide() {
            currentSquareSlide = (currentSquareSlide + 1) % totalSquareSlides;
            updateSquareSlider();
        }
        
        function prevSquareSlide() {
            currentSquareSlide = (currentSquareSlide - 1 + totalSquareSlides) % totalSquareSlides;
            updateSquareSlider();
        }
        
        function startSquareSlider() {
            stopSquareSlider();
            squareSlideInterval = setInterval(nextSquareSlide, 5000);
        }
        
        function stopSquareSlider() {
            if (squareSlideInterval) {
                clearInterval(squareSlideInterval);
            }
        }
        
        // Добавляем обработчики для кнопок
        if (squareNextBtn) {
            squareNextBtn.addEventListener('click', (e) => {
                console.log('Square next button clicked');
                e.preventDefault();
                e.stopPropagation();
                nextSquareSlide();
                startSquareSlider();
            });
        } else {
            console.error('Next button not found for square slider');
        }
        
        if (squarePrevBtn) {
            squarePrevBtn.addEventListener('click', (e) => {
                console.log('Square prev button clicked');
                e.preventDefault();
                e.stopPropagation();
                prevSquareSlide();
                startSquareSlider();
            });
        } else {
            console.error('Prev button not found for square slider');
        }
        
        // Добавляем обработчики для точек
        squareDots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                console.log('Square dot clicked, slide index:', slideIndex);
                currentSquareSlide = slideIndex;
                updateSquareSlider();
                startSquareSlider();
            });
        });
        
        // Автоматическое перелистывание
        startSquareSlider();
        
        // Остановка при наведении на слайдер
        const squareSliderContainer = document.querySelector('.square-slider');
        if (squareSliderContainer) {
            squareSliderContainer.addEventListener('mouseenter', stopSquareSlider);
            squareSliderContainer.addEventListener('mouseleave', startSquareSlider);
            
            // Остановка при касании на мобильных устройствах
            squareSliderContainer.addEventListener('touchstart', stopSquareSlider);
            squareSliderContainer.addEventListener('touchend', () => {
                setTimeout(startSquareSlider, 3000);
            });
        }
        
        updateSquareSlider();
        
        // Инициализация модального окна для квадратного слайдера
        initializeImageModal(squareSlides);
        
        console.log('Square slider initialized successfully');
    } else {
        console.error('Square slider elements not found');
    }
}

// Функция для модального окна полноэкранного просмотра
function initializeImageModal(slides) {
    console.log('Initializing image modal...');
    
    const modal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalPrevBtn = document.querySelector('.modal-prev-btn');
    const modalNextBtn = document.querySelector('.modal-next-btn');
    
    if (!modal || !modalImage || !modalCaption) {
        console.error('Modal elements not found');
        return;
    }
    
    let currentModalSlide = 0;
    const totalModalSlides = slides.length;
    
    function openModal(slideIndex) {
        console.log('Opening modal for slide:', slideIndex);
        currentModalSlide = slideIndex;
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        
        // Добавляем обработчик для закрытия по ESC
        document.addEventListener('keydown', handleKeyDown);
    }
    
    function closeModal() {
        console.log('Closing modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Разблокируем скролл страницы
        
        // Удаляем обработчик для ESC
        document.removeEventListener('keydown', handleKeyDown);
    }
    
    function updateModal() {
        const activeSlide = slides[currentModalSlide];
        const imageSrc = activeSlide.querySelector('img').src;
        const caption = activeSlide.querySelector('.square-slide-caption').textContent;
        
        modalImage.src = imageSrc;
        modalImage.alt = caption;
        modalCaption.textContent = caption;
        
        console.log('Modal updated:', { src: imageSrc, caption: caption });
    }
    
    function nextModalSlide() {
        currentModalSlide = (currentModalSlide + 1) % totalModalSlides;
        updateModal();
    }
    
    function prevModalSlide() {
        currentModalSlide = (currentModalSlide - 1 + totalModalSlides) % totalModalSlides;
        updateModal();
    }
    
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextModalSlide();
        } else if (e.key === 'ArrowLeft') {
            prevModalSlide();
        }
    }
    
    // Добавляем обработчики для открытия модального окна
    slides.forEach((slide, index) => {
        // Обработчик для всего слайда
        slide.addEventListener('click', (e) => {
            // Проверяем, не было ли клика по элементам управления слайдером
            const isControlClick = e.target.closest('.square-slider-btn') || 
                                  e.target.closest('.square-dot') ||
                                  e.target.classList.contains('square-slider-btn') ||
                                  e.target.classList.contains('square-dot');
            
            if (!isControlClick) {
                console.log('Slide clicked, opening modal');
                openModal(index);
            }
        });
        
        // Также добавляем обработчик для изображения внутри слайда
        const slideImage = slide.querySelector('img');
        if (slideImage) {
            slideImage.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Slide image clicked, opening modal');
                openModal(index);
            });
        }
        
        // Обработчик для overlay (иконки увеличения)
        const slideOverlay = slide.querySelector('.square-slide-overlay');
        if (slideOverlay) {
            slideOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Overlay clicked, opening modal');
                openModal(index);
            });
        }
    });
    
    // Добавляем обработчики для кнопок модального окна
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    } else {
        console.error('Modal close button not found');
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextModalSlide();
        });
    } else {
        console.error('Modal next button not found');
    }
    
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevModalSlide();
        });
    } else {
        console.error('Modal prev button not found');
    }
    
    // Закрытие модального окна при клике на overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Закрытие модального окна при свайпе на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Свайп влево - следующее изображение
                nextModalSlide();
            } else {
                // Свайп вправо - предыдущее изображение
                prevModalSlide();
            }
        }
    }
    
    console.log('Image modal initialized successfully');
}

// Вспомогательные функции для форм (если будут добавлены в будущем)
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#f44336';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    formGroup.appendChild(error);
}

function removeError(input) {
    input.classList.remove('error');
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// Touch device detection and enhancement
if ('ontouchstart' in window) {
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        @media (max-width: 768px) {
            .nav-link {
                padding: 15px 0;
                font-size: 1.1rem;
            }
            
            .btn {
                min-height: 50px;
            }
            
            .feature-card,
            .advantage-card,
            .solution-card {
                cursor: pointer;
            }
            
            .feature-card:active,
            .advantage-card:active,
            .solution-card:active {
                transform: scale(0.98) !important;
            }
        }
    `;
    document.head.appendChild(touchStyle);
}

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading="lazy" attribute to all images for native lazy loading
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// Handle browser compatibility for smooth scrolling
(function() {
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
        return; // Native smooth scrolling is supported
    }
    
    // Polyfill for smooth scrolling
    const smoothScrollTo = function(element, duration = 1000) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override default anchor link behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement, 1000);
            }
        });
    });
})();

// Error handling and logging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

// Добавляем обработчик для формы (если она будет добавлена в будущем)
document.addEventListener('submit', function(e) {
    if (e.target.matches('#contact-form')) {
        e.preventDefault();
        
        // Простая валидация формы
        const formData = new FormData(e.target);
        let isValid = true;
        
        // Проверка обязательных полей
        const requiredFields = e.target.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Это поле обязательно для заполнения');
                isValid = false;
            } else {
                removeError(field);
            }
        });
        
        // Проверка email
        const emailField = e.target.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
            showError(emailField, 'Введите корректный email адрес');
            isValid = false;
        }
        
        if (isValid) {
            // Показать сообщение об успешной отправке
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки формы
            setTimeout(() => {
                alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                e.target.reset();
            }, 1500);
        }
    }
});

// Добавляем глобальный обработчик для отладки
window.addEventListener('click', function(e) {
    // Для отладки кнопок слайдеров
    if (e.target.classList.contains('slider-btn') || 
        e.target.closest('.slider-btn') || 
        e.target.classList.contains('dot') ||
        e.target.closest('.dot') ||
        e.target.classList.contains('square-slider-btn') ||
        e.target.closest('.square-slider-btn') ||
        e.target.classList.contains('square-dot') ||
        e.target.closest('.square-dot')) {
        console.log('Slider control clicked:', e.target);
    }
    
    // Для отладки модального окна
    if (e.target.classList.contains('square-slide') ||
        e.target.closest('.square-slide') ||
        e.target.classList.contains('square-slide-image') ||
        e.target.closest('.square-slide-image') ||
        e.target.classList.contains('square-slide-overlay') ||
        e.target.closest('.square-slide-overlay')) {
        console.log('Slide element clicked for modal:', e.target);
    }
});

// Простая версия слайдера на случай проблем (fallback)
function simpleSliderFallback() {
    console.log('Using simple slider fallback');
    
    const sliders = document.querySelectorAll('.slider-track, .square-slider-track');
    
    sliders.forEach((slider, index) => {
        let currentSlide = 0;
        const slides = slider.querySelectorAll('.slide, .square-slide');
        const totalSlides = slides.length;
        
        if (totalSlides > 1) {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Обновляем активные классы
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === currentSlide);
                });
                
                // Обновляем точки
                const container = slider.closest('.problem-slider-container, .square-slider-container');
                if (container) {
                    const dots = container.querySelectorAll('.dot, .square-dot');
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === currentSlide);
                    });
                }
            }, 5000);
        }
    });
}

// Проверяем через 3 секунды, работают ли слайдеры
setTimeout(() => {
    const problemSlider = document.querySelector('.problem-slider .slider-track');
    const squareSlider = document.querySelector('.square-slider .square-slider-track');
    
    if ((problemSlider && problemSlider.style.transform === '') || 
        (squareSlider && squareSlider.style.transform === '')) {
        console.log('Sliders not working properly, using fallback');
        simpleSliderFallback();
    } else {
        console.log('All sliders are working correctly');
    }
}, 3000);

// Обновленная функция для мобильной навигации
function initializeMobileNavigation() {
    console.log('Initializing mobile navigation...');
    
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');
    const headerContent = document.querySelector('.header-content');
    
    if (!burgerMenu) {
        console.error('Burger menu button not found');
        return;
    }
    
    // Создаем элементы мобильного меню
    createMobileMenu();
    
    const mobileNav = document.querySelector('.mobile-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;
    
    // Функция открытия/закрытия мобильного меню
    function toggleMobileMenu() {
        const isOpening = !burgerMenu.classList.contains('active');
        
        burgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open', isOpening);
        
        // Блокируем/разблокируем скролл страницы
        if (isOpening) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
        
        console.log('Mobile menu toggled:', isOpening ? 'opened' : 'closed');
    }
    
    // Функция закрытия мобильного меню
    function closeMobileMenu() {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = 'auto';
        
        console.log('Mobile menu closed');
    }
    
    // Обработчики событий
    burgerMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Обработчики для ссылок в мобильном меню
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Закрываем меню
                    closeMobileMenu();
                    
                    // Плавная прокрутка к цели
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                    
                    // Обновляем активную ссылку
                    updateActiveMobileNavLink(targetId.substring(1));
                }
            }
        });
    });
    
    // Обновление активной ссылки в мобильном меню при скролле
    function updateActiveMobileNavLink(sectionId) {
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Синхронизация с активными секциями при скролле
    window.addEventListener('scroll', () => {
        if (mobileNav.classList.contains('active')) return;
        
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveMobileNavLink(currentSection);
        }
    });
    
    // Закрытие меню при нажатии ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile navigation initialized successfully');
}

// Функция создания мобильного меню
function createMobileMenu() {
    // Проверяем, не создано ли меню уже
    if (document.querySelector('.mobile-nav')) {
        return;
    }
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Создаем мобильное меню
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    mobileNav.innerHTML = `
        <button class="mobile-nav-close" aria-label="Закрыть меню">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="mobile-nav-header">
            <img src="images/logo.png" alt="BioTechnology S.A." class="mobile-nav-logo">
            <div class="mobile-nav-title">
                <h3>BioTechnology S.A.</h3>
                <p>Наука для плодородия земли</p>
            </div>
        </div>
        
        <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
                <a href="#home" class="mobile-nav-link active">
                    <i class="fas fa-home"></i>
                    <span>Главная</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="#problem" class="mobile-nav-link">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Проблема</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="#solution" class="mobile-nav-link">
                    <i class="fas fa-lightbulb"></i>
                    <span>Решение</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="#technology" class="mobile-nav-link">
                    <i class="fas fa-flask"></i>
                    <span>Технология</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="#advantages" class="mobile-nav-link">
                    <i class="fas fa-star"></i>
                    <span>Преимущества</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="#contact" class="mobile-nav-link">
                    <i class="fas fa-envelope"></i>
                    <span>Контакты</span>
                </a>
            </li>
        </ul>
        
        <div class="mobile-nav-contacts">
            <h4>Контактная информация</h4>
            <div class="mobile-contact-item">
                <i class="fas fa-envelope"></i>
                <span>info@Bio-Technology.sarl</span>
            </div>
            <div class="mobile-contact-item">
                <i class="fas fa-phone"></i>
                <span>+41782414416</span>
            </div>
            <div class="mobile-contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>Genève, Suisse 1201</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileNav);
    
    console.log('Mobile menu created successfully');
}

// Обновленный обработчик DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    
    if (preloader && progressBar) {
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Hide preloader after a short delay
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    
                    // Remove preloader from DOM after animation
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 500);
                }, 300);
            }
            progressBar.style.width = `${progress}%`;
        }, 100);
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    function updateScrollToTopButton() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', updateScrollToTopButton);
        updateScrollToTopButton(); // Initial check
    }
    
    // Animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Floating card tilt effect
    const floatingCard = document.querySelector('.floating-card');
    
    if (floatingCard) {
        floatingCard.addEventListener('mousemove', function(e) {
            const cardWidth = floatingCard.offsetWidth;
            const cardHeight = floatingCard.offsetHeight;
            const centerX = floatingCard.offsetLeft + cardWidth / 2;
            const centerY = floatingCard.offsetTop + cardHeight / 2;
            const mouseX = e.pageX - centerX;
            const mouseY = e.pageY - centerY;
            
            const rotateX = (mouseY / cardHeight) * 10;
            const rotateY = -(mouseX / cardWidth) * 10;
            
            floatingCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        floatingCard.addEventListener('mouseleave', function() {
            floatingCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            setTimeout(() => {
                floatingCard.style.transform = '';
            }, 300);
        });
    }
    
    // Инициализация всех слайдеров
    setTimeout(() => {
        initializeSliders();
    }, 100);
    
    // Инициализация мобильной навигации
    initializeMobileNavigation();
    
    // Add current year to footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for navigation links (для десктопного меню)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('Initialization complete');
});

// Остальной код (функции слайдеров, модального окна и т.д.) остается без изменений
// ... [все остальные функции остаются такими же] ...
