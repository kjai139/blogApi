import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'

const PostDetailPage = () => {

    const { id } = useParams()

    useEffect(() => {
        
    }, [])

    const getPost = async () => {
        console.log(id)

        // try {
        //     const response = await axiosInstance.get('/post')
        // }
    }

    return (
        <div>
            <button onClick={getPost}>Get Post</button>
        </div>
    )
}

export default PostDetailPage