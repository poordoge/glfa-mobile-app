# Golden Lion Football Academy (GLFA) Mobile App Design

## Design Philosophy
The mobile app replicates the GLFA website experience optimized for **portrait orientation (9:16)** and **one-handed usage**. The design follows **Apple Human Interface Guidelines (HIG)** to feel like a first-party iOS app while maintaining consistency across iOS and Android.

---

## Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| **Primary** | `#D4AF37` (Gold) | `#D4AF37` (Gold) | Buttons, highlights, accents |
| **Background** | `#FFFFFF` (White) | `#1A1A1A` (Dark Black) | Screen backgrounds |
| **Surface** | `#F5F5F5` (Light Gray) | `#2A2A2A` (Dark Gray) | Cards, elevated surfaces |
| **Foreground** | `#1A1A1A` (Black) | `#FFFFFF` (White) | Primary text |
| **Muted** | `#666666` (Gray) | `#AAAAAA` (Light Gray) | Secondary text |
| **Border** | `#DDDDDD` (Light Gray) | `#444444` (Dark Gray) | Dividers, borders |
| **Success** | `#22C55E` (Green) | `#4ADE80` (Light Green) | Success states |
| **Error** | `#EF4444` (Red) | `#F87171` (Light Red) | Error states |

**Brand Identity**: Gold/Yellow (#D4AF37) and Black (#1A1A1A) reflect the "Golden Lion" identity.

---

## Screen List & Navigation Structure

### Tab Navigation (Bottom Tab Bar)
The app uses bottom tab navigation for primary sections:

1. **Home** (house.fill icon)
2. **Programs** (star.fill icon)
3. **News** (newspaper.fill icon)
4. **Shop** (bag.fill icon)
5. **More** (ellipsis.circle.fill icon) → Modal menu with About, Gallery, Contact, Registration, Login

---

## Screen Specifications

### 1. Home Screen
**Path**: `app/(tabs)/home.tsx`

**Content & Layout**:
- **Hero Section**: Full-width image with overlay text
  - Title: "Golden Lion Football Academy"
  - Subtitle: "From Grassroots to Greatness"
  - Description: "Premier youth football development in Phnom Penh, Cambodia..."
  - CTA Buttons: "Enroll Now" (primary gold), "Learn More" (secondary outline)
  
- **Academy Overview**: Text block with mission statement
  - Highlights: "World-Class Training", "Expert Coaches", "All Ages Welcome"
  
- **Featured Programs**: Horizontal scrollable cards (4 stages)
  - Each card shows: Stage name, age group, price ($25), schedule
  - Tap to navigate to Programs screen
  
- **News Highlights**: 2-3 latest news items as cards
  - Image thumbnail, title, date, category badge
  - Tap to view full article in News screen
  
- **CTA Footer**: "Register Now" button, "Contact Us" link

**Interactions**:
- Scroll to reveal content
- Tap program cards → Programs screen
- Tap news items → News detail view
- Tap "Enroll Now" → Registration screen

---

### 2. Programs Screen
**Path**: `app/(tabs)/programs.tsx`

**Content & Layout**:
- **Header**: "Our Programs" title, subtitle
- **Program Cards** (vertical list, full-width):
  - Stage name, age group, featured badge
  - Icon (unique per stage)
  - Focus description (1-2 lines)
  - Schedule: "Every Saturday & Sunday, 8:00-9:00 AM"
  - Price: "$25"
  - Expandable details (tap to expand/collapse)
  - "Enroll" button at bottom of each card

**Interactions**:
- Tap card to expand/collapse details
- Tap "Enroll" → Registration screen

---

### 3. News Screen
**Path**: `app/(tabs)/news.tsx`

**Content & Layout**:
- **Header**: "News & Updates" title
- **Category Filter**: Horizontal scrollable pills
  - "All Categories", "Announcements", "News", "Match Results"
  
- **News List**: Vertical list of articles
  - Each item: Image thumbnail, category badge, title, date, excerpt
  - Tap to view full article
  
- **Article Detail View** (modal/push):
  - Full image, title, date, category, full content
  - Share button, back button

**Interactions**:
- Tap category pill to filter
- Tap article to view details
- Share article via system share sheet

---

### 4. Shop Screen
**Path**: `app/(tabs)/shop.tsx`

**Content & Layout**:
- **Header**: "Golden Lion Shop" title, subtitle
- **Search & Filter**:
  - Search bar: "Search products..."
  - Filter button: Opens filter sheet (Size, Type, Price range)
  
- **Product Grid**: 2-column grid
  - Product image, name, price
  - Tap to view product detail
  
- **Product Detail** (modal/push):
  - Full image gallery (swipeable)
  - Product name, price, description
  - Size selector (dropdown)
  - Quantity selector (stepper)
  - "Add to Cart" button
  - Cart icon in header shows item count
  
- **Cart View** (modal/push):
  - List of cart items with quantity controls
  - Subtotal, tax, total
  - "Checkout" button
  - "Continue Shopping" button

**Interactions**:
- Tap search bar → Search products
- Tap filter → Open filter sheet
- Tap product → Product detail
- Tap "Add to Cart" → Add item, show toast confirmation
- Tap cart icon → View cart
- Tap "Checkout" → Checkout flow (simplified: email, address, payment)

---

### 5. About Screen
**Path**: `app/about.tsx` (modal/push from More menu)

**Content & Layout**:
- **Header**: "About GLFA" title
- **Mission Statement**: Text block with academy description
- **Coaching Team**: Vertical list of coach cards
  - Coach image, name, title, bio (expandable)
  - Tap to expand/collapse bio

**Interactions**:
- Tap coach card to expand bio
- Back button to dismiss

---

### 6. Gallery Screen
**Path**: `app/gallery.tsx` (modal/push from More menu)

**Content & Layout**:
- **Header**: "Photo Gallery" title
- **Category Filter**: Horizontal scrollable pills
  - "All Photos", "Training", "Matches", "Events"
  
- **Photo Grid**: 2-column masonry layout
  - Tap to view full-screen image with swipe navigation

**Interactions**:
- Tap category pill to filter
- Tap photo → Full-screen viewer with swipe navigation
- Pinch to zoom in full-screen view

---

### 7. Contact Screen
**Path**: `app/contact.tsx` (modal/push from More menu)

**Content & Layout**:
- **Header**: "Contact Us" title
- **Location Cards** (2 locations):
  - Location name, address, phone, email
  - "Call" button, "Email" button, "Get Directions" button
  
- **Social Links**: Icons for Facebook, Instagram, YouTube, TikTok, Telegram
- **Quick Contact Form**: Name, email, message (optional, simplified)

**Interactions**:
- Tap "Call" → Open phone dialer
- Tap "Email" → Open mail composer
- Tap "Get Directions" → Open Maps app
- Tap social icon → Open in web browser
- Submit contact form → Send email via backend

---

### 8. Registration Screen
**Path**: `app/registration.tsx` (modal/push from CTA buttons or More menu)

**Content & Layout**:
- **Header**: "Student Registration" title, subtitle
- **Form Sections** (scrollable):
  - **Parent Information**:
    - Parent/Guardian Name (text input)
    - Email Address (email input)
    - Phone Number (tel input)
    - Telegram (optional, text input)
  
  - **Student Information**:
    - Student Name (text input)
    - Student Age (number input, 4-18)
    - Preferred Program (dropdown: Stage 1-4)
    - Additional Notes (optional, text area)
  
  - **Submit Button**: "Register Now" (primary gold)
  - **Success Message**: Toast notification or modal confirmation

**Interactions**:
- Fill form fields
- Tap dropdown to select program
- Tap "Register Now" → Submit to backend
- Show success message → Navigate back or close modal

---

### 9. Login Screen
**Path**: `app/login.tsx` (modal/push from More menu)

**Content & Layout**:
- **Header**: "GLFA Admin" title, "Sign in to manage registrations"
- **Tabs**: "Login" (active), "Sign Up"
- **Login Form**:
  - Email (email input)
  - Password (password input)
  - "Sign In" button (primary gold)
  - "Forgot Password?" link
  
- **Sign Up Form**:
  - Email (email input)
  - Password (password input)
  - Confirm Password (password input)
  - "Create Account" button (primary gold)

**Interactions**:
- Enter credentials
- Tap "Sign In" → Authenticate via Supabase
- Tap "Sign Up" → Create admin account
- On success → Navigate to Admin Dashboard (future feature)
- Show error messages for failed auth

---

## Key User Flows

### Flow 1: Browse Programs & Enroll
1. User opens app → Home screen
2. Tap "Featured Programs" card → Programs screen
3. Review all 4 stages
4. Tap "Enroll" on desired stage → Registration screen
5. Fill form → Submit → Success message

### Flow 2: Shop & Add to Cart
1. User taps Shop tab → Shop screen
2. Browse products or search/filter
3. Tap product → Product detail
4. Select size, quantity
5. Tap "Add to Cart" → Toast confirmation
6. Tap cart icon → Cart view
7. Review items, adjust quantities
8. Tap "Checkout" → Checkout form → Success

### Flow 3: Read News
1. User taps News tab → News screen
2. Browse articles or filter by category
3. Tap article → Article detail view
4. Read full content
5. Tap share button → System share sheet

### Flow 4: View Gallery
1. User taps More menu → Gallery
2. Browse all photos or filter by category
3. Tap photo → Full-screen viewer
4. Swipe to navigate between photos
5. Pinch to zoom

---

## Interaction Patterns

### Press Feedback
- **Primary buttons** (gold): Scale 0.97 + light haptic
- **List items/cards**: Opacity 0.7 on press
- **Icons/minor actions**: Opacity 0.6 on press

### Haptics
- Button tap (primary actions): Light impact
- Toggle/switch: Medium impact
- Success/completion: Success notification
- Error/failure: Error notification

### Loading States
- Show spinner overlay for async operations
- Disable buttons during submission
- Show error toast for failed operations

### Empty States
- Show placeholder image + message when no data available
- Provide action button to navigate or retry

---

## Responsive Considerations

- **Portrait orientation only** (9:16 aspect ratio)
- **One-handed usage**: Important buttons within thumb reach (bottom 40% of screen)
- **Safe area handling**: Respect notch, home indicator, tab bar
- **Text sizing**: Minimum 16pt for body text, 18pt+ for headings
- **Touch targets**: Minimum 44pt × 44pt for interactive elements

---

## Accessibility

- **Color contrast**: All text meets WCAG AA standards
- **Dynamic type**: Support system font size preferences
- **VoiceOver/TalkBack**: All interactive elements labeled
- **Haptic feedback**: Provide alternative to visual feedback

---

## Multilingual Support (i18n)

Supported languages: English (EN), Khmer (KH), Chinese (CN)

**Implementation**:
- Use `i18next` for translation management
- Store translations in JSON files: `locales/{lang}.json`
- Language selector in settings or header
- Persist language preference in AsyncStorage

---

## Dark/Light Mode

- **Implementation**: Use `ThemeProvider` context
- **Toggle**: Available in settings or header
- **Persistence**: Save preference in AsyncStorage
- **Automatic**: Respect system theme preference on first launch

---

## Performance Considerations

- **Image optimization**: Use `expo-image` with caching and placeholders
- **List virtualization**: Use `FlatList` for large lists
- **Code splitting**: Lazy load screens via Expo Router
- **State management**: Use React Context + AsyncStorage for local data
- **API caching**: Use TanStack Query for server data

---

## Technical Stack Summary

- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context + AsyncStorage
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **API**: TanStack Query for data fetching
- **Multilingual**: i18next
- **Icons**: Expo Vector Icons (MaterialIcons + SF Symbols)

