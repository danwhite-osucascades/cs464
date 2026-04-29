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

// How many positions away counts as "close"
const CLOSE_THRESHOLD = 2;

type ItemStatus = 'correct' | 'close' | 'wrong' | 'unchecked';

function getItemStatus(item: DatasetItem, currentIndex: number, correctItems: DatasetItem[]): ItemStatus {
  const correctIndex = correctItems.findIndex(i => i.name === item.name);
  const distance = Math.abs(correctIndex - currentIndex);

  if (distance === 0) return 'correct';
  if (distance <= CLOSE_THRESHOLD) return 'close';
  return 'wrong';
}

const statusStyles: Record<ItemStatus, object> = {
  correct:   { borderColor: '#4caf50', backgroundColor: '#f0faf0' },
  close:     { borderColor: '#ff9800', backgroundColor: '#fff8f0' },
  wrong:     { borderColor: '#bdbdbd', backgroundColor: '#f5f5f5' },
  unchecked: {},
};

const statusIconColor: Record<ItemStatus, 'action' | 'success' | 'warning' | 'disabled'> = {
  correct:   'success',
  close:     'warning',
  wrong:     'disabled',
  unchecked: 'action',
};

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null);

  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [datasetMeta, setDatasetMeta] = useState<DatasetMeta[]>([]);
  const [itemStatuses, setItemStatuses] = useState<Record<string, ItemStatus>>({});
  const [feedback, setFeedback] = useState<{
    severity: 'success' | 'info',
    message: string
  } | null>(null);

  useEffect(() => {
    fetch("/api/titles")
      .then((r: Response) => r.json())
      .then((data: DatasetMeta[]) => setDatasetMeta(data));
  }, []);

  useEffect(() => {
    if (dataset) {
      const shuffled = [...dataset.items].sort(() => Math.random() - 0.5);
      setShuffledItems(shuffled);
      setItemStatuses({});  // clear colors on new dataset
      setFeedback(null);
    }
  }, [dataset]);

  useEffect(() => {
    if (datasetMeta.length > selectedIndex) {
      fetch(`/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`)
        .then((r: Response) => r.json())
        .then((data: Dataset) => setDataset(data));
    }
  }, [selectedIndex, datasetMeta]);

  const handleCheckOrder = () => {
    if (!dataset) return;

    const newStatuses: Record<string, ItemStatus> = {};
    let correctCount = 0;

    shuffledItems.forEach((item, index) => {
      const status = getItemStatus(item, index, dataset.items);
      newStatuses[item.name] = status;
      if (status === 'correct') correctCount++;
    });

    setItemStatuses(newStatuses);

    if (correctCount === dataset.items.length) {
      setFeedback({ severity: 'success', message: 'Correct! You solved the puzzle.' });
    } else {
      setFeedback({ severity: 'info', message: `${correctCount} of ${dataset.items.length} items are in the correct position.` });
    }
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setItemStatuses({});  // clear colors when user moves something
    setFeedback(null);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>

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

      {dataset ? (
        <>
          <Typography variant="h4" gutterBottom>{dataset.title}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {dataset.description}
          </Typography>
        </>
      ) : (
        <h3>loading...</h3>
      )}

      <Reorder.Group
        as="div"
        values={shuffledItems}
        onReorder={handleReorder}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {shuffledItems.map((item) => {
          const status = itemStatuses[item.name] ?? 'unchecked';
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
                  transition: 'background-color 0.3s, border-color 0.3s',
                  ...statusStyles[status],
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
                  <DragHandleIcon color={statusIconColor[status]} />
                  <Typography variant="body1">{item.name}</Typography>
                </CardContent>
              </Card>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Box>
  );
}