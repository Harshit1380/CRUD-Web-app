import React, { useEffect, useState } from 'react';
import { TextField,Button,Typography,Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost,updatePost } from '../actions/posts';
import FileBase64 from 'react-file-base64';
import './styles.css';
const Form = ({currentId,setCurrentId}) => {
  const [postData,setPostData] = useState({creator: '',title: '',message: '',tags: '',selectedFile: ''});
  const post = useSelector((state) => state.posts.find((p) => p._id === currentId));
  const dispatch = useDispatch();
  useEffect(()=>{
    if(post) setPostData(post);
  },[post,currentId,postData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData));
    }else{
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({creator: '',title: '',message: '',tags: '',selectedFile: ''});
  };
  return (
    <Paper className='paper'>
      <form autoComplete='off' noValidate className='form roots' onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? "Editing a Memory" : "Creating a Memory"}</Typography> 
        <TextField className='text' name="creator" variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator: e.target.value})}/>
        <TextField className='text' name="title" variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>
        <TextField className='text' name="message" variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>
        <TextField className='text' name="tags" variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>
        <div className='fileInput'>
          <FileBase64  type="file" multiple={false} onDone={({base64}) => {setPostData({...postData,selectedFile: base64});}} />
        </div>
        <Button sx={{marginBottom:'5px'}} className='buttonSubmit' variant='contained' color='primary' size='large' fullWidth type='submit'>Submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form