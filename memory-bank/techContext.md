# Technical Context

## Development Environment

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator
- Git
- Supabase CLI (for database migrations)

### Core Dependencies

```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.2",
  "nativewind": "^2.0.11",
  "tailwindcss": "^3.3.2",
  "@legendapp/state": "^4.0.0",
  "@supabase/supabase-js": "^2.39.0",
  "react-native-mmkv": "^2.11.0",
  "react-native-reanimated": "~3.6.0",
  "uuid": "^9.0.0"
}
```

## Database Setup

### Supabase Configuration

1. Create a new Supabase project
2. Run migrations:

```bash
supabase link --project-ref <project-id>
supabase db push
```

3. Environment Variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

- Two main tables: `habits` and `check_ins`
- Row Level Security enabled
- Automatic timestamps
- Soft delete support
- Proper indexing

## Local-First Implementation

### Legend State Setup

- MMKV storage for persistence
- Real-time sync with Supabase
- Type-safe operations
- Automatic conflict resolution

### Data Flow

1. Local Operations

   - Immediate local updates
   - MMKV persistence
   - Reactive state management

2. Sync Operations
   - Background sync
   - Offline queue
   - Conflict resolution
   - Retry mechanism

## Development Guidelines

### Code Organization

- Feature-based directory structure
- Shared components in ui/ directory
- Type definitions in types/
- Database operations in lib/

### Styling

- Nativewind/Tailwind CSS
- Responsive design
- Platform-specific adaptations
- Consistent theming

### State Management

- Legend State for data
- Local-first operations
- Real-time sync
- Offline support

### Testing Strategy

- Unit tests for utilities
- Component testing
- Integration tests
- E2E testing with Maestro

## Build and Deployment

### Development

- Hot reloading enabled
- Debug tools configuration
- Performance monitoring
- Error tracking

### Production

- Code minification
- Asset optimization
- Version management
- App store compliance

## Monitoring and Maintenance

### Performance Monitoring

- React Native Performance
- Database query performance
- Sync status
- Memory usage

### Error Tracking

- Error boundaries
- Crash reporting
- Sync errors
- User feedback collection
