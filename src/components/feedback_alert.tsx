import { Box, Alert } from '@mui/material';

type Props = {
  feedback: { severity: 'success' | 'info'; message: string } | null;
};

export default function FeedbackAlert({ feedback }: Props) {
  return (
    <Box sx={{ minHeight: 48, mb: 3 }}>
      {feedback && (
        <Alert severity={feedback.severity}>
          {feedback.message}
        </Alert>
      )}
    </Box>
  );
}