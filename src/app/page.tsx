'use client';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent,
  Select, MenuItem, FormControl, InputLabel,
  Button
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CheckIcon from '@mui/icons-material/Check';
import { Reorder } from 'motion/react';

// sample data
import birds from '../../data/bird_population.json';
import fish from '../../data/fish.json';
import planets from '../../data/planets.json';

import { Dataset, DatasetItem } from '@/types/data';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const datasets: Dataset[] = [birds, fish, planets]
  const { title, description, items } = datasets[selectedIndex];

  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setIsSubmitted(false);
    setCorrectCount(0);
  }, [items]);

  const handleSubmit = () => {
    const correct = shuffledItems.filter((item, index) => item.order === index + 1).length;
    setCorrectCount(correct);
    setIsSubmitted(true);
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setIsSubmitted(false);
    setCorrectCount(0);
  };

  const isCorrect = (item: DatasetItem, index: number) => {
    if (!isSubmitted) return false;
    return item.order === index + 1;
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

      {/* Submit button and correct count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Order
        </Button>
        {isSubmitted && (
          <Typography variant="body1" color="success.main">
            {correctCount} of {shuffledItems.length} correct
          </Typography>
        )}
      </Box>

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
                backgroundColor: isCorrect(item, index) ? 'success.light' : 'background.paper',
                transition: 'background-color 0.2s ease'
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                <DragHandleIcon color="action"/>
                <Typography variant="body1" sx={{ flex: 1 }}>{item.name}</Typography>
                {isCorrect(item, index) && (
                  <CheckIcon color="success" />
                )}
              </CardContent>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
};