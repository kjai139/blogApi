import React, { useContext, useEffect, useState, useRef } from 'react'
import SignUpModal from './SignUp'
import CloseButton from '../buttons/Closebutton'
import axiosInstance from '../../modules/axiosInstance'
import { UserContext } from '../UserContext'

const SignInModal = ({closeModal}) => {

    const [isCreateAccOn, setIsCreateAccOn] = useState(false)

    const {user, setUser, setNeedRefresh} = useContext(UserContext)

    const inputRef = useRef(null)
    const [loginResult, setLoginResult] = useState('')

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleCloseModal = (e) => {
        e.preventDefault()
        setNeedRefresh(prev => !prev)
        setLoginResult('')
        closeModal()
    }

    const createNewUser = (e) => {
        e.preventDefault()
        setIsCreateAccOn(true)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const userName = e.target.userName.value
        const userPassword = e.target.userPassword.value
        // console.log(e.target.userName.value)
        // console.log(e.target.userPassword.value)
        try {
            const response = await axiosInstance.post('/users/login', {
                userName: userName,
                userPassword: userPassword
            }, {
                withCredentials: true
            })

            setLoginResult(response.data.message)
        } catch(err) {
            console.log(err)
            setLoginResult(err.message)
        }
    }

    
    return (
        <div className='overlay'>
            {isCreateAccOn ? <SignUpModal closeModal={closeModal}></SignUpModal> : 
            <div className='modal-cont'>
                {loginResult ? 
                <div>
                <h2>{loginResult}</h2>
                <div>
                    <button type='button' onClick={handleCloseModal}>Close</button>
                </div>
                </div>
                : 
                <form style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'0.5rem'
                }} onSubmit={handleLogin}>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2>Please Sign In</h2>
                        <CloseButton onClick={closeModal}></CloseButton>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                    <label htmlFor='userName'>Username</label>
                    <input type='text' name='userName' id='userName' autoComplete='off' ref={inputRef}></input>
                    <label htmlFor='userPassword'>Password</label>
                    <input type='password' name='userPassword' id='userPassword'></input>
                    </div>
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                        
                        <button type='button' className='newUser-btn' onClick={createNewUser} >New user</button>
                        <button type='submit'>Log in</button>
                    </div>
                </form>
                }
                
                
                

            </div>
            }
            
        </div>
    )
}

export default SignInModal