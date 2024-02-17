import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateRoomModal.module.css';

export default function CreateRoomModal({ onCloseCreateRoomModalHandler, onCreateRoomHandler }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isMaxLengthError, setIsMaxLengthError] = useState(false);
  const [isMinLengthError, setIsMinLengthError] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const onInputChangeHandler = (event) => {
    event.preventDefault();
    const roomNameInputValue = event.target.value;

    setIsMinLengthError(false);
    setIsMaxLengthError(false);

    if (roomNameInputValue.length < 3) {
      setIsMinLengthError(true);
    } else if (roomNameInputValue.length > 12) {
      setIsMaxLengthError(true);
    }
    setRoomName(roomNameInputValue);
  };

  const onSubmitRoomNameHandler = (event) => {
    event.preventDefault();
    if (roomName && !isMinLengthError && !isMaxLengthError) {
      onCreateRoomHandler(roomName)
      onCloseCreateRoomModalHandler();
    }
  };

  return isBrowser ? ReactDOM.createPortal(<div className={'modal d-block'}>
    <div className={`${styles.Backdrop} position-fixed h-100 w-100`}></div>
    <div className='modal-dialog modal-dialog-centered'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className={'modal-title'}>Create Room</h5>
          <button
            onClick={onCloseCreateRoomModalHandler}
            type={'button'}
            className={'btn-close'}
            data-bs-dismiss={'modal'}
            aria-label={'Close'}></button>
        </div>
        <div className='modal-body'>
          <label htmlFor='room-name' className={'col-form-label'}></label>
          <input
            onChange={onInputChangeHandler}
            type='text'
            id={'room-name'}
            className={'form-control'}
            placeholder={'Room name *Required'} />
          {isMinLengthError ?
            <p className='text-danger'>Min length should be at least 3 characters.</p> : null}
          {isMaxLengthError ?
            <p className='text-danger'>Max length should be least 12 characters.</p> : null}
        </div>
        <div className='modal-footer'>
          <button
            disabled={!roomName || isMaxLengthError || isMinLengthError}
            onClick={onSubmitRoomNameHandler}
            type={'submit'}
            className={'btn btn-primary'}>
            Create
          </button>
        </div>
      </div>
    </div>
  </div>, document.getElementById('_nextjs-modal-root')) : null;
}