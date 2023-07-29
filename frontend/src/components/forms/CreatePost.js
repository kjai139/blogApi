import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import axiosInstance from '../../modules/axiosInstance'

const CreatePost = () => {
    const [content, setContent] = useState('')
    const quillRef = useRef(null)

    const [isSubmitted, setIsSubmitted] = useState(false)

    

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

   
    const quillModule =  {
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
    }

    

    const onSubmit = async (e) => {
        e.preventDefault()
        const delta = quillRef.current.getEditor().getContents()
        console.log(delta)

        try {
            const response = await axiosInstance.post('/posts/create', {
                delta: delta
            }, {
                withCredentials: true
            })

            if (response.data.success) {
                console.log(response.data.message)
            }
        } catch(err) {
            console.log(err)
        }
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
            <ReactQuill ref={quillRef} theme="snow" modules={quillModule}></ReactQuill>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
        
        </div>
    )
}

export default CreatePost