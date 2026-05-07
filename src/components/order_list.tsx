import { Reorder } from 'motion/react';
import { DatasetItem } from '@/types/data';
import DraggableCard from './draggable_card';
import { statusColors, getItemStatus } from '@/lib/order_utils';

type Props = {
  items: DatasetItem[];
  isDragging: boolean;
  feedback: object | null;
  onReorder: (newOrder: DatasetItem[]) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export default function OrderList({ items, isDragging, feedback, onReorder, onDragStart, onDragEnd }: Props) {
  return (
    <Reorder.Group as="div" values={items} onReorder={onReorder}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, index) => (
        <DraggableCard
          key={item.order}
          item={item}
          isDragging={isDragging}
          backgroundColor={statusColors[getItemStatus(item, index, feedback)]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </Reorder.Group>
  );
}