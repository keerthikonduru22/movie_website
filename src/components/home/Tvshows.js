import React, { useRef, useEffect,useContext } from 'react';
import MyListContext from './contentprovider';
// import './cards.css';
import Content from './content';
import Footer from './footer';
import Navbar from './navbar';
import './Tvshows.css'
import Video from './video';
import Mylist from './mylist';
import { Link} from 'react-router-dom';

export default function Tvshowcard() {
  const { videoKey } = useContext(MyListContext);
  const tvref = useRef()
  useEffect(() => {
      // Set the height and overflow properties using JavaScript
      const tvbackElement = tvref.current;
      if (tvbackElement && videoKey) {
        // scrollElement.style.height = '400px';
        
      tvbackElement.style.backgroundImage = `linear-gradient(to bottom, #341d1d12 50%, rgba(0, 0, 0, 1) 100%),url('https://image.tmdb.org/t/p/w500/${videoKey.backdrop_path}')`
      }
    });

    return (
      
        <div className='tvshowstyling' ref={tvref}>
        <Navbar />
        <Video type={'tv'} concept={'on_the_air'}  />
      <div className='movie'>
        <div className='tvshowstying1'>
          {videoKey.original_name}
        </div>
        <div className='moviestyling2'>
          <p>{videoKey.overview}</p>
        </div>
        <div className='buttonstyle'>
          <div className='style1'>
           <Link to={`/player/tv/${videoKey.id}`}><button>watch</button></Link>
          </div>
          <div className='style2'>
            <button>watch info</button>
          </div>
        </div>
      </div>
      <Content type={'tv'} title={'Popular tvshows'} concept={'popular'} />
      <Content type={'tv'} title={'Top Rated tvshows'} concept={'top_rated'} />
      <Content type={'tv'} title={'Now playing'} concept={'on_the_air'} />
        <Content type={'tv'} title={'Upcoming'} concept={'airing_today'} />
        <div className='cardmylist'><Mylist topic={'My list'}/></div>
      <Footer />
    </div>
  );
}
