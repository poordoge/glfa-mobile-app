# Golden Lion Football Academy Mobile App - Build Guide

This guide provides step-by-step instructions to build and deploy the GLFA mobile app for iOS and Android using Expo EAS Build.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Repository Setup](#repository-setup)
3. [Environment Configuration](#environment-configuration)
4. [Building for Android (APK)](#building-for-android-apk)
5. [Building for iOS (IPA)](#building-for-ios-ipa)
6. [Downloading Built Files](#downloading-built-files)
7. [Submitting to App Stores](#submitting-to-app-stores)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required Software

- **Node.js** (v18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** or **pnpm** (comes with Node.js)
  - Verify npm: `npm --version`
  - Or install pnpm: `npm install -g pnpm`

- **Git**
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Expo and EAS CLI

Install Expo CLI and EAS CLI globally:

```bash
npm install -g expo-cli eas-cli
# or with pnpm:
pnpm add -g expo-cli eas-cli
```

Verify installation:
```bash
expo --version
eas --version
```

### Expo Account

Create a free Expo account at https://expo.dev/signup if you don't have one.

---

## Repository Setup

### Step 1: Clone the Repository

Clone the GLFA mobile app repository:

```bash
git clone https://github.com/sieksovann/glfa-mobile-app.git
cd glfa-mobile-app
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
pnpm install
# or with npm:
npm install
```

This will install:
- React Native and Expo dependencies
- Supabase client library
- i18next for translations
- TanStack Query for data fetching
- NativeWind for styling
- And other required packages

### Step 3: Verify Installation

Test that the development server starts:

```bash
pnpm dev
# or with npm:
npm run dev
```

You should see output indicating the Metro bundler is running. Press `Ctrl+C` to stop.

---

## Environment Configuration

### Step 1: Set Up Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
# .env.local
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these values:**
1. Go to https://supabase.com/dashboard
2. Select your GLFA project
3. Click "Settings" → "API"
4. Copy the "Project URL" and "anon public" key

### Step 2: Verify Environment Variables

The app will use these variables to connect to Supabase for:
- Fetching news articles
- Loading shop products
- Storing registrations
- Displaying gallery photos

---

## Building for Android (APK)

### Step 1: Log In to Expo

```bash
eas login
```

Enter your Expo account credentials:
- Email: `sieksovann@gmail.com`
- Password: (your Expo password)

Verify login:
```bash
eas whoami
```

### Step 2: Configure Android Build (First Time Only)

If you haven't set up Android credentials yet, run:

```bash
eas build --platform android
```

When prompted, choose:
- **"Generate a new private signing key"** (recommended for first build)
- Accept the default keystore configuration

This will create a keystore file that signs your APK. **Save this keystore securely** — you'll need it for future updates.

### Step 3: Start the Android Build

```bash
eas build --platform android
```

The build process will:
1. Validate your app configuration
2. Upload your code to Expo's build servers
3. Compile the Android app
4. Generate a signed APK file

**Build time:** 10-15 minutes

### Step 4: Monitor Build Progress

You can monitor the build in real-time:

```bash
eas build --platform android --status
```

Or visit: https://expo.dev/accounts/sieksovann/projects/glfa-mobile-app/builds

---

## Building for iOS (IPA)

### Step 1: Configure iOS Build (First Time Only)

```bash
eas build --platform ios
```

When prompted, choose:
- **"Manage your Apple credentials"** (if you have an Apple Developer account)
- Or **"Let Expo handle the credentials"** (recommended for first build)

### Step 2: Start the iOS Build

```bash
eas build --platform ios
```

The build process will:
1. Validate your app configuration
2. Upload your code to Expo's build servers
3. Compile the iOS app
4. Generate a signed IPA file

**Build time:** 15-20 minutes

**Note:** iOS builds require an Apple Developer account ($99/year) for App Store submission. For testing, you can use the IPA on TestFlight or physical devices.

### Step 3: Monitor Build Progress

```bash
eas build --platform ios --status
```

Or visit: https://expo.dev/accounts/sieksovann/projects/glfa-mobile-app/builds

---

## Downloading Built Files

### Step 1: Check Build Status

Once the build completes, you'll see a success message with a download link.

### Step 2: Download the Files

**For Android APK:**
- Visit: https://expo.dev/accounts/sieksovann/projects/glfa-mobile-app/builds
- Find the Android build
- Click "Download" to get the `.apk` file

**For iOS IPA:**
- Visit: https://expo.dev/accounts/sieksovann/projects/glfa-mobile-app/builds
- Find the iOS build
- Click "Download" to get the `.ipa` file

### Step 3: Test Locally (Optional)

**Android:**
```bash
# Install APK on connected Android device or emulator
adb install path/to/glfa-mobile-app.apk
```

**iOS:**
- Use Xcode or TestFlight to install the IPA on a test device

---

## Submitting to App Stores

### Google Play Store (Android)

#### Prerequisites:
- Google Play Developer account ($25 one-time fee)
- APK file from the build above

#### Steps:

1. **Create a Google Play Developer Account**
   - Visit: https://play.google.com/console
   - Sign in with your Google account
   - Pay the $25 registration fee

2. **Create a New App**
   - Click "Create app"
   - Enter app name: "Golden Lion Academy"
   - Select category: "Sports"
   - Fill in required information

3. **Upload APK**
   - Navigate to "Release" → "Production"
   - Click "Create new release"
   - Upload your APK file
   - Review the app details

4. **Fill in App Store Listing**
   - Add app title, description, screenshots
   - Set pricing (free or paid)
   - Add content rating
   - Provide contact information

5. **Submit for Review**
   - Review all information
   - Click "Submit for review"
   - Google will review within 24-48 hours

6. **Monitor Status**
   - Check the Google Play Console for review status
   - Once approved, your app will be live on Google Play Store

**Typical Review Time:** 24-48 hours

### Apple App Store (iOS)

#### Prerequisites:
- Apple Developer account ($99/year)
- IPA file from the build above
- Mac computer with Xcode (for final submission)

#### Steps:

1. **Create an Apple Developer Account**
   - Visit: https://developer.apple.com/account
   - Enroll in Apple Developer Program ($99/year)
   - Complete verification process

2. **Create App ID**
   - Log in to Apple Developer
   - Go to "Certificates, Identifiers & Profiles"
   - Create a new App ID: `space.manus.glfa.mobile.app`

3. **Create App Store Connect Record**
   - Visit: https://appstoreconnect.apple.com
   - Click "My Apps" → "+"
   - Create new app with:
     - Name: "Golden Lion Academy"
     - Bundle ID: `space.manus.glfa.mobile.app`
     - SKU: `glfa-mobile-app-001`

4. **Upload IPA Using Transporter**
   - Download Transporter from App Store
   - Sign in with your Apple ID
   - Drag and drop your IPA file
   - Click "Deliver"

5. **Fill in App Store Information**
   - Add app description, keywords, screenshots
   - Set age rating
   - Configure pricing and availability
   - Add support and privacy policy URLs

6. **Submit for Review**
   - Complete all required information
   - Click "Submit for Review"
   - Apple will review within 24-48 hours

7. **Monitor Status**
   - Check App Store Connect for review status
   - Once approved, your app will be live on Apple App Store

**Typical Review Time:** 24-48 hours

---

## Troubleshooting

### Build Fails with "Keystore not found"

**Solution:**
```bash
# Regenerate Android credentials
eas build --platform android --clear-cache
```

### Build Fails with "Invalid app.config.ts"

**Solution:**
- Verify `app.config.ts` has valid syntax
- Check that all required fields are present
- Run: `expo prebuild --clean`

### "Expo login required"

**Solution:**
```bash
eas logout
eas login
# Enter your Expo credentials
```

### Build Hangs or Times Out

**Solution:**
- Check your internet connection
- Try again with: `eas build --platform android --clear-cache`
- Check build status: `eas build --status`

### APK Won't Install on Device

**Solution:**
- Ensure device has "Unknown Sources" enabled (Android)
- Try: `adb install -r path/to/apk` (reinstall)
- Check Android version compatibility (min: Android 7.0)

### IPA Won't Install on Device

**Solution:**
- Use TestFlight for distribution
- Ensure device is registered in Apple Developer account
- Check iOS version compatibility (min: iOS 13.0)

---

## Additional Resources

- **Expo Documentation:** https://docs.expo.dev/
- **EAS Build Documentation:** https://docs.expo.dev/build/introduction/
- **React Native Documentation:** https://reactnative.dev/
- **Supabase Documentation:** https://supabase.com/docs
- **Google Play Console:** https://play.google.com/console
- **App Store Connect:** https://appstoreconnect.apple.com

---

## Support

For issues or questions:

1. Check the [Expo Community](https://forums.expo.dev/)
2. Review [Expo GitHub Issues](https://github.com/expo/expo/issues)
3. Contact Expo Support: https://expo.dev/support

---

## Version History

- **v1.0.0** (2026-02-28) - Initial release
  - 9 screens (Home, Programs, News, Shop, Gallery, About, Contact, Registration, Login)
  - Supabase backend integration
  - Multilingual support (EN, KH, CN)
  - Dark/Light mode
  - Cart functionality
  - iOS and Android support

---

**Last Updated:** February 28, 2026
**App Name:** Golden Lion Football Academy
**Bundle ID:** space.manus.glfa.mobile.app
