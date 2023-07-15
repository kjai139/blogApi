import React from 'react'
import TopNav from './topNav'


const Layout = ({children}) => {
    return (
        <div className='App'>
            <TopNav></TopNav>
           
            <div className='content'>
            {children}
            </div>
        </div>
    )
}

export default Layout