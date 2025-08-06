import React from 'react'
import { useState } from 'react';
const UserProfile = () => {
    const [form,editForm]=useState([]);
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text"  className="bg-white text-black"placeholder="Enter name" />
            <input type="text"  className="bg-white text-black"placeholder="Enter email" />

        </form>
    </div>
  )
}

export default UserProfile