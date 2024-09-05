import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {generateRandomName, makeRandomMessage} from "../utils/helper";
import ChatMessage from './ChatMessage';
import { addMessage } from '../utils/chatSlice';

const LiveChat = () => {
 
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [liveMessage,setLiveMessage] = useState("");

  useEffect(() => {
    // API Polling
    const i = setInterval(() => {
      dispatch(
        addMessage(
          {
          name: generateRandomName(),
          message: makeRandomMessage(20) + "🎪",
         }
      )
      )
    },2000);
    return () => clearInterval(i);

  },[]);


  return (
  <>
<div>
  <div className='w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
    {
      chatMessages.map((c,i) => (
        <ChatMessage key={i} name={c.name} message={c.message}/>
      ))
    }
  </div>
</div>

{/* To insert our own message */}

  <form
  className='w-full p-2 ml-2 border border-black'
  onSubmit={(e) => {
    e.preventDefault();
    dispatch(
      addMessage(
        {
        name: "Dhanashree",
        message: liveMessage,
        }
      )
    );
    setLiveMessage("");
  }}  >
  
    <input
      className='px-2 w-96'
      type='text'
      value={liveMessage}
      onChange={(e) => {
        setLiveMessage(e.target.value);
      }}
    />
    <button className='px-2 mx-2 bg-green-100'>Send</button>
  </form>

  </>
  )
}

export default LiveChat