import {useEffect,useMemo, useContext} from 'react'
import './video.css'
import MyListContext from './contentprovider'
export default function Video({type,concept}) {
  const { videoKey, setVideoKey } = useContext(MyListContext);
    console.log("hello",videoKey)
    const options = useMemo(() => ({
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBhYWUyZGQwYzI5YTlmYTA5NmE2ZTU3ZDAwOGYwNyIsIm5iZiI6MTczOTQyNTk5MS4zNzUsInN1YiI6IjY3YWQ4OGM3YjliMTc5MjRlMmQwYzM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GriN0VDcoYqFpkpyGAbmcue1tQsIqYMA62VmSqcULR8'
        }
      }), []);
    
        useEffect(() => {
            const fetchVideo = async () => {
                try {
                    // Fetch popular movies
                    const movieResponse = await fetch(`https://api.themoviedb.org/3/${type}/${concept}?language=en-US&page=1`,options);
                    const movieData = await movieResponse.json();
                    const movies = movieData.results;

                    // Select a random movie
                    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                    console.log(randomMovie.original_title)
                    // Fetch videos for the selected movie
                    // const videoResponse = await fetch(`https://api.themoviedb.org/3/${type}/${randomMovie.id}/videos?language=en-US&page=1`,options);
                    // const videoData = await videoResponse.json();
                    // const videos = videoData.results;
                    
                    // Filter for trailers or teasers
                    // const trailer = videos.find(video => video.type === 'Trailer' || video.type === 'Teaser');
                    // console.log(trailer)
                    // Set the video key
                    if (randomMovie) {
                        setVideoKey(randomMovie);
                  }
                  if (randomMovie.backdrop_path === null) {
                      setVideoKey(movies[0])
                  }
                  // console.log(videoKey.backdrop_path)
                } catch (error) {
                    console.error("Error fetching video", error);
                }
            };

            fetchVideo();
        }, [options,type,concept,setVideoKey]);
    console.log("keerthi",videoKey.backdrop_path)
         
  // return (
  //   <div className='stylevideo'>
          
  //     {/* {videoKey && (
  //       <iframe
  //         src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&playlist=${videoKey}`}
  //         allow="autoplay; encrypted-media"
  //         allowFullScreen
  //         title="video"
          
  //       ></iframe>
  //     )} */}
  //   </div>

  // )
}
