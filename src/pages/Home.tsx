import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, InputBase, Button,
  Grid, Paper, Chip
} from '@mui/material'
import SearchIcon          from '@mui/icons-material/Search'
import DeliveryDiningIcon  from '@mui/icons-material/DeliveryDining'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import EventIcon           from '@mui/icons-material/Event'

const CUISINES = [
  { label: '🍛 Indian',       value: 'Indian' },
  { label: '🍚 Biryani',      value: 'Biryani' },
  { label: '🥢 Chinese',      value: 'Chinese' },
  { label: '🍕 Pizza',        value: 'Pizza' },
  { label: '🍔 Burgers',      value: 'Burgers' },
  { label: '🥞 South Indian', value: 'South Indian' },
  { label: '🍰 Desserts',     value: 'Desserts' },
  { label: '🍝 Italian',      value: 'Italian' },
]

const FEATURES = [
  { icon: <DeliveryDiningIcon  sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Fast Delivery',  desc: 'Order from 100+ restaurants. Food delivered hot in 30 minutes.', path: '/restaurants' },
  { icon: <TableRestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Dine Out',       desc: 'Reserve a table at your favourite restaurant in seconds.',        path: '/restaurants' },
  { icon: <EventIcon           sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Live Events',   desc: 'Food festivals, live music, comedy nights and more.',             path: '/events' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (search.trim()) navigate(`/restaurants?search=${encodeURIComponent(search)}`)
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #c73e2d 0%, #e8392a 50%, #ff8c6b 100%)',
        py: { xs: 8, md: 12 }, px: 2, textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" color="white" fontWeight={700} mb={2}
            sx={{ fontSize: { xs: 28, md: 50 }, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Order food, book a table,<br />
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.85)' }}>discover events</Box>
          </Typography>
          <Typography color="rgba(255,255,255,0.85)" fontSize={{ xs: 15, md: 18 }} mb={5}>
            Delivered hot to your door or reserved at your favourite spot — all in one place.
          </Typography>

          <Paper elevation={0} sx={{
            display: 'flex', alignItems: 'center', maxWidth: 560, mx: 'auto',
            borderRadius: 99, p: '6px 6px 6px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <SearchIcon sx={{ color: 'text.disabled', mr: 1 }} />
            <InputBase
              placeholder="Search restaurants, cuisines..."
              fullWidth sx={{ fontSize: 15 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}
              sx={{ borderRadius: 99, px: 3, py: 1.2, fontSize: 14, whiteSpace: 'nowrap' }}>
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Cuisine chips */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>What are you craving?</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {CUISINES.map(c => (
            <Chip
              key={c.value} label={c.label}
              onClick={() => navigate(`/restaurants?cuisine=${c.value}`)}
              sx={{
                fontSize: 14, py: 2.5, px: 1, bgcolor: 'white',
                border: '1.5px solid', borderColor: 'divider', cursor: 'pointer',
                '&:hover': { bgcolor: '#fff5f4', borderColor: 'primary.main', color: 'primary.main' },
              }}
            />
          ))}
        </Box>

        {/* Feature cards */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {FEATURES.map(f => (
            <Grid item xs={12} md={4} key={f.title}>
              <Paper elevation={0} sx={{
                p: 3, borderRadius: 3, border: '1.5px solid', borderColor: 'divider',
                cursor: 'pointer', transition: 'all 0.3s',
                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(232,57,42,0.1)' },
              }} onClick={() => navigate(f.path)}>
                <Box mb={1.5}>{f.icon}</Box>
                <Typography fontWeight={600} fontSize={18} mb={0.8}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
