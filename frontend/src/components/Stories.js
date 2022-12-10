import {
  Avatar,
  Card,
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import stores from '../StoryData.js';
import { Button } from 'react-chat-engine';
import { UserAuthContext } from '../context/UserAuthContext.jsx';
import { blue } from '@mui/material/colors';

const allCategories = [
  ...new Set(stores.map((eachcategory) => eachcategory.category)),
  'Rooms',
];
console.log(allCategories);

function Stories() {
  const [index, setIndex] = useState(0);
  const { id, name, image } = stores[index];
  const [storeItems, setStoreItems] = useState(stores);

  const storiesSlice = storeItems.slice(0, 4);

  const { currentUser, setCurrentUser } = useContext(UserAuthContext);

  function limitNumber(number) {
    if (number > stores.length - 1) {
      return 0;
    }
    if (number < 0) {
      return stores.length - 1;
    }
    return number;
  }
  function Next() {
    setIndex((index) => {
      let newIndex = index + 1;
      return limitNumber(newIndex);
    });
  }

  function Previous() {
    setIndex((index) => {
      let newIndex = index - 1;
      return limitNumber(newIndex);
    });
  }

  const filterStoriesFromReels = (category) => {
    const newItems = stores.filter(
      (filtered) => filtered.category === category
    );
    console.log(newItems);
    setStoreItems(newItems);
    //setLists(newItems);
  };

  //useEffect(() => {
  //const fetchStories = () => {
  // axios
  //// .get('http://localhost:3001/stores')
  // .then((res) => setStories(res.data))
  //7.catch((err) => console.log(err));
  // };
  //fetchStories();
  //}, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        justifyItems: 'center',
      }}
    >
      <div
        style={{
          dispaly: 'flex',
        }}
      >
        {allCategories.map((category) => (
          <button
            variant="text"
            style={{
              //margin: '30px',
              //marginRight: '20px',
              border: 'none',
              fontSize: '1.2rem',
              width: '150px',
              height: '60px',
              textTransform: 'capitalize',
            }}
            onClick={() => filterStoriesFromReels(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/*<Divider sx={{ width: '100%' }} />*/}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton onClick={Previous}>
          <ArrowBackIosIcon />
        </IconButton>

        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            gap: '30px',
            height: '200px',
            width: '130px',
            borderRadius: '12px',
          }}
          //key={id}
        >
          <img
            //src={image.coverImage}
            src={currentUser.coverImage}
            alt={currentUser.username}
            style={{ width: '40', height: '40px' }}
          />
          <AddIcon />
          <Typography>Create story</Typography>
        </Card>

        {storiesSlice.map((story) => (
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              gap: '30px',
              height: '200px',
              width: '130px',
              borderRadius: '12px',
              position: 'relative',
              //backgroundImage: 'url(story.image)',
              padding: '2px',
            }}
          >
            <Avatar
              style={{
                position: 'absolute',
                top: '5%',
                left: '10%',
                bottom: '90%',
                right: '90%',
                //color: 'white',
                size: '16px',
              }}
            />
            <img
              src={story?.image}
              alt={story.name}
              style={{
                width: '100%',
                height: '100%',
                //left: '50%',
                borderRadius: '6px',
                backgroundSize: 'cover',
              }}
            />
            <h5
              style={{
                position: 'absolute',
                top: '80%',
                left: '10%',
                bottom: '10%',
                right: '90%',
                color: 'white',
                size: '16px',
                width: '100vw',

                //gap: '4px',
                //lineHeight: '2px',

                //margin: 'auto',
              }}
            >
              {story.name}
            </h5>
          </Card>
        ))}
        <IconButton onClick={Next}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Stories;
