`use client`

import birdPop from '../../sample_data/bird_pop.json';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Item = {
  name: string;
  order: number;
};

export default function Home() {

  const items = (birdPop.items as Item[]);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            {birdPop.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {birdPop.description}
          </Typography>
          <Stack spacing={2} mt={2}>
            {items.map((item) => (
              <Chip key={item.name} label={`${item.name} (Order: ${item.order})`} />
            ))}
          </Stack>
        </Paper>
      </Container>

    </Box>
  );
}

