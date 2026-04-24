import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary:    { main: '#e8392a', dark: '#c73e2d', light: '#ff5c4d', contrastText: '#fff' },
    secondary:  { main: '#ff8c6b', contrastText: '#fff' },
    background: { default: '#f7f7f7', paper: '#ffffff' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton:     { styleOverrides: { root: { borderRadius: 99, boxShadow: 'none', '&:hover': { boxShadow: 'none' } } } },
    MuiCard:       { styleOverrides: { root: { borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' } } },
    MuiTextField:  { defaultProps: { variant: 'outlined', size: 'small' } },
  },
})

export default theme
