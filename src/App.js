import React from 'react'
// import Navbar from './components/home/navbar'
// import Cards from './components/home/cards'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Content from './components/home/content';
import Home from './components/home/home'
import Player from './components/home/player';
import Tvshowcard from './components/home/Tvshows';
import Movies from './components/home/movies'
import Newpopular from './components/home/new&popular';
import Mylist from './components/home/mylist';
import { MyListProvider } from './components/home/contentprovider';
import Search from './components/home/search';
import SignUp from './components/signup';
import Login from './components/login';

export default function App() {
  return (
    <div className='appstyle'>
      
      <MyListProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
          <Route path='/home' element={<Home/>}/>
        <Route path='/player/:type/:id' element={<Player/>} />
        <Route path='/tvshows' element={<Tvshowcard />} />
        <Route path='/movies' element={<Movies />} />
          <Route path='/newpopular' element={<Newpopular />} />
            <Route path='/mylist' element={<Mylist />} />  
            <Route path='/search' element={<Search/>} />
        </Routes>
        </Router>
      
      </MyListProvider>
      {/* <Search/> */}
    {/* <MyListProvider>
        <Mylist/>
        <Content/>
      </MyListProvider> */}
      </div>
  )
}
