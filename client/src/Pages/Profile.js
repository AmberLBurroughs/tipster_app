import React from 'react';

import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import Profile from '../Components/Profile';

const ProfilePage = props => {
  return(
    <div>
      <Nav />
      <div className="container">
        <Banner handle="@tofuguy"/>
        <Profile />
      </div>
    </div>
  )
}

export default ProfilePage;