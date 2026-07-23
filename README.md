# React + Vite


 Modern Designer Portfolio - Sarah Mitchell

A high-performance, visually immersive portfolio landing page built with React, Tailwind CSS, and Lucide React. This project features a sophisticated dark-purple aesthetic with dynamic geometric backgrounds and an interactive "spotlight" mouse-tracking system.

 Key Features

Interactive Spotlight Effect: A custom radial-gradient that follows the user's mouse cursor, dynamically illuminating the background.

Geometric Parallax: Multiple SVG-style geometric layers (circles, squares, triangles) that move at different speeds relative to mouse movement, creating a sense of 3D depth.

Glassmorphism UI: High-end UI elements using backdrop-blur and semi-transparent borders for a premium feel.

Fully Responsive: Optimized for all screen sizes using Tailwind's mobile-first responsive utilities.

Modern Animations: Smooth entry animations and bouncing micro-interactions for key CTAs.

 Tech Stack

Framework: React.js

Styling: Tailwind CSS

Icons: Lucide React

State Management: React Hooks (useState, useEffect)

 Design System

Colors

Primary Background: #2a1b54 (Deep Purple)

Accent Color: #f97316 (Vibrant Orange)

Secondary Surfaces: rgba(255, 255, 255, 0.05) (Glass)

Typography

Headings: Sans-serif, Bold (Tracking-tight)

Body: Sans-serif, Light (Purple-100/70)

portfolio-app/
├── public/              # Static assets (favicons, etc.)
├── src/
│   ├── api/             # CMS client configuration (e.g., sanity.js)
│   ├── components/      # Reusable UI pieces
│   │   ├── Hero.jsx     # The hero section code
│   │   ├── ProjectCard.jsx
│   │   └── Navbar.jsx
│   ├── hooks/           # Custom hooks for mouse tracking/data fetching
│   ├── pages/           # Main page views
│   │   └── Home.jsx     # Orchestrates sections
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .env                 # CMS API keys and Project IDs
├── tailwind.config.js   # Custom theme & color configurations
└── README.md            # Documentation-


 Customization

Changing the Spotlight

The spotlight intensity can be adjusted in App.jsx within the background style of the spotlight div. Change the 600px value to adjust the radius or the rgba alpha value for brightness.

Modifying Geometric Shapes

To add or change shapes, look for the "Decorative Geometric Shapes" comment in App.jsx. Each shape uses a different translation multiplier (e.g., mousePosition.nX * -30) to control its parallax depth.

 License

This project is open-source and free to use for personal portfolios.




This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
