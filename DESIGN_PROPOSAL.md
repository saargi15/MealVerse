# FoodHub Design Proposal - Tailwind CSS Implementation

## 1. Brand Identity & Color System

### Primary Colors

- **Primary Red**: `#e8392a` - Main CTA, headers, highlights
- **Dark Red**: `#c73e2d` - Hover states, emphasis
- **Light Coral**: `#ff5c4d` - Secondary CTAs, accents
- **Coral Orange**: `#ff8c6b` - Tertiary accents, secondary buttons

### Neutral Colors

- **Dark Text**: `#1a1a1a` - Primary text
- **Medium Gray**: `#666666` - Secondary text
- **Light Gray**: `#f7f7f7` - Backgrounds, section dividers
- **White**: `#ffffff` - Cards, containers

### Semantic Colors

- **Success**: `#22c55e` - Order confirmation, positive actions
- **Warning**: `#f59e0b` - Alerts, pending status
- **Error**: `#ef4444` - Cancellations, errors
- **Info**: `#3b82f6` - Information, tooltips

---

## 2. Typography System

### Font Family

- **Primary**: Poppins (already in use)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Type Scale

```
Display     -> 48px / 56px (h1) - Hero titles, page headers
Headline    -> 36px / 44px (h2) - Section titles
Subheading  -> 24px / 32px (h3) - Subsection titles
Body Large  -> 18px / 28px (p) - Feature descriptions
Body        -> 16px / 24px (p) - Default text
Small       -> 14px / 20px (small) - Helper text, labels
Tiny        -> 12px / 16px (tiny) - Metadata, tags
```

### Font Weights

- Bold (700): Headlines, CTAs, emphasis
- Semibold (600): Subheadings, card titles
- Medium (500): Buttons, labels
- Regular (400): Body text

---

## 3. Spacing & Layout System

### Grid System

- **Grid Columns**: 12 columns (responsive breakpoints)
- **Column Gap**: 16px-24px (depends on viewport)
- **Row Gap**: 24px-32px

### Spacing Scale (Tailwind)

```
xs: 4px    (gap-1)
sm: 8px    (gap-2)
md: 12px   (gap-3)
lg: 16px   (gap-4)
xl: 24px   (gap-6)
2xl: 32px  (gap-8)
3xl: 40px  (gap-10)
```

### Breakpoints

```
Mobile:  < 640px  (sm)
Tablet:  640-1024px (md, lg)
Desktop: > 1024px (xl)
```

---

## 4. Component Design Patterns

### Hero Section

**Purpose**: Immediate value proposition and primary CTA
**Layout**:

- Full-width background with gradient or image overlay
- 80-120px vertical padding (mobile/desktop)
- Center-aligned headline (max 60px on desktop)
- Subheading below (secondary color, 16-18px)
- Prominent search bar or CTA button

**Design Elements**:

- Gradient background: `linear-gradient(135deg, #c73e2d 0%, #e8392a 50%, #ff8c6b 100%)`
- Circular decorative elements (white, 6-8% opacity) for visual interest
- White text with high contrast
- Shadow on CTA buttons for depth

**Code Pattern**:

```jsx
<section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-400 py-20 md:py-28 px-4 overflow-hidden">
  {/* Decorative circles */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>

  <div className="container mx-auto relative z-10 text-center max-w-3xl">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
      Order food, book a table, discover events
    </h1>
    <p className="text-lg md:text-xl text-white/85 mb-8">
      Delivered hot to your door or reserved at your favourite spot — all in one
      place.
    </p>
    {/* Search bar or CTA */}
  </div>
</section>
```

---

### Card Component

**Purpose**: Display restaurant, food item, or event information
**Variants**:

- **Image-Heavy** (Restaurant cards)
- **Minimal** (Feature cards)
- **Detail-Rich** (Order/booking cards)

**Design Elements**:

- 12px-14px border radius
- Subtle shadow: `0 2px 12px rgba(0,0,0,0.08)`
- Hover effect: shadow lift (0 8px 24px) + slight scale (1.02)
- Padding: 16-20px
- Border: 1px solid #e5e5e5

**Code Pattern**:

