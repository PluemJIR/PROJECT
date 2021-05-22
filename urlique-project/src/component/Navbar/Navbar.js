import React, { useEffect, useState } from 'react'
import { Menu, Badge } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../../pages/home/LOGO.png'
import { Link } from 'react-router-dom'
import localStorageService from '../../services/localStorageService'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const { SubMenu } = Menu;

function Navbar(props) {
  const [current, setCurrent] = useState('user')

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const logout = () => {
    localStorageService.removeToken()
    props.setRole('guest')
  }

  let username = ''
  const getUsername = async () => {
    const token = await localStorageService.getToken();
    if (token) {
      const user = jwtDecode(token)
      // console.log(user.name)
      username = user.name
    }
  }
  const [count, setCount] = useState(0)
  const fetchReservation = async () => {
    let n = 0
    const httpResponse = await axios.get('http://localhost:5000/reservation')
    const result = await axios.get(`http://localhost:5000/users/${username}`)
    httpResponse.data.map(x => {
      if (x.toId === result.data.id && x.option !== 'ACCEPTED') {
        n += 1
      }
    })
    setCount(n)
  }

  const getAlldata = async () => {
    await getUsername()
    await fetchReservation()
  }

  useEffect(() => {
    getAlldata()
  }, [])

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme='dark' style={{ backgroundColor: '#5C082A', display: 'flex', justifyContent: 'flex-end', position: 'fixed', width: '100vw', zIndex: '10' }}>
      <div style={{ flexGrow: '1' }}><Link to='/'><img src={logo} style={{ height: '2.5rem', marginLeft: '0.5rem' }}></img></Link></div>
      <Link to='/finder'><Menu.Item key="search" icon={<SearchOutlined />} style={{ backgroundColor: '#5C082A' }} title='FINDER'>
        FINDER
      </Menu.Item></Link>
      <SubMenu key="SubMenu" icon={<UserOutlined />} title={<span>PROFILE</span>} style={{ backgroundColor: '#5C082A' }}>
        <Menu.Item key="setting:1" ><Link to='/profile'>YOUR PROFILE</Link></Menu.Item>
        <Menu.Item key="setting:2" onClick={fetchReservation}><Link to='/booking'>BOOKING</Link></Menu.Item>
        <Menu.Item key="setting:3" onClick={logout}>SIGN OUT</Menu.Item>
      </SubMenu>
    </Menu>
  );

}

export default Navbar