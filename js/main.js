// Main application file - Optimized version
import CONFIG from './config.js';
import LanguageManager from './languageManager.js';
import UIManager from './uiManager.js';
import EffectsManager from './effectsManager.js';
import PortfolioLoader from './portfolioLoader.js';

class PortfolioApp {
    constructor() {
        this.languageManager = new LanguageManager();
        this.portfolioLoader = new PortfolioLoader();
        this.uiManager = new UIManager(this.languageManager, this.portfolioLoader);
        this.effectsManager = new EffectsManager();
        this.isInitialized = false;
        this.modalEventBound = false; // Flag to prevent duplicate event listeners
    }

    async initialize() {
        try {
            // Show loading
            this.showLoading();

            // Load initial language data
            await this.languageManager.loadLanguageData(this.languageManager.getCurrentLanguage());

            // Check if we're on home page (show featured only)
            const isHomePage = !window.location.pathname.includes('projects.html');
            
            // Update UI content (now async)
            await this.uiManager.updateAllContent(isHomePage); // Featured only on home
            this.uiManager.updateNavigation();
            this.uiManager.updateLanguageSelector(this.changeLanguage.bind(this));

            // Initialize effects only once
            if (!this.isInitialized) {
                this.effectsManager.initialize();
                this.initializeAOS();
                this.setupQuickViewButtons(); // Setup modal buttons - ONLY THIS ONE
                this.isInitialized = true;
            }

            // Hide loading
            this.hideLoading();

        } catch (error) {
            console.error('Error initializing app:', error);
            this.hideLoading();
        }
    }

