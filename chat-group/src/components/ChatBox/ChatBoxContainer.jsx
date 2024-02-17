import styles from './ChatBoxContainer.module.css';
import MessageBox from 'src/components/ChatBox/MessageBox';

export default function ChatBoxContainer({ username }) {
  let messages = [{
    name: 'john', message: 'Hello, programming'
  }, {
    name: 'guest', message: 'return 404 page'
  }];

  return (<div className={`${styles.chatbox_container}  d-flex flex-column justify-content-between pb-0`}>
    <div className={`scroll px-4 ${styles.chatbox_wrapper}`}>
      {messages.map((msg, msgIndex) => <MessageBox key={msgIndex} msg={msg} username={username} />)}
    </div>
    <div className='d-flex justify-content-between'>
      <input type='text' className={`px-2 ${styles.message_input}`} placeholder={'Type a message...'} />
      <div className='d-flex justify-content-center pe-2'>
        <button className={'btn btn-success'}>Send</button>
      </div>
    </div>
  </div>);
}