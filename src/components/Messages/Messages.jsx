import './Messages.css'

import ScrollToBottom from 'react-scroll-to-bottom';

import React from 'react'

import Message from '../Message/Message';

const Messages = ({messages,name}) => {
  // console.log(messages)
  return (
    <ScrollToBottom className='messages'>
        {messages.map((message,i)=> <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
  )
}

export default Messages