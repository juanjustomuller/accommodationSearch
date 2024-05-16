import './List.scss'
//import { listData } from '../../lib/dummydata'
import Card from '../Card/Card'

const List = ({posts}) => {
  return (
    <div className='list'>
        {posts.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default List