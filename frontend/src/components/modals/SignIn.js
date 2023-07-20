import React, { useState } from 'react'
import SignUpModal from './SignUp'
import CloseButton from '../buttons/Closebutton'

const SignInModal = ({closeModal}) => {

    const [isCreateAccOn, setIsCreateAccOn] = useState(false)

    const handleCloseModal = (e) => {
        e.preventDefault()
        closeModal()
    }

    
    return (
        <div className='overlay'>
            {isCreateAccOn ? <SignUpModal closeModal={closeModal}></SignUpModal> : 
            <div className='modal-cont'>
                <form>
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