import React from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const QuillComments = ({delta}) => {
    

    return (
        <ReactQuill
        theme="bubble"
        value={delta}
        readOnly={true}
        className="comments-quill"
        ></ReactQuill>
    )
}

export default QuillComments