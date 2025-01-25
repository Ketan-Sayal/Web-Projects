/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/storage";
import parser from 'html-react-parser';
import databaseService from "../appwrite/database";

export default function Post(){
    const {id} = useParams();
    const user = useSelector(state=>state.auth.userData);
    const posts = useSelector(state=>state.post.posts);
    const post = posts.find(post=>String(post.$id) === String(id));
    // console.log(post.title);
    // console.log(post);
    
    // console.log(post);
    console.log();
    
    
    const [imageUrl, SetImageUrl] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(post){
            storageService.getFilePreview(post.featuredImg)
            .then((imageUrl)=>{
                SetImageUrl(imageUrl);
            })
            .catch((err)=>{
                console.error(err.message);
                SetImageUrl('');
            })
        }
    }, []);

    const deletePost = async ()=>{
        // Delete post and image of post from the sorage
        try{
            if(post){
                let deletePost = await databaseService.deleteDocument(id);
                if(deletePost){
                    let deleteFile = await storageService.deleteFile(post.featuredImg);
                }
            }
            // navigate('/');
            window.location.href = '/';
        }catch(err){
            console.error(err.message);
        }
    }

    const updatePost = async ()=>{
        navigate(`/post/update/${post.$id}`);
    }

    return user.$id===post.userId?(
    <div className="w-full min-h-screen bg-purple-100">
        <div className="w-full h-96 overflow-hidden">
           <div className="flex space-x-2">
           <button className="bg-red-700 px-2 py-1 rounded-md text-white" onClick={deletePost}>Delete</button>
           <button className="bg-green-700 px-2 py-1 rounded-md text-white" onClick={updatePost}>Update</button>
           </div>
           <img className="w-full object-cover" src={imageUrl} alt={post.title} />
        </div>
            <div>
                <div className="w-full flex flex-col">
                    <h1 className="font-bold text-xl text-center">{post.title}</h1>
                    <p className="w-fit text-justify">{parser(post.content)}</p>
                </div>
            </div>
        </div>
    ):(
            <div className="w-full min-h-screen bg-purple-100">
                <div className="w-full h-96 overflow-hidden">
                   <img className="w-full object-cover" src={imageUrl} alt={post.title} />
                </div>
                    <div>
                        <div className="w-full flex flex-col">
                            <h1 className="font-bold text-xl text-center">{post.title}</h1>
                            <p className="w-fit text-justify px-6">{parser(post.content)}</p>
                        </div>
                    </div>
                </div>
            )
    
}