<<<<<<< HEAD
# FoodHub Frontend — React + TypeScript + Material UI

## Setup & Run

1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Open browser:
   http://localhost:5173

## Folder Structure
src/
  api/           — All axios API calls (index.ts, axios.ts)
  components/
    layout/      — Navbar, Footer, Layout
    ui/          — Reusable components (RestaurantCard)
  context/       — AuthContext, CartContext
  pages/         — One file per page
  theme/         — MUI theme config
  types/         — All TypeScript interfaces

## Pages
/ ..................... Home
/restaurants .......... Restaurant listing with filters
/restaurants/:id ...... Restaurant detail, menu, reviews
/cart ................. Cart and checkout
/orders ............... My orders
/bookings ............. Table booking
/events ............... Events and ticket booking
/login ................ Login
/register ............. Register
/profile .............. Profile, points, badges

## Notes
- Works with demo data even when backend is offline
- Connect real backend by setting proxy in vite.config.ts
- Backend runs on http://localhost:5000
=======
# MealVerse

Integrated Food Delivery and Dine-Out Platform

## Features
- Restaurant discovery
- Table booking
- Food ordering
- Geo-based search

## Tech Stack
- React
- Node.js
- MongoDB

## Team Members
- I – Backend & Geospatial
- Member 2 – Frontend
- Member 3 – APIs & Integration
>>>>>>> 682dc30bafded5ab2540d64b1aeda7f0f5935a70
