import styles from './RoomContainer.module.css'
import { Room } from 'src/components/Room/Room';
export default function RoomContainer() {
  let roomList = [
    {
      name: 'Room 1',
      created: new Date()
    },
    {
      name: 'Room 2',
      created: new Date()
    },
  ];

  return (
    <div>
      <div className='bg-gray px-4 py-2'>
        <span className='h5 mb-0 py-1'>Rooms</span>
      </div>
      <div className={styles.room_box_container}>
        <div className='list-group rounded-0 px-2'>
          {roomList.map((room, roomIndex) => <Room key={roomIndex} room={room} />)}
        </div>
      </div>
    </div>
  )
}