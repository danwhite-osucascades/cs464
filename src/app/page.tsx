'use client';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent,
  Select, MenuItem, FormControl, InputLabel,
  Button, Alert
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Reorder } from 'motion/react';

import birds from '../../data/bird_population.json';
import fish from '../../data/fish.json';
import planets from '../../data/planets.json';

import { Dataset, DatasetItem } from '@/types/data';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const datasets: Dataset[] = [birds, fish, planets];
  const { title, description, items } = datasets[selectedIndex];

  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setSubmitted(false);
  }, [items]);

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    // Clear feedback if they drag after submitting
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = () => {
    const correct = shuffledItems.filter(
      (item, index) => item.name === items[index].name
    ).length;
    setCorrectCount(correct);
    setSubmitted(true);
  };

  const isItemCorrect = (item: DatasetItem, index: number) =>
    item.name === items[index].name;

  const allCorrect = correctCount === items.length;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>

      {/* Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select a dataset</InputLabel>
        <Select
          value={selectedIndex}
          label="Select a dataset"
          onChange={(e) => {
            setSelectedIndex(Number(e.target.value));
            setSubmitted(false);
          }}
        >
          {datasets.map((ds, i) => (
            <MenuItem key={i} value={i}>{ds.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Title & description */}
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      {/* Feedback banner */}
      {submitted && (
        <Alert
          severity={allCorrect ? 'success' : correctCount > 0 ? 'warning' : 'error'}
          sx={{ mb: 2 }}
        >
          {allCorrect
            ? '🎉 Perfect! All items are in the correct order!'
            : `${correctCount} of ${items.length} items are in the correct position.`}
        </Alert>
      )}

      {/* Item cards */}
      <Reorder.Group
        as="div"
        values={shuffledItems}
        onReorder={handleReorder}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {shuffledItems.map((item, index) => (
          <Reorder.Item
            key={item.name}
            value={item}
            as="div"
            style={{ position: 'relative' }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            <Card
              variant="outlined"
              sx={{
                cursor: isDragging ? 'grabbing' : 'grab',
                borderColor: submitted
                  ? isItemCorrect(item, index) ? 'success.main' : 'error.main'
                  : undefined,
                borderWidth: submitted ? 2 : 1,
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                <DragHandleIcon color="action" />
                <Typography variant="body1" sx={{ flexGrow: 1 }}>{item.name}</Typography>
                {submitted && (
                  isItemCorrect(item, index)
                    ? <CheckCircleIcon color="success" />
                    : <CancelIcon color="error" />
                )}
              </CardContent>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Submit button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={submitted && allCorrect}
      >
        {submitted && !allCorrect ? 'Rearrange and Try Again | Click To Submit New Attempt' : 'Submit'}
      </Button>
    </Box>
  );
}