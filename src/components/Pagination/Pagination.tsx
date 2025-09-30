import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number; // всего страниц
  currentPage: number; // текущая страница (0-based)
  onPageChange: (selectedPage: number) => void; // колбек при смене страницы
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  // Если страниц <= 1 — не рендерим пагинацию
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(data) => onPageChange(data.selected)}
      previousLabel={"<"}
      nextLabel={">"}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
