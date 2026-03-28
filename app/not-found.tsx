import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub application',

  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist in NoteHub application',
    url: 'https://notehub.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Not Found page preview',
      },
    ],
    type: 'website',
  },
};
const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
};
export default NotFound;