'use client';
import css from './page.module.css';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import type { Note, NoteTag } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

type NotesClientProps = {
  category?: NoteTag;
};
export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, category],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        ...(category ? { tag: category } : {}),
      }),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={selectedPage => setPage(selectedPage + 1)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && notes.length === 0 && <p>No notes found</p>}
    </div>
  );
}
