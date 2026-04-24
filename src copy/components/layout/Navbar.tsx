import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Avatar, Menu, MenuItem, Chip } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StarIcon         from '@mui/icons-material/Star'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount }    = useCart()
  const navigate         = useNavigate()
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'white' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>

        <Typography variant="h6" fontWeight={700} color="primary" sx={{ cursor: 'pointer', mr: 4, fontSize: 22 }} onClick={() => navigate('/')}>
          🍔 FoodHub
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flex: 1 }}>
          {[{ label: 'Restaurants', path: '/restaurants' }, { label: 'Events', path: '/events' }, { label: 'My Orders', path: '/orders' }, { label: 'Bookings', path: '/bookings' }].map(l => (
            <Button key={l.path} component={Link} to={l.path} sx={{ color: 'text.secondary', fontWeight: 500 }}>{l.label}</Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
          <IconButton onClick={() => navigate('/cart')} color="primary" sx={{ bgcolor: 'rgba(232,57,42,0.06)' }}>
            <Badge badgeContent={itemCount} color="primary"><ShoppingCartIcon /></Badge>
          </IconButton>

          {user ? (
            <>
              <Chip icon={<StarIcon sx={{ fontSize: 14, color: '#f59e0b !important' }} />} label={`${user.points} pts`} size="small" sx={{ bgcolor: '#fff7ed', color: '#c2410c', fontWeight: 600 }} />
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', cursor: 'pointer', fontSize: 14, fontWeight: 700 }} onClick={e => setAnchor(e.currentTarget)}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => { navigate('/profile');  setAnchor(null) }}>Profile</MenuItem>
                <MenuItem onClick={() => { navigate('/orders');   setAnchor(null) }}>My Orders</MenuItem>
                <MenuItem onClick={() => { logout(); navigate('/'); setAnchor(null) }} sx={{ color: 'error.main' }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/register')}>Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
