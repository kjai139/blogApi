import React from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const QuillDisplay = ({delta}) => {
    

    return (
        <ReactQuill
        theme="bubble"
        value={delta}
        readOnly={true}
        ></ReactQuill>
    )
}

export default QuillDisplay