import { useSelector } from "react-redux";
import { PostForm } from "../components";
import { useParams } from "react-router-dom";

function UpdatePost(){
    const {fileId} = useParams();
    const posts = useSelector(state=>state.post.posts);
    const post = posts.find(post=>String(post.$id) === String(fileId));
    // console.log(post);
    
    return(
        <>
        <PostForm post={post} />
        </>
    )
}
export default UpdatePost;