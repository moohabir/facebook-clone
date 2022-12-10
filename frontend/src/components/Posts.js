import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';

import Typography from '@mui/joy/Typography';

import {
  Avatar,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreatePost from './CreatePost';
import { UserAuthContext } from '../context/UserAuthContext';
import Stories from './Stories';
import Singlepost from './Singlepost';
import Comments from '../Comments';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});
  const [singlepost, setSinglePost] = useState({});
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [buttonshow, setbuttonShow] = useState(false);

  const [singleshow, setSingleShow] = useState(false);

  const [Post, setPost] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [username, setUserName] = useState('');

  const { currentUser, setCurrentUser } = useContext(UserAuthContext);
  console.log(currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get('http://localhost:3001/users')
        .then((res) => {
          setCurrentUser(res.data[0]);
          //console.log(res.data[0].username);
        })
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, []);

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
        setPost([...posts, { username, description, duration, date }]);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('You creted new post');
    navigate('/posts/:id');
    //navigate('-1');
  };

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  const Delete = (id) => {
    axios
      .delete(`http://localhost:3001/posts/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const newPost = (Post) => {
    setOpen(true);
    setPost(Post);
  };

  const updatePost = (post) => {
    setShow(true);
    setUpdatedPost(post);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const SaveUpdatedPost = () => {
    axios
      .put(`http://localhost:3001/posts/update/${updatedPost._id}`, updatedPost)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setShow(!open);
    window.location.reload();
  };

  const Like = () => {
    console.log('Liked');
  };

  const Comment = (post, id) => {
    //navigate('/posts/:id');
    //setSinglePost(post);
    setSingleShow(true);
    console.log(post);
    if (post._id === id) {
    }
  };

  const Share = () => {
    console.log('shared');
  };
  return (
    <>
      <div
        style={{
          flex: 3,
          width: '50%',
          //display: 'flex',
          //justifyContent: 'CENTER',
          //alignItems: 'center',
          //flexDirection: 'column',
          //width: '50%',
          margin: '20px',
        }}
      >
        <Stories />
        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <Avatar style={{ alignSelf: 'center' }} />
            <input
              //hoos currentUser.name ku badal modalkana name kusoo dar backendska
              placeholder={`What's on your mind, ${currentUser?.username}`}
              style={{
                borderRadius: '40px',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                width: '80%',
                height: '2px',
                padding: '30px',
                cursor: 'pointer',
                color: 'darkGray',
                marginTop: '10px',
              }}
              onClick={() => newPost(Post)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '10px',
            }}
          >
            <Avatar style={{ height: '40px', width: '40px' }} />
            <Avatar />
            <Avatar />
          </div>
        </Paper>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <Typography
              id="basic-modal-dialog-title"
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
            >
              Create post
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Typography>
                <Avatar /> {currentUser.username}
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Button onClick={() => setOpen(!open)}>Close</Button>
                  <Button onClick={createPost}>Post</Button>
                </div>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>

        <Modal
          open={show}
          onClose={() => setShow(false)}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <Typography
              id="basic-modal-dialog-title"
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
            >
              Update post
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setShow(false);
              }}
            >
              <Stack spacing={2}>
                <Typography>{currentUser.username}</Typography>

                <TextField
                  label="Description"
                  name="description"
                  value={updatedPost.description}
                  onChange={handleChange}
                  required
                />

                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Button onClick={() => setShow(!show)}>Close</Button>
                  <Button onClick={SaveUpdatedPost}>Save updates</Button>
                </div>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>

        {posts.map((post) => (
          <div
            style={
              {
                //display: 'flex',
                //flexDirection: 'column',
                //border: '1px solid gray',
                //borderRadius: '10px',
                //margin: '20px',
                //paddingBottom: '10px',
                //justifyContent: 'center',
                //alignItems: 'center',
              }
            }
            key={post._id}
          >
            <Card
              sx={{
                marginBottom: '40px',
                borderRadius: '12px',
                //width: '250px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',

                    gap: '10px',
                    marginLeft: '10px',
                  }}
                >
                  {post && (
                    <>
                      <Avatar />
                      <Typography sx={{ paddingTop: '10px' }}>
                        {post.username}
                      </Typography>
                    </>
                  )}
                  {updatePost && (
                    <Typography sx={{ paddingTop: '10px' }}>
                      {updatePost && currentUser.username}
                    </Typography>
                  )}
                </div>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  //paddingRight: '30px',
                  paddingLeft: '30px',
                  paddingBottom: '30px',
                  minHeight: '250px',
                  //maxWidth: 'calc(100% - 60px)',
                  width: '100%',

                  margin: 'auto',
                  marginTop: '20px',
                  color: 'rgba(0,0,0,1)',
                }}
              >
                <Typography
                  sx={{
                    disply: 'flex',

                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    width: '100vw',
                    fontSize: '14px',
                    margin: 'auto',
                    paddingRight: '-10px',
                    marginRight: '-10px',

                    //overflow: 'inherit',
                  }}
                >
                  {post.description}
                </Typography>
                <p>{new Date(post.date).toLocaleDateString()}</p>
              </div>
              <p> like icons {post.duration} </p>
              <div>
                <Typography> likeicons 154 </Typography>
                <div style={{ float: 'right' }}>
                  <Typography>60(comment.length) comments</Typography>
                  <Typography sx={{ width: '250px' }}>
                    5(shares.length) shares
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => updatePost(post)}
                >
                  Update
                </Button>

                <Button
                  variant="secondry"
                  color="danger"
                  onClick={() => Delete(post._id)}
                >
                  Delete
                </Button>
                <Divider />
                <div>
                  <Button
                    variant="secondry"
                    color="danger"
                    onClick={() => Like(post._id)}
                  >
                    Like
                  </Button>

                  <Button
                    variant="secondry"
                    color="danger"
                    onClick={() => Comment(post)}
                  >
                    Comment
                  </Button>

                  <Button
                    variant="secondry"
                    color="danger"
                    onClick={() => Share(post._id)}
                  >
                    Share
                  </Button>
                  {singleshow && <Comments />}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
