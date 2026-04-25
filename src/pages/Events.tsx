import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, LinearProgress } from '@mui/material'
import MusicNoteIcon  from '@mui/icons-material/MusicNote'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import EventIcon      from '@mui/icons-material/Event'
import { eventAPI }  from '../api'
import { useAuth }   from '../context/AuthContext'
import type { FoodEvent } from '../types'

const DEMO_EVENTS: FoodEvent[] = [
  { _id:'e1', title:'Tamil Food Festival',   type:'food_festival', description:'Authentic Tamil cuisine with live cooking demos.',       restaurant:{ _id:'r1', name:'Spice Garden', address:'Chennai' },   date:'2025-08-10', time:'5:00 PM', ticketPrice:299, totalSeats:100, bookedSeats:45 },
  { _id:'e2', title:'Saturday Jazz Dinner',  type:'live_music',    description:'Live jazz with a 3-course gourmet dinner.',              restaurant:{ _id:'r2', name:'The Rooftop',  address:'Coimbatore' }, date:'2025-08-15', time:'8:00 PM', ticketPrice:499, totalSeats:60,  bookedSeats:58 },
  { _id:'e3', title:'Comedy Dinner Night',   type:'comedy',        description:'Stand-up comedy followed by a gourmet dinner.',          restaurant:{ _id:'r3', name:'Laugh House',  address:'Bengaluru' },  date:'2025-08-20', time:'7:30 PM', ticketPrice:399, totalSeats:80,  bookedSeats:20 },
  { _id:'e4', title:'Street Food Festival',  type:'food_festival', description:'50+ street food stalls from across Tamil Nadu.',         restaurant:{ _id:'r1', name:'Spice Garden', address:'Chennai' },   date:'2025-09-05', time:'4:00 PM', ticketPrice:199, totalSeats:200, bookedSeats:89 },
]

const TYPE_ICON: Record<string, React.ReactNode> = {
  food_festival: <LocalDiningIcon />,
  live_music:    <MusicNoteIcon />,
  comedy:        <TheaterComedyIcon />,
  other:         <EventIcon />,
}
const TYPE_COLOR: Record<string, string> = {
  food_festival: '#fff7ed', live_music: '#eff6ff', comedy: '#fefce8', other: '#f5f3ff'
}

export default function Events() {
  const [events,  setEvents]  = useState<FoodEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [booked,  setBooked]  = useState<Record<string, boolean>>({})
  const { user }  = useAuth()
  const navigate  = useNavigate()

  useEffect(() => {
    eventAPI.getAll()
      .then(res => setEvents(res.data))
      .catch(() => setEvents(DEMO_EVENTS))
      .finally(() => setLoading(false))
  }, [])

  const handleBook = async (id: string, title: string) => {
    if (!user) { navigate('/login'); return }
    try { await eventAPI.bookTicket(id) } catch {}
    setBooked(prev => ({ ...prev, [id]: true }))
  }

  if (loading) return <Box sx={{ py:4 }}><LinearProgress color="primary" /></Box>

  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Upcoming Events</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Live music, food festivals, comedy nights and more</Typography>
      <Grid container spacing={3}>
        {events.map(ev => {
          const seatsLeft = ev.totalSeats - ev.bookedSeats
          const soldOut   = seatsLeft <= 0
          const isBooked  = booked[ev._id]
          const fillPct   = (ev.bookedSeats / ev.totalSeats) * 100
          return (
            <Grid item xs={12} sm={6} md={4} key={ev._id}>
              <Card sx={{ height:'100%', display:'flex', flexDirection:'column' }}>
                <Box sx={{ height:100, bgcolor: TYPE_COLOR[ev.type] || '#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Box sx={{ color:'primary.main', '& svg':{ fontSize:52 } }}>{TYPE_ICON[ev.type]}</Box>
                </Box>
                <CardContent sx={{ flex:1, display:'flex', flexDirection:'column' }}>
                  <Chip label={ev.type.replace('_',' ')} size="small" color="primary" variant="outlined" sx={{ width:'fit-content', mb:1, textTransform:'capitalize' }} />
                  <Typography fontWeight={700} fontSize={16} mb={1}>{ev.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1.5} lineHeight={1.6}>{ev.description}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>📍 {ev.restaurant?.name}, {ev.restaurant?.address}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1.5}>📅 {new Date(ev.date).toLocaleDateString('en-IN',{ day:'numeric', month:'long' })} at {ev.time}</Typography>
                  <Box mb={1.5}>
                    <LinearProgress variant="determinate" value={fillPct} color={soldOut ? 'error' : seatsLeft < 10 ? 'warning' : 'success'} sx={{ borderRadius:99, height:6, mb:0.5 }} />
                    <Typography variant="caption" color={soldOut ? 'error' : seatsLeft < 10 ? 'warning.main' : 'success.main'} fontWeight={600}>
                      {soldOut ? 'Sold Out' : seatsLeft < 10 ? `Only ${seatsLeft} seats left!` : `${seatsLeft} seats available`}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color="warning.dark" mb={2}>₹{ev.ticketPrice}</Typography>
                  <Button variant={isBooked || soldOut ? 'outlined' : 'contained'} color="primary" fullWidth
                    disabled={soldOut || isBooked}
                    onClick={() => !soldOut && !isBooked && handleBook(ev._id, ev.title)}
                    sx={{ mt:'auto' }}>
                    {isBooked ? '✓ Ticket Booked' : soldOut ? 'Sold Out' : 'Book Ticket'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
