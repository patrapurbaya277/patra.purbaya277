// Global variables
let websiteData = null;
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create loading indicator
    createLoadingIndicator();
    
    // Load data and initialize website
    loadLanguageData(currentLanguage)
        .then(() => {
            initializeWebsite();
            hideLoadingIndicator();
        })
        .catch(error => {
            console.error('Error initializing website:', error);
            hideLoadingIndicator();
        });
});

// Function to create loading indicator
function createLoadingIndicator() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay active';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

// Load language data from JSON file
async function loadLanguageData(lang) {
    showLoadingIndicator();
    try {
        const response = await fetch(`data/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language data: ${response.status}`);
        }
        websiteData = await response.json();
        localStorage.setItem('preferredLanguage', lang);
        currentLanguage = lang;
    } catch (error) {
        console.error('Error loading language data:', error);
        // Fallback to English if there's an error
        if (lang !== 'en') {
            return loadLanguageData('en');
        } else {
            // If even the English load fails, create a basic dummy data structure
            websiteData = createFallbackData();
        }
    } finally {
        hideLoadingIndicator();
    }
}

// Create fallback data if JSON loading fails
function createFallbackData() {
    return {
        lang: "en",
        meta: {
            title: "Patra Purbaya | Portfolio",
            description: "Personal portfolio of Patra Purbaya, a web developer"
        },
        navbar: {
            brand: "Patra Purbaya",
            links: [
                { text: "Home", href: "#home" },
                { text: "Portfolio", href: "#portfolio" },
                { text: "About", href: "#about" },
                { text: "Contact", href: "#contact" }
            ]
        },
        home: {
            name: "Patra Purbaya",
            title: "Senior Mobile Flutter Developer",
            tagline: "Transforming ideas into exceptional mobile experiences for Android and iOS since 2020.",
            buttons: {
                portfolio: "View My Work",
                contact: "Contact Me"
            }
        },
        portfolio: {
            title: "My Portfolio",
            subtitle: "Explore my recent projects across different platforms",
            filters: [
                { text: "All", filter: "all" },
                { text: "Android", filter: "android" },
                { text: "iOS", filter: "ios" },
                { text: "Web", filter: "web" }
            ],
            projects: [
                {
                    title: "Flutter Cross-Platform App",
                    description: "A feature-rich application developed for both Android and iOS using Flutter.",
                    image: "flutter-cross-platform.png",
                    tags: ["Flutter", "Cross-Platform", "Firebase"],
                    platforms: ["android", "ios"],
                    links: { android: "", ios: "" }
                }
            ]
        },
        about: {
            title: "About Me",
            intro: "I'm Patra Purbaya, a Senior Mobile Flutter Developer specializing in Android and iOS development since 2020.",
            description: "Graduated with a Diploma III in Teknik Informatika from Politeknik Negeri Pontianak, I've dedicated my career to creating exceptional mobile experiences that combine beautiful design with functional, user-friendly interfaces.",
            workExperience: {
                title: "Work Experience",
                jobs: [
                    {
                        title: "Senior Flutter Mobile App Developer",
                        company: "Appsku Aplikasi Indonesia",
                        period: "August 2024 - Present"
                    }
                ]
            },
            technicalSkills: {
                title: "My Skills",
                skills: [
                    { name: "Flutter", level: 95 }
                ]
            },
            softSkills: {
                title: "Soft Skills",
                skills: ["Communication", "Teamwork"]
            },
            cvButton: "Download CV",
            cvLink: "#"
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Let's discuss your project and see how I can help",
            info: {
                location: { title: "Location", value: "Depok, Indonesia" },
                email: { title: "Email", value: "patra.purbaya277@gmail.com" },
                phone: { title: "Phone", value: "+62 813 5196 3101" }
            },
            socialLinks: [
                { platform: "whatsapp", url: "https://wa.me/6281351963101", icon: "fab fa-whatsapp" }
            ],
            form: {
                namePlaceholder: "Your Name",
                emailPlaceholder: "Your Email",
                subjectPlaceholder: "Subject",
                messagePlaceholder: "Your Message",
                submitButton: "Send Message",
                successMessage: "Thank you for your message! I will get back to you soon."
            }
        },
        footer: {
            copyright: "All rights reserved."
        },
        languageSelector: {
            label: "Language",
            options: [
                { value: "en", text: "English" }
            ]
        }
    };
}

// Function to show loading indicator
function showLoadingIndicator() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

