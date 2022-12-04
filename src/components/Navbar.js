import React from 'react'
import user1 from "../img/user1.png"

const Navbar = (user) => {

  return (
    <div className='navbar'>
      <span className="logo">React-Chat</span>
      <div className="user">
        <img src={user1} alt="user" />
        <span> {user.name}</span>
        {/* <button>Logout</button> */}
      </div>
    </div>
  )
}

export default Navbar