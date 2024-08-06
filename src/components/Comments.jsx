const Comments = ({ comments }) => {
  return (
    <div className="comments-container">
      <span className="comment-count">{comments.length} Comments</span>
      <div className="contents">
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="post">
              <div className="commenter">
                <p>{comment.author}</p>
              </div>
              <div className="post-content">
                <p>{comment.body}</p>
                <span className="comment-votes">votes: {comment.votes}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Comments;
