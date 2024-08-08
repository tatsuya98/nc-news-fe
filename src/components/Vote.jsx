import { updateVotesByCommentId } from "../../newsApi";

const Vote = ({
  setVotes,
  setIsVisible,
  comment,
  setTriggerCommentId,
  setCommentError,
}) => {
  const handleClick = (e) => {
    setCommentError(null);
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
        setCommentError("Your vote was not successful. Please try again!");
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
