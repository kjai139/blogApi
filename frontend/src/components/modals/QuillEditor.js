import React from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const QuillEditor = () => {
    const [value, setValue] = useState('')

    return (
        <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        ></ReactQuill>
    )
}

export default QuillEditor