import { createTheme } from '@mui/material/styles';

// Letras e alvos de clique grandes: a maioria do público é idosa.
const theme = createTheme({
  palette: {
    primary: { main: '#1f4e8c' },
    secondary: { main: '#1d6b45' },
    background: { default: '#f4f1ea', paper: '#ffffff' },
    text: { primary: '#1c1c1c', secondary: '#4a4a4a' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Nunito", "Segoe UI", Roboto, Arial, sans-serif',
    fontSize: 17,
    h1: { fontSize: '2rem', fontWeight: 800 },
    h2: { fontSize: '1.5rem', fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 800, fontSize: '1.15rem' },
  },
  components: {
    MuiTextField: { defaultProps: { fullWidth: true, variant: 'outlined' } },
    MuiInputBase: { styleOverrides: { input: { fontSize: '1.2rem' } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: '1.1rem' } } },
    MuiFormHelperText: { styleOverrides: { root: { fontSize: '0.95rem' } } },
    MuiButton: { styleOverrides: { sizeLarge: { padding: '14px 24px', fontSize: '1.2rem' } } },
  },
});

export default theme;
