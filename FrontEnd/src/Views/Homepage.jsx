import React, { useState } from 'react';
import axios from "axios";
import "../Styles/HomePage.css"
const Homepage = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData && Array.isArray(userData) ? userData[0].id : null;
    const userName = userData && Array.isArray(userData) ? userData[0].name : null;
    return (
        <div className='main'>
            <div className="Heading">
                <p className='Heading-welcome'>Welcome</p>
                <p className='Heading-username'>{userName}</p>
            </div>
        </div>
    )
}

export default Homepage