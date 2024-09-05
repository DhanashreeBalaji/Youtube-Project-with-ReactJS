import React from 'react'
import { useEffect, useState } from 'react'
import { YOUTUBE_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoGridContainer = () => {

  const [videos,setVideos] = useState([]);

   useEffect(() => {
   getVideos();
   },[]);

    const getVideos = async () => {
     const data = await fetch (YOUTUBE_API);
     const json = await data.json();
     //  console.log(json.items);
      setVideos(json.items);
    }


  return (
    <div className='flex flex-wrap'>
  {}
     {
      videos.map((video) => (
        <Link to={"/watch?v=" + video.id} key= {video.id}> <VideoCard  info={video}/></Link>
      ))
    }
    </div>
  );

}

export default VideoGridContainer