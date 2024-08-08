import { useContext, useState } from "react";
import Vote from "./Vote";
import Delete from "./Delete";
import { UserContext } from "../context/UserContext";
import { ErrorContext } from "../context/ErrorContext";

const Comment = ({ comment, setComments, article, setTriggerCommentId }) => {
  const [votes, setVotes] = useState(comment.votes);
  const { error } = useContext(ErrorContext);
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
                />
              )}
              {comment.author === user && !isAuthor() && (
                <Delete
                  setComments={setComments}
                  comment_id={comment.comment_id}
                  setTriggerCommentId={setTriggerCommentId}
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
