# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using React 19, TypeScript, and Tailwind CSS 4. The project uses the App Router architecture with React Server Components and has the React Compiler enabled.

## Architecture

### App Router Structure
- Uses Next.js App Router (not Pages Router)
- All routes are defined in `src/app/` directory
- Root layout in `src/app/layout.tsx` sets up fonts (Geist Sans and Geist Mono) and metadata
- Main page is `src/app/page.tsx`

### Styling
- Tailwind CSS 4 with PostCSS configuration
- Global styles in `src/app/globals.css` using Tailwind's `@import` directive
- Custom CSS variables for `--background` and `--foreground` with dark mode support
- Geist fonts are loaded via `next/font/google` and exposed as CSS variables

### TypeScript Configuration
- Path alias `@/*` maps to `./src/*` for cleaner imports
- Strict mode enabled
- Target ES2017

### React Compiler
- React Compiler is enabled in `next.config.ts` (experimental performance optimization)

## Development Commands

### Start Development Server
```bash
npm run dev
```
Development server runs on http://localhost:3000 with hot reloading.

### Build for Production
```bash
npm run build
```
Creates optimized production build in `.next/` directory.

### Start Production Server
```bash
npm run start
```
Runs the production build (must run `npm run build` first).

### Linting
```bash
npm run lint
```
Runs ESLint with Next.js configuration. The project uses ESLint 9+ with the new flat config format in `eslint.config.mjs`.

## Key Technical Details

### Dependencies
- **Next.js 16.0.8**: Latest App Router features, React Server Components
- **React 19.2.1**: Latest React with improved Server Components support
- **Tailwind CSS 4**: Using the new `@import "tailwindcss"` syntax and `@theme inline` directive
- **TypeScript 5**: Strict type checking enabled

### Font Optimization
The project uses Next.js font optimization with Google Fonts (Geist Sans and Geist Mono). Fonts are loaded in the root layout and applied via CSS variables.

### Image Optimization
Uses `next/image` component for automatic image optimization. SVG assets are in the `public/` directory.

## File Structure Conventions
- Components and pages: Use `.tsx` extension
- Configuration files: Use `.mjs` (ESLint, PostCSS) or `.ts` (Next config, TypeScript config)
- All source code is in `src/` directory
- Static assets go in `public/` directory (served from `/`)
