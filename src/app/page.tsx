'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

// sample data
import birds from '../../data/bird_population.json';
import fish from '../../data/fish.json';
import planets from '../../data/planets.json';

import { DataFile } from '@/types/data';

function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const datasets: DataFile[] = [birds, fish, planets]
  const { title, description, items } = datasets[selectedIndex];
  const [shuffledItems, setShuffledItems] = useState(items);
  const dragItemIndex = useRef<number | null>(null);
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);

  useEffect(() => {
    setShuffledItems(shuffleArray(items));
  }, [items]);

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
    setActiveDragIndex(index);
  };

  const handleDragEnter = (index: number) => {
    const fromIndex = dragItemIndex.current;
    if (fromIndex === null || fromIndex === index) {
      return;
    }

    setShuffledItems((current) => {
      const updated = [...current];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(index, 0, movedItem);
      return updated;
    });

    dragItemIndex.current = index;
    setActiveDragIndex(index);
  };

  const handleDrop = () => {
    dragItemIndex.current = null;
    setActiveDragIndex(null);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>

      {/* Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select a dataset</InputLabel>
        <Select
          value={selectedIndex}
          label="Select a dataset"
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {datasets.map((ds, i) => (
            <MenuItem key={i} value={i}>{ds.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Title & description from the JSON */}
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>        {description}
      </Typography>

      {/* Item cards */}
      <Stack spacing={1}>
        {shuffledItems.map((item, index) => (
          <Card
            key={`${index}-${item.name}`}
            variant="outlined"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            sx={{ cursor: 'grab', opacity: activeDragIndex === index ? 0.6 : 1 }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
              <DragHandleIcon color="action" />
              <Typography variant="body1">{item.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};