import { useState } from "react";
import { updateVotesByCommentId } from "../../newsApi";

const Comment = ({ comment }) => {
  const [votes, setVotes] = useState(comment.votes);
  const [error, setError] = useState(null);
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
  };
  return (
    <>
      <div className="contents">
        <div className="post">
          <div className="commenter">
            <p>{comment.author}</p>
          </div>
          <div className="post-content">
            <p>{comment.body}</p>
            <div className="comment-vote-flex">
              <span className="comment-votes">votes: {votes}</span>
              <button id="upvote" value="1" onClick={handleClick}>
                +
              </button>
              <button id="downvote" value="-1" onClick={handleClick}>
                -
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
