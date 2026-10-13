import { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField,
  ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { weekdayName } from '../banner/data';

export default function TextForm({ data, onChange, onNewBanner }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const field = (name) => ({
    value: data[name],
    onChange: (event) => onChange({ [name]: event.target.value }),
  });
  const weekday = weekdayName(data.data);

  return (
    <Stack spacing={3}>
      <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 800 }}>Sobre esta reunião</Typography>

      <TextField label="Tema da reunião" placeholder="Ex.: O poder da Fé" {...field('tema')} />
      <TextField
        label="Livro (se houver)"
        placeholder="Ex.: Aos que buscam a Prosperidade"
        helperText="Escreva só o nome do livro. Se não houver, deixe em branco."
        {...field('livro')}
      />
      <TextField label="Cargo de quem vai falar" placeholder="Ex.: Preletora em Grau Júnior" {...field('cargo')} />
      <TextField label="Nome de quem vai falar" placeholder="Ex.: Nome do Preletor" {...field('preletor')} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
        <TextField
          label="Data"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText={weekday ? `Dia da semana: ${weekday}` : 'Toque para escolher o dia'}
          {...field('data')}
        />
        <TextField label="Horário" placeholder="Ex.: 20h" helperText="Ex.: 20h ou 9h30" {...field('horario')} />
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>A reunião será:</Typography>
        <ToggleButtonGroup
          exclusive
          fullWidth
          color="primary"
          value={data.tipo}
          onChange={(_, value) => value && onChange({ tipo: value })}
        >
          <ToggleButton value="presencial" sx={{ py: 1.75, fontSize: '1.15rem', fontWeight: 800, textTransform: 'none' }}>
            Presencial
          </ToggleButton>
          <ToggleButton value="virtual" sx={{ py: 1.75, fontSize: '1.15rem', fontWeight: 800, textTransform: 'none' }}>
            Virtual (pela internet)
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider />
      <Box>
        <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 800 }}>Informações do núcleo</Typography>
        <Typography color="text.secondary">Estas quase nunca mudam. Ficam guardadas para a próxima vez.</Typography>
      </Box>

      <TextField
        label="Quem convida"
        multiline
        minRows={3}
        helperText="Cada linha que você escrever aqui vira uma linha no convite."
        {...field('convite')}
      />
      <TextField label="WhatsApp" type="tel" placeholder="(13) 99999-9999" {...field('whatsapp')} />
      {data.tipo === 'presencial' && (
        <TextField label="Endereço" placeholder="Ex.: Rua Exemplo, 123 - Bairro - Cidade" {...field('endereco')} />
      )}
      <TextField label="Mensagem final" placeholder="Ex.: Sua presença é muito importante!" {...field('mensagem')} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'secondary.main', fontWeight: 700 }}>
          <CheckIcon /> Tudo é guardado automaticamente
        </Typography>
        <Button variant="outlined" size="large" startIcon={<RestartAltIcon />} onClick={() => setConfirmOpen(true)}>
          Começar convite novo
        </Button>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 800 }}>Começar um convite novo?</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '1.15rem' }}>
            Vamos apagar o <b>tema</b>, o <b>livro</b>, o <b>nome de quem vai falar</b> e a <b>data</b>.
            As informações do núcleo continuam guardadas.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button size="large" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              onNewBanner();
              setConfirmOpen(false);
            }}
          >
            Sim, começar novo
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
