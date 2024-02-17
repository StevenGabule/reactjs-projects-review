import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatContainer from 'src/components/Chat/ChatContainer';


let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  const socketInitializer = async () => {
    await fetch(`/api/socket`);
    socket = io();
  };

  useEffect(() => {
    socketInitializer();
    if (localStorage && localStorage.getItem('username')) {
      setUsername(localStorage.getItem('username'));
    }

  }, []);

  const onCreateUsernameHandler = (username) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const onCreateRoomHandler = (roomName) => {
    setSelectedRoom(roomName)
  }

  return (<>
    <ChatContainer
      onCreateUsernameHandler={onCreateUsernameHandler}
      onCreateRoomHandler={onCreateRoomHandler}
      selectedRoom={selectedRoom}
      username={username}
    />
  </>);
}
