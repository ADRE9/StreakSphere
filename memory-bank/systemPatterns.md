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

## Screen Structure

The application follows a modular screen structure where each screen is organized in its own directory under `src/screens/`. This structure promotes better organization and separation of concerns.

### Screen Directory Structure

```
src/screens/
  ├── home-screen/
  │   ├── home-screen.tsx    # Main screen component
  │   └── index.ts          # Exports the screen component
  ├── login-screen/
  │   ├── login-screen.tsx  # Main screen component
  │   └── index.ts          # Exports the screen component
  ├── onboarding-screen/
  │   ├── onboarding-screen.tsx  # Main screen component
  │   └── index.ts               # Exports the screen component
  ├── sign-up-screen/
  │   ├── sign-up-screen.tsx    # Main screen component
  │   └── index.ts              # Exports the screen component
  └── verify-screen/
      ├── verify-screen.tsx     # Main screen component
      └── index.ts              # Exports the screen component
```

### Screen Export Pattern

Each screen directory follows a consistent pattern:

1. Main screen component file (e.g., `home-screen.tsx`)
2. `index.ts` file that exports the screen component

Example of `index.ts`:

```typescript
export { default } from './home-screen';
```

### Screen Component Guidelines

1. **Naming Convention**

   - Screen component files use kebab-case (e.g., `home-screen.tsx`)
   - Component names use PascalCase (e.g., `HomeScreen`)

2. **Component Structure**

   - Each screen component should be self-contained
   - Use functional components with TypeScript
   - Implement proper error boundaries
   - Handle loading states appropriately

3. **State Management**

   - Use React Hook Form for form handling
   - Use Zustand for global state
   - Implement proper loading and error states

4. **Navigation**

   - Use Expo Router for navigation
   - Implement proper navigation guards
   - Handle deep linking appropriately

5. **Styling**
   - Use Nativewind for styling
   - Follow the design system
   - Ensure responsive layouts

### Screen Integration

Screens are integrated into the app through the Expo Router file-based routing system in the `src/app` directory. The router automatically maps the screen components to their respective routes.

#### Route File Naming Convention

- Use `.ts` extension for route files that only export screen components
- Use `.tsx` extension for route files that contain JSX/UI logic

Example route mapping:

```typescript
// src/app/(auth)/sign-in.ts
export { default } from '@/screens/login-screen';

// src/app/(auth)/verify-email.ts
export { default } from '@/screens/verify-screen';
```

This structure ensures:

- Clear separation of concerns
- Easy navigation between screens
- Consistent component organization
- Maintainable codebase
- Scalable architecture

## Component Patterns

### Form Components

1. Reusable Form Pattern

   ```typescript
   type FormProps = {
     mode: 'add' | 'edit';
     initialData?: FormData;
   };
   ```

   - Components accept mode prop for different behaviors
   - Optional initialData for edit mode
   - Consistent validation using zod
   - Type-safe form handling with react-hook-form

2. Form State Management
   - Use react-hook-form for form state
   - Zod schema validation
   - Controlled inputs with proper types
   - Toast messages for user feedback

### State Management with Legend State

1. Observable Pattern

   ```typescript
   const state$ = observable({
     value: initialValue,
   });
   ```

2. Usage Patterns

   - `.get()`: For one-time value reads in event handlers
   - `use$`: For reactive values in components
   - `observer()`: For components using multiple observables

3. Action Pattern
   ```typescript
   const actions = {
     action1: () => state$.value.set(newValue),
     action2: () => state$.value.set((prev) => !prev),
   };
   ```

## Data Flow

1. Form Submission

   - Validate input data
   - Transform to correct shape
   - Submit to backend
   - Show feedback
   - Update local state

2. State Updates
   - Use Legend State observables
   - Update through actions
   - Reactive UI updates
   - Error handling with Toast

## Error Handling

1. Form Validation

   - Zod schema validation
   - Custom validation functions
   - User feedback via Toast
   - Type-safe error messages

2. API Error Handling
   - Toast messages for user feedback
   - Type-safe error responses
   - Consistent error patterns

## Component Architecture

1. Reusable Components

   - Accept mode props
   - Handle multiple use cases
   - Consistent prop types
   - Clear documentation

2. State Management
   - Legend State for global state
   - React Hook Form for form state
   - Toast for notifications
   - Type-safe state updates
