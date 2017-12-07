import React from 'react';

import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import History from '../Components/History';

const HistoryPage = props => {
  return(
    <div>
      <Nav />
      <Banner handle="@tofuguy"/>
      <div>
        <History />
      </div>
    </div>
  )
}

export default HistoryPage;