/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse  from "html-react-parser";
import storageService from "../appwrite/storage";

export default function Card({
    title,
    image,
    content,
    id,
}){
    const [imageUrl, SetImageUrl] = useState('');

    useEffect(()=>{
        storageService.getFilePreview(image)
        .then(imageUrl=>{
            SetImageUrl(imageUrl);
            console.log(imageUrl);
            
        })
        .catch(err=>{
            console.log(err.message);
            SetImageUrl('');
        })
    }, []);

    return (
        <>
        <Link to={`/post/${id}`}>
    <div className="max-w-screen-xl h-auto ml-3">
        <div className="bg-white w-96 p-2 border-2 border-gray-300 dark:border-gray-500 shadow-lg rounded-xl dark:bg-slate-700">
            <div>
                    <img className="rounded-lg" src={imageUrl} />
            </div>
            
            <div className="capitalize text-purple-900 font-semibold my-4 bg-purple-200 w-fit px-3 rounded-lg">
                <p>Blog</p>
            </div>
            
            <div className="text-2xl font-bold my-2 dark:text-white">
                    <h2>{title}</h2>
            </div>
            
            <div className="dark:text-gray-400">
                <p>{parse(content)}</p>
            </div>
               
            </div>
            
        </div>

        </Link>
        </>
    );
}