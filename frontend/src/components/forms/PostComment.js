import React from "react";
import ReactQuill from "react-quill";


const CommentForm = () => {
    return (
        <div>
            <form>
                <label>Comment:</label>
                <ReactQuill theme="snow"></ReactQuill>
            </form>
        </div>
    )
}

export default CommentForm