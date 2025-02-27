import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './player.css'

export default function Player() {
  const { id ,type} = useParams()
  
  const [apidata, setapidata] = useState({
    key: "",
    published_at: "",
    name: "",
    type:""
  })
  console.log(id)
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBhYWUyZGQwYzI5YTlmYTA5NmE2ZTU3ZDAwOGYwNyIsIm5iZiI6MTczOTQyNTk5MS4zNzUsInN1YiI6IjY3YWQ4OGM3YjliMTc5MjRlMmQwYzM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GriN0VDcoYqFpkpyGAbmcue1tQsIqYMA62VmSqcULR8'
  }
    };
    
    useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results[0]))
  .catch(err => console.error(err));
    })
console.log(type)
console.log(apidata.published_at)
  return (
    <div className='playerstyle'>
      <div><iframe title='trailer' src={`https://www.youtube.com/embed/${apidata.key}`} style={{ width: "95%", height: "90vh" }} allowFullScreen></iframe></div>
      <div className='apistyle'>
      <div>{apidata.published_at.slice(0,10)}</div>
      <div>{apidata.name}</div>
        <div>{apidata.type}</div>
        </div>
              </div>
  )
}
