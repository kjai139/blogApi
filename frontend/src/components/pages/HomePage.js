import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'


const HomePage = () => {

    const [blogPosts, setBlogPosts] = useState()

    const [resultMsg, setResultMsg] = useState('')

    const getBlogPosts = async () => {
        try {
            const response = await axiosInstance.get('/posts/get', {
                withCredentials: true
            })

            setBlogPosts(response.data.blogPosts)
        } catch (err) {
            setResultMsg(err.message)
        }
    }


    return (
        <div>
            <button>Get Posts</button>
            Home page
        </div>
    )
}

export default HomePage