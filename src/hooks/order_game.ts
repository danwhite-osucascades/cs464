import { useState, useEffect } from 'react';
import { Dataset, DatasetItem, DatasetMeta } from '@/types/data';

export default function useOrderGame() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [datasetMeta, setDatasetMeta] = useState<DatasetMeta[]>([]);
  const [feedback, setFeedback] = useState<{ severity: 'success' | 'info'; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/titles").then(r => r.json()).then(setDatasetMeta);
  }, []);

  useEffect(() => {
    if (dataset) {
      setShuffledItems([...dataset.items].sort(() => Math.random() - 0.5));
      setFeedback(null);
    }
  }, [dataset]);

  useEffect(() => {
    if (datasetMeta.length > selectedIndex) {
      fetch(`/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`)
        .then(r => r.json())
        .then(setDataset);
    }
  }, [selectedIndex, datasetMeta]);

  const handleCheckOrder = () => {
    if (!dataset) return;
    const correctCount = shuffledItems.reduce((count, item, index) =>
      item.name === dataset.items[index].name ? count + 1 : count, 0);
    setFeedback(correctCount === dataset.items.length
      ? { severity: 'success', message: 'Correct! You solved the puzzle.' }
      : { severity: 'info', message: `${correctCount} of ${dataset.items.length} items are in the correct position.` }
    );
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setFeedback(null);
  };

  return {
    dataset, shuffledItems, isDragging, datasetMeta,
    feedback, selectedIndex, setSelectedIndex,
    handleCheckOrder, handleReorder,
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  };
}