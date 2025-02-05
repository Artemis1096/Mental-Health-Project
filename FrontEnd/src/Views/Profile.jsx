import React from "react";
import "../Styles/Profile.css"

function Profile() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData && Array.isArray(userData) ? userData[0].name : null;
  const userEmail = userData && Array.isArray(userData) ? userData[0].email : null;
  return (
    <div>
      <h1 className="text-center m-6 text-4xl">Profile</h1>
      <div className="main-container m-6 flex justify-center">
        <div className="user-data m-3">
          <div className="upper-design"></div>
          <div className="pic ml-62"><img src="https://westernpest.com/wp-content/uploads/filth-fly-600x4341-1.jpg" alt="" srcset="" /></div>
          <div className="text-center">
            Name - {userName}
            <br />
            Email - {userEmail}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
