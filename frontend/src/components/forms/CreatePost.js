import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import axiosInstance from '../../modules/axiosInstance'

const CreatePost = () => {
    const [content, setContent] = useState('')
    const quillRef = useRef(null)

    const [isSubmitted, setIsSubmitted] = useState(false)

    const toolbarOptions =  [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
    ]

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
        const formData = new FormData()
        formData.append('image', file)
        // const formDataObj = Object.fromEntries(formData)
        // console.log(formDataObj)
        try {
            const response = await axiosInstance.post('/images/upload', formData)
            console.log('upload successful')

            console.log(response.data.message)
        }catch(err) {
            console.log('err uploading', err)
        }

        
        
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const delta = quillRef.current.getEditor().getContents()
        console.log(delta)
    }

    return (
        <div>
        <form onSubmit={onSubmit}>
            <div style={{
                display:'flex',
                gap:'10px',
                fontSize:'1.5rem'
                
            }}>
            <label htmlFor="post-title">Post title:</label>
            <input type="text" id="post-title" style={{
                flex:'1',
                fontSize:'1.5rem'
            }}></input>
            </div>
            <div>
            <label style={{
                fontSize:'1.5rem'
            }}>Content:</label>
            <ReactQuill ref={quillRef} value={content} onChange={setContent} theme="snow" modules={{
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        image:handleImageUpload,
                    }
                }
                
                
            }}></ReactQuill>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
        
        </div>
    )
}

export default CreatePost