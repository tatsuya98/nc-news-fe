const Options = ({
  setSortBy,
  setOrderBy,
  setSearchParams,
  sortBy,
  orderBy,
}) => {
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    if (e.target.value !== "comment_count") {
      setSearchParams({ sort_by: e.target.value, order_by: orderBy });
    }
  };
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
    if (sortBy !== "comment_count") {
      setSearchParams({ sort_by: sortBy, order_by: e.target.value });
    }
  };
  return (
    <div className="query-container">
      <select name="sort-by" id="sort-by" onChange={handleSortBy}>
        <option value="created_at">date</option>
        <option value="comment_count">comments</option>
        <option value="votes">votes</option>
      </select>
      <select name="order-by" id="order-by" onChange={handleOrderBy}>
        <option value="ASC">ascending</option>
        <option value="DESC">descending</option>
      </select>
    </div>
  );
};

export default Options;
