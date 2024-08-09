import { useContext, useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../../newsApi";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { UserContext } from "../context/UserContext";
import Delete from "./Delete";
import Error from "./Error";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comments, setCommments] = useState([]);
  const [triggerCommentId, setTriggerCommentId] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const { article_id } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetchArticleById(article_id)
      .then((article) => {
        setArticle(article);
        return fetchCommentsByArticleId(article_id);
      })
      .then((comments) => {
        setCommments(comments);
      })
      .catch((err) => {
        setRequestError(err);
      });
  }, []);
  return (
    <>
      {requestError ? (
        <Error error={requestError} />
      ) : (
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
          <CommentInput setComments={setCommments} article_id={article_id} />
          <div className="comments-container">
            {comments.map((comment) => {
              return (
                <>
                  <Comment
                    setComments={setCommments}
                    key={comment.comment_id}
                    comment={comment}
                    article={article}
                    setTriggerCommentId={setTriggerCommentId}
                    setCommentError={setCommentError}
                  />
                  {article.author === user && (
                    <Delete
                      comment_id={comment.comment_id}
                      setComments={setCommments}
                      setCommentError={setCommentError}
                    />
                  )}
                  {commentError && triggerCommentId === comment.comment_id && (
                    <p className="error">{commentError}</p>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Article;
