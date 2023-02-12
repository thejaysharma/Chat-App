import React from 'react'
import "./sidebar.scss"

export default function SideBar() {
  const rooms = ["first room", "second room", "third room"];

  return (
    <div className='sidebar'>
      <div className="sidebar_container">
        <h2>Available Rooms</h2>
        <ul className ="list-group">
          {rooms.map((room , idx) => (
            <li className='list-group-item' key={idx}>{room}</li>
          ))}
        </ul>
        <h2>Members</h2>
      </div>
    </div>
  )
}
