import React, { useState } from 'react';
import axios from "axios";
import "../Styles/HomePage.css"
const Homepage = () => {
    const [UserName, setUserName] = useState();
    return (
        <div className='main'>
            <div className="Heading">
                <p className='Heading-welcome'>Welcome</p>
                <p className='Heading-username'>Mere Dost</p>
            </div>
        </div>
    )
}

export default Homepage