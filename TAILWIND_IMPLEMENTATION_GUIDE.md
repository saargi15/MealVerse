# Tailwind CSS Implementation Guide for FoodHub

## Overview

This guide walks you through converting your FoodHub project from Material UI to Tailwind CSS while maintaining the brand identity and visual consistency.

---

## Phase 1: Project Setup

### Step 1: Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This creates:

- `tailwind.config.js` - Configuration file
- `postcss.config.js` - PostCSS configuration

### Step 2: Copy Configuration

Replace your `tailwind.config.js` with the provided design system config (see `tailwind.config.js` in project root).

### Step 3: Add Tailwind Directives

Create or update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom brand-specific styles */
@layer base {
  body {
    @apply font-poppins text-gray-900;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
  }
}

@layer components {
  .container-fluid {
    @apply w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl;
  }

  .btn-base {
    @apply font-semibold rounded-full transition-all duration-200;
  }
}
```

### Step 4: Import CSS in Your App

In `src/main.tsx`:

```tsx
import "./index.css"; // Add this import
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Step 5: Install Poppins Font

In `src/index.css`, add:

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
```

---

## Phase 2: Component Migration

### Step 1: Copy Reusable Components

Copy `src/components/ui/TailwindComponents.tsx` to your project.

### Step 2: Export Components

Create `src/components/ui/index.ts`:

```typescript
export { Button } from "./TailwindComponents";
export { Card, RestaurantCard } from "./TailwindComponents";
export { SearchBar } from "./TailwindComponents";
export { Chip } from "./TailwindComponents";
export { RatingBadge, StatusBadge } from "./TailwindComponents";
export { HeroSection } from "./TailwindComponents";
export { FeatureCard } from "./TailwindComponents";
export { Input, TextArea } from "./TailwindComponents";
export { Modal } from "./TailwindComponents";
export { Toast } from "./TailwindComponents";
export { SkeletonCard } from "./TailwindComponents";
export { QuantitySelector } from "./TailwindComponents";
export { EmptyState } from "./TailwindComponents";
export { Divider, Badge } from "./TailwindComponents";
```

### Step 3: Update Component Imports

Replace Material UI imports:

```typescript
// Before
import { Box, Button, Card } from "@mui/material";

// After
import { Button, Card } from "@/components/ui";
```

---

## Phase 3: Page Migration (Example: Home Page)

### Step 1: Replace the Home Component

Copy the provided `HomeRefactored.tsx` or use it as a template to update your existing `src/pages/Home.tsx`.

### Step 2: Key Changes

#### Before (Material UI):

```tsx
import { Box, Container, Button } from "@mui/material";

<Box sx={{ background: "linear-gradient(...)", py: 8 }}>
  <Container>
    <Typography variant="h2">{title}</Typography>
    <Button variant="contained" color="primary">
      Click
    </Button>
  </Container>
</Box>;
```

#### After (Tailwind):

```tsx
import { HeroSection, Button } from "@/components/ui";

<HeroSection title={title}>
  <Button>Click</Button>
</HeroSection>;
```

### Step 3: Common Component Mappings

| Material UI                    | Tailwind Component            | Usage                 |
| ------------------------------ | ----------------------------- | --------------------- |
| `<Button variant="contained">` | `<Button variant="primary">`  | Primary CTA           |
| `<Button variant="outlined">`  | `<Button variant="tertiary">` | Secondary CTA         |
| `<Card>`                       | `<Card>`                      | Container for content |
| `<TextField>`                  | `<Input>`                     | Form input            |
| `<TextField multiline>`        | `<TextArea>`                  | Multi-line input      |
| `<Chip>`                       | `<Chip>`                      | Filter tags           |
| `<Box sx={{...}}>`             | `<div className="...">`       | Generic container     |
| `<Typography>`                 | `<p>`, `<h1>`, etc            | Text elements         |

---

## Phase 4: Layout Patterns

### Hero Section with Search

```tsx
<HeroSection title="Order food, book a table" subtitle="All in one place">
  <SearchBar onSearch={handleSearch} />
</HeroSection>
```

### 3-Column Grid (Responsive)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>
```

### Sticky Header

```tsx
<div className="sticky top-0 z-40 bg-white shadow-sm">
  {/* Header content */}
</div>
```

### Sidebar + Content Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="md:col-span-1">{/* Sidebar */}</div>
  <div className="md:col-span-3">{/* Main content */}</div>
</div>
```

---

## Phase 5: Color Usage

### Brand Colors

Use these Tailwind classes throughout your app:

```typescript
// Buttons and CTAs
<button className="bg-red-600 hover:bg-red-700">Primary</button>
<button className="bg-orange-400 hover:bg-orange-500">Secondary</button>

// Text
<p className="text-red-600">Important text</p>
<p className="text-gray-600">Secondary text</p>

// Backgrounds
<div className="bg-red-50">Light red background</div>
<div className="bg-gradient-to-r from-red-600 to-orange-400">Gradient</div>

// Borders
<div className="border border-gray-200">Border</div>
<div className="border-b-2 border-red-600">Bottom border</div>

// Status Colors
<span className="bg-green-100 text-green-800">Success</span>
<span className="bg-amber-100 text-amber-800">Warning</span>
<span className="bg-red-100 text-red-800">Error</span>
```

---

## Phase 6: Responsive Design

### Mobile-First Approach

```tsx
// Mobile (default)
<div className="flex flex-col gap-4">
  {/* Stack on mobile */}

  {/* Horizontal on tablets and up */}
  <div className="md:flex-row md:justify-between">
    {/* Side by side on larger screens */}
  </div>
