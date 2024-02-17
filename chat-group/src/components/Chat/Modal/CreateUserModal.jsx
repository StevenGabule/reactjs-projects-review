import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateUserModal.module.css';

export default function CreateUserModal({ onCloseCreateUserModalHandler, onCreateUsernameHandler }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [username, setUsername] = useState('');
  const [isMaxLengthError, setIsMaxLengthError] = useState(false);
  const [isMinLengthError, setIsMinLengthError] = useState(false);

  const onInputChangeHandler = (event) => {
    event.preventDefault();
    const usernameInputValue = event.target.value;

    setIsMaxLengthError(false);
    setIsMinLengthError(false);

    if (usernameInputValue.length < 3) {
      setIsMinLengthError(true);
    } else if (usernameInputValue.length > 12) {
      setIsMaxLengthError(true);
    }
    setUsername(usernameInputValue);
  };

  const onSubmitUsernameHandler = () => {
    if (username && !isMinLengthError && !isMaxLengthError) {
      onCreateUsernameHandler(username.trim())
      onCloseCreateUserModalHandler()
    }
  };


  useEffect(() => {
    setIsBrowser(true);
  }, []);

  let modalUI = isBrowser ? ReactDOM.createPortal(<div className={'modal d-block'}>
    <div className={`position-fixed h-100 w-100 ${styles.Backdrop}`}></div>
    <div className='modal-dialog modal-dialog-centered'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className={'modal-title'}>Create User</h5>
        </div>
        <div className='modal-body'>
          <div className='input-group has-validation'>
            <span className={'input-group-text'}>@</span>
            <div className={'form-floating is-invalid'}>
              <input
                type={'text'}
                className={'form-control is-invalid'}
                id={'floatingInputGroup2'}
                placeholder={'Username'}
                required
                value={username}
                onChange={onInputChangeHandler}
              />
              <label htmlFor='floatingInputGroup2'>Username</label>
            </div>
            {isMinLengthError ?
              <div className='invalid-feedback'>Min length should be at least 3 characters.</div> : null}
            {isMaxLengthError ?
              <div className='invalid-feedback'>Max length should be least 12 characters.</div> : null}
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={onSubmitUsernameHandler} className={'btn btn-primary'} disabled={!username || isMaxLengthError || isMinLengthError}>
            Create
          </button>
        </div>
      </div>
    </div>
  </div>, document.getElementById('_nextjs-modal-root')) : null;

  return modalUI;

}