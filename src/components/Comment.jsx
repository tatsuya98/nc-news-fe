import { useContext, useState } from "react";
import Vote from "./Vote";
import Delete from "./Delete";
import { UserContext } from "../context/UserContext";

const Comment = ({
  comment,
  setComments,
  article,
  setTriggerCommentId,
  setCommentError,
}) => {
  const [votes, setVotes] = useState(comment.votes);
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useContext(UserContext);
  const isAuthor = () => {
    return article.author === user;
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
              {isVisible && (
                <Vote
                  setVotes={setVotes}
                  setIsVisible={setIsVisible}
                  comment={comment}
                  setTriggerCommentId={setTriggerCommentId}
                  setCommentError={setCommentError}
                />
              )}
              {comment.author === user && !isAuthor() && (
                <Delete
                  setComments={setComments}
                  comment_id={comment.comment_id}
                  setTriggerCommentId={setTriggerCommentId}
                  setCommentError={setCommentError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
