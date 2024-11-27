import React, { useEffect, useState } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState('');
  const ENDPOINT = "localhost:5000";
  const [users, setusers] = useState('')

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT)
    setName(name);
    setRoom(room);
    // console.log(socket);
    socket.emit('join',{name,room},(error)=>{
      if(error) {
        alert(error);
      }
    });

    return ()=>{
      socket.disconnect();
      socket.off();
    }
  },[ENDPOINT,location.search]);

  useEffect(()=>{
    socket.on('message',(message)=>{
      setmessages([...messages,message])
    })
    socket.on("roomData", ({ users }) => {
      setusers(users);
    });
  },[messages])

  //function to send messages
  const sendMessage=(event)=>{
    event.preventDefault();
    if(message){
      socket.emit('sendMessage',message,()=>setmessage(''))
    } 
  }

  // console.log(message,messages)
  return( 
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setmessage={setmessage} sendMessage={sendMessage}/>
      </div>
        <TextContainer users={users}></TextContainer>
    </div>
  );
};

export default Chat;