</div>
```

### Breakpoints

```
sm: 640px  - Tablets
md: 1024px - Desktop
lg: 1280px - Large desktop
```

### Hiding/Showing Elements

```tsx
{
  /* Show on mobile, hide on desktop */
}
<div className="md:hidden">Mobile menu</div>;

{
  /* Hide on mobile, show on desktop */
}
<div className="hidden md:block">Desktop menu</div>;

{
  /* Responsive text sizes */
}
<h1 className="text-2xl md:text-4xl lg:text-6xl">Title</h1>;
```

---

## Phase 7: Migration Checklist

### Pages to Migrate

- [ ] Home.tsx
- [ ] Restaurants.tsx
- [ ] RestaurantDetail.tsx
- [ ] Cart.tsx
- [ ] Orders.tsx
- [ ] Bookings.tsx
- [ ] Events.tsx
- [ ] Login.tsx
- [ ] Register.tsx
- [ ] Profile.tsx

### Layout Components

- [ ] Navbar.tsx
- [ ] Footer.tsx
- [ ] Layout.tsx

### Contexts (Usually no changes needed)

- [ ] AuthContext.tsx
- [ ] CartContext.tsx

### Testing

- [ ] Test responsive design at all breakpoints
- [ ] Test form inputs and interactions
- [ ] Test loading states
- [ ] Test error states
- [ ] Test accessibility (keyboard navigation, screen readers)

---

## Phase 8: Performance Tips

### Image Optimization

```tsx
// Use responsive images
<img
  src="restaurant.jpg"
  alt="Restaurant"
  className="w-full h-40 object-cover"
  loading="lazy"
/>

// Or use next/image if available
<Image src="" alt="" width={400} height={300} />
```

### Code Splitting

```tsx
// Use React.lazy for page components
const Home = React.lazy(() => import('./pages/Home'))
const Restaurants = React.lazy(() => import('./pages/Restaurants'))

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Home />
</Suspense>
```

### CSS Optimization

Tailwind automatically purges unused CSS in production. Ensure you build for production:

```bash
npm run build
```

---

## Phase 9: Common Patterns

### Form with Validation

```tsx
import { Button, Input, TextArea } from "@/components/ui";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <form className="max-w-md mx-auto space-y-4">
      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      <Button fullWidth variant="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
```

### Loading State

```tsx
import { SkeletonCard } from "@/components/ui";

function RestaurantList() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurants
    setLoading(false);
  }, []);

  if (loading) {
    return <SkeletonCard count={6} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} {...r} />
      ))}
    </div>
  );
}
```

### Empty State

```tsx
import { EmptyState, Button } from "@/components/ui";

function NoOrders() {
  return (
    <EmptyState
      icon="🛒"
      title="No Orders Yet"
      description="Start exploring restaurants and place your first order!"
      action={{
        label: "Order Now",
        onClick: () => navigate("/restaurants"),
      }}
    />
  );
}
```

### Toast Notification

```tsx
import { Toast } from "@/components/ui";
import { useState } from "react";

function MyComponent() {
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSuccess = () => {
    setToastInfo({ message: "Order placed!", type: "success" });
  };

  return (
    <>
      <Button onClick={handleSuccess}>Place Order</Button>
      {toastInfo && (
        <Toast
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={() => setToastInfo(null)}
        />
      )}
    </>
  );
}
```

---

## Phase 10: Troubleshooting

### Issue: Styles Not Applying

**Solution**: Check that Tailwind CSS is installed and `index.css` is imported in `main.tsx`.

### Issue: Custom Colors Not Working

**Solution**: Verify colors are in `tailwind.config.js` and use exact color names.

### Issue: Responsive Breakpoints Not Working

**Solution**: Remember Tailwind is mobile-first. Use `md:`, `lg:` prefixes correctly.

### Issue: Classes Not Being Purged

**Solution**: In production, Tailwind may remove unused classes. Ensure all class names are static strings (not dynamically generated).

### Issue: z-index Not Working

**Solution**: Add `z-50` higher than conflicting elements. Tailwind has predefined z-index values: 10, 20, 30, 40, 50.

---

## Phase 11: CSS-in-JS Alternative (Optional)

If you prefer keeping some Material UI features, you can combine Tailwind with styled-components:

```tsx
import styled from "styled-components";

const StyledButton = styled.button`
  ${tw`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg`}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
```

---

## Next Steps

1. **Install Tailwind CSS** - Complete Phase 1
2. **Set up components** - Copy TailwindComponents.tsx
3. **Migrate one page** - Use HomeRefactored.tsx as template
4. **Test thoroughly** - Ensure responsive design works
5. **Iterate** - Use feedback to refine design
6. **Deploy** - Run `npm run build` to optimize CSS

---

## Resources

- Tailwind CSS Docs: https://tailwindcss.com/docs
- Tailwind UI Components: https://tailwindui.com
- Tailwind CSS IntelliSense (VS Code Extension)
- Tailwind Play: https://play.tailwindcss.com

---

## Questions & Support

Reference the DESIGN_PROPOSAL.md for detailed design system documentation.

Good luck with your FoodHub redesign! 🍔🚀
