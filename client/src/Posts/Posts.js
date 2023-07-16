import React from 'react';
import { Grid, CircularProgress} from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import './styles.css';

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className='container' container alignItems='stretch' spacing={3}>
        {posts.map((post)=>(
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts