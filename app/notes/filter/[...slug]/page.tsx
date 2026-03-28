import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};
export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const category: NoteTag | undefined = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', category],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        ...(category ? { tag: category } : {}),
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={category ?? 'all'} category={category} />
    </HydrationBoundary>
  );
}
