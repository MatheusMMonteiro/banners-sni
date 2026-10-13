import { Box, Paper, Typography } from '@mui/material';

export default function Step({ number, title, subtitle, children }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: subtitle ? 0.5 : 2 }}>
        <Box
          sx={{
            flexShrink: 0, width: 44, height: 44, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff',
            display: 'grid', placeItems: 'center', fontSize: '1.4rem', fontWeight: 800,
          }}
        >
          {number}
        </Box>
        <Typography variant="h2" component="h2">{title}</Typography>
      </Box>
      {subtitle && (
        <Typography color="text.secondary" sx={{ mb: 2, ml: { sm: '56px' } }}>{subtitle}</Typography>
      )}
      {children}
    </Paper>
  );
}
