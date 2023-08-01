import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import axiosInstance from '../../modules/axiosInstance'
import { postTitleSchema } from "../modals/validationSchema";
import ErrorMsg from "../modals/errorMsg";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [content, setContent] = useState('')
    const quillRef = useRef(null)

    const [isSubmitted, setIsSubmitted] = useState(false)

    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    const handleImageUpload = () => {
        
        
        const delta = quillRef.current.getEditor()

        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = () => {
            const file = input.files[0]
            uploadImg(file)
            
        }
        
    }

    const uploadImg = async (file) => {

        const quill = quillRef.current.getEditor()
        const range = quill.getSelection()
        console.log('the range', range, 'editor', quill)

        const formData = new FormData()
        formData.append('image', file)
        formData.append('filename', file.name)

       
        // const formDataObj = Object.fromEntries(formData)
        // console.log(formDataObj)
        try {
            const response = await axiosInstance.post('/images/upload', formData)
            console.log('upload successful')

            console.log(response.data.message)
            quill.insertEmbed(range.index, 'image', response.data.url)
            quill.setSelection(range.index + 1)
        }catch(err) {
            console.log('err uploading', err)
        }

        
        
        
    }

   //for quill you have to use useMemo to stop the repaint from breaking the editor
    const quillModule = useMemo(() => ({
        toolbar: {
            container: [
                
                
                [{ 'font': [] }, { 'size': [] }],
                [ 'bold', 'italic', 'underline', 'strike' ],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'super' }, { 'script': 'sub' }],
                [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
                [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
                [ 'direction', { 'align': [] }],
                [ 'link', 'image', 'video', 'formula' ],
                [ 'clean' ]
                
            ],
            handlers : {
                image: handleImageUpload
            }
        }
    }), [])

    

    const onSubmit = async (e) => {
        e.preventDefault()
        const delta = quillRef.current.getEditor().getContents()
        console.log(delta)
        const postTitle = e.target.postTitle.value
        console.log(postTitle)

        try {
            await postTitleSchema.validate({
                postTitle: postTitle
            })

            console.log('passed front validation')

            const response = await axiosInstance.post('/posts/create', {
                postTitle: postTitle,
                delta: delta
            }, {
                withCredentials: true
            })

            if (response.data.success) {
                console.log(response.data.message)
                console.log('user', response.data.user)
                console.log('delta', response.data.delta)
            }
        } catch(err) {
            
            console.log(err)
            if (err.request.status === 401) {
               setErrorMsg('User is not logged in')
            }
            console.log(err.request.status)
        }

        
    }

    return (
        <div>
            {errorMsg &&
            <ErrorMsg>
                <div className="error-cont">
                    <span>{errorMsg}</span>
                    <button onClick={() => navigate('/')}>Close</button>
                </div>
            </ErrorMsg> 
            }
            
        <form onSubmit={onSubmit}>
            <div style={{
                display:'flex',
                gap:'10px',
                fontSize:'1.5rem'
                
            }}>
            <label htmlFor="post-title">Post title:</label>
            <input type="text" id="post-title" name="postTitle" style={{
                flex:'1',
                fontSize:'1.5rem'
            }}></input>
            </div>
            <div>
            <label style={{
                fontSize:'1.5rem'
            }}>Content:</label>
            <ReactQuill ref={quillRef} theme="snow" modules={quillModule}></ReactQuill>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        
        </div>
    )
}

export default CreatePost