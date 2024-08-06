// copy pasted from https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04
const Pagination = ({
  articlesPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / articlesPerPage); i++) {
    paginationNumber.push(i);
  }
  return (
    <div className="pagination">
      {paginationNumber.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={currentPage === data ? "active" : ""}
        >
          {data}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
