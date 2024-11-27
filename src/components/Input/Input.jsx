import React from 'react'
import './Input.css'

const Input = ({message,setmessage,sendMessage}) => {
  return (
   <form action="" className='form'>
    <input 
        type="text" 
        className='input' 
        placeholder='Type a message'
        value={message} 
        onChange={e=> setmessage(e.target.value)}
        onKeyDown={e=> e.key==='Enter'? sendMessage(e): null}
    />
    <button className='sendButton' onClick={e=>sendMessage(e)}>Send</button>
   </form>
  )
}

export default Input