'use client';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Stack,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import birds from '../../data/bird_population.json';
import fish from '../../data/fish.json';
import planets from '../../data/planets.json';
import { DataFile, DataItem } from '@/types/data';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function SortableItem({ item }: { item: DataItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Card ref={setNodeRef} style={style} variant="outlined">
      <CardContent
        sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}
      >
        <DragHandleIcon
          color="action"
          {...attributes}
          {...listeners}
          sx={{ cursor: 'grab', touchAction: 'none' }}
        />
        <Typography variant="body1">{item.name}</Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orderedItems, setOrderedItems] = useState<DataItem[]>([]);

  const datasets: DataFile[] = [birds, fish, planets];
  const { title, description, items } = datasets[selectedIndex];

  // Shuffle whenever the dataset changes
  useEffect(() => {
    setOrderedItems(shuffle(items));
  }, [selectedIndex, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.name === active.id);
        const newIndex = prev.findIndex((i) => i.name === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select a dataset</InputLabel>
        <Select
          value={selectedIndex}
          label="Select a dataset"
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {datasets.map((ds, i) => (
            <MenuItem key={i} value={i}>{ds.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedItems.map((i) => i.name)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={1}>
            {orderedItems.map((item) => (
              <SortableItem key={item.name} item={item} />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
}