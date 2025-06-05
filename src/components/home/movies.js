import React, { useRef, useEffect,useContext } from 'react';
import MyListContext from './contentprovider';
import './cards.css';
import Content from './content';
import Footer from './footer';
import Navbar from './navbar';
import './Tvshows.css'
import './movies.css'
import Video from './video';
import Mylist from './mylist';
import { Link} from 'react-router-dom';

export default function Movies() {
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
        <div className='moviesstyling' ref={tvref}>
        <Navbar />
        <Video type={'movie'} concept={'top_rated'}  />
      <div className='movie'>
        <div className='tvshowstying1'>
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
            <Content type={'movie'} title={'Comedy movies'} genreid={'35'} />
            <Content type={'movie'} title={'Action movies'} genreid={'28'} />
            <Content type={'movie'} title={'Triller movies'} genreid={'53'} />
            <Content type={'movie'} title={'Romantic movies'} genreid={'10749'} />
            <Content type={'movie'} title={'Fantasy movies'} genreid={'14'} />
            <Content type={'movie'} title={'Horror movies'} genreid={'27'} />
        <Content type={'movie'} title={'Top rated movies'} concept={'top_rated'} />
        <div className='cardmylist'><Mylist topic={'My list'}/></div> 
            
            

      {/* <Content type={'tv'} title={'Top Rated tvshows'} concept={'top_rated'} />
      <Content type={'tv'} title={'Now playing'} concept={'on_the_air'} />
      <Content type={'tv'} title={'Upcoming'} concept={'airing_today'} /> */}
      <div className='moviefooter'><Footer /></div>
    </div>
  );
}
