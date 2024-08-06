const ArticleCard = ({ article }) => {
  return (
    <div className="article-container">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt="" />
      <p>By {article.author}</p>
    </div>
  );
};
export default ArticleCard;
