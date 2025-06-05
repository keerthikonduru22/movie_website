// import React, { useEffect, useState, useMemo,useContext,useRef} from 'react'
// import MyListContext from './contentprovider'
// import './content.css'
// import add from '../assests/add.png'
// import like from '../assests/heart.png'
// import play from '../assests/play-button (1).png'
// import { Link} from 'react-router-dom';
// // import cards_data from './contentimage'
// export default function Content({ type, title, concept, genre, genreid }) {
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     // Set the height and overflow properties using JavaScript
//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       // scrollElement.style.height = '400px';
//       scrollElement.style.overflowX = 'scroll';
//     }
//   }, []);

  
//   const [apidata, setapidata] = useState([])
//   const { mylist, setmylist } = useContext(MyListContext);
//   // useEffect(() => {
//   //   updateType(type)
//   // })
//   // const [mylist, setmylist] = useState([])
//   const handlemylist = (card) => {
//     setmylist((mylist) => {
//       const updatedList = [...mylist, card];
//       localStorage.setItem('mylist', JSON.stringify(updatedList));
//       return updatedList;
//     });
    
//   };
//     useEffect(() => {
//     const savedMylist = localStorage.getItem('mylist');
//     if (savedMylist) {
//       setmylist(JSON.parse(savedMylist));
//     }
//   }, [setmylist,mylist]);
  
//   const options = useMemo(() => ({
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBhYWUyZGQwYzI5YTlmYTA5NmE2ZTU3ZDAwOGYwNyIsIm5iZiI6MTczOTQyNTk5MS4zNzUsInN1YiI6IjY3YWQ4OGM3YjliMTc5MjRlMmQwYzM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GriN0VDcoYqFpkpyGAbmcue1tQsIqYMA62VmSqcULR8'
//     }
//   }), []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = genreid
//           ? `https://api.themoviedb.org/3/discover/${type}?with_genres=${genreid}?language=en-US&page=1`
//           : concept==='trending'?`https://api.themoviedb.org/3/trending/${type}/week?language=en-US&page=1`:`https://api.themoviedb.org/3/${type}/${concept}?language=en-US&page=1`;
//         const res = await fetch(url, options);
//         const data = await res.json();
//         setapidata(data.results);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [type, concept, genre, genreid,options]);
//   return (
//     <div className='hiddenstyle'>
//       <div className='title'>{title}</div>
//       <div className='popularstyle-wrapper'>
//       <div className='popularstyle' ref={scrollRef} >
//         {apidata.map((card, index) => (
//         <div className='popularstyle1' >
//         <Link to={`/player/${type}/${card.id}`}>
//           <div key={index}><img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='card {index}' style={{width: '200px'}} /></div></Link>
//           <div className='cardname'>{card.original_title}</div>
//             {`${type}` === 'tv' && <div className='cardname'>{card.original_name}</div>}
//             <div className='iconstyle'>
//             <div><Link to={`/player/${type}/${card.id}`}><img src={play} alt='play' style={{width: '20px'}}/></Link></div>
//             <div className='handleclick' onClick={() => handlemylist(card)}><img
//                     src={add}
//                     alt='add'
//                     style={{ width: '20px' }}
//                   /></div>
//             <div><img src={like} alt='like' style={{ width: '20px' }} /></div>
//               </div>
//             </div>
          
        
//       ))}
//         </div>
//         </div>
//       </div>
//   )
// }



import React, { useEffect, useState, useMemo,useContext,useRef} from 'react'
import MyListContext from './contentprovider'
import './content.css'
import add from '../assests/add.png'
import like from '../assests/heart.png'
import play from '../assests/play-button (1).png'
import { Link} from 'react-router-dom';
// import cards_data from './contentimage'
export default function Content({ type, title, concept, genre, genreid }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Set the height and overflow properties using JavaScript
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // scrollElement.style.height = '400px';
      scrollElement.style.overflowX = 'scroll';
    }
  }, []);

  
  const [apidata, setapidata] = useState([])
  const { mylist, setmylist} = useContext(MyListContext);
  // useEffect(() => {
  //   updateType(type)
  // })
  // const [mylist, setmylist] = useState([])
  const handlemylist = (card) => {
    setmylist((mylist) => {
      const updatedList = [...mylist, card];
      localStorage.setItem('mylist', JSON.stringify(updatedList)); 
      return updatedList;
    });
  };
  useEffect(() => {
    console.log(mylist)
  })
  
  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBhYWUyZGQwYzI5YTlmYTA5NmE2ZTU3ZDAwOGYwNyIsIm5iZiI6MTczOTQyNTk5MS4zNzUsInN1YiI6IjY3YWQ4OGM3YjliMTc5MjRlMmQwYzM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GriN0VDcoYqFpkpyGAbmcue1tQsIqYMA62VmSqcULR8'
    }
  }), []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = genreid
          ? `https://api.themoviedb.org/3/discover/${type}?with_genres=${genreid}?language=en-US&page=1`
          : concept==='trending'?`https://api.themoviedb.org/3/trending/${type}/week?language=en-US&page=1`:`https://api.themoviedb.org/3/${type}/${concept}?language=en-US&page=1`;
        const res = await fetch(url, options);
        const data = await res.json();
        setapidata(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [type, concept, genre, genreid,options]);
  return (
    <div className='hiddenstyle'>
      <div className='title'>{title}</div>
      <div className='popularstyle-wrapper'>
      <div className='popularstyle' ref={scrollRef} >
        {apidata.map((card, index) => (
        <div className='popularstyle1' >
        <Link to={`/player/${type}/${card.id}`}>
          <div key={index}><img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='card {index}' style={{width: '200px'}} /></div></Link>
          <div className='cardname'>{card.original_title}</div>
            {`${type}` === 'tv' && <div className='cardname'>{card.original_name}</div>}
            <div className='iconstyle'>
            <div><Link to={`/player/${type}/${card.id}`}><img src={play} alt='play' style={{width: '20px'}}/></Link></div>
            <div className='handleclick' onClick={() => handlemylist(card)}><img src={add} alt='add' style={{ width: '20px' }} /></div>
            <div><img src={like} alt='like' style={{ width: '20px' }} /></div>
              </div>
            </div>
          
        
      ))}
        </div>
        </div>
      </div>
  )
}