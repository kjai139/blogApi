import React from "react";

const ErrorMsg = ({children}) => {
    return (
        <div className="overlay">
            {children}
        </div>
    )
}

export default ErrorMsg