'use client';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { DatasetDetails } from '@/components/DatasetDetails';
import { DatasetSelector } from '@/components/DatasetSelector';
import { OrderFeedback } from '@/components/OrderFeedback';
import { SortableDatasetList } from '@/components/SortableDatasetList';
import { evaluateOrder, shuffleDatasetItems } from '@/lib/dataset-order';
import { Dataset, DatasetItem, DatasetMeta } from '@/types/data';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null);

  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [datasetMeta, setDatasetMeta] = useState<DatasetMeta[]>([]);
  const [feedback, setFeedback] = useState<{
    severity: 'success' | 'info';
    message: string;
  } | null>(null);

  // Load the list of available dataset titles.
  useEffect(() => {
    fetch("/api/titles")
      .then((r: Response) => r.json())
      .then((data: DatasetMeta[]) => setDatasetMeta(data))
  }, [])

  // Fetch that dataset and shuffle items.
  useEffect(() => {
    if (datasetMeta.length > selectedIndex){
      fetch(`/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`)
        .then((r: Response) => r.json())
        .then((data: Dataset) => {
          setDataset(data);
          setShuffledItems(shuffleDatasetItems(data.items));
          setFeedback(null);
        });
    }

  }, [selectedIndex, datasetMeta])

  // Check the current card order against the correct order.
  const handleCheckOrder = () => {
    if (dataset) {
      setFeedback(evaluateOrder(shuffledItems, dataset));
    }
  };

  // Clear feedback and update order when the user drags items.
  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setFeedback(null);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <DatasetSelector
        datasetMeta={datasetMeta}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />

      <Button variant="contained" onClick={handleCheckOrder} sx={{ mb: 2 }}>
        Check Order
      </Button>

      <OrderFeedback feedback={feedback} />

      <DatasetDetails dataset={dataset} />

      <SortableDatasetList
        items={shuffledItems}
        hasFeedback={feedback !== null}
        onReorder={handleReorder}
      />
    </Box>
  );
};