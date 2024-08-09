import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateCommentsByArticleId } from "../../newsApi";

const CommentInput = ({ setComments, article_id }) => {
  const [commentInputError, setCommentInputError] = useState("");
  const { user, isLoggedIn } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (!comment) {
      setIsFilled(false);
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
    setIsFilled(true);
  };
  const handleVisbility = () => {
    setCommentInputError(null);
    setIsvisible(true);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setCommentInputError("must be logged in to comment");
      return;
    }
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
      <form className="comment-form">
        <input
          id="comment-input"
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={handleChange}
          onFocus={handleVisbility}
        />
        {isVisible && (
          <div className="buttons">
            <button className="form-submit" onClick={handleCancel}>
              cancel
            </button>
            {isFilled && isVisible ? (
              <button className="form-submit" onClick={handleClick}>
                add comment
              </button>
            ) : (
              <button id="grey-out">add comment</button>
            )}
          </div>
        )}
      </form>
      {commentInputError && <p className="error">{commentInputError}</p>}
    </>
  );
};
export default CommentInput;
