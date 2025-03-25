# System Patterns

## Architecture Overview

### Directory Structure

```
src/
├── api/          # API integration and data fetching
├── app/          # Expo Router screens and navigation
├── components/   # Reusable UI components
│   └── ui/      # Core UI components
├── lib/          # Shared utilities and hooks
├── translations/ # i18n resources
└── types/        # TypeScript definitions
```

## Design Patterns

### Component Architecture

- Functional components with TypeScript
- Props interfaces defined at component top
- Component-specific types in component files
- Shared types in `types` directory
- Maximum component size: 80 lines

### State Management

- Zustand for global state
- React Query for server state
- Local component state with useState
- MMKV for persistent storage

### Data Flow

1. API Layer

   - React Query for data fetching
   - Axios for HTTP requests
   - Type-safe API responses
   - Error handling middleware

2. State Layer

   - Zustand stores for global state
   - React Query cache for server data
   - Local storage for offline data
   - State hydration on app launch

3. UI Layer
   - Nativewind for styling
   - Responsive layouts
   - Gesture handling
   - Animations

## Technical Decisions

### Styling

- Nativewind/Tailwind CSS for consistent styling
- Responsive design patterns
- Theme configuration in tailwind.config.js
- Custom UI components in ui/ directory

### Navigation

- Expo Router for file-based routing
- Type-safe navigation
- Deep linking support
- Navigation state management

### Data Persistence

- React Native MMKV for storage
- Offline-first architecture
- Data synchronization patterns
- Cache management

### Performance

- Component memoization
- Lazy loading
- Image optimization
- Animation performance

## Development Patterns

### Code Style

- Functional programming approach
- TypeScript strict mode
- ESLint + Prettier configuration
- Consistent naming conventions

### Testing

- Jest + React Native Testing Library
- Component unit tests
- Integration tests for core features
- E2E testing with Maestro

### Error Handling

- Global error boundary
- Type-safe error handling
- User-friendly error messages
- Error logging and monitoring
