import { Box, Button, Typography } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Dataset } from '@/types/data';

interface DatasetHeaderProps {
  dataset: Dataset | null;
  onShuffle: () => void;
}

export default function DatasetHeader({ dataset, onShuffle }: DatasetHeaderProps) {
  if (!dataset) {
    return <h3> loading... </h3>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4">{dataset.title}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShuffleIcon />}
          onClick={onShuffle}
        >
          Shuffle
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {dataset.description}
      </Typography>
    </>
  );
}