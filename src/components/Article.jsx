import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../../newsApi";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comments, setCommments] = useState([]);
  const { article_id } = useParams();
  useEffect(() => {
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
    });
    fetchCommentsByArticleId(article_id).then((comments) => {
      setCommments(comments);
    });
  }, []);
  return (
    <div className="article-container">
      <div className="main-content">
        <div className="author">
          <h2 className="title">{article.title}</h2>
          <p className="author-name">By {article.author}</p>
        </div>
        <img src={article.article_img_url} alt="" />
        <p>{article.body}</p>
      </div>
      <span className="comment-count">{comments.length} Comments</span>
      <div className="comments-container"></div>
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
};
export default Article;
