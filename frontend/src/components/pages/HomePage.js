import React, { useEffect, useState } from "react";
import axiosInstance from '../../modules/axiosInstance'
import QuillDisplay from "../forms/QuillEditor";
import { useNavigate } from "react-router-dom";


const HomePage = () => {

    const [blogPosts, setBlogPosts] = useState()

    const [resultMsg, setResultMsg] = useState('')

    const navigate = useNavigate()

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

    useEffect(() => {
        getBlogPosts()
    }, [])

    


    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'1rem'
        }}>
            
            {blogPosts &&

            blogPosts.map((node) => {
                return (
                    <div key={node._id} className="home-post-cont" onClick={() => navigate(`/post/${node._id}`)}>
                        <div style={{
                            padding:'15px'
                        }}>
                            <span style={{
                                display:'inline-block'
                            }}>
                        <h3 className="home-post-title">{node.postTitle}</h3>
                        </span>
                        </div>
                        <QuillDisplay delta={node.body}></QuillDisplay>
                    </div>    
                )
            })
            }
        </div>
    )
}

export default HomePage