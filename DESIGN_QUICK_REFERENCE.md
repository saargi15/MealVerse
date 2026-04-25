# FoodHub Design System - Quick Reference Guide

## 🎨 Brand Colors at a Glance

```
Primary Red:     #e8392a  (main CTAs, headers, emphasis)
Dark Red:        #c73e2d  (hover states, dark text)
Light Coral:     #ff5c4d  (secondary CTAs)
Coral Orange:    #ff8c6b  (accent, secondary buttons)

Success:         #22c55e  (confirmations, positive)
Warning:         #f59e0b  (alerts, pending status)
Error:           #ef4444  (errors, cancellations)
Info:            #3b82f6  (information, help)

Gray-50:         #f9fafb  (very light backgrounds)
Gray-200:        #e5e7eb  (borders, dividers)
Gray-600:        #4b5563  (secondary text)
Gray-900:        #111827  (primary text)
```

---

## 🔤 Typography Quick Reference

| Level    | Element | Size | Weight         | Usage           |
| -------- | ------- | ---- | -------------- | --------------- |
| Display  | h1      | 48px | Bold (700)     | Page hero title |
| Headline | h2      | 36px | Bold (700)     | Major sections  |
| Subhead  | h3      | 28px | Semibold (600) | Card titles     |
| Body     | p       | 16px | Regular (400)  | Main content    |
| Small    | small   | 14px | Regular (400)  | Helper text     |
| Tiny     | span    | 12px | Regular (400)  | Metadata        |

**Font**: Poppins (Google Fonts)

---

## 🎯 Component Color Usage

### Buttons

```
Primary Button:
  Background: bg-red-600
  Hover: bg-red-700
  Text: text-white
  Shadow: shadow-md

Secondary Button:
  Background: bg-orange-400
  Hover: bg-orange-500
  Text: text-white

Tertiary (Ghost) Button:
  Border: border-2 border-red-600
  Text: text-red-600
  Hover: bg-red-50

Disabled State (All):
  Background: bg-gray-300
  Text: text-gray-600
  Cursor: cursor-not-allowed
  Opacity: opacity-60
```

### Cards

```
Background:     bg-white
Border:         border-1 border-gray-200
Shadow:         shadow-card (0 2px 12px rgba(0,0,0,0.08))
Hover Shadow:   shadow-card-hover (0 8px 24px rgba(0,0,0,0.12))
Hover Scale:    scale-102
Border Radius:  rounded-lg (12px)
```

### Input Fields

```
Border:         border-2 border-gray-200
Focus:          focus:border-red-600
Error:          border-red-500
Background:     bg-white
Text:           text-gray-900
Placeholder:    placeholder-gray-400
```

### Badges/Status

```
Success:  bg-green-100  text-green-800
Warning:  bg-amber-100  text-amber-800
Error:    bg-red-100   text-red-800
Info:     bg-blue-100  text-blue-800
Primary:  bg-red-100   text-red-800
```

---

## 📐 Spacing Scale

```
xs:   4px   (gap-1, p-1)
sm:   8px   (gap-2, p-2)
md:   12px  (gap-3, p-3)
lg:   16px  (gap-4, p-4)
xl:   24px  (gap-6, p-6)
2xl:  32px  (gap-8, p-8)
3xl:  40px  (gap-10, p-10)
```

**Common Patterns**:

- Card padding: `p-4` to `p-6`
- Grid gap: `gap-4` to `gap-6`
- Section margins: `my-8` to `my-12`
- Hero padding: `py-20` to `py-28`

---

## 📱 Responsive Breakpoints

```
Mobile:     < 640px   (default/no prefix)
Tablet:     640-1024px (md:)
Desktop:    > 1024px  (lg:)
```

**Responsive Grid Patterns**:

```
1 Column (Mobile):    grid-cols-1
2 Columns (Tablet):   md:grid-cols-2
3 Columns (Desktop):  lg:grid-cols-3
4 Columns (Desktop):  lg:grid-cols-4

Or Auto Responsive:   grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## ✨ Common Component Patterns

### Hero Section

```tsx
<HeroSection title="Your headline here" subtitle="Supporting subtitle">
  <SearchBar placeholder="..." onSearch={handleSearch} />
</HeroSection>
```

### 3-Column Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>
```

### Button Group

```tsx
<div className="flex gap-3">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
</div>
```

### Form Layout

```tsx
<div className="space-y-4 max-w-md">
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
  <Button fullWidth variant="primary">
    Login
  </Button>
</div>
```

### Sidebar + Content

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="md:col-span-1">{/* Sidebar */}</div>
  <div className="md:col-span-3">{/* Main Content */}</div>
</div>
```

---

## 🔔 Status & State Colors

### Order Status

```
Pending:    🟡 bg-amber-100  text-amber-800
Confirmed:  🟢 bg-green-100  text-green-800
Delivered:  🔵 bg-blue-100   text-blue-800
Cancelled:  🔴 bg-red-100    text-red-800
```

### Rating Display

```
Perfect (5): 🟨 text-amber-500
Good (4-4.5): 🟨 text-amber-500
Fair (3-3.5): 🟡 text-amber-400
Poor (<3):    🟡 text-amber-300
```

---

## 📊 Shadow Hierarchy

```
sm:      0 1px 2px 0 rgba(0,0,0,0.05)       - Subtle
base:    0 2px 12px rgba(0,0,0,0.08)        - Cards
md:      0 4px 16px rgba(0,0,0,0.10)        - Hover cards
lg:      0 8px 24px rgba(0,0,0,0.12)        - Floating elements
xl:      0 12px 32px rgba(0,0,0,0.15)       - Modals, dropdowns
```

---

## 🎬 Animation & Transitions

```
Fast:     duration-150 (hover effects)
Normal:   duration-200 (button clicks)
Slow:     duration-300 (page transitions)

