'use client';
import { Box, Typography, Button } from '@mui/material';

import DatasetSelect from '@/components/dataset_select';
import FeedbackAlert from '@/components/feedback_alert';
import OrderList from '@/components/order_list';
import useOrderGame from '@/hooks/order_game';

export default function Home() {
  const {
    dataset, shuffledItems, isDragging, datasetMeta,
    feedback, selectedIndex, setSelectedIndex,
    handleCheckOrder, handleReorder,
    onDragStart, onDragEnd,
  } = useOrderGame();

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <DatasetSelect selectedIndex={selectedIndex} datasets={datasetMeta} onChange={setSelectedIndex} />

      <Button variant="contained" onClick={handleCheckOrder} sx={{ mb: 2 }}>
        Check Order
      </Button>

      <FeedbackAlert feedback={feedback} />

      {dataset ? (
        <>
          <Typography variant="h4" gutterBottom>{dataset.title}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{dataset.description}</Typography>
        </>
      ) : (
        <h3>loading...</h3>
      )}

      <OrderList
        items={shuffledItems}
        isDragging={isDragging}
        feedback={feedback}
        onReorder={handleReorder}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    </Box>
  );
}