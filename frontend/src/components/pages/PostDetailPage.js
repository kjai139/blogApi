import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import QuillDisplay from "../forms/QuillEditor";
import CommentForm from "../forms/PostComment";
import { UserContext } from "../UserContext";
import QuillComments from "../forms/CommentsQuill";
import formatDistance from "date-fns/formatDistance";
import { parseISO } from "date-fns";

const PostDetailPage = () => {

    const location = useLocation()
    const postId = location.state.id

    const { user } = useContext(UserContext)


    const [blogPost, setBlogPost] = useState()
    const [comments, setComments] = useState()
    const [needRefresh, setNeedRefresh] = useState(false)

    useEffect(() => {
        console.log(postId)
        getPost()
        getComments()
    
    }, [needRefresh])

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
            {blogPost &&
            <div>
            <h3>Comment Section for "{blogPost.postTitle}"</h3>
            </div>
            }
            { comments && 
            comments.map((node, index) => {

                const today = new Date()
                const parsedCreatedAt = parseISO(node.createdAt)

                const formattedDate = formatDistance(parsedCreatedAt, today, {
                    addSuffix: true
                })
                return (
                    <div key={node._id} className="comment-cont">
                        <div className="comment-user-cont">
                        <span className="comment-name-cont">{node.author.name}</span>
                        <span className="comment-date">{formattedDate}</span>
                        </div>
                        <QuillComments delta={node.body}></QuillComments>
                    </div>
                )
            })
            }
            
           
            <CommentForm postId={postId} closeModal={() => setNeedRefresh( prevState => !prevState)}></CommentForm>
        </div>
    )
}

export default PostDetailPage