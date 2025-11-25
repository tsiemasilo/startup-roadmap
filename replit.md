# Car Detailing Business Startup Task Manager

## Overview

This is a task management application designed specifically for starting a car detailing business. The application helps entrepreneurs track and organize all the essential startup tasks across multiple categories including equipment procurement, supplies, vehicle setup, legal requirements, marketing, and business operations. Built with React, TypeScript, and modern UI components, it provides both list and calendar views to help users stay on track with their business launch timeline.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured to serve from the `client` directory
- React Router (wouter) for lightweight client-side routing
- Build output directed to `dist/public` for production deployment

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens defined in CSS variables (HSL color format)
- Theme support through next-themes for dark/light mode switching
- Comprehensive component collection including dialogs, cards, calendars, forms, and data display elements

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state using React hooks for UI interactions
- Custom hooks for mobile detection and toast notifications

**Form Handling**
- React Hook Form for form state management
- Zod resolver integration for schema validation (configured but not yet implemented)

**Date & Time Management**
- date-fns library for all date operations, formatting, and calendar calculations
- Calendar component using react-day-picker for date selection

### Backend Architecture

**Server Framework**
- Express.js server written in TypeScript
- Development mode uses tsx for hot-reloading TypeScript execution
- Production mode compiles and serves static assets alongside API routes

**Development vs Production**
- Development: Vite dev server integrated as Express middleware for HMR and instant updates
- Production: Static file serving from built `dist/public` directory
- Logging middleware tracks API request timing and responses (truncated at 80 characters)

**API Structure**
- Routes registered through a centralized `registerRoutes` function in `server/routes.ts`
- Currently minimal API implementation - primarily serves as a placeholder for future backend expansion
- Error handling middleware catches and formats errors with appropriate HTTP status codes

### Data Storage

**Current Implementation**
- Client-side data storage using in-memory state
- Initial task data loaded from `client/src/data/startupTasks.ts`
- No database integration currently implemented

**Data Model**
- Task interface includes: id, title, description, category, deadline, completion status, completion timestamp, and priority level
- Six predefined task categories: equipment, supplies, vehicle, legal, marketing, operations
- Priority levels: low, medium, high

### Design System

**Color Scheme**
- HSL-based color system defined as CSS custom properties
- Light theme with blue primary color (200 98% 39%)
- Semantic color tokens for background, foreground, borders, and component states
- Support for both light and dark themes through CSS variable overrides

**Typography**
- Inter font family for UI elements
- Lora for serif text
- Space Mono for monospace content

**Component Variants**
- Class Variance Authority (CVA) for type-safe component variant management
- Consistent sizing (sm, default, lg) and visual variants (default, destructive, outline, etc.) across components

### Key Application Features

**Task Management**
- CRUD operations for tasks (create, read, update, delete)
- Task filtering by category
- Task completion tracking with late completion detection
- Progress visualization showing completion percentage

**Views**
- List view with category-based organization
- Calendar view showing tasks mapped to their deadline dates
- Responsive design supporting mobile and desktop layouts

**User Experience**
- Toast notifications for user feedback
- Alert dialogs for destructive actions (delete confirmation)
- Form validation and error handling
- Visual indicators for overdue tasks and upcoming deadlines

## External Dependencies

**Core Framework**
- React 18.3.1 - UI library
- TypeScript - Type system
- Vite - Build tool and dev server
- Express 5.1.0 - Backend server framework

**UI Libraries**
- @radix-ui/* (multiple packages) - Unstyled, accessible component primitives
- Tailwind CSS - Utility-first CSS framework
- lucide-react 0.462.0 - Icon library
- next-themes 0.3.0 - Theme management

**State & Data Management**
- @tanstack/react-query 5.83.0 - Server state management
- react-hook-form - Form state management
- @hookform/resolvers 3.10.0 - Form validation resolvers

**Utilities**
- date-fns 3.6.0 - Date manipulation and formatting
- clsx & class-variance-authority - Conditional className utilities
- cmdk 1.1.1 - Command menu component
- embla-carousel-react 8.6.0 - Carousel component
- sonner - Toast notifications

**Development Tools**
- tsx - TypeScript execution for Node.js
- ESLint with TypeScript support
- PostCSS with Autoprefixer

**Deployment Platform**
- Configured for Lovable.dev platform integration
- Git-based deployment workflow