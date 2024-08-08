import { useEffect, useState } from "react";
import { fetchArticles } from "../../newsApi";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, SetArticlesPerPage] = useState(10);
  const { topic } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);
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
      <Pagination
        length={articles.length}
        articlesPerPage={articlesPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
      <div className="grid-container">
        {currentArticles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </main>
  );
};
export default ArticleList;
