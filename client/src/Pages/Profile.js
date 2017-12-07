import React from 'react';

import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import Profile from '../Components/Profile';

const ProfilePage = props => {
  return(
    <div>
      <Nav />
      <Banner handle="@tofuguy"/>
      <div>
        <Profile />
      </div>
    </div>
  )
}

export default ProfilePage;