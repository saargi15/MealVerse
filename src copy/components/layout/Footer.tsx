import { Box, Container, Typography, Grid } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#ccc', mt: 'auto', py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} color="primary.light" mb={1}>🍔 FoodHub</Typography>
            <Typography variant="body2" color="grey.500" lineHeight={1.8}>Order food, book tables, and discover events — all in one place.</Typography>
          </Grid>
          {[{ title: 'Company', links: ['About Us','Careers','Blog','Press'] }, { title: 'Help', links: ['FAQ','Contact Us','Privacy Policy','Terms'] }].map(col => (
            <Grid item xs={6} md={2} key={col.title}>
              <Typography fontWeight={600} mb={1.5} fontSize={14}>{col.title}</Typography>
              {col.links.map(l => <Typography key={l} variant="body2" color="grey.500" mb={0.8} sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>{l}</Typography>)}
            </Grid>
          ))}
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600} mb={1.5} fontSize={14}>Download App</Typography>
            <Typography variant="body2" color="grey.500" mb={1}>Get the FoodHub app for faster ordering</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['App Store','Google Play'].map(s => (
                <Box key={s} sx={{ border: '1px solid #444', borderRadius: 2, px: 2, py: 0.8, cursor: 'pointer', fontSize: 12, '&:hover': { borderColor: '#888' } }}>{s}</Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid #2e2e2e', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="grey.600">© 2025 FoodHub. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  )
}
