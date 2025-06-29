# React + TypeScript + Vite - Task Management Frontend

This is the frontend application for the Knovel Task Management system, built with React, TypeScript, Vite, and Ant Design.

## Features

- **Modern React Stack**: React 18, TypeScript, Vite
- **UI Framework**: Ant Design with custom theme
- **State Management**: Zustand with async actions
- **Form Handling**: React Hook Form with Yup validation
- **Routing**: React Router DOM with role-based protection
- **API Integration**: Auto-generated TypeScript client from Swagger
- **Styling**: Styled Components
- **Development**: Hot Module Replacement, ESLint, Prettier

## Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation
```bash
npm install
# or
yarn install
```

### Environment Setup
```bash
cp env.example .env
```

Configure the backend URL in `.env`:
```env
# For local development
APP_BE=http://localhost:3000

# For Docker development
APP_BE=http://host.docker.internal:3000

# For production
APP_BE=https://your-backend-domain.com
```

### Development
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## API Generation from Swagger

This project uses auto-generated TypeScript API client from Swagger/OpenAPI specification. The generated code is located in `src/swagger-api/gen/`.

### Available Scripts

#### Generate from Local Swagger File
```bash
npm run gen
# or
yarn gen
```
This generates TypeScript client from the local `src/swagger-api/swagger.json` file.

#### Generate from Remote API
```bash
npm run gen:remote
# or
yarn gen:remote
```
This fetches the latest Swagger specification from the backend API and generates the TypeScript client.

### Manual Generation

You can also generate the API client manually:

1. **From Local File**:
   ```bash
   npx swagger-typescript-api generate \
     -p ./src/swagger-api/swagger.json \
     -o ./src/swagger-api/gen \
     --axios \
     --union-enums \
     --modular \
     --single-http-client \
     --clean-output \
     --module-name-first-tag
   ```

2. **From Remote URL**:
   ```bash
   npx swagger-typescript-api generate \
     -p http://localhost:3000/api/docs-json \
     -o ./src/swagger-api/gen \
     --axios \
     --union-enums \
     --modular \
     --single-http-client \
     --clean-output \
     --module-name-first-tag
   ```

### Generated Files Structure
```
src/swagger-api/
├── gen/
│   ├── Auth.ts           # Authentication API client
│   ├── Tasks.ts          # Tasks API client
│   ├── Users.ts          # Users API client
│   ├── http-client.ts    # HTTP client configuration
│   └── data-contracts.ts # TypeScript interfaces
├── axios.ts              # Axios configuration
├── helper.tsx            # Helper functions
├── index.tsx             # Main exports
└── swagger.json          # Swagger specification
```

### Using Generated API Client

```typescript
import { authService, taskService, usersService } from '../swagger-api';

// Authentication
const login = await authService.login({ email: 'user@example.com', password: 'password' });

// Tasks
const tasks = await taskService.findAll({ page: 1, limit: 10 });
const createTask = await taskService.create({ title: 'New Task', description: 'Task description' });

// Users
const employees = await usersService.findAllEmployees();
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── button/
│   ├── form/
│   ├── select/
│   ├── table/
│   └── ...
├── containers/          # Page containers with business logic
│   ├── layout/
│   ├── manage-tasks-container/
│   ├── manage-employees-container/
│   └── ...
├── pages/              # Page components
│   ├── sign-in.tsx
│   ├── manage-tasks.tsx
│   ├── manage-employees.tsx
│   └── employee-task-summary.tsx
├── hooks/              # Custom React hooks
│   ├── use-get-current-user.tsx
│   └── use-query-param/
├── hocs/               # Higher-order components
│   └── private-route-wrapper.tsx
├── swagger-api/        # Auto-generated API client
├── global-store/       # Zustand stores
├── helpers/            # Utility functions
├── constants/          # Application constants
├── types/              # TypeScript type definitions
└── theme.ts            # Ant Design theme configuration
```

## Authentication & Authorization

The application implements role-based access control:

- **EMPLOYER**: Full access to all features
- **EMPLOYEE**: Limited access to task management

### Route Protection
Routes are protected using `PrivateRouteWrapper` HOC:

```typescript
<Route element={<PrivateRouteWrapper allowedRoles={['EMPLOYER']} />}>
  <Route path="/manage-employees" element={<ManageEmployees />} />
</Route>
```

### User State Management
User information is managed with Zustand store and persisted to localStorage:

```typescript
import { useInfoCurrentUserStore } from '../global-store/user-store';

const { data: user, asycnFetchCurrentUser } = useInfoCurrentUserStore();
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run gen` - Generate API client from local Swagger file
- `npm run gen:remote` - Generate API client from remote API

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Docker

### Development
```bash
docker-compose up --build
```

### Production
```bash
docker build -t frontend .
docker run -p 80:80 frontend
```

## ESLint Configuration

This project uses a modern ESLint configuration with TypeScript support. To expand the configuration for production applications:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

### React-Specific Linting

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Troubleshooting

### API Generation Issues
- Ensure the backend is running when using `gen:remote`
- Check that the Swagger endpoint is accessible
- Verify the generated files are properly imported

### Build Issues
- Clear `node_modules` and reinstall dependencies
- Check TypeScript configuration in `tsconfig.json`
- Ensure all required environment variables are set

### Development Issues
- Check browser console for errors
- Verify backend connectivity
- Ensure proper CORS configuration on backend

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Add proper type definitions
4. Update API client when backend changes
5. Test your changes thoroughly
