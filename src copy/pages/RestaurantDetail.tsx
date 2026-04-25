import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Tabs, Tab,
  Chip, Divider, CircularProgress, IconButton,
  Snackbar, Alert, Paper, Rating, Grid
} from '@mui/material'
import AccessTimeIcon     from '@mui/icons-material/AccessTime'
import LocationOnIcon     from '@mui/icons-material/LocationOn'
import AddIcon            from '@mui/icons-material/Add'
import RemoveIcon         from '@mui/icons-material/Remove'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import ShoppingCartIcon   from '@mui/icons-material/ShoppingCart'
import { restaurantAPI, reviewAPI } from '../api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import type { Restaurant, MenuItem, Review } from '../types'

const DEMO_RESTAURANT: Restaurant = {
  _id: 'r1', name: 'Spice Garden', cuisine: ['Indian', 'Biryani'],
  rating: 4.5, deliveryTime: '25-35 min', minOrder: 150,
  city: 'Chennai', address: 'Anna Nagar, Chennai',
  isOpen: true, tableCapacity: 20, description: 'Authentic Indian cuisine',
  menu: [
    { _id:'m1', name:'Samosa (2 pcs)',       description:'Crispy pastry with spiced potato',     price:49,  category:'Starters',    isVeg:true,  available:true },
    { _id:'m2', name:'Chicken 65',           description:'Deep fried spicy chicken',             price:149, category:'Starters',    isVeg:false, available:true },
    { _id:'m3', name:'Chicken Biryani',      description:'Aromatic basmati with tender chicken', price:199, category:'Main Course', isVeg:false, available:true },
    { _id:'m4', name:'Paneer Butter Masala', description:'Creamy tomato curry with paneer',      price:179, category:'Main Course', isVeg:true,  available:true },
    { _id:'m5', name:'Dal Tadka',            description:'Yellow lentils tempered with spices',  price:129, category:'Main Course', isVeg:true,  available:true },
    { _id:'m6', name:'Mango Lassi',          description:'Chilled yoghurt with fresh mango',     price:79,  category:'Drinks',      isVeg:true,  available:true },
  ],
}

const DEMO_REVIEWS: Review[] = [
  { _id:'rv1', user:{ name:'Priya K',  badges:['Food Critic']  }, rating:5, text:'Amazing biryani! Authentic flavours and generous portions. Best in Chennai!', tags:['Tasty','Fast Delivery'], pointsEarned:50, createdAt:new Date().toISOString() },
  { _id:'rv2', user:{ name:'Rahul S',  badges:[]               }, rating:4, text:'Good food, slightly late but quality was excellent. Will order again.', tags:['Tasty'], pointsEarned:25, createdAt:new Date().toISOString() },
  { _id:'rv3', user:{ name:'Malini V', badges:['First Reviewer']}, rating:5, text:'Paneer butter masala was outstanding. Perfectly balanced and soft paneer.', tags:['Tasty','Good Portion'], pointsEarned:50, createdAt:new Date().toISOString() },
]

interface TabPanelProps { children: React.ReactNode; value: number; index: number }
function TabPanel({ children, value, index }: TabPanelProps) {
  return <div hidden={value !== index}>{value === index && <Box py={3}>{children}</Box>}</div>
}

