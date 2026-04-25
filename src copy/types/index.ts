export interface User {
  id: string; name: string; email: string; phone?: string
  points: number; badges: string[]; role: 'user' | 'restaurant_owner' | 'admin'
}
export interface AuthResponse { token: string; user: User }
export interface MenuItem {
  _id: string; name: string; description: string; price: number
  category: string; image?: string; isVeg: boolean; available: boolean
}
export interface Restaurant {
  _id: string; name: string; description?: string; cuisine: string[]
  address: string; city: string; phone?: string; image?: string
  rating: number; deliveryTime: string; minOrder: number
  menu: MenuItem[]; tableCapacity: number; isOpen: boolean
}
export interface CartItem extends MenuItem { qty: number; restaurantId: string }
export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
export interface OrderItem { name: string; price: number; qty: number }
export interface Order {
  _id: string; restaurant: { _id: string; name: string; image?: string }
  items: OrderItem[]; totalAmount: number; deliveryAddress: string
  status: OrderStatus; paymentMethod: string; createdAt: string
}
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export interface Booking {
  _id: string; restaurant: { _id: string; name: string; address: string }
  date: string; time: string; guests: number; status: BookingStatus; notes?: string
}
export interface Review {
  _id: string; user: { name: string; badges: string[] }
  rating: number; text: string; tags: string[]; pointsEarned: number; createdAt: string
}
export type EventType = 'live_music' | 'food_festival' | 'comedy' | 'other'
export interface FoodEvent {
  _id: string; title: string; description: string
  restaurant: { _id: string; name: string; address: string }
  date: string; time: string; ticketPrice: number
  totalSeats: number; bookedSeats: number; image?: string; type: EventType
}
