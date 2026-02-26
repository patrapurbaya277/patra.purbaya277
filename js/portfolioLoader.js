// Portfolio Projects Loader
class PortfolioLoader {
    constructor() {
        this.projectsCache = {};
        this.indexCache = null;
    }

    async loadProjectsIndex() {
        if (this.indexCache) {
            return this.indexCache;
        }

        try {
            const response = await fetch('data/projects/index.json');
            if (!response.ok) {
                throw new Error('Failed to load projects index');
            }
            this.indexCache = await response.json();
            return this.indexCache;
        } catch (error) {
            console.error('Error loading projects index:', error);
            return { projects: [], categories: {}, featured: [] };
        }
    }

    async loadProject(projectId) {
        if (this.projectsCache[projectId]) {
            return this.projectsCache[projectId];
        }

        try {
            const response = await fetch(`data/projects/${projectId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load project: ${projectId}`);
            }
            const project = await response.json();
            this.projectsCache[projectId] = project;
            return project;
        } catch (error) {
            console.error(`Error loading project ${projectId}:`, error);
            return null;
        }
    }

    async loadAllProjects() {
        const index = await this.loadProjectsIndex();
        const projects = await Promise.all(
            index.projects.map(projectId => this.loadProject(projectId))
        );
        return projects.filter(p => p !== null);
    }

    async loadProjectsByCategory(category) {
        const index = await this.loadProjectsIndex();
        const projectIds = index.categories[category] || [];
        const projects = await Promise.all(
            projectIds.map(projectId => this.loadProject(projectId))
        );
        return projects.filter(p => p !== null);
    }

    async loadFeaturedProjects() {
        const index = await this.loadProjectsIndex();
        const projects = await Promise.all(
            index.featured.map(projectId => this.loadProject(projectId))
        );
        return projects.filter(p => p !== null);
    }

    convertProjectToLegacyFormat(project, lang) {
        // Get the original project ID
        const projectId = Object.keys(this.projectsCache).find(id => 
            this.projectsCache[id] === project
        ) || 'unknown';
        
        return {
            id: projectId,
            title: project.name[lang] || project.name.en,
            description: project.description[lang] || project.description.en,
            shortDescription: project.shortDescription[lang] || project.shortDescription.en,
            logo: project.logo,
            logoStyle: project.logoStyle || 'default',
            screenshots: project.screenshots || [],
            image: project.logo || (project.screenshots && project.screenshots[0]) || '',
            tags: project.tags || [],
            platforms: project.platforms || [],
            technologies: project.technologies || [],
            links: project.links || {},
            featured: project.featured || false,
            order: project.order || 0,
            category: project.category || 'other'
        };
    }

    async getProjectsForLanguage(lang = 'en') {
        const allProjects = await this.loadAllProjects();
        return allProjects
            .map(project => this.convertProjectToLegacyFormat(project, lang))
            .sort((a, b) => a.order - b.order);
    }
    
    async getProject(projectId, lang = 'en') {
        const project = await this.loadProject(projectId);
        if (!project) return null;
        return this.convertProjectToLegacyFormat(project, lang);
    }
}

export default PortfolioLoader;