    async changeLanguage(lang) {
        try {
            // Quick loading indicator
            this.showQuickLoading();

            // Load new language data (akan menggunakan cache jika ada)
            await this.languageManager.loadLanguageData(lang);

            // Check if we're on home page
            const isHomePage = !window.location.pathname.includes('projects.html');

            // Update hanya content, tidak re-initialize effects (now async)
            await this.uiManager.updateAllContent(isHomePage); // Featured only on home
            this.uiManager.updateNavigation();
            this.uiManager.updateLanguageSelector(this.changeLanguage.bind(this));

            // Refresh AOS animations untuk element baru
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }

            this.hideQuickLoading();

        } catch (error) {
            console.error('Error changing language:', error);
            this.hideQuickLoading();
        }
    }

    setupQuickViewButtons() {
        // Prevent double binding
        if (this.modalEventBound) {
            return;
        }
        this.modalEventBound = true;
        
        // Use event delegation on document
        document.addEventListener('click', async (e) => {
            // Check if clicked on portfolio card (anywhere in card)
            const card = e.target.closest('.portfolio-card');
            
            if (card) {
                // Don't trigger if clicking on a link inside (like external links)
                if (e.target.closest('a[href^="http"]')) {
                    return; // Let the link work normally
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = card.getAttribute('data-project-id');
                
                // Check if modal already exists
                if (document.getElementById('projectModal')) {
                    return;
                }
                
                if (projectId) {
                    await this.showProjectModal(projectId);
                }
                return;
            }
            
            // Also support explicit button clicks
            const button = e.target.closest('.view-detail-btn');
            if (button) {
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = button.getAttribute('data-project-id');
                
                if (document.getElementById('projectModal')) {
                    return;
                }
                
                if (projectId) {
                    await this.showProjectModal(projectId);
                }
                return;
            }
            
            // Close modal when clicking outside
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        }, true); // Use capture phase
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                if (modal && modal.parentNode) {
                    modal.remove();
                }
                // IMPORTANT: Restore body scroll
                document.body.style.overflow = '';
            }, 300);
        } else {
            // Even if no modal, ensure scroll is restored
            document.body.style.overflow = '';
        }
    }

    async showProjectModal(projectId) {
        try {
            // Prevent duplicate modals
            if (document.getElementById('projectModal')) {
                return;
            }
            
            // Load project
            const rawProject = await this.portfolioLoader.loadProject(projectId);
            if (!rawProject) {
                alert('Project not found: ' + projectId);
                return;
            }
            
            const currentLang = this.languageManager.currentLanguage;
            const project = this.portfolioLoader.convertProjectToLegacyFormat(rawProject, currentLang);

            // Determine if mobile or web
            const isMobile = project.platforms.includes('android') || project.platforms.includes('ios');
            const isWeb = project.platforms.includes('web');

            // Generate platform badges
            let platformBadgesHTML = '';
            project.platforms.forEach(platform => {
                let icon = '';
                if (platform === 'android') icon = 'fab fa-android';
                else if (platform === 'ios') icon = 'fab fa-apple';
                else if (platform === 'web') icon = 'fas fa-globe';
                
                platformBadgesHTML += `<div class="platform-badge-large ${platform}"><i class="${icon}"></i>${platform.toUpperCase()}</div>`;
            });

            // Generate logo section
            let logoHTML = '';
            if (isWeb && project.screenshots && project.screenshots.length > 0) {
                logoHTML = `
                    <div class="project-detail-logo web-preview">
                        <img src="images/portfolio/${project.screenshots[0]}" alt="${project.title}">
                    </div>
                `;
            } else if (project.logo) {
                const logoClass = project.logoStyle === 'rounded' ? 'logo-rounded' : '';
                logoHTML = `
                    <div class="project-detail-logo">
                        <img src="images/portfolio/${project.logo}" alt="${project.title}" class="${logoClass}">
                    </div>
                `;
            }

            // Generate screenshots section
            let screenshotsHTML = '';
            if (project.screenshots && project.screenshots.length > 0) {
                const gridClass = isMobile ? 'mobile-grid' : 'web-grid';
                const screenshotClass = isMobile ? 'mobile-screenshot' : (isWeb ? 'web-screenshot' : '');
                
                screenshotsHTML = `
                    <div class="project-detail-section">
                        <h4><i class="fas fa-images"></i> Screenshots</h4>
                        <div class="project-screenshots ${gridClass}">
                            ${project.screenshots.map((screenshot, index) => `
                                <div class="screenshot-item ${screenshotClass}">
                                    <img src="images/portfolio/${screenshot}" alt="${project.title} Screenshot ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Generate tags section
            let tagsHTML = '';
            if (project.tags && project.tags.length > 0) {
                tagsHTML = `
                    <div class="project-detail-section">
                        <h4><i class="fas fa-tags"></i> Tags</h4>
                        <div class="project-detail-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            // Generate technologies section
            let technologiesHTML = '';
            if (project.technologies && project.technologies.length > 0) {
                technologiesHTML = `
                    <div class="project-detail-section">
                        <h4><i class="fas fa-code"></i> Technologies</h4>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            // Generate links section - REMOVED (not needed)
            let linksHTML = '';

            // Create modal HTML
            const modalHTML = `
                <div class="modal show" id="projectModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">${project.title}</h3>
                                <button type="button" class="close">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="project-detail-content">
                                    <div class="project-detail-header">
                                        ${logoHTML}
                                        <div class="project-detail-info">
                                            <div class="project-platforms">${platformBadgesHTML}</div>
                                            <p class="project-detail-description">${project.description}</p>
                                        </div>
                                    </div>
                                    ${screenshotsHTML}
                                    ${tagsHTML}
                                    ${technologiesHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // Setup close button
            const modal = document.getElementById('projectModal');
            const closeBtn = modal.querySelector('.close');
            
            closeBtn.onclick = () => this.closeModal();

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

        } catch (error) {
            console.error('Error showing project modal:', error);
            alert('Error loading project: ' + error.message);
        }
    }

    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: CONFIG.ANIMATION_DURATION,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }

    showLoading() {
        let loadingOverlay = document.querySelector('.loading-overlay');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(loadingOverlay);
        }
        loadingOverlay.classList.add('active');
    }

    hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
    }

    showQuickLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
    }

    hideQuickLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
            }, 200); // Delay singkat untuk smooth transition
        }
    }
}

// Initialize app when DOM is ready
let app;

document.addEventListener('DOMContentLoaded', async () => {
    app = new PortfolioApp();
    await app.initialize();
});

// Remove preloader after page load
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// Failsafe preloader removal
setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.remove();
}, CONFIG.LOADING_TIMEOUT);

export default PortfolioApp;
