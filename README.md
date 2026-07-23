# 🎨 Modern Designer Portfolio - Alatise Oreoluwa

A high-performance, visually immersive portfolio landing page designed to showcase creative work with cutting-edge web technologies. Built with **React + Vite**, this project combines smooth animations, interactive effects, and a sophisticated dark-purple aesthetic to create an unforgettable first impression.

## ✨ Key Features

- **Interactive Spotlight Effect** – A custom radial gradient that follows your mouse cursor, dynamically illuminating the background for an engaging, immersive experience
- **Geometric Parallax Layers** – Multiple SVG-style geometric shapes (circles, squares, triangles) that move at different speeds, creating stunning 3D depth perception
- **Glassmorphism UI** – Premium, modern interface elements using backdrop-blur effects and semi-transparent borders
- **Fully Responsive Design** – Optimized for desktop, tablet, and mobile devices using Tailwind CSS utilities
- **Smooth Animations** – Elegant entry animations and micro-interactions on call-to-action buttons
- **Performance-Optimized** – Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework for building interactive components |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework for responsive styling |
| **Lucide React** | Beautiful, consistent icon library |
| **React Hooks** | State management (useState, useEffect, useRef) |

## 🎯 Design System

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary Background | Deep Purple | `#2a1b54` |
| Accent | Vibrant Orange | `#f97316` |
| Glass Surfaces | Semi-transparent White | `rgba(255, 255, 255, 0.05)` |
| Text Primary | Purple-100 | Default |
| Text Secondary | Purple-100 (70% opacity) | `rgba(100, 50, 200, 0.7)` |

### Typography

- **Headings** – Sans-serif, bold weight, tight letter-spacing
- **Body Text** – Sans-serif, light weight, high contrast for readability
- **Accent Text** – Orange highlights for CTAs and interactive elements

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samplex-Web-Solutions/Product-Designer-Alatise-Oreoluwa.git
   cd Product-Designer-Alatise-Oreoluwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized, minified build in the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
# or
yarn preview
```

## ⚙️ Customization

### Adjusting the Spotlight Effect

Edit the spotlight intensity in `src/App.jsx`:

```javascript
// In the background style of the spotlight div
// Change the radius (currently 600px) to adjust coverage area
// Adjust rgba alpha value (0-1) for brightness
style={{
  background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.15) 0%, transparent 100%)`
}}
```

### Modifying Geometric Shapes

Look for the "Decorative Geometric Shapes" section in `src/App.jsx`. Each shape uses a parallax multiplier to control its depth:

```javascript
// Example: Circle layer
transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
// Larger multiplier = stronger parallax effect
```

### Changing Colors

Update the color values in `tailwind.config.js`:

```javascript
theme: {
  colors: {
    'primary-purple': '#2a1b54',
    'accent-orange': '#f97316',
    // ... more colors
  }
}
```

Or override inline in JSX using Tailwind classes:

```jsx
<div className="bg-gradient-to-br from-purple-900 to-purple-800">
  {/* Content */}
</div>
```

## 📱 Responsive Design

The project is mobile-first, with breakpoints:

- **Mobile** – 320px and up
- **Tablet** – 768px and up (`md:`)
- **Desktop** – 1024px and up (`lg:`)

Use Tailwind's responsive prefixes to adjust components:

```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 📦 Dependencies

### Core
- `react` – UI library
- `react-dom` – React rendering
- `vite` – Build tool

### Styling & UI
- `tailwindcss` – Utility CSS framework
- `lucide-react` – Icon library
- `autoprefixer` – CSS vendor prefixes

### Development
- `@vitejs/plugin-react` – React Fast Refresh support
- `eslint` – Code quality linting
- `tailwindcss` (dev) – Development support

## 🧪 Development Workflows

### Hot Module Replacement (HMR)

Changes to files automatically refresh the browser without losing state:

```bash
npm run dev
```

### Linting

Check code quality:

```bash
npm run lint
```

### Building & Previewing

Test the production build locally:

```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and connect your repo
3. Vercel auto-detects Vite and deploys automatically

### Netlify

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages

See [Vite deployment docs](https://vitejs.dev/guide/static-deploy.html) for GitHub Pages setup.

## 📄 License

This project is open-source and available for personal portfolio use.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📞 Support & Questions

For issues, questions, or suggestions:

- Open an [Issue](https://github.com/Samplex-Web-Solutions/Product-Designer-Alatise-Oreoluwa/issues)
- Check existing [Discussions](https://github.com/Samplex-Web-Solutions/Product-Designer-Alatise-Oreoluwa/discussions)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/icons/)

---

**Built with ❤️ by Samplex Web Solutions**

*Last updated: July 2026*