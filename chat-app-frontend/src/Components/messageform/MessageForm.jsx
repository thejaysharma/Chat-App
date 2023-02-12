import React from 'react'
import "./messageform.scss"
import { IoSend } from "react-icons/io5"

export default function MessageForm() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className='messageform'>
            <div className="messageform_container">
                <div className="message_output">
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='send_message_bar'>
                        <input type="text" placeholder='Your message' />
                        <button type='submit' className='btn btn-primary send_btn'><IoSend className='send_btn_icon' /></button>
                    </div>

                </form>
            </div>
        </div>
    )
}
