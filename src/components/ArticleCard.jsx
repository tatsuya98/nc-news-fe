import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-container">
      <div className="card-content">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <p>By {article.author}</p>
      </div>
      <Link to={`/article/${article.article_id}`}>
        <button>Read article</button>
      </Link>
    </div>
  );
};
export default ArticleCard;
