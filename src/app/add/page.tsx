'use client';
import { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton,
  Alert, Paper, Divider, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Reorder } from 'motion/react';
import Link from 'next/link';

interface DraftItem {
  id: string;
  name: string;
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function AddDatasetPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<DraftItem[]>([
    { id: crypto.randomUUID(), name: '' },
    { id: crypto.randomUUID(), name: '' },
    { id: crypto.randomUUID(), name: '' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'idle';
    message: string;
  }>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(toSlug(value));
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    setSlug(toSlug(value));
  };

  const slugError = (() => {
    if (!slug) return null;
    if (slug.length < 3) return 'Must be at least 3 characters.';
    if (slug.endsWith('-')) return 'Must not end with a hyphen.';
    return null;
  })();

  const addItem = () => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), name: '' }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const validate = (): string | null => {
    if (!title.trim()) return 'Please enter a title.';
    if (!slug || slug.length < 3) return 'Please enter a valid slug (at least 3 characters).';
    if (slugError) return slugError;
    if (!description.trim()) return 'Please enter a description.';
    const filledItems = items.filter((i) => i.name.trim());
    if (filledItems.length < 2) return 'Please add at least 2 items.';
    const names = filledItems.map((i) => i.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) return 'All item names must be unique.';
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    const filledItems = items
      .filter((i) => i.name.trim())
      .map((item, index) => ({ name: item.name.trim(), order: index + 1 }));

    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title: title.trim(),
          description: description.trim(),
          items: filledItems,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 409) {
          throw new Error('A dataset with this slug already exists. Try a different slug.');
        }
        throw new Error(body?.error ?? `Server error: ${res.status}`);
      }

      setStatus({ type: 'success', message: 'Dataset added! Head back to play with it.' });
      setTitle('');
      setSlug('');
      setSlugTouched(false);
      setDescription('');
      setItems([
        { id: crypto.randomUUID(), name: '' },
        { id: crypto.randomUUID(), name: '' },
        { id: crypto.randomUUID(), name: '' },
      ]);
    } catch (err: unknown) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2, pb: 8 }}>

      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: 'text.secondary' }}
        size="small"
      >
        Back to game
      </Button>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Add a dataset
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create your own sorting puzzle. Arrange the items in the correct order — players will
        have to figure it out.
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
          Details
        </Typography>

        <TextField
          label="Title"
          placeholder="e.g. Planets by distance from the Sun"
          fullWidth
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Slug"
          placeholder="e.g. planets-by-distance"
          fullWidth
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          error={!!slugError}
          helperText={
            slugError ??
            'Auto-generated from title. Lowercase letters, numbers, and hyphens only.'
          }
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          placeholder="e.g. Sort these planets from closest to farthest from the Sun."
          fullWidth
          multiline
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
          Items{' '}
          <Typography component="span" variant="body2" color="text.secondary">
            (in correct order, top = first)
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag to reorder. Empty rows will be ignored.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Reorder.Group
          as="div"
          values={items}
          onReorder={setItems}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {items.map((item, index) => (
            <Reorder.Item
              key={item.id}
              value={item}
              as="div"
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.75,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                <DragHandleIcon color="action" sx={{ flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ minWidth: 20, flexShrink: 0 }}
                >
                  {index + 1}.
                </Typography>
                <TextField
                  variant="standard"
                  placeholder={`Item ${index + 1}`}
                  fullWidth
                  value={item.name}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  onPointerDown={(e) => e.stopPropagation()}
                  slotProps={{ input: { disableUnderline: true } }}
                  sx={{ '& input': { py: 0.25 } }}
                />
                <Tooltip title="Remove item">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 1}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <Button
          startIcon={<AddIcon />}
          onClick={addItem}
          sx={{ mt: 2 }}
          size="small"
        >
          Add item
        </Button>
      </Paper>

      <Box sx={{ minHeight: 48, mb: 2 }}>
        {status.type !== 'idle' && (
          <Alert
            severity={status.type}
            icon={status.type === 'success' ? <CheckCircleIcon /> : undefined}
          >
            {status.message}{' '}
            {status.type === 'success' && (
              <Link href="/" style={{ color: 'inherit', fontWeight: 600 }}>
                Play now →
              </Link>
            )}
          </Alert>
        )}
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving…' : 'Save dataset'}
      </Button>
    </Box>
  );
}