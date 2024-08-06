import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-container">
      <Link to={`/article/${article.article_id}`}>
        <h2>{article.title}</h2>
        <img src={article.article_img_url} alt="" />
        <p>By {article.author}</p>
      </Link>
    </div>
  );
};
export default ArticleCard;
