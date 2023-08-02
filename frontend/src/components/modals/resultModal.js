import React from 'react'

const ResultModal = ({message, closeModal}) => {
    return (
        <div className="overlay">
            <div className='result-cont'>
                <span>{message}</span>
                <button onClick={closeModal}>Close</button>
            </div>
            
        </div>
    )
}

export default ResultModal