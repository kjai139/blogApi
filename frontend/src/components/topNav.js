import React, { useContext, useEffect, useState } from 'react'
import SignInModal from './modals/SignIn'
import { UserContext } from './UserContext'
import axiosInstance from '../modules/axiosInstance'
import {Link, useNavigate} from 'react-router-dom'

const TopNav = () => {

    const [isSignInOpen, setIsSignInOpen] = useState(false)
    const { user, setUser, needRefresh, setNeedRefresh } = useContext(UserContext)

    

    const navigate = useNavigate()

    const checkLoginStatus = async () => {
        try {
            const response = await axiosInstance.get('users/get', {
                withCredentials:true
            })
            console.log(response.data, 'checked login')
            if (response.data.logged_in) {
                setUser(response.data)
            } else {
                console.log('user is not logged in')
                setUser(null)
            }
        } catch (err) {
            console.log('checkloginstatus error', err)
            setUser(null)
        }
    }

    const userLogOut = async () => {
        try {
            const response = await axiosInstance.delete('users/logout', {
                withCredentials:true
            })

            if (response.data.success) {
                console.log(response.data.message)
                setUser(null)
                navigate('/')
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        
        checkLoginStatus()
        

    }, [needRefresh])

    const setRefresh = () => {
        setNeedRefresh(prev => !prev)
    }

    return (
        <nav className='nav-cont'>
            {isSignInOpen && <SignInModal closeModal={() => setIsSignInOpen(false)}></SignInModal>}
            <nav className='top-nav'>
                <nav className='top-nav-w'>
                <Link to={'/'} onClick={setRefresh} className='nav-links'>
                <h1 style={{
                    fontSize: '40px'
                }}>The Blog.</h1>
                </Link>
                <ul className='top-nav-ul'>
                    {user ? <li>
                        <Link to={'/dashboard'} onClick={setRefresh} className='nav-links'>Dashboard</Link>
                    </li> : 
                    <li>
                        Home
                    </li>
                    }
                    <li>
                        About
                    </li>
                    <li>
                        Contact
                    </li>
                    {user ? 
                    <li style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        <span><Link to={`/dashboard/${user.id}`}>{user.username}</Link></span>
                        <button className='topNav-btn' onClick={userLogOut}>Logout</button>
                    </li> :
                    <li>
                        
                    <button className='nav-btn' onClick={() => setIsSignInOpen(true)}>Sign In</button>
                    </li>
                    }
                    
                </ul>
                </nav>
            </nav>
        </nav>
    )
}

export default TopNav