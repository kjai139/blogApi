import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    })

    return (
        
        <div>
            <span>User dashboard</span>
            <div>
                <button onClick={() => navigate('./posts/create')}>Create Post</button>
            </div>
            <div>
                <span>Posts display</span>
            </div>
        </div>
           
    )
}

export default DashBoard