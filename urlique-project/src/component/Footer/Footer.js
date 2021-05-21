import React from 'react'
import { Menu } from 'antd';
import { FacebookOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

class Footer extends React.Component {
  state = {
    current: 'footer',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme='dark' style={{ backgroundColor: '#5C082A', display:'flex', justifyContent:'flex-start',position:'fixed', width:'100vw', bottom:'0',height:'6%',zIndex: '10' }}>
        <Menu.Item key="aboutus"  style={{ backgroundColor: '#5C082A',flexGrow:'3', paddingLeft:'3vw'}}>
            <Link to='/about'>ABOUT US</Link>
        </Menu.Item>
        <Menu.Item key="CLING" disabled style={{ backgroundColor: '#5C082A',flexGrow:'3',}}>
        © CLING, Inc. 2020.
        </Menu.Item>
        <Menu.Item key="facebook" icon={<FacebookOutlined />} style={{ backgroundColor: '#5C082A'}}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"></a>
        </Menu.Item>
        <Menu.Item key="instagram" icon={<InstagramOutlined />} style={{ backgroundColor: '#5C082A', margin:'0'}}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"></a>
        </Menu.Item>
        <Menu.Item key="github" icon={<GithubOutlined />} style={{ backgroundColor: '#5C082A'}}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"></a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Footer

