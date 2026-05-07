import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatasetMeta } from '@/types/data';

type Props = {
  selectedIndex: number;
  datasets: DatasetMeta[];
  onChange: (index: number) => void;
};

export default function DatasetSelect({ selectedIndex, datasets, onChange }: Props) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Select a dataset</InputLabel>
      <Select
        value={selectedIndex}
        label="Select a dataset"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {datasets.map((ds, i) => (
          <MenuItem key={i} value={i}>{ds.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}