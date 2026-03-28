import { create } from 'zustand';
import { NewNoteData } from '../api';
import type { NoteTag } from '@/types/note';
import { persist } from 'zustand/middleware';

const NOTE_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (draft: Partial<NewNoteData>) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};
export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: draft => set(state => ({ draft: { ...state.draft, ...draft } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),

    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
