import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import add from '../assests/add.png'
import like from '../assests/heart.png'
import play from '../assests/play-button (1).png'
import MyListContext from './contentprovider'
import Navbar from './navbar'
import './search.css'
export default function Search() {
    const {results} = useContext(MyListContext)
  return (
      <div>
          <Navbar />
          <div className='serachcardstyle'>
              {results.map((item, index) => (
              <div className='popularstyle1'>
                      <div key={index}><img src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt='card {index}' style={{ width: '200px' }} /></div>
                      <div className='cardname'>{item.original_title}</div>
              <div className='iconstyle'>
            <div><Link to={`/player/movie/${item.id}`}><img src={play} alt='play' style={{width: '20px'}}/></Link></div>
            <div className='handleclick' ><img src={add} alt='add' style={{ width: '20px' }} /></div>
            <div><img src={like} alt='like' style={{ width: '20px' }} /></div>
                      </div>
                      </div>
          ))}
              </div>
    </div>
  )
}
