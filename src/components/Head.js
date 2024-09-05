import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { RiYoutubeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

const toggleMenuhandler = () => {
    dispatch(toggleMenu());
};

 /**
   *  searchCache = {
   *     "iphone": ["iphone 11", "iphone 14"]
   *  }
   *  searchQuery = iphone
   */

useEffect(() => {
  const timer = setTimeout(() => {
  if(searchCache[searchQuery]) {
    setSuggestions(searchCache[searchQuery]);
    
  } else {
     getSearchSuggestions();
     
  }
  },200);

  return () => {
    clearTimeout(timer)
  };
},[searchQuery]);

const getSearchSuggestions = async () => {
  const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  const json = await data.json();
  // console.log(json[1]);
  setSuggestions(json[1]);

  // Update the cache i.e., in the slice
  dispatch(
    cacheResults({
      [searchQuery] : json[1],
    })
  );
};


  return (
    <div className='grid grid-flow-col p-5 m-2 shadow '>

    <div className='flex gap-5 col-span-1'>
    <GiHamburgerMenu className='w-10 h-10 cursor-pointer' 
      onClick={() => toggleMenuhandler()}
    />
    <span className='flex align-text-top text-3xl text-black font-bold gap-1'> <RiYoutubeFill className='w-10 h-10 text-red-700'/> YouTube </span> 
    </div>
    
    <div className='col-span-10 px-10 '>
       <input 
       type='text' 
       value={searchQuery}
       className='border border-gray-400 w-1/2 rounded-l-full p-2' 
       placeholder='Search'
       onChange={(e) => setSearchQuery(e.target.value)}
       onFocus={() => setShowSuggestions(true)}
       onBlur={() => setShowSuggestions(false)}
       />
       <button className='border border-gray-400 rounded-r-full bg-gray-100 p-2  '> 🔍</button>
    </div>

    {/* Suggestions Code will be in a list form */}
    {showSuggestions && (
           <div className='fixed bg-gray-100   w-[37rem] mt-12 ml-20 shadow-lg border border-gray-100 rounded-lg py-2 px-2'>
            <ul>
            { suggestions.map((s) => (
              <li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100 text-black z-10'>
              🔍 {s}
              </li>
            ))
            }
            </ul>
           </div>
      )
      }

   <div className='col-span-1'>
   <FaUser className='h-10'/>
   </div>
  
    </div>
  )
}

export default Head