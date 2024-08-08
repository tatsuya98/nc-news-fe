import { useContext } from "react";
import { deleteCommentByCommentId } from "../../newsApi";
import { ErrorContext } from "../context/ErrorContext";

const Delete = ({ comment_id, setComments, setTriggerCommentId }) => {
  const { setError } = useContext(ErrorContext);
  const handleClick = (e) => {
    e.preventDefault();
    setError(null);
    deleteCommentByCommentId(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((err) => {
        setError(
          "there was an issue processing your delete request, please try again"
        );
        setTriggerCommentId(comment_id);
      });
  };
  return <button onClick={handleClick}>delete</button>;
};
export default Delete;
