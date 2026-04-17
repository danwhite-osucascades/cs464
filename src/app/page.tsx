'use client';
import { useState, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, Stack,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import birds from '../../data/bird_population.json';
import fish from '../../data/fish.json';
import planets from '../../data/planets.json';

import { DataFile } from '@/types/data';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function SortableItem({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
  };

  return (
    <Card ref={setNodeRef} style={style} variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
        <DragHandleIcon color="action" {...attributes} {...listeners} />
        <Typography variant="body1">{name}</Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const datasets: DataFile[] = [birds, fish, planets];
  const { title, description, items } = datasets[selectedIndex];

  const [orderedItems, setOrderedItems] = useState(() => shuffle(items));


  useMemo(() => {
    setOrderedItems(shuffle(items));
  }, [selectedIndex]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.name === active.id);
      const newIndex = prev.findIndex((item) => item.name === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedItems.map(i => i.name)} strategy={verticalListSortingStrategy}>
          <Stack spacing={1}>
            {orderedItems.map((item) => (
              <SortableItem key={item.name} id={item.name} name={item.name} />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

    </Box>
  );
}