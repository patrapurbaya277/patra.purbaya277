// UI Update Manager - Only updates content, not visual effects
class UIManager {
    constructor(languageManager, portfolioLoader) {
        this.languageManager = languageManager;
        this.portfolioLoader = portfolioLoader;
    }

    updateDocumentTitle() {
        const data = this.languageManager.getData();
        document.title = data.meta.title;
    }

    updateNavigation() {
        const data = this.languageManager.getData();
        const navLinksContainer = document.querySelector('#navbarNav .navbar-nav');
        if (!navLinksContainer) return;
        
        navLinksContainer.innerHTML = '';

        data.navbar.links.forEach(link => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = link.href;
            a.textContent = link.text;
            
            li.appendChild(a);
            navLinksContainer.appendChild(li);
        });
    }

    updateLanguageSelector(onLanguageChange) {
        const data = this.languageManager.getData();
        const languageOptions = document.getElementById('languageOptions');
        if (!languageOptions) return;
        
        const currentLang = this.languageManager.getCurrentLanguage();
        
        languageOptions.innerHTML = '';

        data.languageSelector.options.forEach(option => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item' + (option.value === currentLang ? ' active' : '');
            a.href = '#';
            a.setAttribute('data-lang', option.value);
            a.textContent = option.text;
            
            a.addEventListener('click', async (e) => {
                e.preventDefault();
                const lang = a.getAttribute('data-lang');
                if (lang !== currentLang) {
                    await onLanguageChange(lang);
                }
            });
            
            li.appendChild(a);
            languageOptions.appendChild(li);
        });
        
        const labelElement = document.querySelector('[data-i18n="languageSelector.label"]');
        if (labelElement) {
            labelElement.textContent = data.languageSelector.label;
        }
    }

    updateTextContent() {
        const data = this.languageManager.getData();
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedProperty(data, key);
            
            if (value !== undefined) {
                element.textContent = value;
            }
        });
    }

    updateFormPlaceholders() {
        const data = this.languageManager.getData();
        const form = data.contact.form;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        if (nameInput) nameInput.placeholder = form.namePlaceholder;
        if (emailInput) emailInput.placeholder = form.emailPlaceholder;
        if (subjectInput) subjectInput.placeholder = form.subjectPlaceholder;
        if (messageInput) messageInput.placeholder = form.messagePlaceholder;
    }

    buildPortfolioFilters() {
        const data = this.languageManager.getData();
        const filtersContainer = document.getElementById('portfolio-filters');
        if (!filtersContainer) return;
        
        filtersContainer.innerHTML = '';
        
        data.portfolio.filters.forEach((filter, index) => {
            const button = document.createElement('button');
            button.className = 'filter-btn' + (index === 0 ? ' active' : '');
            button.setAttribute('data-filter', filter.filter);
            button.textContent = filter.text;
            
            filtersContainer.appendChild(button);
        });
    }

    async buildPortfolioItems(featuredOnly = false) {
        const portfolioContainer = document.getElementById('portfolio-items');
        if (!portfolioContainer) return;
        
        portfolioContainer.innerHTML = '<div class="col-12 text-center py-5"><div class="loading-spinner"></div><p>Loading projects...</p></div>';
        
        try {
            const currentLang = this.languageManager.getCurrentLanguage();
            let projects = await this.portfolioLoader.getProjectsForLanguage(currentLang);
            
            if (featuredOnly) {
                const index = await this.portfolioLoader.loadProjectsIndex();
                const featuredIds = index.featured || [];
                projects = projects.filter(p => featuredIds.includes(p.id));
            }
            
            portfolioContainer.innerHTML = '';
            
            if (projects.length === 0) {
                portfolioContainer.innerHTML = '<div class="col-12 text-center py-5"><p>No projects found.</p></div>';
                return;
            }
            
            projects.forEach((project, index) => {
                const delay = (index % 6) * 100 + 100;
                const platforms = project.platforms.join(' ');
                
                const projectElement = document.createElement('div');
                projectElement.className = `col-md-6 col-lg-4 mb-4 portfolio-item ${platforms}`;
                projectElement.setAttribute('data-aos', 'zoom-in');
                projectElement.setAttribute('data-aos-delay', delay);
                projectElement.setAttribute('data-project-id', project.id);
                
                // Determine image display logic
                let imageHTML = '';
                const isMobile = project.platforms.includes('android') || project.platforms.includes('ios');
                const isWeb = project.platforms.includes('web');
                
                // Priority: screenshots first for web, then logo
                if (isWeb && project.screenshots && project.screenshots.length > 0) {
                    // Web project with screenshot - show FULL WIDTH
                    imageHTML = `
                        <div class="portfolio-image web-screenshot">
                            <img src="images/portfolio/${project.screenshots[0]}" alt="${project.title}">
                        </div>
                    `;
                } else if (project.logo && !isWeb) {
                    // Mobile project with logo - show centered with rounded corners if specified
                    const logoClass = project.logoStyle === 'rounded' ? 'logo-rounded' : '';
                    imageHTML = `
                        <div class="portfolio-image logo-container">
                            <img src="images/portfolio/${project.logo}" alt="${project.title}" class="${logoClass}">
                        </div>
                    `;
                } else if (project.logo) {
                    // Other logos (web without screenshot)
                    const logoClass = project.logoStyle === 'rounded' ? 'logo-rounded' : '';
                    imageHTML = `
                        <div class="portfolio-image logo-container">
                            <img src="images/portfolio/${project.logo}" alt="${project.title}" class="${logoClass}">
                        </div>
                    `;
                } else if (project.screenshots && project.screenshots.length > 0) {
                    if (isMobile && project.screenshots.length >= 2) {
                        // Mobile: show 2 screenshots side by side
                        imageHTML = `
                            <div class="portfolio-image mobile-dual">
                                <img src="images/portfolio/${project.screenshots[0]}" alt="${project.title} 1">
                                <img src="images/portfolio/${project.screenshots[1]}" alt="${project.title} 2">
                            </div>
                        `;
                    } else {
                        // Single screenshot
                        imageHTML = `
                            <div class="portfolio-image">
                                <img src="images/portfolio/${project.screenshots[0]}" alt="${project.title}">
                            </div>
                        `;
                    }
                } else {
                    // No images - show platform icon
                    const gradientClass = this.getGradientClass(project.platforms);
                    let iconHTML = '';
                    
                    if (project.platforms.includes('android') && project.platforms.includes('ios')) {
                        iconHTML = `<div class="platform-icons"><i class="fab fa-android"></i><i class="fab fa-apple"></i></div>`;
                    } else if (project.platforms.includes('android')) {
                        iconHTML = `<i class="fab fa-android fa-3x"></i>`;
                    } else if (project.platforms.includes('ios')) {
                        iconHTML = `<i class="fab fa-apple fa-3x"></i>`;
                    } else if (project.platforms.includes('web')) {
                        iconHTML = `<i class="fas fa-globe fa-3x"></i>`;
                    }
                    
                    imageHTML = `<div class="portfolio-image"><div class="placeholder-image bg-${gradientClass}">${iconHTML}</div></div>`;
                }
                
                // Build platform badges
                let platformBadgesHTML = '<div class="platform-badges">';
                project.platforms.forEach(platform => {
                    const platformIcons = {
                        'android': 'fab fa-android',
                        'ios': 'fab fa-apple',
                        'web': 'fas fa-globe'
                    };
                    const icon = platformIcons[platform] || 'fas fa-circle';
                    platformBadgesHTML += `<span class="platform-badge ${platform}"><i class="${icon}"></i></span>`;
                });
                platformBadgesHTML += '</div>';
                
                // Build tags
                let tagsHTML = '';
                (project.tags || []).forEach(tag => {
                    tagsHTML += `<span>${tag}</span>`;
                });
                
                const shortDesc = project.shortDescription || (project.description ? project.description.substring(0, 120) + '...' : 'No description available');
                
                const projectContent = `
                    <div class="portfolio-card clickable" data-project-id="${project.id}">
                        ${platformBadgesHTML}
                        ${imageHTML}
                        <div class="portfolio-content">
                            <h4>${project.title}</h4>
                            <p>${shortDesc}</p>
                            <div class="portfolio-tags">${tagsHTML}</div>
                            <div class="portfolio-footer">
                                <button class="portfolio-link view-detail-btn" data-project-id="${project.id}">
                                    <span>View Details</span>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                projectElement.innerHTML = projectContent;
                portfolioContainer.appendChild(projectElement);
            });
            
        } catch (error) {
            console.error('Error building portfolio items:', error);
            portfolioContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger">Error loading projects: ${error.message}</p>
                    <button class="btn btn-primary mt-3" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }

    buildWorkExperience() {
        const data = this.languageManager.getData();
        const workExperienceContainer = document.getElementById('work-experience');
        if (!workExperienceContainer) return;
        
        workExperienceContainer.innerHTML = '';
        
        data.about.workExperience.jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'timeline-item';
            
            jobElement.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h5>${job.title}</h5>
                    <p class="company">${job.company}</p>
                    <p class="period">${job.period}</p>
                </div>
            `;
            
            workExperienceContainer.appendChild(jobElement);
        });
    }

    buildTechnicalSkills() {
        const data = this.languageManager.getData();
        const technicalSkillsContainer = document.getElementById('technical-skills');
        if (!technicalSkillsContainer) return;
        
        technicalSkillsContainer.innerHTML = '';
        
        const skillsWrapper = document.createElement('div');
        skillsWrapper.className = 'soft-skills-container';
        
        data.about.technicalSkills.skills.forEach(skill => {
            const skillElement = document.createElement('span');
            skillElement.className = 'soft-skill-tag';
            skillElement.textContent = skill.name;
            
            skillsWrapper.appendChild(skillElement);
        });
        
        technicalSkillsContainer.appendChild(skillsWrapper);
    }

    buildSoftSkills() {
        const data = this.languageManager.getData();
        const softSkillsContainer = document.getElementById('soft-skills');
        if (!softSkillsContainer) return;
        
        softSkillsContainer.innerHTML = '';
        
        data.about.softSkills.skills.forEach(skill => {
            const skillElement = document.createElement('span');
            skillElement.className = 'soft-skill-tag';
            skillElement.textContent = skill;
            
            softSkillsContainer.appendChild(skillElement);
        });
    }

    buildSocialLinks() {
        const data = this.languageManager.getData();
        const socialLinksContainer = document.getElementById('social-links');
        if (!socialLinksContainer) return;
        
        socialLinksContainer.innerHTML = '';
        
        data.contact.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-icon';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            
            const i = document.createElement('i');
            i.className = link.icon;
            
            a.appendChild(i);
            socialLinksContainer.appendChild(a);
        });
    }

    updateCVLink() {
        const data = this.languageManager.getData();
        const cvLink = document.getElementById('cv-link');
        if (cvLink) {
            cvLink.href = data.about.cvLink;
        }
    }

    async updateAllContent(featuredOnly = false) {
        this.updateDocumentTitle();
        this.updateTextContent();
        this.updateFormPlaceholders();
        this.buildPortfolioFilters();
        await this.buildPortfolioItems(featuredOnly);
        this.buildWorkExperience();
        this.buildTechnicalSkills();
        this.buildSoftSkills();
        this.buildSocialLinks();
        this.updateCVLink();
        
        if (featuredOnly) {
            this.addViewAllButton();
        }
    }
    
    addViewAllButton() {
        const portfolioContainer = document.getElementById('portfolio-items');
        if (!portfolioContainer) return;
        
        const viewAllContainer = document.createElement('div');
        viewAllContainer.className = 'col-12';
        viewAllContainer.innerHTML = `
            <div class="view-all-projects" data-aos="fade-up">
                <a href="projects.html" class="btn-view-all">
                    <span>View All Projects</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        portfolioContainer.appendChild(viewAllContainer);
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, obj);
    }

    getGradientClass(platforms) {
        if (platforms.includes('android') || (platforms.includes('android') && platforms.includes('ios'))) {
            return 'primary-gradient';
        } else if (platforms.includes('ios')) {
            return 'secondary-gradient';
        } else {
            return 'tertiary-gradient';
        }
    }
}

export default UIManager;
