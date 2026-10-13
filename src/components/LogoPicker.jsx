import { Box, ButtonBase, Checkbox, Typography } from '@mui/material';
import { LOGOS } from '../banner/render';

export default function LogoPicker({ value, onChange }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
      {LOGOS.map((logo) => {
        const checked = Boolean(value[logo.id]);
        return (
          <ButtonBase
            key={logo.id}
            onClick={() => onChange({ ...value, [logo.id]: !checked })}
            role="checkbox"
            aria-checked={checked}
            sx={{
              display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center', gap: 1.5,
              p: 2, borderRadius: 2, border: '3px solid', borderColor: checked ? 'primary.main' : 'divider',
              bgcolor: checked ? 'rgba(31, 78, 140, 0.08)' : '#fff',
            }}
          >
            <Box component="img" src={logo.src} alt="" sx={{ width: 96, height: 96, objectFit: 'contain' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Checkbox checked={checked} tabIndex={-1} sx={{ '& .MuiSvgIcon-root': { fontSize: 36 } }} />
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{logo.nome}</Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
