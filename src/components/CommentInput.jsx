import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateCommentsByArticleId } from "../../newsApi";
import { ErrorContext } from "../context/ErrorContext";

const CommentInput = ({ setComments, article_id }) => {
  const { error, setError } = useContext(ErrorContext);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  useEffect(() => {
    if (!comment) {
      setIsvisible(false);
    }
  }, [comment]);
  const handleCancel = (e) => {
    e.preventDefault();
    setComment("");
    setIsvisible(false);
  };
  const handleChange = (e) => {
    setComment(e.target.value);
    setIsvisible(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObject = {
      body: comment,
      user,
    };
    updateCommentsByArticleId(article_id, commentObject)
      .then((newComment) => {
        setComments((currentComments) => [newComment, ...currentComments]);
      })
      .catch((err) => {
        setError("Unable to post comment, try again");
      });
    setIsvisible(false);
    setComment("");
  };
  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          id="comment-input"
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={handleChange}
        />
        {isVisible && (
          <div className="buttons">
            <button className="form-submit">add comment</button>
            <button className="form-submit" onClick={handleCancel}>
              cancel
            </button>
          </div>
        )}
      </form>
      {error && error.includes("post") && <p className="error">{error}</p>}
    </>
  );
};
export default CommentInput;
