import React from 'react'


const TopNav = () => {
    return (
        <nav className='nav-cont'>
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
                    <li>
                        Sign In
                    </li>
                </ul>
                </nav>
            </nav>
        </nav>
    )
}

export default TopNav