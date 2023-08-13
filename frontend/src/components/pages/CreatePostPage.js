import React, { useContext, useEffect } from "react";
import CreatePost from "../forms/CreatePost";
import { UserContext } from "../UserContext";


const CreatePostPage = () => {
    const {setNeedRefresh} = useContext(UserContext)

    useEffect(() => {
        setNeedRefresh(prev => !prev)
    }, [])

    
    return (
        <div>
            <CreatePost></CreatePost>
        </div>
    )
}


export default CreatePostPage