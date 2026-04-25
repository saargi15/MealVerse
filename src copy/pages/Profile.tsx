import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Paper, Avatar, Chip, LinearProgress, Button, Grid, Divider } from '@mui/material'
import StarIcon    from '@mui/icons-material/Star'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import { useAuth }  from '../context/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { if (!user) navigate('/login') }, [user])
  if (!user) return null

  const progress = Math.min(((user.points || 0) / 500) * 100, 100)
  const remaining = Math.max(500 - (user.points || 0), 0)

  return (
    <Container maxWidth="sm" sx={{ py:4 }}>
      {/* Profile card */}
      <Paper variant="outlined" sx={{ p:3, borderRadius:3, textAlign:'center', mb:3 }}>
        <Avatar sx={{ width:72, height:72, bgcolor:'primary.main', fontSize:28, fontWeight:700, mx:'auto', mb:2 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight={700} mb={0.5}>{user.name}</Typography>
        <Typography color="text.secondary" fontSize={14}>{user.email}</Typography>
        {user.phone && <Typography color="text.secondary" fontSize={14}>{user.phone}</Typography>}
      </Paper>

      {/* Points */}
      <Paper variant="outlined" sx={{ p:3, borderRadius:3, mb:3 }}>
        <Typography fontWeight={600} mb={2} textTransform="uppercase" letterSpacing={1} fontSize={13} color="text.secondary">Reward Points</Typography>
        <Box sx={{ display:'flex', alignItems:'baseline', gap:1, mb:1.5 }}>
          <StarIcon sx={{ color:'#f59e0b', fontSize:28 }} />
          <Typography fontSize={36} fontWeight={800} color="warning.dark">{user.points || 0}</Typography>
          <Typography color="text.secondary">points</Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} color="warning"
          sx={{ height:8, borderRadius:99, mb:1, bgcolor:'#fef3c7' }} />
        <Typography variant="caption" color="text.secondary">
          {remaining > 0 ? `${remaining} more points to reach VIP status` : '🎉 You have reached VIP status!'}
        </Typography>
      </Paper>

      {/* Badges */}
      {user.badges?.length > 0 && (
        <Paper variant="outlined" sx={{ p:3, borderRadius:3, mb:3 }}>
          <Typography fontWeight={600} mb={2} textTransform="uppercase" letterSpacing={1} fontSize={13} color="text.secondary">Badges Earned</Typography>
          <Box sx={{ display:'flex', flexWrap:'wrap', gap:1 }}>
            {user.badges.map(b => (
              <Chip key={b} label={`🏅 ${b}`} sx={{ bgcolor:'#fff7ed', color:'#c2410c', border:'1px solid #fed7aa', fontWeight:500 }} />
            ))}
          </Box>
        </Paper>
      )}

      {/* Stats */}
      <Paper variant="outlined" sx={{ p:3, borderRadius:3, mb:3 }}>
        <Typography fontWeight={600} mb={2} textTransform="uppercase" letterSpacing={1} fontSize={13} color="text.secondary">Account</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <ShoppingBagIcon color="primary" />
              <Box>
                <Typography fontWeight={700}>Orders</Typography>
                <Typography variant="body2" color="text.secondary">Track your history</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <TableRestaurantIcon color="primary" />
              <Box>
                <Typography fontWeight={700}>Bookings</Typography>
                <Typography variant="body2" color="text.secondary">Manage reservations</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my:2 }} />
        <Typography variant="body2" color="text.secondary">Member since {new Date().getFullYear()}</Typography>
      </Paper>

      <Button variant="outlined" color="error" fullWidth size="large"
        sx={{ borderRadius:3, py:1.4 }}
        onClick={() => { logout(); navigate('/') }}>
        Logout
      </Button>
    </Container>
  )
}
