import { useEffect, useState } from "react";
import { fetchArticles } from "../../newsApi";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, SetArticlesPerPage] = useState(10);
  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);
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
      <div className="grid-container">
        <Pagination
          length={articles.length}
          articlesPerPage={articlesPerPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
        {currentArticles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </main>
  );
};
export default ArticleList;
