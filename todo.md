# Golden Lion Football Academy Mobile App - TODO

## Project Setup & Configuration
- [x] Update theme.config.js with GLFA brand colors (Gold #D4AF37, Black #1A1A1A)
- [x] Update app.config.ts with app name "Golden Lion Academy"
- [x] Generate custom app logo and update icon assets
- [x] Set up i18n with English, Khmer, Chinese translations
- [x] Configure Supabase environment variables (URL, anon key)
- [x] Set up dark/light mode toggle and persistence

## Navigation & Layout
- [x] Implement bottom tab navigation with 5 tabs (Home, Programs, News, Shop, More)
- [x] Create "More" menu modal with About, Gallery, Contact, Registration, Login
- [x] Set up screen routing with Expo Router
- [x] Implement ScreenContainer for all screens with proper SafeArea handling
- [x] Add header with language selector and dark mode toggle

## Home Screen
- [x] Create hero section with background image and overlay text
- [x] Add academy overview section with mission statement
- [x] Build featured programs carousel (4 program cards)
- [x] Add news highlights section (2-3 latest articles)
- [x] Implement CTA buttons ("Enroll Now", "Learn More")
- [x] Add navigation to other screens from home

## Programs Screen
- [x] Display all 4 training stages as expandable cards
- [x] Show stage details: name, age group, focus, schedule, price
- [x] Implement expand/collapse animation for stage details
- [x] Add "Enroll" button on each stage card
- [x] Navigate to registration screen on enroll button tap

## News Screen
- [x] Fetch news articles from Supabase
- [x] Display news list with image, title, date, category
- [x] Implement category filter pills (All, Announcements, News, Match Results)
- [x] Create news detail view (modal/push screen)
- [x] Add share functionality for articles
- [x] Implement pull-to-refresh for news list

## Gallery Screen
- [x] Fetch photo albums from Supabase
- [x] Display photos in 2-column masonry grid
- [x] Implement category filter (All, Training, Matches, Events)
- [x] Create full-screen photo viewer with swipe navigation
- [x] Add pinch-to-zoom functionality
- [x] Implement image caching with expo-image

## Shop Screen
- [x] Fetch products from Supabase
- [x] Display products in 2-column grid
- [x] Implement search functionality
- [x] Add filter options (Size, Type, Price range)
- [x] Create product detail view with image gallery
- [x] Implement size and quantity selectors
- [x] Add "Add to Cart" functionality with local storage
- [x] Create cart view with item management
- [x] Implement checkout flow (email, address, payment)
- [x] Show cart item count in tab badge

## About Screen
- [x] Display academy mission statement
- [x] Fetch coaching team profiles from Supabase
- [x] Show coach cards with image, name, title
- [x] Implement expandable coach bio
- [x] Add coach contact information (optional)

## Contact Screen
- [x] Display 2 location cards with address, phone, email
- [x] Implement "Call" button (open phone dialer)
- [x] Implement "Email" button (open mail composer)
- [x] Implement "Get Directions" button (open Maps app)
- [x] Add social media links (Facebook, Instagram, YouTube, TikTok, Telegram)
- [x] Create simple contact form (optional)

## Registration Screen
- [x] Create multi-section form (Parent Info, Student Info)
- [x] Add form fields: parent name, email, phone, telegram, student name, age, program selection
- [x] Implement form validation
- [x] Add "Register Now" submit button
- [x] Submit registration to Supabase
- [x] Show success message/confirmation
- [x] Handle form errors gracefully

## Login/Auth Screen
- [x] Create login form with email and password fields
- [x] Create sign-up form with email, password, confirm password
- [x] Implement Supabase authentication (login/signup)
- [x] Add "Forgot Password" link
- [x] Show error messages for failed auth
- [x] Store auth token securely in expo-secure-store
- [x] Implement logout functionality (in More menu or settings)

## Backend Integration
- [x] Set up Supabase client with environment variables
- [x] Create database schema for programs, news, gallery, shop products, registrations, users
- [x] Implement API calls for fetching programs, news, gallery, shop products
- [x] Implement API calls for submitting registrations
- [x] Implement Supabase authentication (login, signup, logout)
- [x] Set up real-time subscriptions for dynamic content (optional)
- [x] Implement error handling and retry logic

## State Management & Persistence
- [x] Set up React Context for global state (auth, theme, language)
- [x] Implement AsyncStorage for persisting user preferences
- [x] Set up TanStack Query for server data caching
- [x] Implement cart state management with AsyncStorage persistence
- [x] Add loading and error states for all async operations

## Internationalization (i18n)
- [x] Set up i18next with English, Khmer, Chinese translations
- [x] Create translation files for all screens and UI elements
- [x] Implement language selector in header
- [x] Persist language preference in AsyncStorage
- [x] Test all screens in all 3 languages

## Styling & Theming
- [x] Update Tailwind config with GLFA brand colors
- [x] Create reusable component styles (buttons, cards, inputs, etc.)
- [x] Implement dark mode color variants
- [x] Ensure consistent spacing and typography across screens
- [x] Test responsive layout on various screen sizes

## Interactions & Animations
- [x] Add press feedback (scale + haptic) for primary buttons
- [x] Add opacity feedback for list items and cards
- [x] Implement smooth transitions between screens
- [x] Add loading spinners for async operations
- [x] Implement pull-to-refresh for lists
- [x] Add toast notifications for user feedback

## Testing & Quality Assurance
- [x] Test all user flows end-to-end
- [x] Test on iOS and Android devices/emulators
- [x] Test dark/light mode switching
- [x] Test language switching (EN, KH, CN)
- [x] Test offline functionality (cached data)
- [x] Test error handling and edge cases
- [x] Verify accessibility (VoiceOver, TalkBack)
- [x] Check performance (list scrolling, image loading)

## Deployment & Publishing
- [x] Create app logo and update icon assets
- [x] Update app.config.ts with final branding
- [x] Build and test APK for Android
- [x] Build and test IPA for iOS
- [x] Submit to Expo for EAS build (optional)
- [ ] Create app store listings (future)
- [ ] Document deployment process

## Optional Future Enhancements
- [ ] Admin dashboard for managing content
- [ ] Push notifications for news and events
- [ ] Payment integration for shop checkout
- [ ] Student profile and enrollment history
- [ ] Coach messaging/communication
- [ ] Event calendar and scheduling
- [ ] Video tutorials and training content
- [ ] Social features (comments, ratings, reviews)
