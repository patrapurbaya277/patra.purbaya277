// Language management module
import CONFIG from './config.js';

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem(CONFIG.STORAGE_KEY) || CONFIG.DEFAULT_LANGUAGE;
        this.websiteData = null;
        this.cache = {}; // Cache untuk menyimpan data bahasa yang sudah dimuat
    }

    async loadLanguageData(lang) {
        // Cek cache terlebih dahulu
        if (this.cache[lang]) {
            console.log(`Using cached data for language: ${lang}`);
            this.websiteData = this.cache[lang];
            this.currentLanguage = lang;
            localStorage.setItem(CONFIG.STORAGE_KEY, lang);
            return this.websiteData;
        }

        try {
            const response = await fetch(`data/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language data: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Simpan ke cache
            this.cache[lang] = data;
            this.websiteData = data;
            this.currentLanguage = lang;
            localStorage.setItem(CONFIG.STORAGE_KEY, lang);
            
            return data;
        } catch (error) {
            console.error('Error loading language data:', error);
            
            // Fallback ke English
            if (lang !== 'en') {
                return this.loadLanguageData('en');
            }
            
            // Jika English juga gagal, gunakan fallback data
            this.websiteData = this.createFallbackData();
            return this.websiteData;
        }
    }

    createFallbackData() {
        return {
            lang: "en",
            meta: {
                title: "Patra Purbaya | Portfolio",
                description: "Personal portfolio of Patra Purbaya"
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
                tagline: "Transforming ideas into exceptional mobile experiences",
                buttons: { portfolio: "Portfolio", contact: "Contact Me" }
            },
            portfolio: {
                title: "My Portfolio",
                subtitle: "Explore my recent projects",
                filters: [{ text: "All", filter: "all" }],
                projects: []
            },
            about: {
                title: "About Me",
                intro: "Senior Mobile Flutter Developer",
                description: "Creating exceptional mobile experiences",
                workExperience: { title: "Work Experience", jobs: [] },
                technicalSkills: { title: "My Skills", skills: [] },
                softSkills: { title: "Soft Skills", skills: [] },
                cvButton: "Download CV",
                cvLink: "#"
            },
            contact: {
                title: "Get In Touch",
                subtitle: "Let's discuss your project",
                info: {
                    location: { title: "Location", value: "Depok, Indonesia" },
                    email: { title: "Email", value: "patra.purbaya277@gmail.com" },
                    phone: { title: "Phone", value: "+62 813 5196 3101" }
                },
                socialLinks: [],
                form: {
                    namePlaceholder: "Your Name",
                    emailPlaceholder: "Your Email",
                    subjectPlaceholder: "Subject",
                    messagePlaceholder: "Your Message",
                    submitButton: "Send Message",
                    successMessage: "Thank you!"
                }
            },
            footer: { copyright: "All rights reserved." },
            languageSelector: {
                label: "Language",
                options: [{ value: "en", text: "English" }]
            }
        };
    }

    getData() {
        return this.websiteData;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

export default LanguageManager;
