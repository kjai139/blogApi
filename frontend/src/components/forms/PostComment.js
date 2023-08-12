import React, { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import axiosInstance from '../../modules/axiosInstance'
import { UserContext } from "../UserContext";
import ResultModal from "../modals/resultModal";

const CommentForm = ({postId, closeModal}) => {

    const quillRef = useRef(null)

    const { user } = useContext(UserContext)

    const [resultMsg, setResultMSg] = useState('')
    const [content, setContent] = useState('')


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
                comment:delta,
                postId: postId
                 
            }, {
                withCredentials: true
            })

            console.log(response.data.message)
            setResultMSg(response.data.message)
            
            
        }catch (err) {
            console.log(err)
        }
        
    }

    const handleCloseModal = () => {
        setResultMSg('')
        setContent('')
        closeModal()
    }

    

    return (
        <div className="post-comment-cont">
            {resultMsg && 
            <ResultModal message={resultMsg} closeModal={handleCloseModal}></ResultModal>
            }
            
            { user ? null :
            <h2>Must Sign in to post comments</h2> 
            }
            {
                user && 
            
            <form onSubmit={postComment}>
                
                <label>Comment:</label>
                <ReactQuill theme="snow" ref={quillRef} modules={quillModule} value={content}></ReactQuill>
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