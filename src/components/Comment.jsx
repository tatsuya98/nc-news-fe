import { useState } from "react";
import { updateVotesByCommentId } from "../../newsApi";
import Vote from "./Vote";

const Comment = ({ comment }) => {
  const [votes, setVotes] = useState(comment.votes);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
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
              {isVisible && (
                <Vote
                  setVotes={setVotes}
                  setIsVisible={setIsVisible}
                  setError={setError}
                  comment={comment}
                />
              )}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
