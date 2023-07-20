import React from "react";
import { ClockLoader } from 'react-spinners'

const Overlay = ({loadingStatus}) => {

    
    return (
        <div className="overlay-modal">
            <ClockLoader cssOverride={{
                backgroundColor: 'white'
            }} loading={loadingStatus} />
        </div>
    )
}

export default Overlay