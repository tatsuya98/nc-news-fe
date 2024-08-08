import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateCommentsByArticleId } from "../../newsApi";

const CommentInput = ({ setComments, article_id }) => {
  const [commentInputError, setCommentInputError] = useState("");
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
    setCommentInputError(null);
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
        setIsvisible(false);
        setComment("");
      })
      .catch((err) => {
        setCommentInputError("Unable to post comment, try again");
      });
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
      {commentInputError && <p className="error">{commentInputError}</p>}
    </>
  );
};
export default CommentInput;