// Initialize the website with data
function initializeWebsite() {
    updateDocumentTitle();
    updateNavigation();
    updateLanguageSelector();
    updateContent();
    
    // Set current year in footer
    // document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Create particles
    createParticles();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    setupSmoothScroll();

    // Portfolio filtering
    setupPortfolioFiltering();

    // Handle portfolio links
    setupPortfolioLinks();

    // Contact form submission
    setupContactForm();

    // Custom cursor effect
    createCustomCursor();

    // Animate skill bars on scroll
    setupSkillsAnimation();
    
    // Add active class to current section in navigation
    updateActiveNavLinks();
}

// Update document title
function updateDocumentTitle() {
    document.title = websiteData.meta.title;
}

// Update navigation links
function updateNavigation() {
    const navLinksContainer = document.querySelector('#navbarNav .navbar-nav');
    navLinksContainer.innerHTML = '';

    websiteData.navbar.links.forEach(link => {
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

// Update language selector
function updateLanguageSelector() {
    const languageOptions = document.getElementById('languageOptions');
    languageOptions.innerHTML = '';

    websiteData.languageSelector.options.forEach(option => {
        const li = document.createElement('li');
        
        const a = document.createElement('a');
        a.className = 'dropdown-item' + (option.value === currentLanguage ? ' active' : '');
        a.href = '#';
        a.setAttribute('data-lang', option.value);
        a.textContent = option.text;
        
        a.addEventListener('click', async function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLanguage) {
                await loadLanguageData(lang);
                initializeWebsite();
            }
        });
        
        li.appendChild(a);
        languageOptions.appendChild(li);
    });
    
    document.querySelector('[data-i18n="languageSelector.label"]').textContent = websiteData.languageSelector.label;
}

// Update all content with translation data
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedProperty(websiteData, key);
        
        if (value !== undefined) {
            element.textContent = value;
        }
    });
    
    // Set CV link
    document.getElementById('cv-link').href = websiteData.about.cvLink;
    
    // Build portfolio sections
    buildPortfolioFilters();
    buildPortfolioItems();
    
    // Build work experience timeline
    buildWorkExperience();
    
    // Build skills sections
    buildTechnicalSkills();
    buildSoftSkills();
    
    // Build social links
    buildSocialLinks();
    
    // Update form placeholders
    updateFormPlaceholders();
}

// Helper function to get nested property from object
function getNestedProperty(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined;
    }, obj);
}

// Build portfolio filters
function buildPortfolioFilters() {
    const filtersContainer = document.getElementById('portfolio-filters');
    filtersContainer.innerHTML = '';
    
    websiteData.portfolio.filters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.className = 'filter-btn' + (index === 0 ? ' active' : '');
        button.setAttribute('data-filter', filter.filter);
        button.textContent = filter.text;
        
        filtersContainer.appendChild(button);
    });
}

// Build portfolio items
function buildPortfolioItems() {
    const portfolioContainer = document.getElementById('portfolio-items');
    portfolioContainer.innerHTML = '';
    
    websiteData.portfolio.projects.forEach((project, index) => {
        const delay = (index % 6) * 100 + 100;
        const platforms = project.platforms.join(' ');
        
        const projectElement = document.createElement('div');
        projectElement.className = `col-md-6 col-lg-4 mb-4 portfolio-item ${platforms}`;
        projectElement.setAttribute('data-aos', 'zoom-in');
        projectElement.setAttribute('data-aos-delay', delay);
        
        // Update image path to use images folder
        const imagePath = `images/portfolio/${project.image}`;
        
        let projectContent = `
            <div class="portfolio-card">
                <div class="portfolio-image">
                    <div class="placeholder-image bg-${getGradientClass(project.platforms)}">
        `;
        
        if (project.platforms.includes('android') && project.platforms.includes('ios')) {
            projectContent += `
                        <div class="platform-icons">
                            <i class="fab fa-android"></i>
                            <i class="fab fa-apple"></i>
                        </div>
            `;
        } else if (project.platforms.includes('android')) {
            projectContent += `<i class="fab fa-android fa-3x"></i>`;
        } else if (project.platforms.includes('ios')) {
            projectContent += `<i class="fab fa-apple fa-3x"></i>`;
        } else if (project.platforms.includes('web')) {
            projectContent += `<i class="fas fa-${project.title.toLowerCase().includes('design') ? 'palette' : 'globe'} fa-3x"></i>`;
        }
        
        projectContent += `
                    </div>
                </div>
                <div class="portfolio-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="portfolio-tags">
        `;
        
        project.tags.forEach(tag => {
            projectContent += `<span>${tag}</span>`;
        });
        
        projectContent += `
                    </div>
        `;
        
        if (project.platforms.includes('android') && project.platforms.includes('ios')) {
            projectContent += `
                    <div class="platform-links">
                        <a href="${project.links.android || '#'}" class="platform-link android" data-link="${project.links.android}">
                            <i class="fab fa-android"></i> Android
                        </a>
                        <a href="${project.links.ios || '#'}" class="platform-link ios" data-link="${project.links.ios}">
                            <i class="fab fa-apple"></i> iOS
                        </a>
                    </div>
            `;
        } else {
            const linkText = project.platforms.includes('web') && project.title.toLowerCase().includes('design') 
                ? 'View Designs' 
                : 'View Project';
            
            projectContent += `
                    <a href="${project.links.project || '#'}" class="portfolio-link" data-link="${project.links.project}">
                        ${linkText}
                    </a>
            `;
        }
        
        projectContent += `
                </div>
            </div>
        `;
        
        projectElement.innerHTML = projectContent;
        portfolioContainer.appendChild(projectElement);
    });
}

