import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'

const DashBoard = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const getPosts = async () => {
        try {
            const response = await axiosInstance.get(`/posts/get?id=${user.id}`, {
                withCredentials: true
            })

            console.log(response.data.message)
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    return (
        
        <div>
            <span>User dashboard</span>
            <div>
                <button onClick={() => navigate('./posts/create')}>Create Post</button>
            </div>
            <div>
                <span>Posts display</span>
                <button onClick={getPosts}>Get posts</button>
            </div>
        </div>
           
    )
}

export default DashBoard