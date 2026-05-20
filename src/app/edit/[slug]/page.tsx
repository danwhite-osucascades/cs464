'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box, Typography, TextField, Button, IconButton, Alert, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dataset } from '@/types/data';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/, '');
}

function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    if ('errors' in error) return extractErrorMessage((error as Record<string, unknown>).errors);
    const entries = Object.entries(error as Record<string, unknown>);
    if (entries.length > 0) return entries.map(([k, v]) => `${k}: ${extractErrorMessage(v)}`).join(', ');
  }
  if (Array.isArray(error)) return error.map(extractErrorMessage).join(', ');
  return 'An unknown error occurred';
}

export default function EditDatasetPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isBuiltin, setIsBuiltin] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load dataset on mount
  useEffect(() => {
    const loadDataset = async () => {
      try {
        const res = await fetch(`/api/data?name=${slug}`);
        if (!res.ok) {
          setError('Dataset not found');
          return;
        }

        const dataset: Dataset = await res.json();

        if (dataset.is_builtin) {
          setError('Built-in datasets cannot be edited');
          setIsBuiltin(true);
          return;
        }

        setTitle(dataset.title);
        setDescription(dataset.description || '');
        setItems(dataset.items.map(item => item.name));
        setIsBuiltin(dataset.is_builtin || false);
      } catch (err) {
        setError('Failed to load dataset');
      } finally {
        setInitialLoading(false);
      }
    };

    loadDataset();
  }, [slug]);

  const handleAddItem = () => setItems(prev => [...prev, '']);

  const handleItemChange = (index: number, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setError(null);

    const filledItems = items.filter(name => name.trim());

    if (!title.trim()) { setError('Dataset name is required'); return; }
    if (filledItems.length < 2) { setError('At least 2 items are required'); return; }

    setLoading(true);
    try {
      const res = await fetch(`/api/data?slug=${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          items: filledItems.map((name, index) => ({ name: name.trim(), order: index + 1 })),
        }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(extractErrorMessage(data.error));
      }
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/data?slug=${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(extractErrorMessage(data.error));
      }
    } catch {
      setError('Network error — please try again');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (initialLoading) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton
            onClick={() => router.push('/')}
            aria-label="close"
          >
            <CloseIcon sx={{ fontSize: 36, fontWeight: 'bold' }} />
          </IconButton>
        </Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2, position: 'relative', pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <IconButton
          onClick={() => router.push('/')}
          aria-label="close"
        >
          <CloseIcon sx={{ fontSize: 36, fontWeight: 'bold' }} />
        </IconButton>
      </Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Edit Dataset</Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Data set name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          slotProps={{ input: { 'aria-label': 'dataset name' } }}
        />
      </Box>

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ width: 24, textAlign: 'right', flexShrink: 0, color: 'text.secondary' }}>
              {index + 1}
            </Typography>
            <TextField
              fullWidth
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              disabled={loading}
              placeholder={index === 0 ? '1st Item' : index === 1 ? '2nd Item' : `${index + 1}th Item`}
              size="small"
            />
            {items.length > 2 && (
              <IconButton
                onClick={() => handleRemoveItem(index)}
                disabled={loading}
                size="small"
                aria-label="remove item"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={handleAddItem}
          disabled={loading}
          aria-label="add item"
        >
          <AddIcon sx={{ fontSize: 52 }} />
        </IconButton>
        <Typography variant="body2" align="center">Add new item</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.5,
            borderColor: '#e89b00',
            color: '#e89b00',
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': { borderColor: '#c47e00', color: '#c47e00', borderWidth: 2, bgcolor: 'transparent' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.5,
            borderColor: '#3700cc',
            color: '#3700cc',
            borderWidth: 2,
            fontWeight: 'bold',
            '&:hover': { borderColor: '#2500aa', color: '#2500aa', borderWidth: 2, bgcolor: 'transparent' },
          }}
        >
          {loading ? 'Saving...' : 'SAVE'}
        </Button>
      </Box>

      <Button
        variant="outlined"
        onClick={() => setShowDeleteConfirm(true)}
        disabled={loading || deleting}
        fullWidth
        sx={{
          py: 1.5,
          borderColor: '#d32f2f',
          color: '#d32f2f',
          borderWidth: 2,
          fontWeight: 'bold',
          '&:hover': { borderColor: '#b71c1c', color: '#b71c1c', borderWidth: 2, bgcolor: 'transparent' },
        }}
      >
        Delete Dataset
      </Button>

      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this dataset? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            color="error"
            variant="contained"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
