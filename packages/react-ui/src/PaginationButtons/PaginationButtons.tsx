export default function PaginationButtons(props: any) {
  const { count, currentPage, itemsPerPage, onClick } = props;
  const pages = new Array(Math.ceil(count / itemsPerPage)).fill(0);

  const firstPage = 0;
  const lastPage = pages.length - 1;
  const isOverLastPage = currentPage > lastPage;
  const isUnderFirstPage = currentPage < firstPage;
  const safeCurrentPage = isOverLastPage
    ? lastPage
    : isUnderFirstPage
    ? firstPage
    : currentPage;

  return (
    <div className="btn-group">
      {pages.map((_, i) => {
        const isActive = i === safeCurrentPage || (i === 0 && !safeCurrentPage);
        return (
          <button
            key={i}
            className={`btn ${isActive ? "btn-active" : ""}`}
            onClick={() => onClick(i)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
