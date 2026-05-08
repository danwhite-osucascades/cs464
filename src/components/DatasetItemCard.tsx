import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Card, CardContent, Typography } from '@mui/material';
 
interface DatasetItemCardProps {
  name: string;
  backgroundColor: string;
  isDragging: boolean;
}

export function DatasetItemCard({
  name,
  backgroundColor,
  isDragging,
}: DatasetItemCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        // Cursor feedback mirrors the drag state.
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
        <DragHandleIcon color="action" />
        <Typography variant="body1">{name}</Typography>
      </CardContent>
    </Card>
  );
}