Easing:   transition-all, transition-colors, transition-transform
```

**Common Animations**:

```tsx
// Hover effect on cards
className = "transition-all duration-200 hover:shadow-lg hover:scale-102";

// Button transitions
className = "transition-colors duration-200 hover:bg-red-700";

// Fade in
className = "animate-fadeIn";

// Pulse loading
className = "animate-pulse";
```

---

## 📝 Text Color Hierarchy

```
Primary Text:      text-gray-900     (16px, 400)  - Main body
Secondary Text:    text-gray-600     (14px, 400)  - Helper, descriptions
Tertiary Text:     text-gray-500     (12px, 400)  - Metadata, timestamps
Muted Text:        text-gray-400     (12px, 400)  - Placeholders

Accent Text:       text-red-600      (inherit)    - Links, highlights
Success Text:      text-green-600    (inherit)    - Positive messages
Warning Text:      text-amber-600    (inherit)    - Warnings
Error Text:        text-red-600      (inherit)    - Errors
```

---

## 🎪 Visual Hierarchy Implementation

### Page Level

1. **Hero Section** - Full width, high visual impact, main CTA
2. **Section Headers** - Clear h2/h3, white space below
3. **Content Cards** - Organized grid with consistent spacing
4. **Footer** - Subtle, dark background, muted text

### Card Level

1. **Image** - Top, full width, object-cover
2. **Title** - h3, semibold, gray-900
3. **Description** - Small, gray-600, muted
4. **Meta Info** - Rating, time, price
5. **CTA Button** - Primary button, right-aligned or full-width

### Form Level

1. **Label** - Small, font-medium, gray-700
2. **Input** - Full width, gray borders, red focus
3. **Error Text** - Small, red-600, below input
4. **Helper Text** - Tiny, gray-500, below input
5. **Submit Button** - Full width or inline, primary

---

## ⚡ Performance Tips

### Image Optimization

```tsx
// Lazy load images
<img src="..." loading="lazy" className="w-full h-40 object-cover" />

// Responsive images
<img
  srcSet="small.jpg 640w, medium.jpg 1024w, large.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 50vw"
  src="medium.jpg"
/>
```

### CSS Purging

- Tailwind automatically removes unused CSS in production
- Ensure class names are static strings, not dynamically generated
- Use computed classes carefully: `className={`col-span-${number}`}` ❌

### Code Splitting

```tsx
const Home = React.lazy(() => import('./pages/Home'))

<Suspense fallback={<LoadingSpinner />}>
  <Home />
</Suspense>
```

---

## 🐛 Debugging Checklist

- [ ] Responsive design tested at sm, md, lg breakpoints
- [ ] Color contrast meets accessibility standards (AA)
- [ ] All buttons have hover and active states
- [ ] Form inputs have focus states
- [ ] Loading states are clearly indicated
- [ ] Error messages are helpful and visible
- [ ] Empty states have icons and CTAs
- [ ] Text is readable (font size, line height)
- [ ] Images are optimized and responsive
- [ ] Animations are smooth (60fps)
- [ ] Touch targets are min 44px (mobile)
- [ ] Keyboard navigation works

---

## 📦 File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── TailwindComponents.tsx      (All reusable components)
│   │   └── index.ts                    (Exports)
│   ├── layout/
│   │   ├── Navbar.tsx                  (Refactored with Tailwind)
│   │   ├── Footer.tsx                  (Refactored with Tailwind)
│   │   └── Layout.tsx
│   └── ...
├── pages/
│   ├── Home.tsx                        (or HomeRefactored.tsx)
│   ├── Restaurants.tsx                 (or RestaurantsRefactored.tsx)
│   ├── RestaurantDetail.tsx
│   ├── Cart.tsx
│   ├── Orders.tsx
│   ├── Bookings.tsx
│   ├── Events.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Profile.tsx
├── App.tsx
├── main.tsx
└── index.css                           (Tailwind directives)

tailwind.config.js                      (Design tokens)
postcss.config.js
```

---

## 🔗 Quick Import Template

```typescript
// Always import from components/ui
import {
  Button,
  Card,
  RestaurantCard,
  SearchBar,
  Chip,
  HeroSection,
  FeatureCard,
  Input,
  TextArea,
  Modal,
  Toast,
  EmptyState,
  SkeletonCard,
  RatingBadge,
  StatusBadge,
  Badge,
  QuantitySelector,
} from "@/components/ui";
```

---

## 🚀 Next Steps

1. Install Tailwind CSS
2. Copy TailwindComponents.tsx
3. Update tailwind.config.js
4. Migrate one page (start with Home)
5. Test responsive design
6. Iterate and refine

---

## 📞 Support Resources

- **Tailwind Docs**: https://tailwindcss.com/docs
- **Design Proposal**: See DESIGN_PROPOSAL.md
- **Implementation Guide**: See TAILWIND_IMPLEMENTATION_GUIDE.md
- **Example Pages**: HomeRefactored.tsx, RestaurantsRefactored.tsx

---

## ✅ Brand Checklist

- [ ] Primary red used for main CTAs
- [ ] Gradient backgrounds on hero sections
- [ ] Poppins font throughout
- [ ] Consistent spacing and padding
- [ ] Color palette maintained
- [ ] Hover states on interactive elements
- [ ] Responsive mobile-first design
- [ ] Accessibility standards met
- [ ] Loading and empty states present
- [ ] Dark and light mode ready (optional)

Happy designing! 🎨🚀
