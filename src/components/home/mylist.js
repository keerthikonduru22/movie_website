// import React, { useContext } from 'react';
// import MyListContext from './contentprovider'; 
// import Navbar from './navbar';
// import { Link } from 'react-router-dom';
// import './mylist.css'
// export default function Mylist({topic}) {
//   const { mylist, setmylist } = useContext(MyListContext);
//   const handledelete = (card) => {
//     setmylist((mylist) => {
//       const updatedList = mylist.filter(item => item.id !== card.id);
//       localStorage.setItem('mylist', JSON.stringify(updatedList)); 
//       return updatedList;
//     });
//   };
//   return (
//     <div>
//       <div className='mylistnavbar'><Navbar/></div>
//     <div >
//         <div className='title'>{topic}</div>
//       {mylist.length === 0 ? (
//         <p>Add movies to your list and enjoy watching....</p>
//       ) : (
//         <div className='myliststyling'>
//           {mylist.map((item,index) => (

//               <div className='popularstyle1' >
//                       <Link to={`/player/movie/${item.id}`}>
//                         <div key={index}><img src={`https://image.tmdb.org/t/p/w500`+item.backdrop_path} alt='card {index}' style={{width: '200px'}} /></div></Link>
//                         <div className='cardname'>{item.original_title}</div>
//                         {item.original_name && <div className='cardname'>{item.original_name}</div>}
//                         <div className='handleclick' onClick={()=>handledelete(item)}>delete</div>
//                     </div>
              
  
//           ))}
//         </div>
//       )}
//       </div>
//       </div>
//   );
// }



import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import MyListContext from './contentprovider'; // Ensure the path is correct
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import './mylist.css'
export default function Mylist({topic}) {
  // const { type} = useParams()
  const { mylist, setmylist} = useContext(MyListContext);
  const handledelete = (card) => {
    setmylist((mylist) => {
      const updatedList = mylist.filter(item => item.id !== card.id);
      localStorage.setItem('mylist', JSON.stringify(updatedList)); 
      return updatedList;
    });
  };
  return (
    <div>
      <Navbar/>
    <div >
        <div className='title'>{topic}</div>
      {mylist.length === 0 ? (
        <p>Add movies to your list and enjoy watching....</p>
      ) : (
        <div className='myliststyling'>
          {mylist.map((item,index) => (

              <div className='popularstyle1' >
                      <Link to={`/player/movie/${item.id}`}>
                        <div key={index}><img src={`https://image.tmdb.org/t/p/w500`+item.backdrop_path} alt='card {index}' style={{width: '200px'}} /></div></Link>
                        <div className='cardname'>{item.original_title}</div>
                        {item.original_name && <div className='cardname'>{item.original_name}</div>}
                        <div className='handleclick' onClick={()=>handledelete(item)}>delete</div>
                    </div>
              
        
          ))}
        </div>
      )}
      </div>
      </div>
  );
}
