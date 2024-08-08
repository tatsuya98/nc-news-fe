import { deleteCommentByCommentId } from "../../newsApi";

const Delete = ({
  comment_id,
  setComments,
  setTriggerCommentId,
  setCommentError,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setCommentError(null);
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
        setTriggerCommentId(comment_id);
      });
  };
  return <button onClick={handleClick}>delete</button>;
};
export default Delete;
