# Golden Lion Football Academy Mobile App - TODO

## Project Setup & Configuration
- [x] Update theme.config.js with GLFA brand colors (Gold #D4AF37, Black #1A1A1A)
- [x] Update app.config.ts with app name "Golden Lion Academy"
- [ ] Generate custom app logo and update icon assets
- [x] Set up i18n with English, Khmer, Chinese translations
- [ ] Configure Supabase environment variables (URL, anon key)
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
- [ ] Navigate to registration screen on enroll button tap

## News Screen
- [ ] Fetch news articles from Supabase
- [x] Display news list with image, title, date, category
- [x] Implement category filter pills (All, Announcements, News, Match Results)
- [ ] Create news detail view (modal/push screen)
- [ ] Add share functionality for articles
- [ ] Implement pull-to-refresh for news list

## Gallery Screen
- [ ] Fetch photo albums from Supabase
- [ ] Display photos in 2-column masonry grid
- [ ] Implement category filter (All, Training, Matches, Events)
- [ ] Create full-screen photo viewer with swipe navigation
- [ ] Add pinch-to-zoom functionality
- [ ] Implement image caching with expo-image

## Shop Screen
- [ ] Fetch products from Supabase
- [x] Display products in 2-column grid
- [x] Implement search functionality
- [x] Add filter options (Size, Type, Price range)
- [ ] Create product detail view with image gallery
- [ ] Implement size and quantity selectors
- [x] Add "Add to Cart" functionality with local storage
- [ ] Create cart view with item management
- [ ] Implement checkout flow (email, address, payment)
- [ ] Show cart item count in tab badge

## About Screen
- [ ] Display academy mission statement
- [ ] Fetch coaching team profiles from Supabase
- [ ] Show coach cards with image, name, title
- [ ] Implement expandable coach bio
- [ ] Add coach contact information (optional)

## Contact Screen
- [ ] Display 2 location cards with address, phone, email
- [ ] Implement "Call" button (open phone dialer)
- [ ] Implement "Email" button (open mail composer)
- [ ] Implement "Get Directions" button (open Maps app)
- [ ] Add social media links (Facebook, Instagram, YouTube, TikTok, Telegram)
- [ ] Create simple contact form (optional)

## Registration Screen
- [ ] Create multi-section form (Parent Info, Student Info)
- [ ] Add form fields: parent name, email, phone, telegram, student name, age, program selection
- [ ] Implement form validation
- [ ] Add "Register Now" submit button
- [ ] Submit registration to Supabase
- [ ] Show success message/confirmation
- [ ] Handle form errors gracefully

## Login/Auth Screen
- [ ] Create login form with email and password fields
- [ ] Create sign-up form with email, password, confirm password
- [ ] Implement Supabase authentication (login/signup)
- [ ] Add "Forgot Password" link
- [ ] Show error messages for failed auth
- [ ] Store auth token securely in expo-secure-store
- [ ] Implement logout functionality (in More menu or settings)

## Backend Integration
- [ ] Set up Supabase client with environment variables
- [ ] Create database schema for programs, news, gallery, shop products, registrations, users
- [ ] Implement API calls for fetching programs, news, gallery, shop products
- [ ] Implement API calls for submitting registrations
- [ ] Implement Supabase authentication (login, signup, logout)
- [ ] Set up real-time subscriptions for dynamic content (optional)
- [ ] Implement error handling and retry logic

## State Management & Persistence
- [ ] Set up React Context for global state (auth, theme, language)
- [ ] Implement AsyncStorage for persisting user preferences
- [ ] Set up TanStack Query for server data caching
- [ ] Implement cart state management with AsyncStorage persistence
- [ ] Add loading and error states for all async operations

## Internationalization (i18n)
- [ ] Set up i18next with English, Khmer, Chinese translations
- [ ] Create translation files for all screens and UI elements
- [ ] Implement language selector in header
- [ ] Persist language preference in AsyncStorage
- [ ] Test all screens in all 3 languages

## Styling & Theming
- [ ] Update Tailwind config with GLFA brand colors
- [ ] Create reusable component styles (buttons, cards, inputs, etc.)
- [ ] Implement dark mode color variants
- [ ] Ensure consistent spacing and typography across screens
- [ ] Test responsive layout on various screen sizes

## Interactions & Animations
- [ ] Add press feedback (scale + haptic) for primary buttons
- [ ] Add opacity feedback for list items and cards
- [ ] Implement smooth transitions between screens
- [ ] Add loading spinners for async operations
- [ ] Implement pull-to-refresh for lists
- [ ] Add toast notifications for user feedback

## Testing & Quality Assurance
- [ ] Test all user flows end-to-end
- [ ] Test on iOS and Android devices/emulators
- [ ] Test dark/light mode switching
- [ ] Test language switching (EN, KH, CN)
- [ ] Test offline functionality (cached data)
- [ ] Test error handling and edge cases
- [ ] Verify accessibility (VoiceOver, TalkBack)
- [ ] Check performance (list scrolling, image loading)

## Deployment & Publishing
- [ ] Create app logo and update icon assets
- [ ] Update app.config.ts with final branding
- [ ] Build and test APK for Android
- [ ] Build and test IPA for iOS
- [ ] Submit to Expo for EAS build (optional)
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
