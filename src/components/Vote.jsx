import { useContext } from "react";
import { updateVotesByCommentId } from "../../newsApi";
import { ErrorContext } from "../context/ErrorContext";

const Vote = ({ setVotes, setIsVisible, comment, setTriggerCommentId }) => {
  const { setError } = useContext(ErrorContext);
  const handleClick = (e) => {
    setError(null);
    setVotes((currentVotes) => Number(currentVotes) + Number(e.target.value));
    updateVotesByCommentId(comment.comment_id, {
      inc_votes: e.target.value,
    })
      .then(() => {
        setIsVisible(false);
      })
      .catch((err) => {
        if (e.target.innerText === "+") {
          setVotes(
            (currentVotes) => Number(currentVotes) - Number(e.target.value)
          );
        } else {
          setVotes((currentVotes) => Number(currentVotes) + 1);
        }
        setTriggerCommentId(comment.comment_id);
        setError("Your vote was not successful. Please try again!");
      });
  };
  return (
    <>
      <button id="upvote" value="1" onClick={handleClick}>
        +
      </button>
      <button id="downvote" value="-1" onClick={handleClick}>
        -
      </button>
    </>
  );
};
export default Vote;
