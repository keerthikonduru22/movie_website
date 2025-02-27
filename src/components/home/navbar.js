import React,{useState,useRef,useEffect,useMemo, useContext} from 'react'
import './navbar.css'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes,Link,useNavigate,useLocation } from 'react-router-dom';
import netflix from '../assests/netflixlogo-removebg-preview.png'
import search from '../assests/search.png'
import userlogo from '../assests/userlogo.jpeg'
import dropdown from '../assests/drop.png'
import Home from './home';
import Tvshowcard from './Tvshows';
import Movies from './movies';
import Newpopular from './new&popular';
import Mylist from './mylist';
import MyListContext from './contentprovider';
import Search from './search';
import menubar from '../assests/hamburger-menu.png'
export default function Navbar() {
  const location= useLocation()
  const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };
  const Navigate = useNavigate()

  const handlelogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
      Navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  }
  const [modalopen, setmodalopen] = useState(false)
  const [menuopen,setmenuopen] = useState(false)
  const [query, setQuery] = useState('');
  const { results, setResults } = useContext(MyListContext);
  console.log(results)
  var handlesearchdisplay = () => {
    setmodalopen(true)
  }
  const navbarref = useRef(null)
  if (modalopen === true) {
    handlesearchdisplay = () => {
      setmodalopen(false)
    }
  }
  var handlemenubaropen = () => {
    setmenuopen(true)
  }
  const menuref = useRef(null)
  if (menuopen === true) {
    handlemenubaropen = () => {
      setmenuopen(false)
    }
  }
 
  useEffect(() => {
    const handleScroll = () => {
      if (navbarref.current) {
        console.log('navbarRef.current is defined');
        if (window.scrollY > 5) {
          navbarref.current.style.backgroundColor = 'rgba(30, 26, 26, 0.68)';
        } else {
          navbarref.current.style.backgroundColor = '';
        }
      } else {
        console.log('navbarRef.current is undefined');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  <Router>
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/tvshows' element={<Tvshowcard />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/newpopular' element={<Newpopular />} />
      <Route path='/mylist' element={<Mylist />} />
      <Route path='/search' element={<Search/>} />
    </Routes>
  </Router>
  const options = useMemo(() => ({
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBhYWUyZGQwYzI5YTlmYTA5NmE2ZTU3ZDAwOGYwNyIsIm5iZiI6MTczOTQyNTk5MS4zNzUsInN1YiI6IjY3YWQ4OGM3YjliMTc5MjRlMmQwYzM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GriN0VDcoYqFpkpyGAbmcue1tQsIqYMA62VmSqcULR8'
      }
    }), []);
    const handleSearch = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${query}`;

    try {
      const response = await fetch(url,options);
      const data = await response.json();
      setResults(data.results);
      Navigate('/search')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    return (
      <div className='navbar' ref={navbarref} >
          
        <div className='navbarleft'>
          <div className='imagestyle'><img src={netflix} alt='netflixlogo' style={{ width: '90px' }} /></div>
          <div className='hide'><Link to='/home' className={activeLink === '/home' ? 'activeclass' : ''} onClick={() => handleLinkClick('/home')}>Home</Link></div>
          <div className='hide'><Link to='/tvshows'className={activeLink === '/tvshows' ? 'activeclass' : ''} onClick={() => handleLinkClick('/tvshows')}>Tv shows</Link></div>
          <div className='hide'><Link to='/movies' className={activeLink === '/movies' ? 'activeclass' : ''} onClick={() => handleLinkClick('/movies')}>Movies</Link></div>
          <div className='hide'><Link to='/newpopular' className={activeLink === '/newpopular' ? 'activeclass' : ''} onClick={() => handleLinkClick('/newpopular')}>New & popular</Link></div>
          <div className='hide'><Link to='/mylist' className={activeLink === '/mylist' ? 'activeclass' : ''} onClick={() => handleLinkClick('/mylist')}>My list</Link></div>
        </div>
        <div className='navbarright'>
          <div className='search'>
          
            {modalopen &&
              <form onSubmit={handleSearch}><div className='searchdisplay'><input type='text' placeholder='search here' value={query} onChange={(e)=> setQuery(e.target.value)} /></div></form>}
            <img onClick={handlesearchdisplay} src={search} alt='search' style={{ width: '20px' }} />
          </div>
          <div><img src={userlogo} alt='userlogo' style={{ width: '20px' }} /></div>
          <div className='dropdown' >
            <div className='dropdown2'> <img src={dropdown} alt='dropdownmenu' style={{ width: '20px' }} /></div>
              
            <div onClick={handlelogout} className='dropdown1'>logout</div></div>
                
        <div className='totalmenustyle'>
        <div ref={menuref} onClick={handlemenubaropen} className='styelmenubar'><img src={menubar} alt='menubar' style={{ width: '32px'}}/></div>
        {menuopen && <div className='subclass'>
          <div><Link to='/home' className={activeLink === '/home' ? 'activeclass' : ''} onClick={() => handleLinkClick('/home')}>Home</Link></div>
          <div><Link to='/tvshows' className={activeLink === '/tvshows' ? 'activeclass' : ''} onClick={() => handleLinkClick('/tvshows')}>Tv shows</Link></div>
          <div><Link to='/movies' className={activeLink === '/movies' ? 'activeclass' : ''} onClick={() => handleLinkClick('/movies')}>Movies</Link></div>
          <div><Link to='/newpopular' className={activeLink === '/newpopular' ? 'activeclass' : ''} onClick={() => handleLinkClick('/newpopular')}>New & popular</Link></div>
          <div><Link to='/mylist' className={activeLink === '/mylist' ? 'activeclass' : ''} onClick={() => handleLinkClick('/mylist')}>My list</Link></div>
              <div onClick={handlelogout}>logout</div></div>
            }
            </div>
          </div>
      </div>
    )
  }

