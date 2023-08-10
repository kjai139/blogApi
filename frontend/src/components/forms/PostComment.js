import React, { useContext, useRef } from "react";
import ReactQuill from "react-quill";
import axiosInstance from '../../modules/axiosInstance'
import { UserContext } from "../UserContext";

const CommentForm = () => {

    const quillRef = useRef(null)

    const { user } = useContext(UserContext)


    const quillModule = {
        toolbar: [
            'bold', 'italic', 'underline'
        ]
    }

    const postComment = async (e) => {
        e.preventDefault()
        const delta = quillRef.current.getEditor().getContents()
        
        try {
            const response = await axiosInstance.post('/comments/post', {
                comment:delta
            }, {
                withCredentials: true
            })

            console.log(response.data.message)
            
        }catch (err) {
            console.log(err)
        }
        
    }

    

    return (
        <div>
            <div>
                <h3>Comment Section</h3>
            </div>
            { user ? null :
            <h2>Must Sign in to post comments</h2> 
            }
            {
                user && 
            
            <form onSubmit={postComment}>
                
                <label>Comment:</label>
                <ReactQuill theme="snow" ref={quillRef} modules={quillModule}></ReactQuill>
                <div style={{
                    display:'flex'
                }}>
                <button type="submit" style={{
                    marginLeft:'auto',
                    marginTop:'.5rem'
                }}>Post Comment</button>
                </div>
            </form>
            }
        </div>
    )
}

export default CommentForm