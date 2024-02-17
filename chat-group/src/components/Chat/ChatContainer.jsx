import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import RoomContainer from 'src/components/Room/RoomContainer';
import ChatBoxContainer from 'src/components/ChatBox/ChatBoxContainer';

const CreateUserModal = dynamic(() => import('./Modal/CreateUserModal'));
const CreateRoomModal = dynamic(() => import('./Modal/CreateRoomModal'));
export default function ChatContainer({ onCreateUsernameHandler, username, onCreateRoomHandler, selectedRoom }) {
  const [showCreateUserModal, setShowCreateUserModal] = useState(true);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [isExistUsername, setIsExistUsername] = useState(true);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (localStorage && localStorage.getItem('username')) {
      setIsExistUsername(true);
    } else {
      setIsExistUsername(false);
    }
  }, []);

  const onCloseCreateUserModalHandler = () => {
    setShowCreateUserModal(false);
  };

  const onShowCreateRoomModalHandler = () => {
    setShowCreateRoomModal(true);
  };
  const onCloseCreateRoomModalHandler = () => {
    setShowCreateRoomModal(false);
  };

  let headerUI = (<header className={'text-center'}>
    <h1 className='display-4'>Realtime Group Chat App</h1>
    <p className='lead mb-0'>Collaboration with developers worldwide to solve a bigger problem.</p>

    <button
      onClick={onShowCreateRoomModalHandler}
      type={'button'}
      className={'btn btn-primary'}>
      Create room
    </button>
  </header>);

  let createUserModalUI = (<CreateUserModal
    onCloseCreateUserModalHandler={onCloseCreateUserModalHandler}
    onCreateUsernameHandler={onCreateUsernameHandler}
  />);

  let createRoomModalUI = (
    <CreateRoomModal
      onCloseCreateRoomModalHandler={onCloseCreateRoomModalHandler}
      onCreateRoomHandler={onCreateRoomHandler}
    />
  )

  return (<>
    <div className='py-5 px-4'>
      {headerUI}
      <div className={'row overflow-hidden shadow mt-5'}>
        <div className='col-5 px-0'>
          <RoomContainer selectedRoom={selectedRoom}/>
        </div>
        <div className='col-7 px-0'>
          <ChatBoxContainer username={username} />
        </div>
      </div>
    </div>
    {showCreateUserModal && !isExistUsername ? createUserModalUI : null}
    {showCreateRoomModal ? createRoomModalUI : null}
  </>);
}