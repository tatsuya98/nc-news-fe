import { useState } from "react";
import { deleteCommentByCommentId } from "../../newsApi";

const Delete = ({
  comment_id,
  setComments,
  setTriggerCommentId,
  setCommentError,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setCommentError(null);
    setIsClicked(true);
    deleteCommentByCommentId(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((err) => {
        setCommentError(
          "there was an issue processing your delete request, please try again"
        );
        setIsClicked(false);
        setTriggerCommentId(comment_id);
      });
  };
  return (
    <>
      {isClicked ? (
        <button>delete</button>
      ) : (
        <button className="delete-button" onClick={handleClick}>
          delete
        </button>
      )}
    </>
  );
};
export default Delete;
