import React, { useState } from "react";
import axiosInstance from '../../modules/axiosInstance'


const HomePage = () => {

    const [blogPosts, setBlogPosts] = useState()

    const [resultMsg, setResultMsg] = useState('')

    const getBlogPosts = async () => {
        try {
            const response = await axiosInstance.get('/posts/home/get/', {
                withCredentials: true
            })

            setBlogPosts(response.data.blogPosts)
            console.log(response.data.blogPosts)
        } catch (err) {
            setResultMsg(err.message)
        }
    }


    return (
        <div>
            <button onClick={getBlogPosts}>Get Posts</button>
            Home page
        </div>
    )
}

export default HomePage