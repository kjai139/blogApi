import React, { useContext, useEffect, useState } from 'react'
import SignInModal from './modals/SignIn'
import { UserContext } from './UserContext'
import axiosInstance from '../modules/axiosInstance'

const TopNav = () => {

    const [isSignInOpen, setIsSignInOpen] = useState(false)
    const { user, setUser, needRefresh } = useContext(UserContext)

    const checkLoginStatus = async () => {
        try {
            const response = await axiosInstance.get('users/get')

            if (response.data.logged_in) {
                setUser(response.data)
            } else {
                console.log('user is not logged in')
            }
        } catch (err) {
            console.log('checkloginstatus error', err)
        }
    }

    useEffect(() => {
        checkLoginStatus()

    }, [needRefresh])

    return (
        <nav className='nav-cont'>
            {isSignInOpen && <SignInModal closeModal={() => setIsSignInOpen(false)}></SignInModal>}
            <nav className='top-nav'>
                <nav className='top-nav-w'>
                <h1 style={{
                    fontSize: '40px'
                }}>The Blog.</h1>
                <ul className='top-nav-ul'>
                    <li>
                        Blog
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Contact
                    </li>
                    {user ? 
                    <li>
                        {user.username}
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