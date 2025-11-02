// Carousel simple et robuste pour mobile et desktop
(function() {
    'use strict';
    
    console.log('Carousel script chargé');
    
    function initCarousel() {
        console.log('Initialisation du carousel...');
        
        const carousel = document.querySelector('#main-carousel');
        if (!carousel) {
            console.error('Carousel non trouvé!');
            return;
        }

        const slides = carousel.querySelector('.carousel-slides');
        const slideItems = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (!slides || slideItems.length === 0) {
            console.error('Slides non trouvées!');
            return;
        }
        
        let currentIndex = 0;
        const totalSlides = slideItems.length;
        let autoPlayInterval = null;
        const autoPlayDelay = 5000;

        console.log(`Carousel trouvé avec ${totalSlides} slides`);

        // Fonction pour aller à une slide
        function goToSlide(index) {
            currentIndex = index;
            const offset = -index * 100;
            slides.style.transform = `translateX(${offset}%)`;
            updateIndicators();
            console.log(`Slide ${index + 1}/${totalSlides}`);
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
            console.log('Auto-play démarré');
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Boutons de navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prev();
                stopAutoPlay();
                startAutoPlay();
            });
            console.log('Bouton précédent configuré');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                next();
                stopAutoPlay();
                startAutoPlay();
            });
            console.log('Bouton suivant configuré');
        }

        // Navigation au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prev();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                next();
                stopAutoPlay();
                startAutoPlay();
            }
        });

        // Pause au survol (desktop uniquement)
        if (window.innerWidth > 768) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }

        // Support tactile pour mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartTime = 0;

        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = Date.now();
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const touchDuration = Date.now() - touchStartTime;
            const diff = touchStartX - touchEndX;
            
            // Swipe rapide avec au moins 50px de différence
            if (Math.abs(diff) > 50 && touchDuration < 500) {
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

        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all';
            indicator.setAttribute('aria-label', `Slide ${i + 1}`);
            indicator.setAttribute('type', 'button');
            
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(i);
                stopAutoPlay();
                startAutoPlay();
            });
            
            indicatorsContainer.appendChild(indicator);
        }

        carousel.appendChild(indicatorsContainer);
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        console.log(`${indicators.length} indicateurs créés`);

        // Mettre à jour les indicateurs
        function updateIndicators() {
            indicators.forEach(function(indicator, index) {
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
        
        console.log('✅ Carousel initialisé avec succès!');
    }

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        // DOM déjà chargé
        initCarousel();
    }
})();
