import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}
const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={event => onPageChange(event.selected)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      previousLabel="←"
      nextLabel="→"
    />
  );
};
export default Pagination;
