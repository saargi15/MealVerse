import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Paper, Chip, CircularProgress, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../api'
import type { Order } from '../types'

const STATUS_CONFIG: Record<string, { label: string; color: 'default'|'primary'|'success'|'warning'|'error' }> = {
  placed:           { label: 'Order Placed',      color: 'primary'  },
  confirmed:        { label: 'Confirmed',          color: 'success'  },
  preparing:        { label: 'Preparing',          color: 'warning'  },
  out_for_delivery: { label: 'Out for Delivery',   color: 'primary'  },
  delivered:        { label: 'Delivered',          color: 'success'  },
  cancelled:        { label: 'Cancelled',          color: 'error'    },
}

const DEMO_ORDERS: Order[] = [
  { _id:'o1', restaurant:{ _id:'r1', name:'Spice Garden' }, status:'delivered', totalAmount:438, deliveryAddress:'Chennai', paymentMethod:'COD', createdAt: new Date().toISOString(), items:[{ name:'Chicken Biryani', price:199, qty:2 },{ name:'Mango Lassi', price:79, qty:1 }] },
  { _id:'o2', restaurant:{ _id:'r2', name:'Pizza Palace'  }, status:'preparing', totalAmount:289, deliveryAddress:'Chennai', paymentMethod:'COD', createdAt: new Date().toISOString(), items:[{ name:'Margherita', price:249, qty:1 }] },
]

export default function Orders() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user }  = useAuth()
  const navigate  = useNavigate()

  useEffect(() => {
    if (!user) { setLoading(false); return }
    orderAPI.getMyOrders()
      .then(res => setOrders(res.data))
      .catch(() => setOrders(DEMO_ORDERS))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return (
    <Container maxWidth="sm" sx={{ py:10, textAlign:'center' }}>
      <Typography fontSize={56} mb={2}>📦</Typography>
      <Typography variant="h5" fontWeight={700} mb={1}>Please login</Typography>
      <Typography color="text.secondary" mb={3}>Login to view your order history</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')}>Login</Button>
    </Container>
  )

  if (loading) return <Box sx={{ display:'flex', justifyContent:'center', py:10 }}><CircularProgress /></Box>

  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>My Orders</Typography>
      {orders.length === 0 ? (
        <Box sx={{ textAlign:'center', py:10 }}>
          <Typography fontSize={56} mb={2}>📦</Typography>
          <Typography variant="h6" fontWeight={600} mb={1}>No orders yet</Typography>
          <Typography color="text.secondary" mb={3}>Order something delicious!</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/restaurants')}>Browse Restaurants</Button>
        </Box>
      ) : orders.map(order => {
        const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed
        return (
          <Paper key={order._id} variant="outlined" sx={{ p:2.5, mb:2, borderRadius:3 }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb:1.5 }}>
              <Box>
                <Typography fontWeight={700} fontSize={16}>{order.restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.createdAt).toLocaleDateString('en-IN',{ day:'numeric', month:'short', year:'numeric' })}
                </Typography>
              </Box>
              <Chip label={sc.label} color={sc.color} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
            </Typography>
            <Typography fontWeight={700} color="primary.dark">₹{order.totalAmount}</Typography>
          </Paper>
        )
      })}
    </Container>
  )
}