export default function RestaurantDetail() {
  const { id }       = useParams<{ id: string }>()
  const navigate     = useNavigate()
  const { addItem, removeItem, cart, clearCart, restaurantId: cartRestId } = useCart()
  const { user }     = useAuth()

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [reviews,    setReviews]    = useState<Review[]>([])
  const [loading,    setLoading]    = useState(true)
  const [tab,        setTab]        = useState(0)
  const [toast,      setToast]      = useState('')
  const [toastType,  setToastType]  = useState<'success'|'warning'>('success')
  const [reviewRating, setReviewRating] = useState<number | null>(5)
  const [reviewText,   setReviewText]   = useState('')
  const [submitting,   setSubmitting]   = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      restaurantAPI.getById(id).catch(() => ({ data: DEMO_RESTAURANT })),
      reviewAPI.getByRestaurant(id).catch(() => ({ data: DEMO_REVIEWS })),
    ]).then(([rRes, revRes]) => {
      setRestaurant(rRes.data)
      setReviews(revRes.data)
    }).finally(() => setLoading(false))
  }, [id])

  const getQty = (itemId: string) => cart.find(i => i._id === itemId)?.qty || 0

  const handleAdd = (item: MenuItem) => {
    if (!id) return
    if (cartRestId && cartRestId !== id) {
      if (!window.confirm('Your cart has items from another restaurant. Clear cart?')) return
      clearCart()
    }
    addItem(item, id)
    setToast(`${item.name} added to cart`); setToastType('success')
  }

  const handleSubmitReview = async () => {
    if (!user) { navigate('/login'); return }
    if (!reviewText.trim() || !reviewRating || !id) return
    setSubmitting(true)
    try {
      const res = await reviewAPI.create({ restaurant: id, rating: reviewRating, text: reviewText })
      setReviews(prev => [res.data.review, ...prev])
      setReviewText(''); setReviewRating(5)
      setToast(`Review submitted! You earned ${res.data.pointsEarned} points`); setToastType('success')
    } catch {
      const demoReview: Review = {
        _id: Date.now().toString(),
        user: { name: user?.name || 'You', badges: [] },
        rating: reviewRating, text: reviewText, tags: [],
        pointsEarned: 25, createdAt: new Date().toISOString(),
      }
      setReviews(prev => [demoReview, ...prev])
      setReviewText(''); setReviewRating(5)
      setToast('Review submitted! You earned 25 points'); setToastType('success')
    } finally { setSubmitting(false) }
  }

  if (loading) return <Box sx={{ display:'flex', justifyContent:'center', py:12 }}><CircularProgress color="primary" /></Box>
  if (!restaurant) return <Typography p={4}>Restaurant not found.</Typography>

  const categories = [...new Set(restaurant.menu.map(m => m.category))]
  const cartTotal  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <Box>
      <Box sx={{ height:240, bgcolor:'#fff5f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:96 }}>
        🍽️
      </Box>
      <Container maxWidth="lg" sx={{ py:3 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:2, mb:3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} mb={0.5}>{restaurant.name}</Typography>
            <Typography color="text.secondary" mb={1}>{restaurant.cuisine.join(' · ')}</Typography>
            <Box sx={{ display:'flex', gap:2, flexWrap:'wrap', alignItems:'center' }}>
              <Chip label={`⭐ ${restaurant.rating}`} size="small" sx={{ bgcolor:'#f0fdf4', color:'#16a34a', fontWeight:700 }} />
              <Box sx={{ display:'flex', alignItems:'center', gap:0.5, color:'text.secondary' }}>
                <AccessTimeIcon sx={{ fontSize:16 }} /><Typography variant="body2">{restaurant.deliveryTime}</Typography>
              </Box>
              <Box sx={{ display:'flex', alignItems:'center', gap:0.5, color:'text.secondary' }}>
                <LocationOnIcon sx={{ fontSize:16 }} /><Typography variant="body2">{restaurant.address}</Typography>
              </Box>
            </Box>
          </Box>
          <Button variant="outlined" color="primary" startIcon={<TableRestaurantIcon />}
            onClick={() => navigate(`/bookings?restaurant=${id}&name=${encodeURIComponent(restaurant.name)}`)}>
            Book a Table
          </Button>
        </Box>
        <Divider sx={{ mb:2 }} />
        <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary">
          <Tab label="Menu" />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>

        {/* Menu */}
        <TabPanel value={tab} index={0}>
          {categories.map(cat => (
            <Box key={cat} mb={4}>
              <Typography variant="overline" fontWeight={700} color="text.secondary" letterSpacing={1.5}>{cat}</Typography>
              <Divider sx={{ mb:2 }} />
              {restaurant.menu.filter(m => m.category === cat).map(item => (
                <Box key={item._id} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', py:2, borderBottom:'1px solid', borderColor:'divider' }}>
                  <Box flex={1}>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:0.5 }}>
                      <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor: item.isVeg ? '#22c55e' : '#ef4444', flexShrink:0 }} />
                      <Typography fontWeight={500}>{item.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>{item.description}</Typography>
                    <Typography fontWeight={700} color="primary.dark">₹{item.price}</Typography>
                  </Box>
                  <Box ml={3}>
                    {getQty(item._id) === 0 ? (
                      <Button variant="outlined" color="primary" size="small" sx={{ borderRadius:99, minWidth:80 }} onClick={() => handleAdd(item)}>Add</Button>
                    ) : (
                      <Box sx={{ display:'flex', alignItems:'center', gap:1, border:'1.5px solid', borderColor:'primary.main', borderRadius:99, px:1 }}>
                        <IconButton size="small" color="primary" onClick={() => removeItem(item._id)}><RemoveIcon sx={{ fontSize:16 }} /></IconButton>
                        <Typography fontWeight={700} minWidth={20} textAlign="center">{getQty(item._id)}</Typography>
                        <IconButton size="small" color="primary" onClick={() => handleAdd(item)}><AddIcon sx={{ fontSize:16 }} /></IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </TabPanel>

        {/* Reviews */}
        <TabPanel value={tab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              {reviews.length === 0
                ? <Typography color="text.secondary">No reviews yet. Be the first!</Typography>
                : reviews.map(rv => (
                  <Paper key={rv._id} variant="outlined" sx={{ p:2, mb:2, borderRadius:2 }}>
                    <Box sx={{ display:'flex', justifyContent:'space-between', mb:1 }}>
                      <Box>
                        <Typography fontWeight={600} fontSize={14}>{rv.user.name}</Typography>
                        {rv.user.badges.length > 0 && <Chip label={`🏅 ${rv.user.badges[0]}`} size="small" sx={{ bgcolor:'#fff7ed', color:'#c2410c', fontSize:11, mt:0.5 }} />}
                      </Box>
                      <Rating value={rv.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{rv.text}</Typography>
                    {rv.tags.length > 0 && <Box sx={{ display:'flex', gap:1, mt:1, flexWrap:'wrap' }}>{rv.tags.map(t => <Chip key={t} label={t} size="small" variant="outlined" />)}</Box>}
                  </Paper>
                ))
              }
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper variant="outlined" sx={{ p:2.5, borderRadius:2 }}>
                <Typography fontWeight={600} mb={2}>Write a Review</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>Your Rating</Typography>
                <Rating value={reviewRating} onChange={(_, v) => setReviewRating(v)} sx={{ mb:2 }} />
                <textarea rows={4} placeholder="Share your experience (longer reviews earn more points!)"
                  value={reviewText} onChange={e => setReviewText(e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1px solid #e5e5e5', fontFamily:'Poppins,sans-serif', fontSize:14, resize:'none', outline:'none', boxSizing:'border-box' }}
                />
                <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
                  {reviewText.length < 100 ? '10 pts' : reviewText.length < 300 ? '25 pts' : '50 pts'} for this review
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmitReview} disabled={submitting || !reviewText.trim()}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>

      {/* Floating cart */}
      {cart.length > 0 && (
        <Box sx={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', bgcolor:'primary.main', color:'white', display:'flex', alignItems:'center', gap:6, px:4, py:1.8, borderRadius:99, boxShadow:'0 8px 32px rgba(232,57,42,0.4)', cursor:'pointer', zIndex:200, '&:hover':{ bgcolor:'primary.dark' } }}
          onClick={() => navigate('/cart')}>
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <ShoppingCartIcon sx={{ fontSize:18 }} />
            <Typography fontWeight={600}>View Cart</Typography>
          </Box>
          <Box sx={{ bgcolor:'rgba(255,255,255,0.2)', px:2, py:0.5, borderRadius:99 }}>
            <Typography fontWeight={700}>₹{cartTotal}</Typography>
          </Box>
        </Box>
      )}

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
        <Alert severity={toastType} onClose={() => setToast('')}>{toast}</Alert>
      </Snackbar>
    </Box>
  )
}
