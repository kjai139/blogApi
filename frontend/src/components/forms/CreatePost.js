import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

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
                toolbar:toolbarOptions
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