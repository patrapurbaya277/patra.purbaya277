// Visual Effects Manager - Hanya diinisialisasi sekali
class EffectsManager {
    constructor() {
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) {
            console.log('Effects already initialized, skipping...');
            return;
        }

        this.createParticles();
        this.setupCustomCursor();
        this.setupNavbarScroll();
        this.setupSmoothScroll();
        this.setupPortfolioFiltering();
        this.setupPortfolioLinks();
        this.setupContactForm();
        this.updateActiveNavLinks();
        
        this.initialized = true;
        console.log('Effects initialized');
    }

    createParticles() {
        // Check jika sudah ada
        if (document.querySelector('.particles-container')) {
            return;
        }

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const size = Math.random() * 5 + 1;
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

    setupCustomCursor() {
        // Check jika sudah ada
        if (document.querySelector('.cursor-dot')) {
            return;
        }

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        document.addEventListener('mousemove', function(e) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
            }, 50);
        });
        
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

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupSmoothScroll() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                const targetId = e.target.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    setupPortfolioFiltering() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                const filterBtns = document.querySelectorAll('.filter-btn');
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                
                filterBtns.forEach(btn => btn.classList.remove('active'));
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

    setupPortfolioLinks() {
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

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm && !contactForm.dataset.initialized) {
            contactForm.dataset.initialized = 'true';
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                const emailValue = document.querySelector('[data-i18n="contact.info.email.value"]')?.textContent || 'patra.purbaya277@gmail.com';
                const mailtoLink = `mailto:${emailValue}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
                
                window.location.href = mailtoLink;
                
                const successMsg = document.querySelector('[data-i18n="contact.form.successMessage"]')?.textContent || 'Thank you for your message!';
                alert(successMsg);
                
                contactForm.reset();
            });
        }
    }

    updateActiveNavLinks() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const handleScroll = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
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
        };
        
        window.addEventListener('scroll', handleScroll);
    }
}

export default EffectsManager;
