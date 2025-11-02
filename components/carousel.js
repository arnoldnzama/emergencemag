// Carousel/Slider simple et fonctionnel
(function() {
    'use strict';
    
    function initCarousel() {
        const carousel = document.querySelector('#main-carousel');
        if (!carousel) {
            console.log('Carousel non trouvé');
            return;
        }

        const slides = carousel.querySelector('.carousel-slides');
        const slideItems = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentIndex = 0;
        const totalSlides = slideItems.length;
        let autoPlayInterval = null;
        const autoPlayDelay = 5000;

        console.log('Carousel initialisé avec', totalSlides, 'slides');

        if (totalSlides === 0) return;

        // Fonction pour aller à une slide
        function goToSlide(index) {
            currentIndex = index;
            const offset = -index * 100;
            slides.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        }

        // Slide suivante
        function next() {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        }

        // Slide précédente
        function prev() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentIndex);
        }

        // Auto-play
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(next, autoPlayDelay);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Boutons de navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prev();
                stopAutoPlay();
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                next();
                stopAutoPlay();
                startAutoPlay();
            });
        }

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prev();
                stopAutoPlay();
                startAutoPlay();
            }
            if (e.key === 'ArrowRight') {
                next();
                stopAutoPlay();
                startAutoPlay();
            }
        });

        // Pause au survol
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Support tactile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    next();
                } else {
                    prev();
                }
            }
            startAutoPlay();
        }, { passive: true });

        // Créer les indicateurs
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10';
        indicatorsContainer.style.cssText = 'pointer-events: auto;';

        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all';
            indicator.setAttribute('aria-label', `Slide ${i + 1}`);
            indicator.setAttribute('data-index', i);
            
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(i);
                stopAutoPlay();
                startAutoPlay();
            });
            
            indicatorsContainer.appendChild(indicator);
        }

        carousel.appendChild(indicatorsContainer);
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

        // Mettre à jour les indicateurs
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.remove('bg-opacity-50', 'w-3');
                    indicator.classList.add('bg-opacity-100', 'w-8');
                } else {
                    indicator.classList.remove('bg-opacity-100', 'w-8');
                    indicator.classList.add('bg-opacity-50', 'w-3');
                }
            });
        }

        // Initialiser
        goToSlide(0);
        startAutoPlay();
        
        console.log('Carousel démarré avec succès');
    }

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
