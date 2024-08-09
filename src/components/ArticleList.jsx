import { useEffect, useState } from "react";
import { fetchArticles } from "../../newsApi";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import Options from "./Options";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, SetArticlesPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("ASC");
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortArticles = (articles, orderByQuery) => {
    if (orderByQuery === "DESC" && sortBy === "comment_count") {
      return articles.sort(
        (a, b) => Number(b.comment_count) - Number(a.comment_count)
      );
    } else if (orderByQuery === "ASC" && sortBy === "comment_count") {
      return articles.sort(
        (a, b) => Number(a.comment_count) - Number(b.comment_count)
      );
    }
    return articles;
  };
  useEffect(() => {
    const queryObject = {
      topic,
      sort_by: searchParams.get("sort_by"),
      order_by: searchParams.get("order_by"),
    };
    setIsLoading(true);
    fetchArticles(queryObject).then((articles) => {
      const sortedArticles = sortArticles(articles, orderBy);
      setArticles(sortedArticles);
      setIsLoading(false);
    });
  }, [topic, sortBy, orderBy]);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <main>
      {isLoading && <h2>Loading...</h2>}
      <div className="flex-container">
        <Pagination
          length={articles.length}
          articlesPerPage={articlesPerPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
        <Options
          setSearchParams={setSearchParams}
          setOrderBy={setOrderBy}
          setSortBy={setSortBy}
          sortBy={sortBy}
          orderBy={orderBy}
        />
      </div>
      <div className="grid-container">
        {currentArticles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </main>
  );
};
export default ArticleList;
