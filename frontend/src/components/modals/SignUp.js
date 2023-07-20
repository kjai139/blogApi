import React, { useEffect, useState } from 'react'
import CloseButton from '../buttons/Closebutton'
import axiosInstance from '../../modules/axiosInstance'
import { userValidationScehma, userPasswordValidationSchema, userConfirmPwValidationSchema } from './validationSchema'

const SignUpModal = ({closeModal}) => {

    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isUserNameEntered, setIsUserNameEntered] = useState(false)

    const [isUserPasswordEntered, setIsUserPasswordEntered] = useState(false)

    const [usernameValidationError, setUsernameValidationError] = useState('')

    useEffect(() => {
        console.log('userName', userName)
        console.log('userPw', userPassword)
    })

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value)
    }
    const handleConfirmPwChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleNext = async (e) => {
        e.preventDefault()
        if (!isUserNameEntered) {
            try {
                await userValidationScehma.validate({
                    userName: userName
                })
                console.log('yup validation passed')
                const normalizedName = userName.toLowerCase()
                console.log(normalizedName)
                const response = await axiosInstance.get(`/users/check?username=${normalizedName}`)

                if (response.data.success) {
                    setIsUserNameEntered(true)
                } else {
                    console.log(response.data.message)
                }
            } catch (err) {
                console.log(err.message)
            }
            
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {userName, userPassword} 

        

        const response = await axiosInstance.post('/users/create', {
            userName: userName,
            userPassword: userPassword
        })
        
    }


    return (
        <div className='modal-cont'>
            <form>
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                <h2>Creating User</h2>
                <CloseButton onClick={() => {
                    setUserName('')
                    setUserPassword('')
                    closeModal()
                }}></CloseButton>
                </div>
                {isUserNameEntered ? null : 
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'0.5rem'
                
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        <label htmlFor='userName'>Enter your username:</label>
                        <input type='text' name='userName' id='userName' onChange={handleUserNameChange} autoComplete='off'></input>
                        
                    </div>
                    <div style={{
                        display:'flex'
                    }}>
                        <button type='submit' style={{
                            marginLeft: 'auto'
                        }} onClick={handleNext}>Next</button>
                    </div>
                </div>
                }
                
                {isUserNameEntered &&
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'.5rem'
                }}>
                <label htmlFor='userPassword'>Enter a password</label>
                <input type='password' name='userPassword' id='userPassword' onChange={handleUserPasswordChange}></input>
                
                <div style={{
                    display:'flex'
                }}>
                    <button style={{
                        marginLeft:'auto'
                    }} onClick={handleNext}>Next</button>

                </div>
                </div>
                }
                {isUserNameEntered && isUserPasswordEntered &&
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'.5rem'
                }}>
                <label htmlFor='userPassword-c'>Confirm your password</label>
                <input type='password' name='userPassword-c' id='userPassword-c' onChange={handleConfirmPwChange}></input>
                
                <div style={{
                    display:'flex'
                }}>
                    <button style={{
                        marginLeft:'auto'
                    }}>Create User</button>

                </div>
                </div>
                }
                
                
            </form>

        </div>
    )
}

export default SignUpModal