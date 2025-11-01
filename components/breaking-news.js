// Breaking News Ticker avec défilement continu
class BreakingNewsTicker {
    constructor(selector) {
        this.ticker = document.querySelector(selector);
        if (this.ticker) {
            this.init();
        }
    }

    init() {
        const content = this.ticker.innerHTML;
        // Dupliquer le contenu pour un défilement sans fin
        this.ticker.innerHTML = content + content;
        
        // Calculer la largeur et ajuster la vitesse
        this.adjustSpeed();
        
        // Pause au survol
        this.ticker.addEventListener('mouseenter', () => {
            this.ticker.style.animationPlayState = 'paused';
        });
        
        this.ticker.addEventListener('mouseleave', () => {
            this.ticker.style.animationPlayState = 'running';
        });
    }

    adjustSpeed() {
        const width = this.ticker.scrollWidth / 2;
        const duration = width / 50; // 50px par seconde
        this.ticker.style.animationDuration = `${duration}s`;
    }
}

// Initialiser le ticker au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new BreakingNewsTicker('.animate-marquee');
});
