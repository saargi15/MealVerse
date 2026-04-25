import { Routes, Route } from 'react-router-dom'
import Layout           from './components/layout/Layout'
import Home             from './pages/Home'
import Restaurants      from './pages/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail'
import Cart             from './pages/Cart'
import Orders           from './pages/Orders'
import Bookings         from './pages/Bookings'
import Events           from './pages/Events'
import Login            from './pages/Login'
import Register         from './pages/Register'
import Profile          from './pages/Profile'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/restaurants"     element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/cart"            element={<Cart />} />
        <Route path="/orders"          element={<Orders />} />
        <Route path="/bookings"        element={<Bookings />} />
        <Route path="/events"          element={<Events />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/profile"         element={<Profile />} />
      </Routes>
    </Layout>
  )
}
