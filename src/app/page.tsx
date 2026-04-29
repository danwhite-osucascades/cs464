'use client';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent,
  Select, MenuItem, FormControl, InputLabel,
  Button, Alert
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Reorder } from 'motion/react';

import { Dataset, DatasetItem, DatasetMeta } from '@/types/data';

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
  const [itemStatuses, setItemStatuses] = useState<Record<number, { status: 'correct' | 'close' | 'wrong', distance: number }> | null>(null);

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
    }

  }, [dataset]);

  useEffect(() => {
    if (datasetMeta.length > selectedIndex){
    fetch(`/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`)
      .then((r: Response) => r.json())
      .then((data: Dataset) => setDataset(data))
    }

  }, [selectedIndex, datasetMeta])

  const handleCheckOrder = () => {
    if (dataset) {
      const statuses: Record<number, { status: 'correct' | 'close' | 'wrong', distance: number }> = {};
      let correctCount = 0;

      shuffledItems.forEach((item, index) => {
        const correctIndex = item.order - 1;
        const distance = Math.abs(correctIndex - index);
        if (distance === 0) {
          statuses[item.order] = { status: 'correct', distance };
          correctCount++;
        } else if (distance === 1) {
          statuses[item.order] = { status: 'close', distance };
        } else {
          statuses[item.order] = { status: 'wrong', distance };
        }
      });

      setItemStatuses(statuses);

      if (correctCount === dataset.items.length) {
        setFeedback({ severity: 'success', message: 'Correct! You solved the puzzle.' });
      } else {
        setFeedback({ severity: 'info', message: `${correctCount} of ${dataset.items.length} items are in the correct position.` });
      }
    }
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setFeedback(null);
    setItemStatuses(null);
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
        {shuffledItems.map((item) => (
          <Reorder.Item
            key={item.order}
            value={item}
            as="div"
            style={{ position: 'relative' }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            <Card variant="outlined" sx={{
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: 'background-color 0.3s',
                bgcolor: itemStatuses
                  ? itemStatuses[item.order].status === 'correct' ? 'success.light'
                    : itemStatuses[item.order].status === 'close' ? 'warning.light'
                    : 'grey.300'
                  : undefined
              }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                <DragHandleIcon color="action" />
                <Typography variant="body1">{item.name}</Typography>
                {itemStatuses && itemStatuses[item.order].status === 'close' && (
                  <Typography variant="caption" sx={{ ml: 'auto', color: 'warning.dark' }}>
                    #{itemStatuses[item.order].distance} close
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
};