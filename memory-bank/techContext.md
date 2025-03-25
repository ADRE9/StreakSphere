# Technical Context

## Development Environment

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator
- Git

### Core Dependencies

```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.2",
  "nativewind": "^2.0.11",
  "tailwindcss": "^3.3.2",
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.4.1",
  "react-native-mmkv": "^2.11.0",
  "react-native-reanimated": "~3.6.0"
}
```

## Setup Instructions

1. Installation

```bash
npm install
npx expo install
```

2. Development

```bash
npx expo start
```

3. Testing

```bash
npm test
```

## Technical Constraints

### Mobile Platform Support

- iOS 13+
- Android API Level 21+
- Expo SDK 50

### Performance Targets

- App size < 50MB
- Launch time < 2s
- Frame rate > 60fps
- Offline capability

### Security Requirements

- Secure data storage
- API key protection
- Input validation
- Type safety

## Development Guidelines

### Code Organization

- Feature-based directory structure
- Shared components in ui/ directory
- Type definitions in types/
- API integration in api/

### Styling

- Nativewind/Tailwind CSS
- Responsive design
- Platform-specific adaptations
- Consistent theming

### State Management

- Zustand for global state
- React Query for API data
- MMKV for persistence
- Local state when appropriate

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
- API response times
- Animation frame rates
- Memory usage

### Error Tracking

- Error boundaries
- Crash reporting
- API error logging
- User feedback collection
