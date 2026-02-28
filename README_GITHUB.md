# Golden Lion Football Academy Mobile App

A modern, feature-rich mobile application for the Golden Lion Football Academy built with React Native, Expo, and Supabase.

## 🎯 Features

### Core Screens
- **Home** - Hero section, academy overview, featured programs, news highlights
- **Programs** - 4 training stages (ages 4-18) with detailed information
- **News** - Latest articles with category filtering
- **Shop** - E-commerce with uniforms, search, filter, and cart functionality
- **Gallery** - Photo albums with category filtering and full-screen viewer
- **About** - Academy mission and coaching team profiles
- **Contact** - 2 location information with contact details
- **Registration** - Student enrollment form with parent information
- **Login** - Admin portal authentication

### Technical Features
- ✅ **Multilingual Support** - English, Khmer, Chinese (i18n)
- ✅ **Dark/Light Mode** - Theme switching with persistence
- ✅ **Supabase Backend** - Real-time data sync for news, products, registrations, gallery
- ✅ **Shopping Cart** - Local storage persistence with AsyncStorage
- ✅ **Responsive Design** - Optimized for iOS and Android
- ✅ **State Management** - React Context + TanStack Query
- ✅ **Styling** - NativeWind (Tailwind CSS for React Native)
- ✅ **Brand Colors** - Gold (#D4AF37) and Black (#1A1A1A)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- npm or pnpm
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Expo account: [Sign up](https://expo.dev/signup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sieksovann/glfa-mobile-app.git
   cd glfa-mobile-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or: npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # or: npm run dev
   ```

5. **Test on device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or run: `pnpm ios` / `pnpm android`

## 📱 Building for Production

### Android APK
```bash
eas login
eas build --platform android
```

### iOS IPA
```bash
eas login
eas build --platform ios
```

For detailed build instructions, see [BUILD_GUIDE.md](./BUILD_GUIDE.md)

## 📁 Project Structure

```
glfa-mobile-app/
├── app/                          # App screens and routing
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── programs.tsx         # Programs screen
│   │   ├── news.tsx             # News screen
│   │   ├── shop.tsx             # Shop screen
│   │   └── more.tsx             # More menu
│   ├── about.tsx                # About screen (modal)
│   ├── gallery.tsx              # Gallery screen (modal)
│   ├── contact.tsx              # Contact screen (modal)
│   ├── registration.tsx         # Registration form (modal)
│   ├── login.tsx                # Login screen (modal)
│   ├── cart.tsx                 # Shopping cart (modal)
│   ├── _layout.tsx              # Root layout with providers
│   └── oauth/                   # OAuth callback
├── components/                   # Reusable components
│   ├── screen-container.tsx     # SafeArea wrapper
│   ├── themed-view.tsx          # Theme-aware view
│   └── ui/
│       └── icon-symbol.tsx      # Icon mappings
├── hooks/                        # Custom React hooks
│   ├── use-colors.ts            # Theme colors hook
│   ├── use-color-scheme.ts      # Dark/light mode detection
│   ├── use-auth.ts              # Authentication hook
│   └── use-supabase-data.ts     # Data fetching hooks
├── lib/                          # Utilities and configuration
│   ├── supabase.ts              # Supabase client and API
│   ├── cart-context.tsx         # Cart state management
│   ├── i18n-provider.tsx        # i18n context
│   ├── theme-provider.tsx       # Theme context
│   ├── utils.ts                 # Utility functions
│   └── i18n/
│       └── config.ts            # i18n configuration
├── locales/                      # Translation files
│   ├── en.json                  # English translations
│   ├── kh.json                  # Khmer translations
│   └── cn.json                  # Chinese translations
├── constants/                    # Constants
│   └── theme.ts                 # Theme tokens
├── assets/                       # Images and icons
│   └── images/
│       ├── icon.png             # App icon
│       ├── splash-icon.png      # Splash screen
│       └── favicon.png          # Web favicon
├── app.config.ts                # Expo configuration
├── tailwind.config.js           # Tailwind configuration
├── theme.config.js              # Theme tokens
├── package.json                 # Dependencies
└── BUILD_GUIDE.md               # Build and deployment guide
```

## 🎨 Theming

The app uses a custom color scheme with gold and black:

```javascript
// theme.config.js
const themeColors = {
  primary: { light: '#D4AF37', dark: '#D4AF37' },      // Gold
  background: { light: '#ffffff', dark: '#151718' },   // White/Black
  foreground: { light: '#11181C', dark: '#ECEDEE' },   // Dark/Light text
  // ... more colors
};
```

## 🌍 Internationalization

The app supports three languages:
- **English (EN)** - Default language
- **Khmer (KH)** - Cambodian language
- **Chinese (CN)** - Simplified Chinese

Language preference is persisted in AsyncStorage.

## 🔌 Supabase Integration

The app connects to Supabase for:
- **News** - Article storage and retrieval
- **Products** - Shop inventory management
- **Registrations** - Student enrollment data
- **Gallery** - Photo album management
- **Authentication** - User login and admin portal

### Setting Up Supabase

1. Create a Supabase project: https://supabase.com/
2. Get your project URL and anon key from Settings → API
3. Add to `.env.local`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

## 📦 Dependencies

Key packages:
- **react-native** - Mobile framework
- **expo** - Development platform
- **expo-router** - Navigation
- **nativewind** - Tailwind CSS for React Native
- **@supabase/supabase-js** - Supabase client
- **i18next** - Internationalization
- **@tanstack/react-query** - Data fetching and caching
- **@react-navigation** - Navigation library

See `package.json` for complete list.

## 🧪 Testing

Run tests:
```bash
pnpm test
# or: npm run test
```

Check TypeScript:
```bash
pnpm check
# or: npm run check
```

Lint code:
```bash
pnpm lint
# or: npm run lint
```

## 📝 Environment Variables

Create `.env.local` with:

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Expo credentials
EXPO_EMAIL=your-expo-email@example.com
EXPO_PASSWORD=your-expo-password
```

**Note:** Never commit `.env.local` to version control.

## 🚀 Deployment

### App Store Submission
1. Build APK/IPA using EAS
2. Follow [BUILD_GUIDE.md](./BUILD_GUIDE.md) for store submission
3. Google Play Store: 24-48 hour review
4. Apple App Store: 24-48 hour review

## 📄 License

This project is proprietary software for Golden Lion Football Academy.

## 👥 Support

For issues or questions:
- Check [Expo Documentation](https://docs.expo.dev/)
- Visit [Expo Community Forums](https://forums.expo.dev/)
- Contact: sieksovann@gmail.com

## 🔄 Version History

- **v1.0.0** (2026-02-28) - Initial release
  - 9 screens with full functionality
  - Supabase backend integration
  - Multilingual support (EN, KH, CN)
  - Dark/Light mode
  - Shopping cart
  - iOS and Android support

---

**Last Updated:** February 28, 2026
**App Name:** Golden Lion Football Academy
**Bundle ID:** space.manus.glfa.mobile.app
**Expo Project:** https://expo.dev/accounts/sieksovann/projects/glfa-mobile-app
