# AI Agents Guide - Diteria Home

## Project Structure

This project follows a standard structure for static websites. **It is essential to maintain this organization during development.**

### Folder Structure

```
project_diteria-home/
├── index.html              # Main page
├── css/                    # All CSS files
│   └── styles.css
├── js/                     # All JavaScript files
│   └── main.js
├── images/                 # All project images
├── assets/                 # Other resources (fonts, icons, etc.)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions for deployment
└── README.md              # Project documentation
```

## Development Rules

### 1. File Organization

- **CSS**: All styles must go in the `css/` folder
  - Main file: `styles.css`
  - If more CSS files are needed, follow naming: `descriptive-name.css`

- **JavaScript**: All scripts must go in the `js/` folder
  - Main file: `main.js`
  - Additional scripts: `descriptive-name.js`

- **Images**: All images in the `images/` folder
  - Use descriptive names: `logo.png`, `hero-background.jpg`
  - Keep images optimized for web

- **Assets**: Additional resources in the `assets/` folder
  - Fonts, icons, downloadable files, etc.

### 2. HTML References

All paths must be relative to the project root:

```html
<!-- CSS -->
<link rel="stylesheet" href="css/styles.css">

<!-- JavaScript -->
<script src="js/main.js"></script>

<!-- Images -->
<img src="images/logo.png" alt="Logo">

<!-- Assets -->
<link rel="stylesheet" href="assets/fonts/custom-font.css">
```

### 3. Best Practices

1. **Do not create files outside their corresponding folder**
   - CSS goes in `css/`
   - JS goes in `js/`
   - Images go in `images/`

2. **Keep code organized**
   - Clear comments in CSS and JavaScript
   - Consistent indentation
   - Descriptive class and ID names

3. **Optimization**
   - Minimize the number of CSS/JS files when possible
   - Compress images before uploading
   - Use file names without spaces or special characters

4. **Accessibility**
   - Always include `alt` attributes on images
   - Use semantic HTML
   - Maintain adequate color contrast

## Deployment

The project uses GitHub Actions for automatic deployment to GitHub Pages:

- **Trigger**: Push to `main` branch
- **Configuration**: `.github/workflows/deploy.yml`
- **Do not modify** the workflow file without consulting

## New Features

When adding new features:

1. Create files in the appropriate folders
2. Update `index.html` with necessary references
3. Document significant changes in `README.md`
4. Keep the folder structure intact

## Forbidden

❌ Create CSS files outside `css/`  
❌ Create JS files outside `js/`  
❌ Place images in root or incorrect folders  
❌ Modify folder structure without authorization  
❌ Use absolute or external paths unnecessarily

## Reminder

**The proposed structure must always be respected.** This ensures:
- Maintainable code
- Consistent deployment
- Easy collaboration
- Project scalability
