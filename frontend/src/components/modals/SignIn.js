import React, { useState } from 'react'
import SignUpModal from './SignUp'

const SignInModal = ({closeModal}) => {

    const [isCreateAccOn, setIsCreateAccOn] = useState(false)

    const handleCloseModal = (e) => {
        e.preventDefault()
        closeModal()
    }

    
    return (
        <div className='overlay'>
            {isCreateAccOn ? <SignUpModal></SignUpModal> : 
            <div className='modal-cont'>
                <form>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2>Please Sign In</h2>
                        <button className='modal-btn-close' onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                        </button>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                    <label htmlFor='userName'>Username</label>
                    <input type='text' name='userName' id='userName' autoComplete='off'></input>
                    <label htmlFor='userPassword'>Password</label>
                    <input type='password' name='userPassword' id='userPassword'></input>
                    </div>
                </form>
                <div>
                <button onClick={() => setIsCreateAccOn(true)}>New user</button>
                </div>
                

            </div>
            }
            
        </div>
    )
}

export default SignInModal