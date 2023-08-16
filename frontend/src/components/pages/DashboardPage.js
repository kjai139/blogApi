import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../modules/axiosInstance'
import ResultModal from "../modals/resultModal";
import formatRelative from 'date-fns/formatRelative'
import parseISO from "date-fns/parseISO";
import ReactPaginate from 'react-paginate'

const DashBoard = () => {

    const { user, setNeedRefresh } = useContext(UserContext)
    const navigate = useNavigate()

    const [blogPosts, setBlogPosts] = useState()
    const [resultMsg, setResultMsg] = useState('')

    const pageSize = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    

    const getPosts = async () => {
        try {
            const response = await axiosInstance.get(`/posts/get?id=${user.id}&currentPage=${currentPage}&pageSize=${pageSize}`, {
                withCredentials: true
            })

            console.log(response.data.message)
            if (response.data.blogPosts) {
                console.log(response.data.blogPosts)
                setBlogPosts(response.data.blogPosts)
                setTotalPages(response.data.totalPages)
            }
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(user)
        
        if (user) {
            getPosts()
        } 
        
    }, [user, currentPage])

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected + 1)
    }

    const publishPost = async (id) => {
        try {
            const response = await axiosInstance.post('/posts/publish', {
                id: id
            }, {
                withCredentials: true
            })

            console.log(response.data.message)
            setResultMsg(response.data.message)
        } catch(err) {
            console.log(err)
            setResultMsg(err.message)
        }
    }

    const deletePost = async (id) => {
        try{
            const response = await axiosInstance.delete(`/posts/delete?id=${id}`, {
                withCredentials: true
            })

            setResultMsg(response.data.message)

            console.log(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    const closeModalRefresh = () => {
        setResultMsg('')
        getPosts()
    }

    return (
        
        <div>
            { user ?
            <div>
            {resultMsg && 
            <ResultModal message={resultMsg} closeModal={closeModalRefresh}></ResultModal>
            }
            <div style={{
                display:'flex',
                justifyContent: 'space-between',
                padding: '1rem'
            }}>
            <span>User Dashboard</span>
            <div>
                <button onClick={() => navigate('./posts/create')}>Create a post</button>
            </div>
            
            </div>
            { blogPosts ?
            <div className="dash-post-cont">
                {blogPosts.map((node) => {
                    
                    
                    return (
                        <div key={node._id} className="dash-posts">
                            <div className="dash-status">
                            <span>Title: {node.postTitle}</span>
                            <span>Status: {node.published ? 'Published' : 'Draft'}</span>
                            {node.publishDate &&
                            <span>Published on {formatRelative(parseISO(node.publishDate), new Date())}</span>
                            }
                            </div>
                            <div className="dash-btns-cont">
                            {node.published ? null : 
                            <button onClick={() => publishPost(node._id)}>Publish</button>
                            }
                            
                            <button onClick={() => deletePost(node._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div> 
            : 
            <div>
                No Posts Yet
            </div>}
            </div>:
            <span>PLEASE LOG IN TO SEE DASHBOARD</span>
            }
            { blogPosts &&
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

export default DashBoard