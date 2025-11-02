// Carousel/Slider avec navigation et auto-play
class Carousel {
    constructor(selector) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;

        this.slides = this.carousel.querySelector('.carousel-slides');
        this.slideItems = this.carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        
        this.currentIndex = 0;
        this.totalSlides = this.slideItems.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 secondes

        this.init();
    }

    init() {
        if (this.totalSlides === 0) return;

        // Navigation avec les boutons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Pause auto-play au survol
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Support tactile pour mobile
        this.addTouchSupport();

        // Ajouter des indicateurs
        this.addIndicators();

        // Démarrer l'auto-play
        this.startAutoPlay();

        // Afficher la première slide
        this.goToSlide(0);
    }

    goToSlide(index) {
        this.currentIndex = index;
        const offset = -index * 100;
        this.slides.style.transform = `translateX(${offset}%)`;

        // Mettre à jour les indicateurs
        this.updateIndicators();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10';

        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all';
            indicator.setAttribute('aria-label', `Aller à la slide ${i + 1}`);
            indicator.addEventListener('click', () => {
                this.goToSlide(i);
                this.stopAutoPlay();
                this.startAutoPlay();
            });
            indicatorsContainer.appendChild(indicator);
        }

        this.carousel.appendChild(indicatorsContainer);
        this.indicators = indicatorsContainer.querySelectorAll('button');
    }

    updateIndicators() {
        if (!this.indicators) return;
        
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.remove('bg-opacity-50');
                indicator.classList.add('bg-opacity-100', 'w-8');
            } else {
                indicator.classList.remove('bg-opacity-100', 'w-8');
                indicator.classList.add('bg-opacity-50');
            }
        });
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            // Calculer la différence
            const diffX = Math.abs(touchStartX - touchEndX);
            const diffY = Math.abs(touchStartY - touchEndY);
            
            // Si le swipe est plus horizontal que vertical, empêcher le scroll
            if (diffX > diffY && diffX > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        this.carousel.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
            isSwiping = false;
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diffX = touchStartX - touchEndX;
            const diffY = Math.abs(touchStartY - touchEndY);

            // Ne déclencher le swipe que si le mouvement est principalement horizontal
            if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                this.stopAutoPlay();
                this.startAutoPlay();
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Initialiser le carousel au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('#main-carousel');
});
