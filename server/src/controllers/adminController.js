import User from "../models/User.js";
import Post from "../models/Post.js";

export const getAllUsers=async(req,res)=>{
    const users=await User.find().select('-password');
    res.status(200).json(users);
}

export const deleteUser=async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"user deleted"});
}

export const deleteAnyPost=async(req,res)=>{
    const post=await Post.findByIdAndDelete(req.params.id);
    if(!post){
        return res.status(400).json({message:"post not exist"})
    }
    res.status(200).json({message:"Post deleted"});
}