import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form,    setForm]    = useState({ name:'', email:'', password:'', phone:'' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate     = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.phone); navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed. Try again.')
    } finally { setLoading(false) }
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh', px: 2 }}>
      <Paper elevation={0} variant="outlined" sx={{ width:'100%', maxWidth:420, p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={0.5}>Create account</Typography>
        <Typography color="text.secondary" mb={3}>Join FoodHub and start earning reward points</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name"    value={form.name}     onChange={update('name')}     sx={{ mb:2 }} required />
          <TextField fullWidth label="Email"        type="email" value={form.email}    onChange={update('email')}    sx={{ mb:2 }} required />
          <TextField fullWidth label="Phone Number" value={form.phone}    onChange={update('phone')}    sx={{ mb:2 }} />
          <TextField fullWidth label="Password"     type="password" value={form.password} onChange={update('password')} sx={{ mb:3 }} required inputProps={{ minLength:6 }} />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large"
            sx={{ borderRadius:3, py:1.4 }} disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2.5} color="text.secondary">
          Already have an account?{' '}
          <Box component={Link} to="/login" sx={{ color:'primary.main', fontWeight:500 }}>Login</Box>
        </Typography>
      </Paper>
    </Box>
  )
}
