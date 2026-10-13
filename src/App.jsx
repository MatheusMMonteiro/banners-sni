import { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Snackbar, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { clearEventFields, loadData, saveData } from './banner/data';
import { bannerFileName, renderBanner, useBannerAssets } from './banner/render';
import { findTemplate } from './banner/templates';
import BannerCanvas from './components/BannerCanvas';
import LogoPicker from './components/LogoPicker';
import ModelPicker from './components/ModelPicker';
import Step from './components/Step';
import TextForm from './components/TextForm';

function bannerBlob(data, assets) {
  const canvas = document.createElement('canvas');
  renderBanner(canvas, data, assets);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [notice, setNotice] = useState(null);
  const assets = useBannerAssets();
  const previewRef = useRef(null);

  useEffect(() => saveData(data), [data]);

  const update = (changes) => setData((current) => ({ ...current, ...changes }));

  const download = async () => {
    const blob = await bannerBlob(data, assets);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = bannerFileName(data);
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Pronto! A imagem foi salva na pasta de Downloads (ou na Galeria).');
  };

  const canShareFiles = typeof navigator.canShare === 'function'
    && navigator.canShare({ files: [new File([''], 'teste.png', { type: 'image/png' })] });

  const share = async () => {
    const blob = await bannerBlob(data, assets);
    const file = new File([blob], bannerFileName(data), { type: 'image/png' });
    try {
      await navigator.share({ files: [file], title: data.tema || 'Convite' });
    } catch (error) {
      if (error.name !== 'AbortError') setNotice('Não deu para enviar direto. Use o botão "Baixar imagem".');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: { xs: 14, md: 6 } }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: { xs: 2.5, sm: 3.5 }, mb: 3 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src="./logos/seicho-no-ie.png"
            alt=""
            sx={{ width: 64, height: 64, objectFit: 'contain', bgcolor: '#fff', borderRadius: 2, p: 0.5 }}
          />
          <Box>
            <Typography variant="h1" component="h1">Criar convite</Typography>
            <Typography sx={{ fontSize: '1.15rem', opacity: 0.95 }}>
              Escolha um modelo, escreva os textos e baixe a imagem pronta.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3, alignItems: 'start' }}>
          <Stack spacing={3}>
            <Step number={1} title="Escolha o modelo" subtitle="Toque no desenho que mais gostar.">
              <ModelPicker data={data} assets={assets} onChange={(modelo) => update({ modelo })} />
            </Step>
            <Step number={2} title="Escreva os textos" subtitle="O convite muda enquanto você escreve.">
              <TextForm data={data} onChange={update} onNewBanner={() => setData(clearEventFields)} />
            </Step>
            <Step number={3} title="Escolha os logos" subtitle="Toque para marcar ou desmarcar.">
              <LogoPicker value={data.logos} onChange={(logos) => update({ logos })} />
            </Step>
          </Stack>

          <Box ref={previewRef} sx={{ position: { md: 'sticky' }, top: { md: 24 }, scrollMarginTop: 16 }}>
            <Step number={4} title="Veja como ficou" subtitle={`Modelo: ${findTemplate(data.modelo).nome}`}>
              {assets ? (
                <BannerCanvas
                  data={data}
                  assets={assets}
                  pixels={1080}
                  label="Prévia do convite"
                  sx={{ borderRadius: 1, boxShadow: 3 }}
                />
              ) : (
                <Box sx={{ aspectRatio: '1 / 1', display: 'grid', placeItems: 'center' }}>
                  <CircularProgress size={56} />
                </Box>
              )}
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button variant="contained" size="large" startIcon={<DownloadIcon />} onClick={download} disabled={!assets}>
                  Baixar imagem
                </Button>
                {canShareFiles && (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<WhatsAppIcon />}
                    onClick={share}
                    disabled={!assets}
                  >
                    Enviar pelo WhatsApp
                  </Button>
                )}
              </Stack>
            </Step>
          </Box>
        </Box>
      </Container>

      {/* No celular a prévia fica no fim da página: atalho fixo para chegar nela. */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' }, position: 'fixed', left: 0, right: 0, bottom: 0, p: 1.5,
          bgcolor: 'rgba(244, 241, 234, 0.95)', borderTop: '1px solid', borderColor: 'divider', zIndex: 10,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<VisibilityIcon />}
          onClick={() => previewRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver convite e baixar
        </Button>
      </Box>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={8000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setNotice(null)} sx={{ fontSize: '1.1rem' }}>
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}
