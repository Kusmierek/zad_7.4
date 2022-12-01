import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm';
import CommentsList from './components/CommentsList';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/comments'
        );

        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <CommentForm setComments={setComments} />
      <CommentsList comments={comments} />
    </div>
  );
}

export default App;
