import React from 'react'
import { Menu } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../../pages/home/LOGO.png'
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

class Navbar2 extends React.Component {
  state = {
    current: 'user',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme='dark' style={{ backgroundColor: '#5C082A', display:'flex', justifyContent:'flex-end',position:'fixed', width:'100vw', zIndex:'10'}}>
        <div style={{flexGrow:'1'}}><Link to='/'><img src={logo} style={{height:'2.5rem',marginLeft:'0.5rem'}}></img></Link></div>
        <Link to='/login'><Menu.Item key="search" icon={<SearchOutlined />}  style={{ backgroundColor: '#5C082A'}} title='FINDER'>
            <span style={{color:'white'}}> FINDER</span>
        </Menu.Item></Link>
        <SubMenu key="SubMenu" icon={<UserOutlined />} title='PROFILE' style={{ backgroundColor: '#5C082A'}}>
           <Menu.Item key="setting:1" > <Link to='/register'>Register</Link></Menu.Item>
            <Menu.Item key="setting:2" ><Link to='/login'>Login</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Navbar2