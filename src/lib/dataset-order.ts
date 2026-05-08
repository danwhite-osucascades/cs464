import { Dataset, DatasetItem } from '@/types/data';

export type ItemStatus = 'correct' | 'close' | 'wrong' | 'default';

export interface OrderFeedback {
  severity: 'success' | 'info';
  message: string;
}

// Item status background colors
export const statusColors: Record<ItemStatus, string> = {
  correct: '#e6f4ea',
  close: '#fff9e6',
  wrong: '#f0f0f0',
  default: 'white',
};

// Shuffle item array
export function shuffleDatasetItems(items: DatasetItem[]): DatasetItem[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// Maps each item to the visual state after feedback
export function getItemStatus(
  item: DatasetItem,
  index: number,
  hasFeedback: boolean
): ItemStatus {
  if (!hasFeedback) {
    return 'default';
  }

  const diff = Math.abs(item.order - (index + 1));
  if (diff === 0) {
    return 'correct';
  }

  if (diff <= 2) {
    return 'close';
  }

  return 'wrong';
}

// Compares current order to correct order for feedback
export function evaluateOrder(
  shuffledItems: DatasetItem[],
  dataset: Dataset
): OrderFeedback {
  const correctCount = shuffledItems.reduce((count, item, index) => {
    return item.name === dataset.items[index]?.name ? count + 1 : count;
  }, 0);

  if (correctCount === dataset.items.length) {
    return {
      severity: 'success',
      message: 'Correct! You solved the puzzle.',
    };
  }

  return {
    severity: 'info',
    message: `${correctCount} of ${dataset.items.length} items are in the correct position.`,
  };
}