# User Authentication App

A complete React Native authentication application built with Expo, featuring Login and Signup functionality using React Context API for state management.

## 🚀 Features

### Core Authentication Features
- **User Registration**: Sign up with name, email, and password
- **User Login**: Secure login with email and password
- **Session Persistence**: Users stay logged in after app restart using AsyncStorage
- **User Dashboard**: Display user information after successful login
- **Secure Logout**: Proper session cleanup

### UI/UX Features
- **Modern Design**: Beautiful, responsive interface using NativeWind (Tailwind CSS)
- **Form Validation**: Comprehensive client-side validation with error messages
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Loading States**: Visual feedback during authentication processes
- **Error Handling**: User-friendly error messages and alerts
- **Responsive Design**: Optimized for all mobile device sizes

### Technical Features
- **React Context API**: Global state management for authentication
- **TypeScript**: Full type safety and better developer experience
- **Expo Router**: File-based navigation system
- **AsyncStorage**: Local data persistence
- **React Navigation**: Smooth navigation between screens
- **Expo Icons**: Beautiful iconography throughout the app

## 📱 Screens

### 1. Login Screen (`/login`)
- Email and password input fields
- Form validation with error messages
- Password visibility toggle
- Navigation to signup screen
- Loading state during authentication

### 2. Signup Screen (`/signup`)
- Name, email, and password input fields
- Comprehensive form validation:
  - Name validation (required, min 2 characters)
  - Email validation (required, valid format)
  - Password validation (required, min 6 characters)
- Password visibility toggle
- Navigation to login screen
- Success/error handling

### 3. Home Screen (`/home`)
- User profile information display
- User avatar with icon
- Personal information card (name, email, user ID)
- Status indicator showing online status
- Logout functionality with confirmation
- App features showcase

### 4. Authentication Flow
- Automatic navigation based on authentication status
- Loading screen while checking authentication
- Seamless transitions between screens

## 🛠️ Technology Stack

- **React Native 0.81.5**: Core framework
- **Expo SDK 54**: Development platform
- **TypeScript**: Type safety
- **React Context API**: State management
- **AsyncStorage**: Data persistence
- **Expo Router**: Navigation
- **React Navigation**: Screen navigation
- **NativeWind**: Styling (Tailwind CSS)
- **Expo Icons**: Icon library
- **Expo Status Bar**: Status bar management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Bun (recommended) or npm
- Expo CLI

### Installation Steps

1. **Clone and navigate to project**:
   ```bash
   cd user-authentication
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**:
   ```bash
   bun run start
   # or
   npm run start
   ```

4. **Run on device**:
   - Scan QR code with Expo Go app (Android)
   - Scan QR code with Camera app (iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## 🔧 Project Structure

```
user-authentication/
├── app/
│   ├── _layout.tsx          # Root layout with AuthProvider
│   ├── index.tsx            # Entry point with auth flow
│   ├── login.tsx            # Login screen
│   ├── signup.tsx           # Signup screen
│   ├── home.tsx             # Home/dashboard screen
│   └── global.css           # Global styles
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── components/
│   └── AuthGuard.tsx        # Authentication guard component
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔐 Authentication Flow

### User Registration
1. User fills signup form with name, email, password
2. Form validation checks all fields
3. Creates new user account in mock database
4. Automatically logs in the user
5. Navigates to home screen

### User Login
1. User enters email and password
2. Form validation checks credentials
3. Authenticates against mock database
4. Saves user session to AsyncStorage
5. Navigates to home screen

### Session Persistence
1. App checks AsyncStorage on startup
2. If user session exists, automatically logs in
3. If no session, redirects to login screen
4. Session persists across app restarts

### Logout
1. User clicks logout button
2. Confirmation dialog appears
3. Clears AsyncStorage and context
4. Redirects to login screen

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) for login and actions
- **Success**: Green (#10b981) for signup and positive actions
- **Danger**: Red (#ef4444) for errors and logout
- **Neutral**: Gray tones for text and backgrounds
- **Background**: Light gray (#f8fafc) for main background

### Typography
- **Headers**: Bold, large font sizes for titles
- **Body**: Medium weight for readability
- **Labels**: Semi-bold for form labels
- **Errors**: Regular weight with color coding

### Components
- **Input Fields**: Rounded corners, icons, validation states
- **Buttons**: Rounded, shadows, loading states
- **Cards**: White background, subtle shadows, rounded corners
- **Icons**: Consistent size and color scheme

## 🧪 Testing the App

### Test Flow
1. **First Launch**: Should redirect to login screen
2. **Signup Process**:
   - Try invalid inputs to see validation
   - Create account with valid information
   - Should redirect to home screen
3. **Login Process**:
   - Try invalid credentials to see error
   - Login with correct credentials
   - Should redirect to home screen
4. **Persistence**:
   - Close and reopen app
   - Should remain logged in
5. **Logout**:
   - Click logout button
   - Confirm logout
   - Should redirect to login screen

### Sample Test Data
- **Name**: John Doe
- **Email**: john.doe@example.com
- **Password**: password123

## 🔧 Configuration

### Environment Variables
The app uses mock authentication for demonstration. In a production environment, you would:
- Replace mock database with real API calls
- Add environment variables for API endpoints
- Implement proper password hashing
- Add JWT token management

### Customization
- **Colors**: Modify the color scheme in styles
- **Validation Rules**: Update validation in AuthContext
- **UI Components**: Customize component styles
- **Navigation**: Modify routing in _layout.tsx

## 📝 API Reference

### AuthContext Methods

#### `login(email: string, password: string)`
- **Returns**: Promise<{ success: boolean; error?: string }>
- **Description**: Authenticates user with email and password

#### `signup(name: string, email: string, password: string)`
- **Returns**: Promise<{ success: boolean; error?: string }>
- **Description**: Creates new user account

#### `logout()`
- **Returns**: Promise<void>
- **Description**: Clears user session and logs out

### User Object Structure
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   bun run start --clear
   ```

2. **Dependencies issues**:
   ```bash
   bun install --frozen-lockfile
   ```

3. **iOS simulator issues**:
   - Reset simulator: Device > Erase All Content and Settings
   - Rebuild app: `bun run ios`

4. **Android emulator issues**:
   - Cold boot emulator
   - Clear app data: Settings > Apps > User Auth App > Storage > Clear Data

## 🚀 Future Enhancements

- [ ] Biometric authentication (fingerprint/face ID)
- [ ] Social media login (Google, Facebook)
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] User profile editing
- [ ] Dark mode support
- [ ] Push notifications
- [ ] Offline mode support

## 📄 License

This project is for educational purposes and demonstrates React Native authentication patterns.

## 🤝 Contributing

This is a demonstration project. Feel free to use it as a reference for your own authentication implementations.

---

**Built with ❤️ using React Native, Expo, and modern mobile development practices.**