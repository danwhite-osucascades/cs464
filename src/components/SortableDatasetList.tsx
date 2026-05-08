'use client';

import { useState } from 'react';

import { Reorder } from 'motion/react';

import { DatasetItemCard } from '@/components/DatasetItemCard';
import { getItemStatus, statusColors } from '@/lib/dataset-order';
import { DatasetItem } from '@/types/data';

interface SortableDatasetListProps {
  items: DatasetItem[];
  hasFeedback: boolean;
  onReorder: (newOrder: DatasetItem[]) => void;
}

// Reorder library for reordering dataset items
export function SortableDatasetList({
  items,
  hasFeedback,
  onReorder,
}: SortableDatasetListProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Group
      as="div"
      values={items}
      onReorder={onReorder}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={item.order}
          value={item}
          as="div"
          style={{ position: 'relative' }}

          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          <DatasetItemCard
            name={item.name}
            backgroundColor={statusColors[getItemStatus(item, index, hasFeedback)]}
            isDragging={isDragging}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}