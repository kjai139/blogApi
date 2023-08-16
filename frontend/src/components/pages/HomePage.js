import React, { useContext, useEffect, useState } from "react";
import axiosInstance from '../../modules/axiosInstance'
import QuillDisplay from "../forms/QuillEditor";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ReactPaginate from 'react-paginate'


const HomePage = () => {

    const { needRefresh, setNeedRefresh } = useContext(UserContext)

    const [blogPosts, setBlogPosts] = useState()

    const [resultMsg, setResultMsg] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const [totalPages, setTotalPages] = useState(0)

    const navigate = useNavigate()

    const getBlogPosts = async () => {
        try {
            const response = await axiosInstance.get(`/posts/home/get?pageSize=${pageSize}&page=${currentPage}`, {
                withCredentials: true
            })

            setBlogPosts(response.data.blogPosts)
            setTotalPages(response.data.totalPages)
            console.log(totalPages)
            console.log(response.data.blogPosts)
        } catch (err) {
            setResultMsg(err.message)
        }
    }

    useEffect(() => {
        console.log('homepage use effect')
        getBlogPosts()
        
        console.log(needRefresh)
    }, [currentPage])

    const checkRefresh = () => {
        console.log(needRefresh)
    }

    const handlePageChange = ({selected}) => {
        console.log(`page changing to ${selected}`)
        setCurrentPage(selected + 1)
    }


    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'1rem'
        }}> 
            
            {blogPosts &&

            blogPosts.map((node) => {

                let url = node.postTitle.replace(/\s+/g, "-").toLowerCase()
                return (

                    
                    <div key={node._id} className="home-post-cont" onClick={() => navigate(`/post/${url}`, {
                        state: {
                            id: node._id
                        }
                    })}>
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
            {blogPosts && 
            <div style={{
                display:'flex',
                justifyContent:'center'
            }}>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            
            containerClassName="pagination"
            marginPagesDisplayed={2}
            />
            </div>}
            
        </div>
    )
}

export default HomePage