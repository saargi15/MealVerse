// Home.tsx — Complete Redesign
// Dark editorial theme: black/charcoal base, golden-yellow accents
// Navbar: always solid black, with visible Sign In / Register buttons

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  InputBase,
  Button,
  Grid,
  Paper,
  Chip,
  Stack,
  Avatar,
  Rating,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// ─── Custom MUI Theme ─────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FFCC00", contrastText: "#1a1a1a" },
    secondary: { main: "#1a1a1a" },
    background: { default: "#f9f9f6", paper: "#ffffff" },
    text: { primary: "#1a1a1a", secondary: "#666666" },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800 },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800 },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700, borderRadius: 50 },
        containedPrimary: {
          color: "#1a1a1a",
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 20px rgba(255,204,0,0.45)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontFamily: '"DM Sans", sans-serif' } },
    },
  },
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Pizza",
    count: "14 Restaurants",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
  },
  {
    label: "Broast",
    count: "4 Restaurants",
    img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop",
  },
  {
    label: "Chicken",
    count: "5 Restaurants",
    img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=200&h=200&fit=crop",
  },
  {
    label: "Burgers",
    count: "19 Restaurants",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
  },
  {
    label: "Shakes",
    count: "22 Restaurants",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop",
  },
  {
    label: "Sandwiches",
    count: "6 Restaurants",
    img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&h=200&fit=crop",
  },
  {
    label: "Pasta",
    count: "10 Restaurants",
    img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&h=200&fit=crop",
  },
  {
    label: "Desserts",
    count: "15 Restaurants",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
  },
];

const FEATURES = [
  {
    icon: <DeliveryDiningIcon sx={{ fontSize: 36 }} />,
    title: "Fast Delivery",
    desc: "Order from 100+ restaurants. Food delivered hot in 30 minutes.",
    path: "/restaurants",
    color: "#FFCC00",
  },
  {
    icon: <TableRestaurantIcon sx={{ fontSize: 36 }} />,
    title: "Dine Out",
    desc: "Reserve a table at your favourite restaurant in seconds.",
    path: "/restaurants",
    color: "#ff6b6b",
  },
  {
    icon: <EventIcon sx={{ fontSize: 36 }} />,
    title: "Live Events",
    desc: "Food festivals, live music, comedy nights and more.",
    path: "/events",
    color: "#4ecdc4",
  },
];

const RESTAURANTS = [
  {
    id: "1",
    name: "Spice Garden",
    cuisine: "Indian • North Indian",
    rating: 4.6,
    reviews: 245,
    time: "25-35 mins",
    fee: "₹40",
    open: true,
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=260&fit=crop",
  },
  {
    id: "2",
    name: "Pizza Palace",
    cuisine: "Italian • Pizza",
    rating: 4.3,
    reviews: 189,
    time: "20-30 mins",
    fee: "₹50",
    open: true,
    badge: "Popular",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=260&fit=crop",
  },
  {
    id: "3",
    name: "Dragon Wok",
    cuisine: "Chinese • Asian",
    rating: 4.5,
    reviews: 312,
    time: "30-40 mins",
    fee: "₹30",
    open: true,
    badge: "",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=260&fit=crop",
  },
  {
    id: "4",
    name: "Burger Barn",
    cuisine: "American • Burgers",
    rating: 4.2,
    reviews: 156,
    time: "15-25 mins",
    fee: "₹40",
    open: false,
    badge: "",
    img: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=260&fit=crop",
  },
  {
    id: "5",
    name: "Biryani House",
    cuisine: "Indian • Biryani",
    rating: 4.8,
    reviews: 521,
    time: "35-45 mins",
    fee: "₹30",
    open: true,
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=260&fit=crop",
  },
  {
    id: "6",
    name: "The Cake Studio",
    cuisine: "Desserts • Bakery",
    rating: 4.7,
    reviews: 203,
    time: "20-30 mins",
    fee: "₹60",
    open: true,
    badge: "",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=260&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Food Lover",
    text: "FoodHub has completely changed how I order food. Incredible variety and always on time!",
    stars: 5,
    avatar: "PS",
  },
  {
    name: "Raj Kumar",
    role: "Restaurant Owner",
    text: "This platform helped my restaurant reach thousands of new customers. Highly recommended!",
    stars: 5,
    avatar: "RK",
  },
  {
    name: "Anjali Patel",
    role: "Busy Professional",
    text: "Perfect for my schedule. Hot food delivered on time, every single time. Total game changer.",
    stars: 4,
    avatar: "AP",
  },
];

