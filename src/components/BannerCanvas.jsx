import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { renderBanner } from '../banner/render';

export default function BannerCanvas({ data, assets, pixels, templateId, label, sx }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && assets) renderBanner(ref.current, data, assets, pixels, templateId);
  }, [data, assets, pixels, templateId]);

  return (
    <Box
      component="canvas"
      ref={ref}
      role="img"
      aria-label={label}
      sx={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1 / 1', bgcolor: '#eee', ...sx }}
    />
  );
}
