import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Typography, Grid, Box, Chip, CircularProgress, Alert } from '@mui/material'
import RestaurantCard from '../components/ui/RestaurantCard'
import { restaurantAPI } from '../api'
import type { Restaurant } from '../types'

const CUISINES = ['All', 'Indian', 'Biryani', 'Chinese', 'Pizza', 'Burgers', 'South Indian', 'Italian', 'Desserts']

const DEMO: Restaurant[] = [
  { _id: 'r1', name: 'Spice Garden',  cuisine: ['Indian', 'Biryani'],    rating: 4.5, deliveryTime: '25-35 min', minOrder: 150, city: 'Chennai',    address: 'Anna Nagar, Chennai',    isOpen: true,  menu: [], tableCapacity: 20 },
  { _id: 'r2', name: 'Pizza Palace',  cuisine: ['Italian', 'Pizza'],     rating: 4.2, deliveryTime: '30-40 min', minOrder: 199, city: 'Mumbai',     address: 'Bandra West, Mumbai',    isOpen: true,  menu: [], tableCapacity: 30 },
  { _id: 'r3', name: 'Dragon Wok',    cuisine: ['Chinese'],              rating: 4.0, deliveryTime: '35-45 min', minOrder: 120, city: 'Bengaluru',  address: 'Koramangala, Bengaluru', isOpen: true,  menu: [], tableCapacity: 25 },
  { _id: 'r4', name: 'Burger Barn',   cuisine: ['Burgers', 'Fast Food'], rating: 4.3, deliveryTime: '20-30 min', minOrder: 99,  city: 'Chennai',    address: 'T Nagar, Chennai',       isOpen: true,  menu: [], tableCapacity: 20 },
  { _id: 'r5', name: 'South Spice',   cuisine: ['South Indian'],         rating: 4.6, deliveryTime: '20-30 min', minOrder: 80,  city: 'Coimbatore', address: 'RS Puram, Coimbatore',   isOpen: true,  menu: [], tableCapacity: 15 },
  { _id: 'r6', name: 'Sweet Tooth',   cuisine: ['Desserts'],             rating: 4.4, deliveryTime: '25-35 min', minOrder: 99,  city: 'Chennai',    address: 'Nungambakkam, Chennai',  isOpen: false, menu: [], tableCapacity: 10 },
]

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading,     setLoading]     = useState(true)
  const [cuisine,     setCuisine]     = useState('All')
  const [searchParams]                = useSearchParams()

  const searchQ  = searchParams.get('search')  || ''
  const cuisineQ = searchParams.get('cuisine') || ''

  useEffect(() => { if (cuisineQ) setCuisine(cuisineQ) }, [cuisineQ])

  useEffect(() => {
    setLoading(true)
    restaurantAPI.getAll({ search: searchQ, cuisine: cuisine === 'All' ? '' : cuisine })
      .then(res => setRestaurants(res.data))
      .catch(() => {
        const filtered = DEMO.filter(r =>
          (cuisine === 'All' || r.cuisine.some(c => c === cuisine)) &&
          (!searchQ || r.name.toLowerCase().includes(searchQ.toLowerCase()))
        )
        setRestaurants(filtered)
      })
      .finally(() => setLoading(false))
  }, [cuisine, searchQ])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        {searchQ ? `Results for "${searchQ}"` : cuisine !== 'All' ? `${cuisine} Restaurants` : 'All Restaurants'}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {restaurants.length} restaurants found
      </Typography>

      {/* Filter chips */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {CUISINES.map(c => (
          <Chip key={c} label={c} onClick={() => setCuisine(c)}
            color={cuisine === c ? 'primary' : 'default'}
            variant={cuisine === c ? 'filled' : 'outlined'}
            sx={{ fontWeight: 500, cursor: 'pointer' }}
          />
        ))}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
      ) : restaurants.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography fontSize={48} mb={2}>🍽️</Typography>
          <Typography variant="h6" fontWeight={600} mb={1}>No restaurants found</Typography>
          <Typography color="text.secondary">Try a different cuisine or search term</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {restaurants.map(r => (
            <Grid item xs={12} sm={6} md={4} key={r._id}>
              <RestaurantCard restaurant={r} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
