import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import QuillDisplay from "../forms/QuillEditor";
import CommentForm from "../forms/PostComment";
import { UserContext } from "../UserContext";

const PostDetailPage = () => {

    const location = useLocation()
    const postId = location.state.id

    const { user } = useContext(UserContext)


    const [blogPost, setBlogPost] = useState()
    const [comments, setComments] = useState()

    useEffect(() => {
        console.log(postId)
        getPost()
    
    }, [])

    const getPost = async () => {
        

        try {
            const response = await axiosInstance.get(`/posts/detail/get?id=${postId}`)
            console.log(user)

            console.log(response.data.blogPost)
            setBlogPost(response.data.blogPost)
        } catch (err) {
            console.log(err)
        }
    }

    const getComments = async () => {
        try {
            const response = await axiosInstance.get(`/comments/get?id=${postId}`)

            console.log(response.data.comments)
            setComments(response.data.comments)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            
            {blogPost && <QuillDisplay delta={blogPost.body}></QuillDisplay>}
            
            <button onClick={getComments}>GET COMMENTS</button>
            <CommentForm postId={postId}></CommentForm>
        </div>
    )
}

export default PostDetailPage