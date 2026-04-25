// src/components/ui/TailwindComponents.tsx
// Reusable Tailwind CSS Components for FoodHub

import React from "react";

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-full transition-all duration-200 font-poppins";

  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-orange-400 hover:bg-orange-500 text-white shadow-md hover:shadow-lg",
    tertiary: "border-2 border-red-600 text-red-600 hover:bg-red-50",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledStyles =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";
  const fullWidthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${fullWidthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "⏳ Loading..." : children}
    </button>
  );
};

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
}) => {
  const hoverClass = hoverable
    ? "hover:shadow-lg hover:scale-102 cursor-pointer"
    : "";
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-card transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

interface RestaurantCardProps {
  image: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  isOpen?: boolean;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  image,
  name,
  cuisine,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  isOpen = true,
}) => {
  return (
    <Card hoverable className="overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        {!isOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold">Closed</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{cuisine}</p>

        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-amber-500 font-semibold">★ {rating}</span>
            <span className="text-gray-500 text-xs">({reviewCount})</span>
          </div>
          <span className="text-gray-600 text-xs font-medium">
            {deliveryTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{deliveryFee}</span>
          <Button size="sm" variant="primary">
            Order
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ============================================================================
// SEARCH BAR COMPONENT
// ============================================================================

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  icon?: React.ReactNode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search restaurants, cuisines...",
  onSearch,
  icon = "🔍",
}) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg p-1.5 max-w-2xl mx-auto">
      <span className="px-4 text-gray-400 text-lg">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-base py-2"
      />
      <Button
        size="md"
        variant="primary"
        className="rounded-full mr-1"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

// ============================================================================
// CHIP/TAG COMPONENT
// ============================================================================

interface ChipProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  selected?: boolean;
  variant?: "default" | "filter";
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  onClick,
  selected = false,
  variant = "default",
}) => {
  const baseClass =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer";

  const variants = {
    default: selected
      ? "bg-red-600 text-white border-2 border-red-600"
      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-600 hover:text-red-600",
    filter: selected
      ? "bg-red-100 text-red-700 border-2 border-red-600"
      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-red-600",
  };

  return (
    <button onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

// ============================================================================
// RATING & BADGE COMPONENTS
// ============================================================================

interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  reviewCount = 0,
  showCount = false,
}) => (
  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg">
    <span className="text-amber-500 font-semibold">★ {rating.toFixed(1)}</span>
    {showCount && (
      <span className="text-gray-600 text-sm">({reviewCount})</span>
    )}
  </div>
);

interface StatusBadgeProps {
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-green-100 text-green-800",
    delivered: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ============================================================================
// HERO SECTION COMPONENT
// ============================================================================

interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  backgroundGradient?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  children,
  backgroundGradient = "from-red-600 via-red-500 to-orange-400",
}) => {
  return (
    <section
      className={`relative bg-gradient-to-br ${backgroundGradient} py-20 md:py-28 px-4 overflow-hidden`}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -ml-36 -mb-36"></div>

      <div className="container mx-auto relative z-10 text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight font-poppins">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
};

// ============================================================================
// FEATURE CARD COMPONENT
// ============================================================================

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => (
  <Card className="p-6 hover:shadow-lg cursor-pointer" hoverable>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
    <Button size="sm" variant="tertiary" onClick={onClick} className="w-full">
      Learn More →
    </Button>
  </Card>
);

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        )}
        <input
          className={`w-full px-4 py-2 ${icon ? "pl-10" : ""} border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition-colors ${error ? "border-red-500" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    <textarea
      className={`w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition-colors ${error ? "border-red-500" : ""} ${className}`}
      {...props}
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

// ============================================================================
// MODAL/DIALOG COMPONENT
// ============================================================================

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="mb-6 text-gray-700">{children}</div>

          <div className="flex gap-3 justify-end">
            <Button variant="tertiary" onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button variant="primary" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============================================================================
// TOAST/NOTIFICATION COMPONENT
// ============================================================================

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
    warning: "bg-amber-100 text-amber-800 border-amber-300",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg border-l-4 shadow-lg ${typeStyles[type]} z-50 animation-slideIn`}
    >
      {message}
    </div>
  );
};

// ============================================================================
// SKELETON LOADER COMPONENT
// ============================================================================

export const SkeletonCard: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <div className="w-full h-40 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </Card>
    ))}
  </>
);

// ============================================================================
// QUANTITY SELECTOR COMPONENT
// ============================================================================

interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantityProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
}) => (
  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
    <button
      onClick={() => value > min && onChange(value - 1)}
      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
    >
      −
    </button>
    <span className="w-8 text-center font-semibold">{value}</span>
    <button
      onClick={() => value < max && onChange(value + 1)}
      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
    >
      +
    </button>
  </div>
);

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md">{description}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);

// ============================================================================
// DIVIDER COMPONENT
// ============================================================================

export const Divider: React.FC<{ className?: string }> = ({
  className = "",
}) => <hr className={`border-gray-200 ${className}`} />;

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
}) => {
  const variants = {
    primary: "bg-red-100 text-red-800",
    secondary: "bg-orange-100 text-orange-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`font-semibold rounded-full ${variants[variant]} ${sizes[size]}`}
    >
      {label}
    </span>
  );
};
