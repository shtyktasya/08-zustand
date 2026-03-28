import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.join(' / ') || 'all';

  return {
    title: `Notes filtered by: ${filter} | NoteHub`,
    description: `Viewing notes filtered by: ${filter} in NoteHub application`,

    openGraph: {
      title: `Notes filtered by: ${filter} | NoteHub`,
      description: `Viewing notes filtered by: ${filter} in NoteHub application`,
      url: `https://notehub.com/notes/filter/${slug?.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Filtered notes preview',
        },
      ],
      type: 'website',
    },
  };
}
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
