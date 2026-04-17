'use client';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Stack,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DataFile } from '@/types/data';
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';


function SortableItem({ item }: { item: { name: string } }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.name });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '12px !important' }}>
        <DragHandleIcon color="action" />
        <Typography variant="body1">{item.name}</Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [datasets, setDatasets] = useState<DataFile[]>([]);
  const [orderedItems, setOrderedItems] = useState<DataFile['items']>([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(({ datasets }) => setDatasets(Object.values(datasets)));
  }, []);

  useEffect(() => {
    if (datasets.length > 0) setOrderedItems([...datasets[selectedIndex].items].sort(() => Math.random() - 0.5));
  }, [selectedIndex, datasets]);

  if (datasets.length === 0) return null;

  const { title, description } = datasets[selectedIndex];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>

      {/* Dropdown */}
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

      {/* Title & description from the JSON */}
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{description}</Typography>

      {/* Item cards */}
      <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          setOrderedItems(items => arrayMove(items,
            items.findIndex(i => i.name === active.id),
            items.findIndex(i => i.name === over.id)
          ));
        }
      }}>
        <SortableContext items={orderedItems.map(i => i.name)} strategy={verticalListSortingStrategy}>
          <Stack spacing={1}>
            {orderedItems.map(item => <SortableItem key={item.name} item={item} />)}
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
