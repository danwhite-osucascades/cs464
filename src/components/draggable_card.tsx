import { Card, CardContent, Typography } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Reorder } from 'motion/react';
import { DatasetItem } from '@/types/data';

type Props = {
  item: DatasetItem;
  isDragging: boolean;
  backgroundColor: string;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export default function DraggableCard({ item, isDragging, backgroundColor, onDragStart, onDragEnd }: Props) {
  return (
    <Reorder.Item
      key={item.order}
      value={item}
      as="div"
      style={{ position: 'relative' }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Card
        variant="outlined"
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
          backgroundColor,
          transition: 'background-color 0.3s ease',
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
          <DragHandleIcon color="action" />
          <Typography variant="body1">{item.name}</Typography>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}