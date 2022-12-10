import Button from '@mui/joy/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { useState } = require('react');

function CreatePost() {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [username, setUserName] = useState('');

  const navigate = useNavigate();

  const createPost = async () => {
    await axios
      .post('http://localhost:3001/posts/add', {
        username,
        description,
        duration,
        date,
      })
      .then((response) => {
        console.log('post posted');
        setPosts([...posts, { username, description, duration, date }]);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('You creted new post');
    navigate('/posts/:id');
    //navigate('-1');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button
        variant="primary"
        type="submit"
        onClick={createPost}
        style={{ height: '40px', width: '100px', margin: '5px' }}
      >
        Create post
      </Button>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}
export default CreatePost;
