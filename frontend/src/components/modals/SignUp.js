import React from 'react'

const SignUpModal = () => {
    return (
        <div className='modal-cont'>
            <form>
                <label htmlFor='userName'>Username</label>
                <input type='text' name='userName' id='userName'></input>
                <label htmlFor='userPassword'>Password</label>
                <input type='password' name='userPassword' id='userPassword'></input>
                <div>
                    <button>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default SignUpModal