import React, { useRef, useEffect,useContext } from 'react';
import MyListContext from './contentprovider';
// import maharshi from '../assests/maharshimovie.png';
import Content from './content';
import Footer from './footer';
import Video from './video';
import Mylist from './mylist';
import { Link} from 'react-router-dom';
import './cards.css'
export default function Cards() {
  const { videoKey } = useContext(MyListContext);
  const backref = useRef()
  useEffect(() => {
      // Set the height and overflow properties using JavaScript
      const backElement = backref.current;
      if (backElement && videoKey) {
        // scrollElement.style.height = '400px';
        
      backElement.style.backgroundImage = `linear-gradient(to bottom, #341d1d12 50%, rgba(0, 0, 0, 1) 100%),url('https://image.tmdb.org/t/p/w500/${videoKey.backdrop_path}')`
      }
    });
  return (
    <div className='moviestyling' ref={backref}>
      <div className='cardtotalstyle'>
         <Video type={'movie'} concept={'popular'}  />
        <div className='movie'>
        {/* <div className='videostyle'> <Video type={'movie'} concept={'popular'} /></div> */}
        <div className='moviestying1'>
         {videoKey.original_title}
        </div>
        <div className='moviestyling2'>
          <p>{videoKey.overview}</p>
        </div>
        <div className='buttonstyle'>
          <div className='style1'>
            <Link to={`/player/movie/${videoKey.id}`}><button>watch</button></Link>
          </div>
          <div className='style2'>
            <button>watch info</button>
          </div>
        </div>
        </div>
      
      <div><Content type={'movie'} title={'Popular on Netflix'} concept={'popular'} /></div>
      <div><Content type={'movie'} title={'Top Rated'} concept={'top_rated'} /></div>
      <div><Content type={'movie'} title={'Now playing'} concept={'now_playing'} /></div>
          <div><Content type={'movie'} title={'Upcoming'} concept={'upcoming'} /></div>
           <div className='cardmylist'><Mylist topic={'My list'}/></div>
      
        <div className='footstyle'><Footer /></div>
         {/* <Video type={'movie'} concept={'popular'} /> */}
        </div>
    </div>
  );
}
