export const Room = ({room}) => (
  <div className={'list-group-item list-group-item-action rounded-0 my-2'}>
    <div className='ml-4'>
      <div className='d-flex align-item-center justify-content-between mb-1'>
        <h6 className='mb-0'>{room.name}</h6>
        <small className={'small font-weight-bold'}>1 Apr</small>
      </div>
    </div>
  </div>
)