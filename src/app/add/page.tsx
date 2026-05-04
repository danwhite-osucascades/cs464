'use client';
import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Card, CardContent,
  Alert, CircularProgress, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

interface FormItem {
  id: string;
  name: string;
  order: number;
}

export default function AddDataset() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<FormItem[]>([
    { id: '1', name: '', order: 1 },
    { id: '2', name: '', order: 2 }
  ]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    severity: 'success' | 'error',
    message: string
  } | null>(null);

  const addItem = () => {
    const newId = Math.max(...items.map(i => parseInt(i.id)), 0) + 1;
    setItems([...items, { id: newId.toString(), name: '', order: items.length + 1 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 2) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: 'name' | 'order', value: string | number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validation
    if (!title.trim()) {
      setFeedback({ severity: 'error', message: 'Title is required' });
      return;
    }

    if (!slug.trim()) {
      setFeedback({ severity: 'error', message: 'Slug is required' });
      return;
    }

    if (!/^[a-z0-9\-]+$/.test(slug) || !/[a-z0-9]$/.test(slug)) {
      setFeedback({ severity: 'error', message: 'Slug must be lowercase letters, numbers, or hyphens and cannot end with a hyphen' });
      return;
    }

    if (slug === title.trim().toLowerCase()) {
      setFeedback({ severity: 'error', message: 'Slug must not be the same as the dataset title' });
      return;
    }

    if (items.some(item => !item.name.trim())) {
      setFeedback({ severity: 'error', message: 'All items must have a name' });
      return;
    }

    const itemNames = items.map(item => item.name.trim().toLowerCase());
    if (new Set(itemNames).size !== itemNames.length) {
      setFeedback({ severity: 'error', message: 'Item names must be unique' });
      return;
    }

    if (items.some(item => !Number.isInteger(item.order) || item.order < 1)) {
      setFeedback({ severity: 'error', message: 'All items must be ranked' });
      return;
    }

    if (items.length < 2) {
      setFeedback({ severity: 'error', message: 'At least two items are required' });
      return;
    }

    // Check for duplicate orders
    const orders = items.map(i => i.order);
    if (new Set(orders).size !== orders.length) {
      setFeedback({ severity: 'error', message: 'Duplicate order numbers are not allowed' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        slug,
        title,
        description: description || null,
        items: items.map(item => ({
          name: item.name,
          order: item.order
        }))
      };

      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Failed to create dataset';

        try {
          const json = JSON.parse(text);
          if (json.error) {
            errorMessage = typeof json.error === 'string' ? json.error : JSON.stringify(json.error);
          } else if (json.message) {
            errorMessage = String(json.message);
          }
        } catch {
          if (text.trim()) {
            errorMessage = text;
          }
        }

        throw new Error(errorMessage);
      }

      setFeedback({
        severity: 'success',
        message: 'Dataset created successfully!'
      });

      // Reset form
      setTitle('');
      setSlug('');
      setDescription('');
      setItems([
        { id: '1', name: '', order: 1 },
        { id: '2', name: '', order: 2 }
      ]);

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      setFeedback({
        severity: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Dataset
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Dataset Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Dataset Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              margin="normal"
              required
              helperText="Lowercase letters, numbers, and hyphens only. Must not match the dataset title."
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={3}
              required
              disabled={loading}
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Items
            </Typography>

            <TableContainer sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Item Name</TableCell>
                    <TableCell width="120">Order</TableCell>
                    <TableCell width="80">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          disabled={loading}
                          placeholder="Enter item name"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          value={item.order}
                          onChange={(e) => updateItem(item.id, 'order', e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
                          disabled={loading}
                          inputprops={{ min: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.id)}
                          disabled={loading || items.length === 2}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              startIcon={<AddIcon />}
              onClick={addItem}
              disabled={loading}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Item
            </Button>

            {feedback && (
              <Alert severity={feedback.severity} sx={{ mb: 2 }}>
                {feedback.message}
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : undefined}
              >
                {loading ? 'Creating...' : 'Create Dataset'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/')}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
