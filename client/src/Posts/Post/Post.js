import React from 'react'
import {Card, CardActions,CardContent,CardMedia,Button,Typography} from '@mui/material';
import {ThumbUpAlt,Delete,MoreHoriz} from '@mui/icons-material';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePost,likePost,getPosts } from '../../actions/posts';
import './styles.css';
const Post = ({post,setCurrentId}) => {
  const dispatch = useDispatch();
  return (
    <Card className='card'>
      <CardMedia className='media' image={post.selectedFile} title={post.title} />
      <div className='overlay'>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className='overlay2'>
        <Button style={{color: 'white'}} size='small' onClick={()=>{setCurrentId(post._id);}}>
          <MoreHoriz fontSize="default" />
        </Button>
      </div>
      <div className='details'>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </div>
      <Typography className='title' variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent sx={{p: '0 16px',margin:'0'}}>
        <Typography fontSize='18px' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className='cardActions'>
        <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id));dispatch(getPosts());}}>
          <ThumbUpAlt fontSize="small" />
          {` ${post.likeCount} Likes`}
        </Button>
        <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
          <Delete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post