// Helper function to get gradient class based on platforms
function getGradientClass(platforms) {
    if (platforms.includes('android') || (platforms.includes('android') && platforms.includes('ios'))) {
        return 'primary-gradient';
    } else if (platforms.includes('ios')) {
        return 'secondary-gradient';
    } else {
        return 'tertiary-gradient';
    }
}

// Build work experience
function buildWorkExperience() {
    const workExperienceContainer = document.getElementById('work-experience');
    workExperienceContainer.innerHTML = '';
    
    websiteData.about.workExperience.jobs.forEach(job => {
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

// Build technical skills
function buildTechnicalSkills() {
    const technicalSkillsContainer = document.getElementById('technical-skills');
    technicalSkillsContainer.innerHTML = '';
    
    websiteData.about.technicalSkills.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        
        skillElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${skill.level}%"></div>
            </div>
        `;
        
        technicalSkillsContainer.appendChild(skillElement);
    });
}

// Build soft skills
function buildSoftSkills() {
    const softSkillsContainer = document.getElementById('soft-skills');
    softSkillsContainer.innerHTML = '';
    
    websiteData.about.softSkills.skills.forEach(skill => {
        const skillElement = document.createElement('span');
        skillElement.className = 'soft-skill-tag';
        skillElement.textContent = skill;
        
        softSkillsContainer.appendChild(skillElement);
    });
}

// Build social links
function buildSocialLinks() {
    const socialLinksContainer = document.getElementById('social-links');
    socialLinksContainer.innerHTML = '';
    
    websiteData.contact.socialLinks.forEach(link => {
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

// Update form placeholders
function updateFormPlaceholders() {
    document.getElementById('name').placeholder = websiteData.contact.form.namePlaceholder;
    document.getElementById('email').placeholder = websiteData.contact.form.emailPlaceholder;
    document.getElementById('subject').placeholder = websiteData.contact.form.subjectPlaceholder;
    document.getElementById('message').placeholder = websiteData.contact.form.messagePlaceholder;
}

// Setup smooth scrolling
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup portfolio filtering
function setupPortfolioFiltering() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
}

// Setup portfolio links
function setupPortfolioLinks() {
    document.addEventListener('click', function(e) {
        if ((e.target.classList.contains('portfolio-link') || e.target.classList.contains('platform-link')) &&
            !e.target.getAttribute('data-link')) {
            e.preventDefault();
            e.target.classList.add('shake');
            setTimeout(() => {
                e.target.classList.remove('shake');
            }, 500);
        }
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create mailto: link with form data
            const mailtoLink = `mailto:${websiteData.contact.info.email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Open the mail client
            window.location.href = mailtoLink;
            
            // Show success message
            alert(websiteData.contact.form.successMessage);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Function to create particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random animation duration and delay
        const duration = Math.random() * 60 + 20;
        const delay = Math.random() * 10;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--delay', `${delay}s`);
        
        particlesContainer.appendChild(particle);
    }
}

// Function to create custom cursor
function createCustomCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    document.addEventListener('mousemove', function(e) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Add slight delay to outline for nice effect
        setTimeout(() => {
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }, 50);
    });
    
    // Change cursor size on hover over links and buttons
    document.addEventListener('mouseover', function(e) {
        if (e.target.matches('a, button, .filter-btn, .portfolio-card')) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.matches('a, button, .filter-btn, .portfolio-card')) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
}

// Setup skills animation
function setupSkillsAnimation() {
    const skillsSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (skillsSection && progressBars.length > 0) {
        const animateSkills = function() {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (sectionPos < screenHeight * 0.75) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        window.addEventListener('scroll', animateSkills);
    }
}

// Function to add active class to current section in navigation
function updateActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
} 