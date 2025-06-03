import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentOperation {
  id: string;
  type: string;
  filename: string;
  timestamp: number;
}

interface PDFState {
  recentOperations: RecentOperation[];
  addOperation: (operation: Omit<RecentOperation, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const usePDFStore = create<PDFState>()(
  persist(
    (set) => ({
      recentOperations: [],
      addOperation: (operation) =>
        set((state) => ({
          recentOperations: [
            {
              ...operation,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.recentOperations.slice(0, 9),
          ],
        })),
      clearHistory: () => set({ recentOperations: [] }),
    }),
    {
      name: 'pdf-storage',
    }
  )
);