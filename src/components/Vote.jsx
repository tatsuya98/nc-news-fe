import { updateVotesByCommentId } from "../../newsApi";

const Vote = ({ setVotes, setIsVisible, setError, comment }) => {
  const handleClick = (e) => {
    setError(null);
    setVotes((currentVotes) => Number(currentVotes) + Number(e.target.value));
    updateVotesByCommentId(comment.comment_id, {
      inc_votes: e.target.value,
    }).catch((err) => {
      if (e.target.innerText === "+") {
        setVotes(
          (currentVotes) => Number(currentVotes) - Number(e.target.value)
        );
      } else {
        setVotes((currentVotes) => Number(currentVotes) + 1);
      }
      setError("Your vote was not successful. Please try again!");
    });
    setIsVisible(false);
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