const NAV_LINKS = ["Home", "Categories", "Restaurants", "About"];

// ─── Keyframe CSS ──────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatBob {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-14px) rotate(-2deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(255,204,0,0.5); }
    70%  { box-shadow: 0 0 0 20px rgba(255,204,0,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,204,0,0); }
  }
  .fade-up  { animation: fadeUp 0.65s ease both; }
  .delay-1  { animation-delay: 0.12s; }
  .delay-2  { animation-delay: 0.24s; }
  .delay-3  { animation-delay: 0.36s; }
  .delay-4  { animation-delay: 0.48s; }
  .float-img{ animation: floatBob 5s ease-in-out infinite; }

  .cat-card:hover .cat-img { transform: scale(1.08); }
  .rest-card:hover          { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.13) !important; }
  .rest-card                { transition: transform 0.25s, box-shadow 0.25s; }
  .rest-img                 { transition: transform 0.4s ease; }
  .rest-card:hover .rest-img{ transform: scale(1.05); }
  .feat-card:hover          { border-color: #FFCC00 !important; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(255,204,0,0.12) !important; }
  .feat-card                { transition: all 0.25s; }

  /* Responsive: hide desktop nav links on mobile */
  @media (max-width: 899px) {
    .nav-desktop-links { display: none !important; }
    .nav-desktop-auth  { display: none !important; }
    .nav-hamburger     { display: flex !important; }
  }
  @media (min-width: 900px) {
    .nav-hamburger { display: none !important; }
  }
`;

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: "#FFCC00",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: "uppercase",
        mb: 1,
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      {text}
    </Typography>
  );
}

function SectionUnderline() {
  return (
    <Box
      sx={{
        width: 44,
        height: 3,
        bgcolor: "#FFCC00",
        borderRadius: 2,
        mx: "auto",
        mt: 1,
        mb: 6,
      }}
    />
  );
}

function CategoryCircle({
  cat,
  selected,
  onClick,
}: {
  cat: (typeof CATEGORIES)[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      className="cat-card"
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.2,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box
        sx={{
          width: { xs: 80, sm: 100, md: 110 },
          height: { xs: 80, sm: 100, md: 110 },
          borderRadius: "50%",
          overflow: "hidden",
          border: selected ? "3px solid #FFCC00" : "3px solid transparent",
          boxShadow: selected
            ? "0 0 0 4px rgba(255,204,0,0.25)"
            : "0 4px 20px rgba(0,0,0,0.1)",
          transition: "border-color 0.2s, box-shadow 0.2s",
          bgcolor: "#f0f0f0",
        }}
      >
        <img
          src={cat.img}
          alt={cat.label}
          className="cat-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.35s",
          }}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: { xs: 12, md: 14 },
            color: "#1a1a1a",
          }}
        >
          {cat.label}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#999", mt: "2px" }}>
          {cat.count}
        </Typography>
      </Box>
    </Box>
  );
}

function RestaurantCard({ r }: { r: (typeof RESTAURANTS)[0] }) {
  return (
    <Paper
      className="rest-card"
      elevation={1}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 180, md: 200 },
          overflow: "hidden",
        }}
      >
        <img
          src={r.img}
          alt={r.name}
          className="rest-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {!r.open && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: 2,
              }}
            >
              CLOSED
            </Typography>
          </Box>
        )}
        {r.badge && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "#FFCC00",
              color: "#1a1a1a",
              fontSize: 11,
              fontWeight: 700,
              px: 1.5,
              py: 0.5,
              borderRadius: 20,
              letterSpacing: 0.5,
            }}
          >
            {r.badge}
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(0,0,0,0.65)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 13 }} /> {r.time}
        </Box>
      </Box>
      <Box sx={{ p: "16px 18px 18px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 0.75,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: 14, md: 16 },
              color: "#1a1a1a",
            }}
          >
            {r.name}
          </Typography>
          <Box
            sx={{
              bgcolor: r.rating >= 4.5 ? "#22c55e" : "#eab308",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
              px: 1,
              py: 0.4,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              flexShrink: 0,
              ml: 1,
            }}
          >
            <StarIcon sx={{ fontSize: 12 }} /> {r.rating}
          </Box>
        </Box>
        <Typography sx={{ fontSize: 13, color: "#888", mb: 1.25 }}>
          {r.cuisine}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 12, color: "#bbb" }}>
            {r.reviews} reviews
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#555", fontWeight: 500 }}>
            Delivery: {r.fee}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim())
      navigate(`/restaurants?search=${encodeURIComponent(search)}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAVBAR ── always solid black ── */}
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          bgcolor: "#000000",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          px: { xs: 2, sm: 3, md: "5%" },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            height: { xs: 60, md: 68 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ flexShrink: 0 }}
          >
            <Typography sx={{ fontSize: { xs: 20, md: 24 } }}>🍴</Typography>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: 18, md: 20 },
                fontWeight: 800,
                color: "#fff",
                letterSpacing: -0.5,
              }}
            >
              Meal
              <Box component="span" sx={{ color: "#FFCC00" }}>
                Verse
              </Box>
            </Typography>
          </Stack>

          {/* Desktop Nav Links */}
          <Stack
            className="nav-desktop-links"
            direction="row"
            gap={{ md: 3, lg: 4 }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {NAV_LINKS.map((link) => (
              <Typography
                key={link}
                component="a"
                href={`#${link.toLowerCase()}`}
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                  "&:hover": { color: "#FFCC00" },
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>

          {/* Desktop Auth Buttons */}
          <Stack
            className="nav-desktop-auth"
            direction="row"
            gap={1.5}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" }, flexShrink: 0 }}
          >
            {/* Sign In — outlined white border, white text */}
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.5)",
                fontSize: 13,
                px: 2.5,
                py: 0.9,
                borderRadius: 50,
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#FFCC00",
                  color: "#FFCC00",
                  bgcolor: "transparent",
                },
              }}
            >
              Sign In
            </Button>

            {/* Register — solid yellow */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 2.8,
                py: 0.9,
                fontSize: 13,
                bgcolor: "#FFCC00",
                color: "#1a1a1a",
                fontWeight: 700,
                "&:hover": { bgcolor: "#e6b800" },
              }}
            >
              Register
            </Button>
          </Stack>

          {/* Hamburger — mobile only */}
          <IconButton
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#fff",
              ml: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#0d0d0d",
            width: 280,
            px: 3,
            py: 3,
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Meal
            <Box component="span" sx={{ color: "#FFCC00" }}>
              Verse
            </Box>
          </Typography>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Nav Links */}
        <List disablePadding>
          {NAV_LINKS.map((link) => (
            <ListItem
              key={link}
              component="a"
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              sx={{
                px: 0,
                py: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                "&:hover .drawer-link": { color: "#FFCC00" },
              }}
            >
              <Typography
                className="drawer-link"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Auth Buttons in Drawer */}
        <Stack gap={1.5} sx={{ mt: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.4)",
              py: 1.2,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 50,
              "&:hover": {
                borderColor: "#FFCC00",
                color: "#FFCC00",
                bgcolor: "transparent",
              },
            }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#FFCC00",
              color: "#1a1a1a",
              py: 1.2,
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 50,
              "&:hover": { bgcolor: "#e6b800" },
            }}
          >
            Register
          </Button>
        </Stack>
      </Drawer>

      {/* ── HERO ── */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1c1200 60%, #0f0f0f 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          pt: { xs: "80px", md: "100px" },
          pb: { xs: 8, md: 8 },
          px: { xs: 2, sm: 3, md: "5%" },
        }}
      >
        {/* Glow orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "4%",
            width: { xs: 200, md: 480 },
            height: { xs: 200, md: 480 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,204,0,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-8%",
            left: "-4%",
            width: { xs: 180, md: 360 },
            height: { xs: 180, md: 360 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,100,100,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            gap: { xs: 4, md: 5 },
            width: "100%",
            position: "relative",
            zIndex: 1,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: 560 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              className="fade-up"
              sx={{
                color: "#FFCC00",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                mb: 2.5,
              }}
            >
              LEARN HOW TO MAKE
            </Typography>

            <Typography
              className="fade-up delay-1"
              variant="h1"
              sx={{
                fontSize: { xs: "30px", sm: "40px", md: "56px" },
                color: "#fff",
                lineHeight: 1.12,
                mb: 2.5,
                letterSpacing: -1,
              }}
            >
              Order Healthy and Fresh{" "}
              <Box component="span" sx={{ color: "#FFCC00" }}>
                Food
              </Box>{" "}
              Any Time
            </Typography>

            <Typography
              className="fade-up delay-2"
              sx={{
                color: "rgba(255,255,255,0.58)",
                fontSize: { xs: 14, md: 16 },
                lineHeight: 1.75,
                mb: 5,
                maxWidth: 440,
                mx: { xs: "auto", md: 0 },
              }}
            >
              Discover the best restaurants near you. Fast delivery, fresh
              ingredients, and incredible flavours — all at your fingertips.
            </Typography>

            {/* Search bar */}
            <Paper
              className="fade-up delay-3"
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                maxWidth: 540,
                borderRadius: { xs: 2, sm: 2 },
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  px: 2.5,
                  py: "12px",
                  borderRight: { xs: "none", sm: "1px solid #f0f0f0" },
                  borderBottom: { xs: "1px solid #f0f0f0", sm: "none" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#aaa",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Keyword
                </Typography>
                <InputBase
                  placeholder="Pizza, Burger..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  sx={{ fontSize: 13, color: "#333", width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  px: 2.5,
                  py: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  borderBottom: { xs: "1px solid #f0f0f0", sm: "none" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#aaa",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Location
                </Typography>
                <InputBase
                  placeholder="Select a Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{ fontSize: 13, color: "#333", width: "100%" }}
                  startAdornment={
                    <LocationOnIcon
                      sx={{ fontSize: 14, color: "#ccc", mr: 0.5 }}
                    />
                  }
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{
                  borderRadius: 0,
                  px: 3.5,
                  fontSize: 14,
                  flexShrink: 0,
                  py: { xs: 1.5, sm: "auto" },
                }}
              >
                Search
              </Button>
            </Paper>

            {/* Stats row */}
            <Stack
              className="fade-up delay-4"
              direction="row"
              gap={{ xs: 3, md: 5 }}
              sx={{
                mt: 5.5,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {[
                ["500+", "Restaurants"],
                ["50K+", "Happy Users"],
                ["30 min", "Avg Delivery"],
              ].map(([n, l]) => (
                <Box key={l}>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: 20, md: 26 },
                      fontWeight: 700,
                      color: "#fff",
                      mb: "2px",
                    }}
                  >
                    {n}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: 0.5,
                    }}
                  >
                    {l}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right — circular food image (hidden on xs) */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className="float-img" sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 480,
                  height: 480,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,204,0,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=480&h=480&fit=crop"
                alt="Hero Burger"
                sx={{
                  width: 420,
                  height: 420,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "5px solid rgba(255,204,0,0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  bottom: 48,
                  left: -28,
                  borderRadius: 2.5,
                  p: "12px 16px",
                  display: "flex",
                  gap: 1.2,
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <Typography sx={{ fontSize: 22 }}>⭐</Typography>
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}
                  >
                    4.9 Rating
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#999" }}>
                    2.4k+ Reviews
                  </Typography>
                </Box>
              </Paper>
              <Box
                sx={{
                  position: "absolute",
                  top: 48,
                  right: -28,
                  bgcolor: "#FFCC00",
                  borderRadius: 2.5,
                  p: "12px 16px",
                  boxShadow: "0 8px 28px rgba(255,204,0,0.35)",
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}
                >
                  🚴 30 mins
                </Typography>
                <Typography sx={{ fontSize: 11, color: "rgba(0,0,0,0.55)" }}>
                  Avg delivery
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── CATEGORIES ── */}
      <Box id="categories" sx={{ bgcolor: "#fff", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionLabel text="TOP FOODS" />
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: 26, md: 40 },
              color: "#1a1a1a",
            }}
          >
            Our Categories
          </Typography>
          <SectionUnderline />

          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
            {CATEGORIES.map((cat) => (
              <Grid
                item
                key={cat.label}
                xs={6}
                sm={3}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CategoryCircle
                  cat={cat}
                  selected={selectedCat === cat.label}
                  onClick={() =>
                    setSelectedCat(selectedCat === cat.label ? null : cat.label)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── FEATURES ── */}
      <Box sx={{ bgcolor: "#fafafa", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionLabel text="WHY CHOOSE US" />
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: 26, md: 40 },
              color: "#1a1a1a",
            }}
          >
            Everything You Love, One App
          </Typography>
          <SectionUnderline />

          <Grid container spacing={3}>
            {FEATURES.map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Paper
                  className="feat-card"
                  elevation={0}
                  onClick={() => navigate(f.path)}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    border: "1.5px solid #ececec",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2.5,
                      bgcolor: alpha(f.color, 0.12),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      color: f.color,
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: { xs: 16, md: 19 },
                      mb: 1,
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, color: "#777", lineHeight: 1.75 }}
                  >
                    {f.desc}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ mt: 2.5 }}
                  >
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}
                    >
                      Learn more
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 16, color: "#1a1a1a" }} />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── PROMO BANNER ── */}
      <Box
        sx={{
          bgcolor: "#0f0f0f",
          py: { xs: 7, md: 10 },
          px: { xs: 2, md: "5%" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              bgcolor: "#1a1a1a",
              borderRadius: 4,
              p: { xs: "32px 24px", md: "48px 56px" },
              border: "1px solid rgba(255,204,0,0.14)",
              position: "relative",
              overflow: "hidden",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -70,
                right: -70,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,204,0,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <Box>
              <Typography
                sx={{
                  color: "#FFCC00",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                LIMITED TIME OFFER
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 24, md: 38 },
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                🎊 Get{" "}
                <Box component="span" sx={{ color: "#FFCC00" }}>
                  50% OFF
                </Box>{" "}
                on
                <br />
                your first order!
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  mt: 1.5,
                  fontSize: { xs: 14, md: 15 },
                }}
              >
                Use code{" "}
                <Box
                  component="strong"
                  sx={{ color: "#FFCC00", letterSpacing: 1, fontWeight: 800 }}
                >
                  MealVerse50
                </Box>{" "}
                at checkout
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 5,
                py: 1.75,
                fontSize: 15,
                flexShrink: 0,
                animation: "pulse-ring 2.5s infinite",
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Order Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── FEATURED RESTAURANTS ── */}
      <Box id="restaurants" sx={{ bgcolor: "#f9f9f6", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionLabel text="TOP RESTAURANTS" />
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: 26, md: 40 },
              color: "#1a1a1a",
            }}
          >
            Most Featured Restaurant
          </Typography>
          <SectionUnderline />

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {RESTAURANTS.map((r) => (
              <Grid item xs={12} sm={6} md={4} key={r.id}>
                <RestaurantCard r={r} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/restaurants")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "#1a1a1a",
                color: "#1a1a1a",
                px: { xs: 4, md: 5 },
                py: 1.5,
                fontSize: { xs: 14, md: 15 },
                "&:hover": {
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  borderColor: "#1a1a1a",
                },
                transition: "all 0.2s",
              }}
            >
              View All Restaurants
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ── */}
      <Box id="about" sx={{ bgcolor: "#fff", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionLabel text="HOW IT WORKS" />
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: 26, md: 40 },
              color: "#1a1a1a",
            }}
          >
            Order in 4 Easy Steps
          </Typography>
          <SectionUnderline />

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {[
              {
                num: "01",
                icon: "🔍",
                title: "Search",
                desc: "Find your favourite restaurant or cuisine near you",
              },
              {
                num: "02",
                icon: "🍽️",
                title: "Browse",
                desc: "Check out menus and choose exactly what you love",
              },
              {
                num: "03",
                icon: "🛒",
                title: "Order",
                desc: "Add items to cart and head to secure checkout",
              },
              {
                num: "04",
                icon: "😋",
                title: "Enjoy",
                desc: "Sit back, relax and wait for hot food to arrive",
              },
            ].map((step, i) => (
              <Grid item xs={6} sm={6} md={3} key={step.num}>
                <Box sx={{ textAlign: "center", position: "relative" }}>
                  <Box
                    sx={{
                      width: { xs: 60, md: 72 },
                      height: { xs: 60, md: 72 },
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1a1a1a, #333)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2.5,
                      fontSize: { xs: 22, md: 28 },
                      position: "relative",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  >
                    {step.icon}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        bgcolor: "#FFCC00",
                        color: "#1a1a1a",
                        fontSize: 10,
                        fontWeight: 800,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {i + 1}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: { xs: 15, md: 17 },
                      color: "#1a1a1a",
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      color: "#999",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── TESTIMONIALS ── */}
      <Box sx={{ bgcolor: "#0f0f0f", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionLabel text="HAPPY CUSTOMERS" />
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: 26, md: 40 },
              color: "#fff",
            }}
          >
            What Our Users Say
          </Typography>
          <Box
            sx={{
              width: 44,
              height: 3,
              bgcolor: "#FFCC00",
              borderRadius: 2,
              mx: "auto",
              mt: 1,
              mb: 6,
            }}
          />

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {TESTIMONIALS.map((t) => (
              <Grid item xs={12} sm={6} md={4} key={t.name}>
                <Box
                  sx={{
                    bgcolor: "#1a1a1a",
                    borderRadius: 3,
                    p: { xs: "24px 20px", md: "32px 28px" },
                    border: "1px solid rgba(255,255,255,0.06)",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: 16,
                      fontSize: 80,
                      opacity: 0.04,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </Typography>
                  <Stack direction="row" gap={0.5} mb={2}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ fontSize: 18, color: "#FFCC00" }}
                      />
                    ))}
                  </Stack>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.72)",
                      fontSize: { xs: 14, md: 15 },
                      lineHeight: 1.75,
                      mb: 3,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.text}"
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: "#FFCC00",
                        color: "#1a1a1a",
                        fontWeight: 700,
                        fontSize: 14,
                        width: 44,
                        height: 44,
                      }}
                    >
                      {t.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{ fontWeight: 700, fontSize: 14, color: "#fff" }}
                      >
                        {t.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#555" }}>
                        {t.role}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FFCC00 0%, #f0a500 100%)",
          py: { xs: 8, md: 11 },
          textAlign: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: 26, md: 44 }, color: "#1a1a1a", mb: 2 }}
          >
            Ready to order? 🍴
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 15, md: 17 },
              color: "rgba(0,0,0,0.55)",
              mb: 4.5,
            }}
          >
            Thousands of restaurants at your fingertips — delivered in 30
            minutes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/restaurants")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              px: { xs: 4, md: 6 },
              py: 1.75,
              fontSize: { xs: 14, md: 16 },
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              "&:hover": {
                bgcolor: "#333",
                boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
              },
            }}
          >
            Start Ordering
          </Button>
        </Container>
      </Box>

      {/* ── FOOTER ── */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0a0a0a",
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: "5%" },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 5 }} mb={5}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <Typography sx={{ fontSize: 20 }}>🍴</Typography>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  Meal
                  <Box component="span" sx={{ color: "#FFCC00" }}>
                    Verse
                  </Box>
                </Typography>
              </Stack>
              <Typography sx={{ color: "#555", fontSize: 14, lineHeight: 1.8 }}>
                Your favourite food, delivered hot and fresh to your doorstep.
              </Typography>
            </Grid>
            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
              },
              {
                title: "Follow Us",
                links: ["Instagram", "Twitter", "Facebook", "YouTube"],
              },
            ].map((col) => (
              <Grid item xs={6} sm={4} md={2} key={col.title}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    mb: 2,
                    letterSpacing: 0.5,
                  }}
                >
                  {col.title}
                </Typography>
                {col.links.map((link) => (
                  <Typography
                    key={link}
                    component="a"
                    href="#"
                    sx={{
                      display: "block",
                      color: "#555",
                      fontSize: 14,
                      mb: 1.25,
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "#FFCC00" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#333", fontSize: 13 }}>
              © 2026 MealVerse. All rights reserved. Made with ❤️ for food
              lovers.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
