import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import AccessTimeIcon    from '@mui/icons-material/AccessTime'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import { useNavigate } from 'react-router-dom'
import type { Restaurant } from '../../types'

const EMOJI: Record<string, string> = { Indian:'🍛', Biryani:'🍚', Chinese:'🥢', Pizza:'🍕', Burgers:'🍔', 'South Indian':'🥞', Desserts:'🍰', Italian:'🍝' }

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const navigate = useNavigate()
  return (
    <Card sx={{ cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' } }} onClick={() => navigate(`/restaurants/${restaurant._id}`)}>
      <Box sx={{ height: 160, bgcolor: '#fff5f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
        {EMOJI[restaurant.cuisine[0]] || '🍽️'}
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography fontWeight={600} fontSize={15}>{restaurant.name}</Typography>
          <Chip label={`⭐ ${restaurant.rating}`} size="small" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: 12 }} />
        </Box>
        <Typography variant="body2" color="text.secondary" mb={1}>{restaurant.cuisine.join(' · ')}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
            <AccessTimeIcon sx={{ fontSize: 14 }} /><Typography variant="caption">{restaurant.deliveryTime}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
            <CurrencyRupeeIcon sx={{ fontSize: 14 }} /><Typography variant="caption">{restaurant.minOrder} min order</Typography>
          </Box>
        </Box>
        {!restaurant.isOpen && <Chip label="Closed" size="small" color="error" variant="outlined" sx={{ mt: 1 }} />}
      </CardContent>
    </Card>
  )
}
