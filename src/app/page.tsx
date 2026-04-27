'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent,
  Select, MenuItem, FormControl, InputLabel,
  Button, Alert
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Reorder } from 'motion/react';

import { Dataset, DatasetItem, DatasetMeta } from '@/types/data';

type ItemStatus = 'correct' | 'sequence' | 'normal';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null)
  // const { title, description, items } = datasets[selectedIndex];

  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [datasetMeta, setDatasetMeta] = useState<DatasetMeta[]>([])
  const [feedback, setFeedback] = useState<{
    severity: 'success' | 'info',
    message: string
  } | null>(null);
  const [itemStatuses, setItemStatuses] = useState<Map<number, ItemStatus>>(new Map());

  useEffect(() => {
    fetch("/api/titles")
      .then((r: Response) => r.json())
      .then((data: DatasetMeta[]) => setDatasetMeta(data))
  }, [])

  useEffect(() => {
    if (dataset) {
      const shuffled = [...dataset.items].sort(() => Math.random() - 0.5);
      setShuffledItems(shuffled);
      setFeedback(null);
      setItemStatuses(new Map());
    }

  }, [dataset]);

  useEffect(() => {
    if (datasetMeta.length > selectedIndex){
    fetch(`/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`)
      .then((r: Response) => r.json())
      .then((data: Dataset) => setDataset(data))
    }

  }, [selectedIndex, datasetMeta])

  // Calculate item statuses based on current order vs correct order
  const itemStatusMap = useMemo(() => {
    const statuses = new Map<number, ItemStatus>();
    if (!dataset) return statuses;

    shuffledItems.forEach((item, currentIndex) => {
      const correctIndex = dataset.items.findIndex(d => d.name === item.name);
      statuses.set(item.order, 'normal');
    });

    // Mark items in correct position as 'correct'
    shuffledItems.forEach((item, currentIndex) => {
      const correctIndex = dataset.items.findIndex(d => d.name === item.name);
      if (currentIndex === correctIndex) {
        statuses.set(item.order, 'correct');
      }
    });

    // Mark items that are in correct sequence with neighbors as 'sequence'
    // (but not already marked as 'correct')
    for (let i = 0; i < shuffledItems.length - 1; i++) {
      const item1 = shuffledItems[i];
      const item2 = shuffledItems[i + 1];
      const correctIndex1 = dataset.items.findIndex(d => d.name === item1.name);
      const correctIndex2 = dataset.items.findIndex(d => d.name === item2.name);

      // If both items are consecutive in correct order
      if (correctIndex2 === correctIndex1 + 1) {
        // Only mark as 'sequence' if not already 'correct'
        if (statuses.get(item1.order) !== 'correct') {
          statuses.set(item1.order, 'sequence');
        }
        if (statuses.get(item2.order) !== 'correct') {
          statuses.set(item2.order, 'sequence');
        }
      }
    }

    return statuses;
  }, [dataset, shuffledItems]);

  const handleCheckOrder = () => {
    if (dataset) {
      const correctCount = shuffledItems.reduce((count, item, index) => {
        return item.name === dataset.items[index].name ? count + 1 : count;
      }, 0);

      // Apply the color statuses when checking
      setItemStatuses(itemStatusMap);

      if (correctCount === dataset.items.length) {
        setFeedback({
          severity: 'success',
          message: 'Correct! You solved the puzzle.'
        });
      } else {
        setFeedback({
          severity: 'info',
          message: `${correctCount} of ${dataset.items.length} items are in the correct position.`
        });
      }
    }
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setFeedback(null);
    // Reset all colors when any item is moved
    setItemStatuses(new Map());
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
          {datasetMeta.map((ds, i) => (
            <MenuItem key={i} value={i}>{ds.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleCheckOrder} sx={{ mb: 2 }}>
        Check Order
      </Button>

      <Box sx={{ minHeight: 48, mb: 3 }}>
        {feedback && (
          <Alert severity={feedback.severity}>
            {feedback.message}
          </Alert>
        )}
      </Box>

      {/* Title & description from the JSON */}
      {
        dataset ?
          <>
            <Typography variant="h4" gutterBottom>{dataset.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {dataset.description}
            </Typography>
          </>

          :
          <h3> loading... </h3>
      }


      {/* Item cards */}
      <Reorder.Group
        as="div"
        values={shuffledItems}
        onReorder={handleReorder}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {shuffledItems.map((item) => {
          const status = itemStatuses.get(item.order) || 'normal';
          const statusColor = status === 'correct' ? '#4caf50' : status === 'sequence' ? '#ffeb3b' : 'transparent';
          
          return (
            <Reorder.Item
              key={item.order}
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
                  bgcolor: statusColor,
                  transition: 'background-color 0.2s ease'
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                  <DragHandleIcon color="action" />
                  <Typography variant="body1">{item.name}</Typography>
                </CardContent>
              </Card>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Box>
  );
};