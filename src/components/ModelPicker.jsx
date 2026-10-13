import { useDeferredValue } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TEMPLATES } from '../banner/templates';
import BannerCanvas from './BannerCanvas';

export default function ModelPicker({ data, assets, onChange }) {
  // Miniaturas acompanham o texto sem travar a digitação.
  const deferredData = useDeferredValue(data);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
      {TEMPLATES.map((tpl) => {
        const selected = tpl.id === data.modelo;
        return (
          <ButtonBase
            key={tpl.id}
            onClick={() => onChange(tpl.id)}
            aria-pressed={selected}
            sx={{
              display: 'block', textAlign: 'left', borderRadius: 2, p: 0.75, position: 'relative',
              border: '4px solid', borderColor: selected ? 'primary.main' : 'transparent',
              bgcolor: selected ? 'rgba(31, 78, 140, 0.08)' : 'transparent',
            }}
          >
            <BannerCanvas data={deferredData} assets={assets} pixels={320} templateId={tpl.id} label={tpl.nome} sx={{ borderRadius: 1 }} />
            {selected && (
              <CheckCircleIcon
                color="primary"
                sx={{ position: 'absolute', top: 2, right: 2, fontSize: 44, bgcolor: '#fff', borderRadius: '50%' }}
              />
            )}
            <Typography sx={{ mt: 0.75, fontWeight: selected ? 800 : 600, textAlign: 'center', fontSize: '1.05rem' }}>
              {tpl.nome}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