```jsx
<div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-102 transition-all duration-200 overflow-hidden">
  {/* Image */}
  <img src="" alt="" className="w-full h-40 object-cover" />

  {/* Content */}
  <div className="p-4">
    <h3 className="text-lg font-semibold text-gray-900">Title</h3>
    <p className="text-sm text-gray-600 mt-1">Description</p>

    {/* Footer with price/rating */}
    <div className="flex justify-between items-center mt-4">
      <span className="font-semibold text-red-600">₹999</span>
      <span className="text-sm text-amber-500">★ 4.5</span>
    </div>
  </div>
</div>
```

---

### Button System

**Primary Button** (Main CTAs)

```jsx
<button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition-colors">
  Search Restaurants
</button>
```

**Secondary Button** (Less prominent)

```jsx
<button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-full transition-colors">
  Secondary Action
</button>
```

**Tertiary Button** (Text/Ghost)

```jsx
<button className="text-red-600 hover:text-red-700 font-semibold border-b-2 border-red-600 pb-1 transition-colors">
  Learn More
</button>
```

**Disabled State**:

```jsx
<button className="bg-gray-300 text-gray-600 cursor-not-allowed py-3 px-6 rounded-full">
  Disabled
</button>
```

---

### Search Bar Component

**Purpose**: Prime navigation element for discovery
**Design**:

- Rounded pill shape (border-radius: 999px)
- Shadow: `0 8px 32px rgba(0,0,0,0.12)`
- Padding: 6px 20px internally
- Icon + input + button layout

**Code Pattern**:

```jsx
<div className="flex items-center bg-white rounded-full shadow-lg p-1.5 max-w-xl mx-auto">
  <span className="px-4 text-gray-400">🔍</span>
  <input
    type="text"
    placeholder="Search restaurants, cuisines..."
    className="flex-1 outline-none text-gray-900 placeholder-gray-400"
  />
  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold">
    Search
  </button>
</div>
```

---

### Chip/Tag Component

**Purpose**: Cuisine filters, categories, badges
**Design**:

- Light background with border
- Hover: color fill + primary text color
- Cursor pointer
- Responsive sizing

**Code Pattern**:

```jsx
<button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-colors cursor-pointer">
  🍛 Indian Cuisine
</button>
```

---

## 5. Page Layout Templates

### Template A: Hero + Content Grid (Home, Events)

```
┌─────────────────────────────────┐
│         HERO SECTION            │
│     (Full width gradient)       │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│       CATEGORY FILTERS          │
│   (Horizontal scrollable row)   │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│    CONTENT GRID (Cards)         │
│  3 cols (desktop) / 1 (mobile) │
│  • Spacing: 24px gap            │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│          FOOTER                 │
└─────────────────────────────────┘
```

### Template B: List + Sidebar (Restaurants, Orders)

```
┌──────────────┬──────────────────┐
│   FILTERS    │   CONTENT        │
│   (200px)    │   GRID/LIST      │
│              │   (responsive)   │
│              │                  │
│              │                  │
└──────────────┴──────────────────┘
```

### Template C: Detail Page (RestaurantDetail, Profile)

```
┌─────────────────────────────────┐
│      HEADER/COVER IMAGE         │
│         (Full width)            │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  TITLE + META INFO + ACTIONS    │
└─────────────────────────────────┘
┌──────────────┬──────────────────┐
│   TABS/NAV   │   CONTENT        │
│              │   (main area)    │
│              │                  │
└──────────────┴──────────────────┘
```

---

## 6. Visual Hierarchy Guidelines

### Information Architecture

1. **Attention Level 1**: Hero image + headline + primary CTA
2. **Attention Level 2**: Feature cards with images + calls-to-action
3. **Attention Level 3**: Secondary content, filters, descriptions
4. **Attention Level 4**: Meta information, timestamps, secondary text

### Implementation

