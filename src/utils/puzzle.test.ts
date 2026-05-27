import { describe, it, expect } from 'vitest';
import { getItemStatus, countCorrectItems, shuffleItems } from './puzzle';
import { DatasetItem } from '@/types/data';

const item = (name: string, order: number): DatasetItem => ({ name, order });

describe('getItemStatus', () => {
  it('returns default when hasFeedback is false', () => {
    expect(getItemStatus(item('A', 1), 0, false)).toBe('default');
  });

  it('returns correct when item is in the right position', () => {
    expect(getItemStatus(item('A', 1), 0, true)).toBe('correct');
  });

  it('returns close when item is 1 position off', () => {
    expect(getItemStatus(item('A', 1), 1, true)).toBe('close');
  });

  it('returns close when item is exactly 2 positions off', () => {
    expect(getItemStatus(item('A', 1), 2, true)).toBe('close');
  });

  it('returns wrong when item is 3 or more positions off', () => {
    expect(getItemStatus(item('A', 1), 3, true)).toBe('wrong');
  });

  it('handles negative diff correctly (item order > index+1)', () => {
    expect(getItemStatus(item('A', 5), 0, true)).toBe('wrong');
  });

  it('returns default regardless of position when hasFeedback is false', () => {
    expect(getItemStatus(item('A', 3), 10, false)).toBe('default');
  });
});

describe('countCorrectItems', () => {
  it('returns 0 when no items are in the correct position', () => {
    const shuffled = [item('B', 2), item('A', 1)];
    const correct = [item('A', 1), item('B', 2)];
    expect(countCorrectItems(shuffled, correct)).toBe(0);
  });

  it('returns full count when all items are in the correct position', () => {
    const items = [item('A', 1), item('B', 2), item('C', 3)];
    expect(countCorrectItems(items, items)).toBe(3);
  });

  it('returns partial count when some items match', () => {
    const shuffled = [item('A', 1), item('C', 3), item('B', 2)];
    const correct = [item('A', 1), item('B', 2), item('C', 3)];
    expect(countCorrectItems(shuffled, correct)).toBe(1);
  });

  it('returns 0 for empty arrays', () => {
    expect(countCorrectItems([], [])).toBe(0);
  });
});

describe('shuffleItems', () => {
  it('does not mutate the original array', () => {
    const original = [item('A', 1), item('B', 2), item('C', 3)];
    const copy = [...original];
    shuffleItems(original);
    expect(original).toEqual(copy);
  });

  it('returns an array with the same length', () => {
    const items = [item('A', 1), item('B', 2), item('C', 3)];
    expect(shuffleItems(items)).toHaveLength(3);
  });

  it('returns an array containing all the same items', () => {
    const items = [item('A', 1), item('B', 2), item('C', 3)];
    const result = shuffleItems(items);
    expect(result).toEqual(expect.arrayContaining(items));
    expect(items).toEqual(expect.arrayContaining(result));
  });

  it('returns an empty array when given an empty array', () => {
    expect(shuffleItems([])).toEqual([]);
  });
});
