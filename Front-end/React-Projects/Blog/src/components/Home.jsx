import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import {Card} from './index';
import bg from '../assets/my-img.png'
import bg2 from '../assets/bg.jpg'

function Home(){

    const posts = useSelector(state=>state.post.posts);
    const authSatus = useSelector(state=>state.auth.status);
    const user = useSelector(state=>state.auth.userData);
    console.log(posts);
    

    return !authSatus?(
        <div className="w-full flex flex-col text-black py-4 space-y-3 flex-wrap">
            <h1 className="font-bold text-xl">Blogs</h1>
            <div className="flex flex-wrap space-x-3">
                {posts && posts.map(post=>(
                    <div key={post.$id} className="flex flex-wrap space-x-2 space-y-2">
                        <Card title={post.title} id={post.$id} image={post.featuredImg} content={post.content}/>
                    </div>
                ))}
            </div>
        </div>
    ):(
        <div className="w-full flex flex-col text-black py-4 space-y-3 flex-wrap">
            <h1 className="font-bold text-xl">Your Blogs</h1>
            <div className="flex justify-evenly w-full flex-wrap space-x-3">
                {posts && posts.map(post=>post.userId === String(user.$id)?(
                    <div key={post.$id} className="flex w-full flex-wrap space-x-2 space-y-2">
                        <Card title={post.title} image={post.featuredImg} id={post.$id} content={post.content}/>
                    </div>
                ): null)}
            </div>
        </div>
    );
}

export default Home;