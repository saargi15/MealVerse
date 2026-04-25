import api from './axios'
import type { AuthResponse, Restaurant, Order, Booking, Review, FoodEvent } from '../types'

export const authAPI = {
  login:    (email: string, password: string) => api.post<AuthResponse>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, phone?: string) => api.post<AuthResponse>('/auth/register', { name, email, password, phone }),
  me:       () => api.get('/auth/me'),
}

export const restaurantAPI = {
  getAll:  (params?: { city?: string; cuisine?: string; search?: string }) => api.get<Restaurant[]>('/restaurants', { params }),
  getById: (id: string) => api.get<Restaurant>(`/restaurants/${id}`),
}

export const orderAPI = {
  place:       (data: { restaurant: string; items: { name: string; price: number; qty: number }[]; totalAmount: number; deliveryAddress: string }) => api.post<Order>('/orders', data),
  getMyOrders: () => api.get<Order[]>('/orders/my'),
}

export const bookingAPI = {
  create:        (data: { restaurant: string; date: string; time: string; guests: number; notes?: string }) => api.post<Booking>('/bookings', data),
  getMyBookings: () => api.get<Booking[]>('/bookings/my'),
}

export const reviewAPI = {
  getByRestaurant: (restaurantId: string) => api.get<Review[]>(`/reviews/${restaurantId}`),
  create:          (data: { restaurant: string; rating: number; text: string; tags?: string[] }) =>
    api.post<{ review: Review; pointsEarned: number; totalPoints: number }>('/reviews', data),
}

export const eventAPI = {
  getAll:     () => api.get<FoodEvent[]>('/events'),
  bookTicket: (id: string) => api.post(`/events/${id}/book`),
}
