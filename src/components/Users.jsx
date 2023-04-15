import axios from 'axios'
import { useEffect, useState,useContext } from 'react'
import MainTable from '../shared/MainTable/MainTable'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
// import { Switch } from 'antd'  
import {NotificationContext} from '../App'
import useToggle from '../customHooks/useToggle';

const Users = (props) => {
  const [users, setUsers] = useState([])
  const [progress, toggleProgress] = useToggle(false)
  const {handleNotification} = useContext(NotificationContext);
  
  const info = {
    header: 'Users',
    dataFor: 'User',
    tableHeaders: ['photo', 'Name', 'Email', 'city', 'phone', 'ID number', 'verified']
  }

  const handleToggle = (event, id) => {
    axios.put(`http://157.230.231.198/api/v1/user/toggleState/${id}`, {}, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then((res) => {
      handleNotification('success',res.data.message)
    }).catch(error => {
      handleNotification('error', "Server Error")
    })
  }

  useEffect(() => {
    toggleProgress()
    axios.get('http://157.230.231.198/api/v1/user/users', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then((res) => {
      const data = res.data.users.map(ele => {
        console.log(ele)
        return {
          ...ele,
          // isBanned: <Switch defaultChecked={ele.isBanned?true:false} onChange={(event)=>handleToggle(event, ele._id)}/>
          verified:ele.verified ?<CheckCircleFilled style={{color : 'green'}} />:<CloseCircleFilled style={{color : 'red'}} />
        }
      })
      setUsers(() => [...data])
      toggleProgress()
    })
  },[])
  return <>
    <MainTable info={info} data={users} progress={progress} />
  </>
}

export default Users