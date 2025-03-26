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
│   └── habits.ts # Habits data management
├── translations/ # i18n resources
└── types/        # TypeScript definitions
    └── database.ts # Database types
```

## Design Patterns

### Component Architecture

- Functional components with TypeScript
- Props interfaces defined at component top
- Component-specific types in component files
- Shared types in `types` directory
- Maximum component size: 80 lines

### State Management

- Legend State for local-first data management
- MMKV for persistent storage
- Supabase for remote sync
- Local component state with useState

### Data Flow

1. Local Storage Layer

   - MMKV for high-performance storage
   - Legend State observables for reactivity
   - Automatic persistence

2. Sync Layer

   - Supabase for remote storage
   - Real-time updates
   - Conflict resolution
   - Offline queue management

3. UI Layer
   - Nativewind for styling
   - Responsive layouts
   - Gesture handling
   - Animations

## Technical Decisions

### Database Schema

1. Habits Table

   ```sql
   CREATE TABLE habits (
     id UUID PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     streak_count INTEGER DEFAULT 0,
     last_checked_in TIMESTAMP WITH TIME ZONE,
     user_id UUID REFERENCES auth.users(id)
   );
   ```

2. Check-ins Table
   ```sql
   CREATE TABLE check_ins (
     id UUID PRIMARY KEY,
     habit_id UUID REFERENCES habits(id),
     checked_at TIMESTAMP WITH TIME ZONE
   );
   ```

### Security

- Row Level Security (RLS) policies
- User-specific data access
- Secure authentication
- Data validation

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
