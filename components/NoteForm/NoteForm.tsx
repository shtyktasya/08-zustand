'use client';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { createNote, type NewNoteData } from '@/lib/api';
import type { NoteTag } from '@/types/note';

const NOTE_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NoteForm = () => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleCancel = () => router.push('/notes/filter/all');

  const handleFormAction = async (formData: FormData) => {
    const note: NewNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };

    try {
      await createNote(note);
      clearDraft();
      router.push('/notes/filter/all');
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  return (
    <form className={css.form} action={handleFormAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {NOTE_TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
