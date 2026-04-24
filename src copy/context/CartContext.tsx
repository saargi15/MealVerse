import { createContext, useContext, useState, ReactNode } from 'react'
import type { CartItem, MenuItem } from '../types'

interface CartContextType {
  cart: CartItem[]; restaurantId: string | null
  addItem:   (item: MenuItem, restId: string) => boolean
  removeItem:(id: string) => void
  clearCart: () => void
  total: number; itemCount: number
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart,         setCart]         = useState<CartItem[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)

  const addItem = (item: MenuItem, restId: string): boolean => {
    if (restaurantId && restaurantId !== restId) return false
    setRestaurantId(restId)
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id)
      if (existing) return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1, restaurantId: restId }]
    })
    return true
  }

  const removeItem = (id: string) => {
    setCart(prev => {
      const updated = prev.map(i => i._id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0)
      if (updated.length === 0) setRestaurantId(null)
      return updated
    })
  }

  const clearCart = () => { setCart([]); setRestaurantId(null) }
  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, restaurantId, addItem, removeItem, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
