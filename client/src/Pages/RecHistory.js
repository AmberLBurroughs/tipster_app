import React from 'react';

import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import RecHistory from '../Components/RecHistory';

const RecHistoryPage = props => {
  return(
    <div>
      <Nav />
      <Banner/>
      <div>
        <RecHistory />
      </div>
    </div>
  )
}

export default RecHistoryPage;