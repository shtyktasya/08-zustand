'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const router = useRouter();
  const handleclose = () => router.back();

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    refetchOnMount: false,
  });
  if (isLoading)
    return (
      <Modal onClose={handleclose}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  if (error || !note)
    return (
      <Modal onClose={handleclose}>
        <p>Something went wrong.</p>
      </Modal>
    );
  return (
    <Modal onClose={handleclose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
