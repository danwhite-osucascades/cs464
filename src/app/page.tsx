'use client';

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

type SortItem = {
  name: string;
  order: number;
};

export default function Home() {
  const items = (birdPop.items as SortItem[]);

  const placeholderOrder = [...items].sort(
    (a, b) => (a.order % 3) - (b.order % 3) || b.order - a.order
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="overline" sx={{ letterSpacing: 1.4 }}>
              SORTING EXERCISE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {birdPop.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
              {birdPop.description}
            </Typography>

          </Box>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{ flex: 1.3, p: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2.5 }}>
                <TextField fullWidth size="small" label="Search" />

              </Stack>

              <Stack spacing={1.5}>
                {placeholderOrder.map((item, index) => (
                  <Paper
                    key={item.name}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <Chip
                      label={index + 1}
                      size="small"
                      color="primary"
                      sx={{ fontWeight: 700, minWidth: 36 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box sx={{ flex: 1, p: 3, bgcolor: 'rgba(25,118,210,0.04)' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Target Ranking
              </Typography>

              <Button variant="contained" sx={{ px: 3, mb: 2 }}>
                Check Order
              </Button>

              <Stack spacing={1}>
                {items.map((item) => (
                  <Paper
                    key={`slot-${item.order}`}
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>Position {item.order}</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                      Drop item here
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}