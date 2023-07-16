import postMessage from '../models/postMessages.js';
import mongoose from 'mongoose';
export const getPosts = async (req,res)=>{
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const createPosts = async (req,res) =>{
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePosts = async (req,res) =>{
    const {id: _id} = req.params;
    const data = req.body;
    console.log(_id);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no memory exist with the id');
    
    const updatedPost = await postMessage.findByIdAndUpdate(_id,{...data,_id},{new:true});
    res.status(200).json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no memory exist with the id');
    await postMessage.findByIdAndDelete(_id);
    
    res.json({message:"Memory successfully deleted"});
}

export const likePost = async (req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no memory exist with the id');
    const post = await postMessage.findById(_id);
    const likedPost = await postMessage.findByIdAndUpdate(_id,{likeCount: post.likeCount + 1},{new:true});
    res.json(likedPost);
}