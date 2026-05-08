import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { DatasetMeta } from '@/types/data';

interface DatasetSelectorProps {
  datasetMeta: DatasetMeta[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

// Form control for selecting which dataset to load.
export function DatasetSelector({
  datasetMeta,
  selectedIndex,
  onChange,
}: DatasetSelectorProps) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Select a dataset</InputLabel>
      <Select
        value={selectedIndex}
        label="Select a dataset"
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {datasetMeta.map((dataset, index) => (
          <MenuItem key={dataset.dataset_slug} value={index}>
            {dataset.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}