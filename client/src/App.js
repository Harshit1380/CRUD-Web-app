import React, { useEffect, useState } from 'react'
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import Posts from './Posts/Posts';
import {getPosts} from './actions/posts';
import Form from './Form/Form';
import './styles.css';
import { useDispatch } from 'react-redux';

const App = () => {
  const [currentId,setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  },[dispatch,currentId]);
  return (
    <Container maxWidth='lg'>
      <AppBar className='bar' position='static' color='inherit'>
        <Typography className='heading' variant='h2'>Memories</Typography>
        <img className='image' src='https://images.theconversation.com/files/250919/original/file-20181217-185258-1gc7soo.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop' 
             alt='memories' 
             height='60' 
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App