# Patra Purbaya Portfolio Website

A modern, animated single-page portfolio website for Patra Purbaya, a Senior Mobile Flutter Developer specializing in Android and iOS development.

## Features

- Modern and clean design with beautiful animations
- Responsive layout that works on all devices
- Single-page application with smooth scrolling
- Interactive portfolio section with platform filtering (Android, iOS, Web)
- Cross-platform project showcase with separate Android and iOS links
- Work experience timeline with animated elements
- Soft skills and technical skills visualization
- Animated skills section with progress bars
- Contact form with validation
- Custom cursor effect
- Particle background effect
- AOS (Animate On Scroll) integration
- Easy to customize and modify

## File Structure

- `index.html` - Main HTML structure
- `style.css` - CSS styling and animations
- `script.js` - JavaScript functionality and interactions
- `form-handler.php` - PHP script for handling contact form submissions (optional)

## How to Modify

### Changing Personal Information

To update your personal information, modify the following sections in `index.html`:

1. **Name and Title**: Update in the navbar, home section, and about section
2. **About Me**: Update the text in the about section
3. **Work Experience**: Edit the timeline items in the work experience section
4. **Skills**: Modify the skills list and percentages in the about section
5. **Contact Information**: Update your location, email, and phone number in the contact section
6. **Social Media Links**: Add your social media profile URLs to the links in the contact section

### Customizing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `style.css`:

```css
:root {
    --primary-color: #6e57e0;    /* Main color (purple) */
    --secondary-color: #ff6584;  /* Accent color (pink) */
    --tertiary-color: #00c9a7;   /* Additional accent (teal) */
    --dark-color: #121212;       /* Background color */
    --light-color: #f8f9fa;      /* Text color */
    --gray-color: #6c757d;       /* Neutral color */
    /* ... other variables ... */
}
```

### Adding Portfolio Projects

To add a new portfolio project:

1. Copy an existing portfolio item structure from `index.html`
2. Paste it within the `.portfolio-container` div
3. Update the class to match the platform type (`android`, `ios`, or `web`)
4. Modify the content (title, description, tags)
5. Add your project link to the `data-link` attribute if available

Example:

```html
<div class="col-md-6 col-lg-4 mb-4 portfolio-item android" data-aos="zoom-in" data-aos-delay="100">
    <div class="portfolio-card">
        <div class="portfolio-image">
            <div class="placeholder-image bg-primary-gradient">
                <i class="fab fa-android fa-3x"></i>
            </div>
        </div>
        <div class="portfolio-content">
            <h4>Your Project Title</h4>
            <p>Your project description goes here.</p>
            <div class="portfolio-tags">
                <span>Flutter</span>
                <span>Android</span>
                <span>Your Tag</span>
            </div>
            <a href="https://your-project-link.com" class="portfolio-link" data-link="https://your-project-link.com">View Project</a>
        </div>
    </div>
</div>
```

### Adding Your Photo

To replace the placeholder icons with your photo:

1. Add your image file to the project directory
2. In `index.html`, find the comment `<!-- You can replace with your image later -->` in both the home and about sections
3. Replace the placeholder icon with an `<img>` tag pointing to your photo

Example:
```html
<div class="hero-image">
    <!-- Replace this -->
    <i class="fa-solid fa-code fa-5x"></i>
    
    <!-- With this -->
    <img src="your-photo.jpg" alt="Patra Purbaya" class="img-fluid">
</div>
```

### Modifying Animations

Most animations are defined in the CSS file. You can adjust their parameters to change speed, style, and behavior:

- Duration and timing: Change values for animation duration and delay
- Motion paths: Modify keyframe percentages and transform values
- Effects: Add or remove animation properties

## Additional Customization

For more advanced customization, you can:

1. Add new sections by following the existing section structure
2. Update the navigation menu when adding new sections
3. Customize the preloader by modifying the relevant CSS and JavaScript
4. Add additional libraries by including their CDN links in the HTML head

## Browser Compatibility

This website is compatible with modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

### Adding Platform-Specific Project Links

For projects that are available on multiple platforms:

1. Use the cross-platform portfolio item structure with separate links for Android and iOS
2. Update the `data-link` attribute for each platform link with the respective app store URLs
3. If a platform version is not available, keep the `data-link` attribute empty

Example:
```html
<div class="platform-links">
    <a href="https://play.google.com/store/apps/details?id=com.yourapp" class="platform-link android" data-link="https://play.google.com/store/apps/details?id=com.yourapp">
        <i class="fab fa-android"></i> Android
    </a>
    <a href="https://apps.apple.com/app/your-app/id123456789" class="platform-link ios" data-link="https://apps.apple.com/app/your-app/id123456789">
        <i class="fab fa-apple"></i> iOS
    </a>
</div>
```

### Using the PHP Form Handler

To use the PHP form handler instead of the JavaScript form handling:

1. Rename `index.html` to `index.php` 
2. Update the contact form to submit to the PHP script:
   ```html
   <form id="contactForm" method="post" action="form-handler.php">
   ```
3. Upload both files to a server with PHP support
4. Uncomment the email sending code in `form-handler.php` when ready # patrapurbaya277.github.io
