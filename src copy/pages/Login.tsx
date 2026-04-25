import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await login(email, password); navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password')
    } finally { setLoading(false) }
  }

  return (
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh', px: 2 }}>
      <Paper elevation={0} variant="outlined" sx={{ width:'100%', maxWidth:420, p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={0.5}>Welcome back</Typography>
        <Typography color="text.secondary" mb={3}>Login to order, book tables and earn rewards</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Password" type="password" value={password}
            onChange={e => setPassword(e.target.value)} sx={{ mb: 3 }} required />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large"
            sx={{ borderRadius: 3, py: 1.4 }} disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Login'}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2.5} color="text.secondary">
          Don't have an account?{' '}
          <Box component={Link} to="/register" sx={{ color:'primary.main', fontWeight:500 }}>Sign up</Box>
        </Typography>
      </Paper>
    </Box>
  )
}
