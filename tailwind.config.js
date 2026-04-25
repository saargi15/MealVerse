// tailwind.config.js
// FoodHub Brand Design System

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // Brand Colors
      colors: {
        "brand-red": "#e8392a",
        "brand-red-dark": "#c73e2d",
        "brand-red-light": "#ff5c4d",
        "brand-orange": "#ff8c6b",

        // Semantic Colors
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },

      // Typography
      fontFamily: {
        poppins: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },

      fontSize: {
        display: ["48px", { lineHeight: "56px", letterSpacing: "-0.02em" }],
        h1: ["36px", { lineHeight: "44px", letterSpacing: "-0.01em" }],
        h2: ["28px", { lineHeight: "36px" }],
        h3: ["24px", { lineHeight: "32px" }],
        body: ["16px", { lineHeight: "24px" }],
        small: ["14px", { lineHeight: "20px" }],
        tiny: ["12px", { lineHeight: "16px" }],
      },

      // Shadows
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        md: "0 4px 16px rgba(0,0,0,0.10)",
        lg: "0 8px 24px rgba(0,0,0,0.12)",
        xl: "0 12px 32px rgba(0,0,0,0.15)",
      },

      // Border Radius
      borderRadius: {
        sm: "8px",
        base: "12px",
        md: "14px",
        lg: "16px",
        full: "999px",
      },

      // Spacing
      spacing: {
        container: "1200px",
        128: "32rem",
        144: "36rem",
      },

      // Animations
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        slideIn: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },

      // Transforms
      scale: {
        102: "1.02",
        103: "1.03",
      },

      // Gradient
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #c73e2d 0%, #e8392a 50%, #ff8c6b 100%)",
        "subtle-gradient": "linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%)",
      },

      // Opacity
      opacity: {
        4: "0.04",
        8: "0.08",
      },
    },
  },

  plugins: [
    // Custom plugin for responsive grid
    function ({ addComponents, e, theme }) {
      const screens = theme("screens");
      const gridComponents = {
        ".grid-responsive": {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",

          "@screen sm": {
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          },
          "@screen md": {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          "@screen lg": {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
        },

        // Utility classes
        ".container-fluid": {
          "@apply": "w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl",
        },

        ".btn-base": {
          "@apply":
            "font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        },

        ".card-base": {
          "@apply":
            "bg-white rounded-lg border border-gray-200 shadow-card transition-all duration-200",
        },

        ".text-truncate": {
          "@apply": "overflow-hidden text-overflow-ellipsis whitespace-nowrap",
        },
      };

      addComponents(gridComponents);
    },
  ],
};
