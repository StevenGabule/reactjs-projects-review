export default function MessageBox({msg, username}) {
  let messageBoxContainerClass = '';

  if(username === msg.name) {
    messageBoxContainerClass = 'text-right justify-content-end';
  }

  return (
    <div className={`d-flex align-items-center ${messageBoxContainerClass}`}>
      <div className='px-2'>
        <span className={'name'}>{msg.name}</span>
        <p>{msg.message}</p>
      </div>
    </div>
  )
}