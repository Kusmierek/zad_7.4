import React from 'react';

function CommentsList({ comments }) {
  return (
    <div className="card p-3">
      {comments
        .map((x, i) => {
          return (
            <p key={i}>
              {i + 1}
              {x.name}:{x.email}
            </p>
          );
        })
        .reverse()}
    </div>
  );
}

export default CommentsList;
