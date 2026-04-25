// src/pages/RestaurantsRefactored.tsx
// Complete Restaurants Listing Page Example Using Tailwind CSS

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  SearchBar,
  RestaurantCard,
  SkeletonCard,
  EmptyState,
  Chip,
} from "../components/ui/TailwindComponents";

interface Filter {
  cuisine: string[];
  priceRange: [number, number];
  rating: number;
  isOpen: boolean;
}

// Dummy restaurant data - replace with API calls
const ALL_RESTAURANTS = [
  {
    id: "1",
    name: "Spice Garden",
    image: "https://via.placeholder.com/400x300?text=Spice+Garden",
    cuisine: "Indian • North Indian",
    rating: 4.6,
    reviewCount: 245,
    deliveryTime: "25-35 mins",
    deliveryFee: "₹40",
    isOpen: true,
    priceRange: 300,
  },
  {
    id: "2",
    name: "Pizza Palace",
    image: "https://via.placeholder.com/400x300?text=Pizza+Palace",
    cuisine: "Italian • Pizza",
    rating: 4.3,
    reviewCount: 189,
    deliveryTime: "20-30 mins",
    deliveryFee: "₹50",
    isOpen: true,
    priceRange: 350,
  },
  {
    id: "3",
    name: "Dragon Wok",
    image: "https://via.placeholder.com/400x300?text=Dragon+Wok",
    cuisine: "Chinese • Asian",
    rating: 4.5,
    reviewCount: 312,
    deliveryTime: "30-40 mins",
    deliveryFee: "₹30",
    isOpen: true,
    priceRange: 280,
  },
  {
    id: "4",
    name: "Burger Barn",
    image: "https://via.placeholder.com/400x300?text=Burger+Barn",
    cuisine: "American • Burgers",
    rating: 4.2,
    reviewCount: 156,
    deliveryTime: "15-25 mins",
    deliveryFee: "₹40",
    isOpen: false,
    priceRange: 250,
  },
  {
    id: "5",
    name: "Sushi Master",
    image: "https://via.placeholder.com/400x300?text=Sushi+Master",
    cuisine: "Japanese • Sushi",
    rating: 4.7,
    reviewCount: 428,
    deliveryTime: "35-45 mins",
    deliveryFee: "₹60",
    isOpen: true,
    priceRange: 450,
  },
  {
    id: "6",
    name: "Taco Fiesta",
    image: "https://via.placeholder.com/400x300?text=Taco+Fiesta",
    cuisine: "Mexican • Tacos",
    rating: 4.1,
    reviewCount: 201,
    deliveryTime: "20-30 mins",
    deliveryFee: "₹35",
    isOpen: true,
    priceRange: 200,
  },
];

const CUISINES = [
  { label: "🍛 Indian", value: "Indian" },
  { label: "🍕 Pizza", value: "Pizza" },
  { label: "🥢 Chinese", value: "Chinese" },
  { label: "🍔 Burgers", value: "Burgers" },
  { label: "🍣 Sushi", value: "Sushi" },
  { label: "🌮 Mexican", value: "Mexican" },
];

export default function RestaurantsRefactored() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState(ALL_RESTAURANTS);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(ALL_RESTAURANTS);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<Filter>({
    cuisine: searchParams.getAll("cuisine") || [],
    priceRange: [100, 500],
    rating: 0,
    isOpen: false,
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Apply filters
  useEffect(() => {
    let filtered = [...restaurants];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Cuisine filter
    if (filters.cuisine.length > 0) {
      filtered = filtered.filter((r) =>
        filters.cuisine.some((c) => r.cuisine.includes(c)),
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (r) =>
        r.priceRange >= filters.priceRange[0] &&
        r.priceRange <= filters.priceRange[1],
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((r) => r.rating >= filters.rating);
    }

    // Open status filter
    if (filters.isOpen) {
      filtered = filtered.filter((r) => r.isOpen);
    }

    setFilteredRestaurants(filtered);
  }, [filters, search, restaurants]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setSearchParams({ search: query });
  };

  const handleCuisineToggle = (value: string) => {
    const updated = filters.cuisine.includes(value)
      ? filters.cuisine.filter((c) => c !== value)
      : [...filters.cuisine, value];

    setFilters({ ...filters, cuisine: updated });
  };

  const handlePriceChange = (value: number, type: "min" | "max") => {
    const [min, max] = filters.priceRange;
    setFilters({
      ...filters,
      priceRange: type === "min" ? [value, max] : [min, value],
    });
  };

  const handleRatingChange = (value: number) => {
    setFilters({ ...filters, rating: value });
  };

  const handleOpenToggle = () => {
    setFilters({ ...filters, isOpen: !filters.isOpen });
  };

  const clearFilters = () => {
    setFilters({
      cuisine: [],
      priceRange: [100, 500],
      rating: 0,
      isOpen: false,
    });
    setSearch("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* ===== HEADER ===== */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container-fluid py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🍴 Browse Restaurants
          </h1>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search restaurants or cuisines..."
            onSearch={handleSearch}
            icon="🔍"
          />

          {/* Mobile Filter Toggle */}
          <div className="mt-4 md:hidden">
            <Button
              fullWidth
              variant="tertiary"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "✕ Hide Filters" : "⚙️ Show Filters"}
            </Button>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-fluid py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ===== SIDEBAR FILTERS ===== */}
          <div
            className={`md:col-span-1 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Cuisine Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Cuisine
                </h4>
                <div className="space-y-2">
                  {CUISINES.map((cuisine) => (
                    <label
                      key={cuisine.value}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={filters.cuisine.includes(cuisine.value)}
                        onChange={() => handleCuisineToggle(cuisine.value)}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-sm text-gray-700">
                        {cuisine.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Min: ₹{filters.priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="500"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange(parseInt(e.target.value), "min")
                      }
                      className="w-full accent-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Max: ₹{filters.priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange(parseInt(e.target.value), "max")
                      }
                      className="w-full accent-red-600"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Rating
                </h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-sm text-gray-700">
                        {rating > 0 ? `${rating}+ ★` : "All Ratings"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Open Status Filter */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isOpen}
                    onChange={handleOpenToggle}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Open Now
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ===== RESTAURANT GRID ===== */}
          <div className="md:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredRestaurants.length}
                </span>{" "}
                restaurants found
              </p>

              {/* Sort Dropdown (Optional) */}
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600 text-sm">
                <option>Recommended</option>
                <option>Rating: High to Low</option>
                <option>Delivery Time: Short to Long</option>
                <option>Price: Low to High</option>
              </select>
            </div>

            {/* Empty State */}
            {filteredRestaurants.length === 0 && !loading && (
              <EmptyState
                icon="🔍"
                title="No Restaurants Found"
                description="Try adjusting your filters or search for a different cuisine"
                action={{
                  label: "Clear Filters",
                  onClick: clearFilters,
                }}
              />
            )}

            {/* Restaurant Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard count={6} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    image={restaurant.image}
                    name={restaurant.name}
                    cuisine={restaurant.cuisine}
                    rating={restaurant.rating}
                    reviewCount={restaurant.reviewCount}
                    deliveryTime={restaurant.deliveryTime}
                    deliveryFee={restaurant.deliveryFee}
                    isOpen={restaurant.isOpen}
                  />
                ))}
              </div>
            )}

            {/* Pagination (Optional) */}
            {filteredRestaurants.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button variant="tertiary" className="px-4">
                  ← Prev
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <button
                      key={i}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        i === 0
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button variant="tertiary" className="px-4">
                  Next →
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
