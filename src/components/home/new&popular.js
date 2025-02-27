import React from 'react';
import './cards.css';
import Content from './content';
import Footer from './footer';
import Navbar from './navbar';
import './new&popular.css'



export default function Newpopular() {
    return (
        <div>
            <Navbar/>
      <div className='newpopularstyle'>
            <Content type={'movie'} title={'now on netflix'} concept={'trending'} />
            <Content type={'movie'} title={'Top movies'} concept={'popular'} />
            <Content type={'movie'} title={'Coming this week'} concept={'upcoming'} />
            <Content type={'tv'} title={'top Tv shows'} concept={'popular'} />
            
      <div className='popularfooter'><Footer /></div>
    </div >
    </div>
  );
}
