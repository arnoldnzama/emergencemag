// Composant Header unifié pour toutes les pages
class HeaderComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSearch();
        this.setupBackToTop();
        this.updateDate();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Fermer le menu mobile quand on clique sur un lien
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // Fermer le menu mobile si on clique en dehors
            document.addEventListener('click', (event) => {
                if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }

    setupSearch() {
        const searchBtn = document.querySelector('[data-feather="search"]');
        if (searchBtn) {
            searchBtn.parentElement.addEventListener('click', () => {
                // Logique de recherche à implémenter
                console.log('Recherche activée');
            });
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.remove('opacity-0', 'invisible');
                    backToTopBtn.classList.add('opacity-100', 'visible');
                } else {
                    backToTopBtn.classList.add('opacity-0', 'invisible');
                    backToTopBtn.classList.remove('opacity-100', 'visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    updateDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const currentDate = new Date().toLocaleDateString('fr-FR', options);
            dateElement.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
        }
    }
}

// Initialiser le composant header quand le DOM est chargé
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeaderComponent();
    });
}