- Use font size, weight, and color to create hierarchy
- Primary actions: Bold, large, red (#e8392a)
- Secondary actions: Medium weight, orange (#ff8c6b)
- Supporting text: Gray (#666), 14px
- Metadata: Light gray (#999), 12px

---

## 7. Interactive States & Animations

### Hover States

- **Buttons**: Background color shift + subtle shadow
- **Cards**: Scale 1.02 + shadow lift
- **Links**: Color change + underline

### Focus States (Accessibility)

- **Inputs**: 2px solid border in primary color
- **Buttons**: Visible outline (not removed)
- **Links**: Underline + color change

### Loading States

- **Buttons**: Spinner icon + disabled appearance
- **Cards**: Skeleton loader with gray gradient
- **Pages**: Smooth fade-in animation

### Animations

- **Transitions**: 200-300ms for smooth interactions
- **Durations**:
  - Quick: 150ms (hover effects)
  - Normal: 300ms (card transitions)
  - Slow: 500ms (page transitions)

---

## 8. Spacing Examples by Page Type

### Home Page

- Hero padding: 80px vertical, 20px horizontal
- Cuisine chips gap: 12px
- Feature cards gap: 24px
- Section margins: 60-80px vertical

### Restaurants List

- Card gap: 16px (grid)
- Sidebar width: 250px
- Padding: 16px per card

### RestaurantDetail

- Hero image height: 300-400px
- Content padding: 24px
- Menu items spacing: 16px between sections
- Tab spacing: 12px gap between tabs

### Cart/Order

- Item rows gap: 12px
- Section gap: 24px
- Summary box padding: 20px

---

## 9. Mobile-First Responsive Design

### Breakpoints Applied

- **Mobile (320-640px)**: Single column, full-width cards, stacked sections
- **Tablet (640-1024px)**: 2-column grids, sidebar becomes secondary
- **Desktop (1024px+)**: 3+ column grids, full layouts

### Mobile Specific

- Remove decorative elements on small screens
- Increase touch target sizes (min 44px)
- Stack buttons vertically when space is tight
- Use collapsible filters instead of persistent sidebars

---

## 10. Tailwind CSS Configuration

### Extended Colors in tailwind.config.js

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        "brand-red": "#e8392a",
        "brand-red-dark": "#c73e2d",
        "brand-red-light": "#ff5c4d",
        "brand-orange": "#ff8c6b",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
      spacing: {
        container: "1200px",
      },
    },
  },
};
```

---

## 11. Page-Specific Design Recommendations

### Home Page

- **Hero Section**:
  - Gradient background (red to orange)
  - Headline: "Order food, book a table, discover events"
  - Search bar with icon
- **Cuisine Filter Section**:
  - Horizontal scrollable chips (mobile)
  - Grid layout (desktop)
  - Emoji + label + hover color effect
- **Feature Cards**:
  - 3-column grid (desktop)
  - Icon + title + description
  - Primary CTA button
  - Light background, minimal shadow

### Restaurants Page

- **Header**: "Browse Restaurants" with search/filter icon
- **Filter Sidebar**:
  - Cuisine categories (checkboxes)
  - Price range (slider)
  - Rating filter
  - Open/Closed toggle
- **Content Area**:
  - Card grid (3 cols desktop, 2 tablet, 1 mobile)
  - Image + name + cuisine + rating + delivery time
  - Hover effect with primary CTA
  - Sticky header on scroll

### RestaurantDetail Page

- **Hero Banner**: Cover image with restaurant name overlay
- **Header Info**:
  - Name + ratings + review count
  - Tags (Delivery, Dine-in, Bookings)
  - Action buttons (Share, Favorite, Review)
- **Tab Navigation**:
  - Menu, Reviews, Bookings
  - Sticky on scroll
- **Menu Section**:
  - Category groups with items
  - Item image + name + description + price + add/remove buttons
- **Reviews Section**:
  - User avatar + name + rating + date
  - Review text
  - Helpful vote buttons
  - Add review CTA

### Cart Page

- **Header**: "Your Cart" with item count
- **Items List**:
  - Item card per row
  - Image + name + quantity controls + price
  - Remove button
  - Each item card: 12px padding, 1px border
- **Order Summary**:
  - Subtotal, tax, delivery fee breakdown
  - Total (bold, large, red)
  - Checkout button (full width, primary color)
  - Continue shopping link

### Orders/Bookings Pages

- **Header**: Tabs for past/current/upcoming
- **Status Timeline**:
  - Order ID + status badge
  - Timeline with checkmarks
  - Estimated delivery/date time
- **Order Items**:
  - Item name + qty + price
  - Restaurant name
  - Reorder button
- **Actions**:
  - Track order (primary)
  - Contact support (secondary)
  - Cancel order (danger, if available)

### Login/Register Pages

- **Centered Layout**: Max-width 400px, centered on screen
- **Form Card**: White background, subtle shadow, padding 32px
- **Input Fields**:
  - Full width, 12px border radius
  - Placeholder: gray (#999)
  - Border: 1px solid #ddd
  - Focus: 2px solid red border
- **CTA Button**: Full width, primary color, 44px height
- **Link**: "Don't have an account?" in secondary color
- **Social Login**: Buttons with icons, gray background

### Profile Page

- **User Header**:
  - Avatar image (100px circle)
  - Name + email + phone
  - Edit profile button
- **Content Sections**:
  - Saved addresses
  - Payment methods
  - Order history
  - Loyalty points/rewards
- **Settings**:
  - Notification preferences
  - Privacy settings
  - Logout button (danger color)

---

## 12. Color Usage Examples by Component

| Component         | Primary      | Secondary    | State            |
| ----------------- | ------------ | ------------ | ---------------- |
| Primary Button    | #e8392a      | -            | Hover: #c73e2d   |
| Secondary Button  | #ff8c6b      | -            | Hover: #ff7a54   |
| Links             | #e8392a      | -            | Visited: #c73e2d |
| Rating Badge      | #f59e0b      | -            | -                |
| Status: Confirmed | #22c55e      | -            | -                |
| Status: Pending   | #f59e0b      | -            | -                |
| Status: Cancelled | #ef4444      | -            | -                |
| Badges/Tags       | #e8392a (bg) | White (text) | -                |
| Hover Overlay     | -            | -            | #fff overlay 8%  |
| Borders           | #e5e5e5      | -            | Active: #e8392a  |

---

## 13. Implementation Checklist

- [ ] Install Tailwind CSS dependency
- [ ] Configure tailwind.config.js with brand colors
- [ ] Create reusable component library:
  - [ ] Button (primary, secondary, tertiary, sizes)
  - [ ] Card (with and without image)
  - [ ] Chip (filter tags)
  - [ ] SearchBar
  - [ ] RatingBadge
  - [ ] StatusBadge
  - [ ] Navbar (with responsive menu)
  - [ ] Footer
- [ ] Refactor pages:
  - [ ] Home.tsx
  - [ ] Restaurants.tsx
  - [ ] RestaurantDetail.tsx
  - [ ] Cart.tsx
  - [ ] Orders.tsx
  - [ ] Bookings.tsx
  - [ ] Events.tsx
  - [ ] Profile.tsx
  - [ ] Login.tsx
  - [ ] Register.tsx
- [ ] Test responsive design at all breakpoints
- [ ] Test accessibility (contrast, focus states)
- [ ] Optimize images for web
- [ ] Add loading/skeleton states
- [ ] Implement animations and transitions
- [ ] User testing and refinement

---

## 14. Design System Tokens (for developers)

```javascript
// Exported from design system
const designTokens = {
  // Colors
  colors: {
    primary: "#e8392a",
    primaryDark: "#c73e2d",
    primaryLight: "#ff5c4d",
    secondary: "#ff8c6b",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },

  // Typography
  typography: {
    fontFamily:
      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sizes: {
      display: { size: "48px", lineHeight: "56px" },
      h1: { size: "36px", lineHeight: "44px" },
      h2: { size: "28px", lineHeight: "36px" },
      h3: { size: "24px", lineHeight: "32px" },
      body: { size: "16px", lineHeight: "24px" },
      small: { size: "14px", lineHeight: "20px" },
      tiny: { size: "12px", lineHeight: "16px" },
    },
    weights: { bold: 700, semibold: 600, medium: 500, regular: 400 },
  },

  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "40px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    base: "0 2px 12px rgba(0,0,0,0.08)",
    md: "0 4px 16px rgba(0,0,0,0.10)",
    lg: "0 8px 24px rgba(0,0,0,0.12)",
    xl: "0 12px 32px rgba(0,0,0,0.15)",
  },

  // Border Radius
  radius: { sm: "8px", base: "12px", md: "14px", lg: "16px", full: "999px" },
};
```

---

## Conclusion

This design proposal provides a comprehensive roadmap for creating a cohesive, brand-aligned FoodHub experience using Tailwind CSS. The system prioritizes:

✅ **Consistency** - Unified color palette, typography, and spacing  
✅ **Usability** - Clear visual hierarchy and accessible interactions  
✅ **Responsiveness** - Mobile-first approach for all devices  
✅ **Scalability** - Reusable components and design tokens  
✅ **Brand Identity** - Strong visual presence with red/orange palette

Each component and page can be built using the templates and patterns outlined above, ensuring a professional, modern food delivery experience.
