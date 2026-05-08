import { Alert, Box } from '@mui/material';

import { OrderFeedback as OrderFeedbackState } from '@/lib/dataset-order';

interface OrderFeedbackProps {
  feedback: OrderFeedbackState | null;
}

// Reserves space for the message so the list does not jump when feedback appears or clears.
export function OrderFeedback({ feedback }: OrderFeedbackProps) {
  return (
    <Box sx={{ minHeight: 48, mb: 3 }}>
      {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}
    </Box>
  );
}