import { describe, it, expect } from 'vitest';
import { getItemDirections } from './verifyOrder';
import { DatasetItem } from '@/types/data';

const item = (name: string, order: number): DatasetItem => ({ name, order });

describe('getItemDirections', () => {
  it('returns an empty map when all items are already sorted', () => {
    const items = [item('A', 1), item('B', 2), item('C', 3)];
    expect(getItemDirections(items).size).toBe(0);
  });

  it('returns up for an item that needs to move earlier in the list', () => {
    const items = [item('C', 3), item('B', 2), item('A', 1)];
    const directions = getItemDirections(items);
    expect(directions.get(2)).toBe('up'); 
  });

  it('returns down for an item that needs to move later in the list', () => {
    const items = [item('C', 3), item('B', 2), item('A', 1)];
    const directions = getItemDirections(items);
    expect(directions.get(0)).toBe('down'); 
  });

  it('assigns directions to every item in a fully reversed list', () => {
    const items = [item('C', 3), item('B', 2), item('A', 1)];
    const directions = getItemDirections(items);
    expect(directions.size).toBe(2);
    expect(directions.has(1)).toBe(false);
  });

  it('returns an empty map for a single item', () => {
    expect(getItemDirections([item('A', 1)]).size).toBe(0);
  });

  it('returns an empty map for an empty array', () => {
    expect(getItemDirections([]).size).toBe(0);
  });

  it('only the out-of-place item gets a direction when one item is swapped', () => {
    const items = [item('B', 2), item('A', 1), item('C', 3)];
    const directions = getItemDirections(items);
    expect(directions.get(0)).toBe('down');
    expect(directions.get(1)).toBe('up');
    expect(directions.has(2)).toBe(false);
  });
});
