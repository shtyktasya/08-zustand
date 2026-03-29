import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in the NoteHub application',

  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note in the NoteHub application',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note page preview',
      },
    ],
    type: 'website',
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
