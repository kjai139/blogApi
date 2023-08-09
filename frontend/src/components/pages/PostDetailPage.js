import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import QuillDisplay from "../forms/QuillEditor";

const PostDetailPage = () => {

    const location = useLocation()
    const postId = location.state.id


    const [blogPost, setBlogPost] = useState()

    useEffect(() => {
        console.log(postId)
    
    }, [])

    const getPost = async () => {
        

        try {
            const response = await axiosInstance.get(`/posts/detail/get?id=${postId}`)

            console.log(response.data.blogPost)
            setBlogPost(response.data.blogPost)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={getPost}>Get Post</button>
            {blogPost && <QuillDisplay delta={blogPost.body}></QuillDisplay>}
        </div>
    )
}

export default PostDetailPage