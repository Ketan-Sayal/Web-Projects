import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import {Card} from './index';

function Allposts(){

    const posts = useSelector(state=>state.post.posts);

    return(
        <div className="w-full flex flex-col text-black py-4 space-y-3 flex-wrap">
            <h1 className="font-bold text-xl">All Blogs</h1>
            <div className="flex justify-evenly flex-wrap space-x-3">
                {posts && posts.map(post=>(
                    <div key={post.$id} className="flex flex-wrap space-x-2 space-y-2">
                        <Card title={post.title} id={post.$id} image={post.featuredImg} content={post.content}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Allposts;