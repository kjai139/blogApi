import React, { useEffect, useState } from 'react'
import CloseButton from '../buttons/Closebutton'
import axiosInstance from '../../modules/axiosInstance'
import { userValidationScehma, userPasswordValidationSchema} from './validationSchema'
import Overlay from '../overlay'

const SignUpModal = ({closeModal}) => {

    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isUserNameEntered, setIsUserNameEntered] = useState(false)

    const [isUserPasswordEntered, setIsUserPasswordEntered] = useState(false)

    const [userValidationError, setUserValidationError] = useState('')

    const [passwordValidationError, setPasswordValidationError] = useState('')

    const [confirmValidationError, setConfirmValidationError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [resultMsg, setResultMsg] = useState('')

    useEffect(() => {
        console.log('userName', userName)
        console.log('userPw', userPassword)
        console.log('isUserNameEntered', isUserNameEntered)
        console.log('isuserPwentered', isUserPasswordEntered)
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
                setIsLoading(true)
                await userValidationScehma.validate({
                    userName: userName
                })
                console.log('yup validation passed')
                const normalizedName = userName.toLowerCase()
                console.log(normalizedName)
                const response = await axiosInstance.get(`/users/check?username=${normalizedName}`)

                if (response.data.success) {
                    setIsLoading(false)
                    setIsUserNameEntered(true)
                } else {
                    setIsLoading(false)
                    console.log(response.data.message)
                    setUserValidationError(response.data.message)
                    setUserName('')
                }
            } catch (err) {
                setIsLoading(false)
                console.log(err.message)
                setUserValidationError(err.message)
                setUserName('')

            }
            
        } else if (isUserNameEntered && !isUserPasswordEntered) {
           
            try {
                
                await userPasswordValidationSchema.validate({
                    userPassword: userPassword
                })
                setIsUserPasswordEntered(true)
            } catch (err) {
                console.log('pw validate fail')
                setPasswordValidationError(err.message)
                setUserPassword('')
            }
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (confirmPassword === userPassword) {
            try {
            
                const response = await axiosInstance.post('/users/create', {
                    userName: userName,
                    userPassword: userPassword
                })
                setIsLoading(false)
                console.log(response.data.message)
                setResultMsg(response.data.message)
    
    
            } catch(err) {
                setIsLoading(false)
                console.log(err.message)
                setConfirmValidationError(err.message)
                setConfirmPassword('')
            }
        } else {
            setIsLoading(false)
            setConfirmValidationError('Passwords must match.')
            setConfirmPassword('')
        }

        

        

        
        
    }


    return (
        <div className='modal-cont'>
            {isLoading && 
            <Overlay loadingStatus={isLoading}></Overlay>
            }
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
                        flexDirection:'column',
                        gap:'0.5rem'
                    }}>
                        <label htmlFor='userName'>Enter your username:</label>
                        <input type='text' name='userName' id='userName' onChange={handleUserNameChange} autoComplete='off' value={userName} placeholder='Name must not contain symbols'></input>
                        <span className='errorMsg'>
                            {userValidationError}
                        </span>
                        
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
                
                {isUserNameEntered && !isUserPasswordEntered &&
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'.5rem'
                }}>
                <label htmlFor='userPassword'>Choose a password: Must be at least 6 letters, have one uppercase letter and one symbol</label>
                <input type='password' name='userPassword' id='userPassword' onChange={handleUserPasswordChange} placeholder='Enter here' value={userPassword}></input>
                        <span className='errorMsg'>
                            {passwordValidationError}
                        </span>
                
                <div style={{
                    display:'flex'
                }}>
                    <button style={{
                        marginLeft:'auto'
                    }} onClick={handleNext}>Next</button>

                </div>
                </div>
                }
                {isUserNameEntered && isUserPasswordEntered && !resultMsg &&
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'.5rem'
                }}>
                <label htmlFor='userPassword-c'>Confirm your password</label>
                <input type='password' name='userPassword-c' id='userPassword-c' onChange={handleConfirmPwChange} value={confirmPassword}></input>
                        <span className='errorMsg'>
                            {confirmValidationError}
                        </span>
                
                <div style={{
                    display:'flex'
                }}>
                    <button style={{
                        marginLeft:'auto'
                    }} onClick={handleSubmit}>Create User</button>

                </div>
                </div>
                }
                {resultMsg && 
                <div style={{
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <span>
                        {resultMsg}
                    </span>
                    <button onClick={(e) => {
                        e.preventDefault()
                        closeModal()
                    }}>Close</button>
                    
                </div>
                }
                
                
            </form>

        </div>
    )
}

export default SignUpModal