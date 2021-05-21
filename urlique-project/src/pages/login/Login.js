import React from 'react'
import LoginForm from '../../component/Form/login/LoginForm'
import Navbar2 from '../../component/Navbar/Navbar2'
import Footer from '../../component/Footer/Footer'
import {Layout} from 'antd';
import bg from './bg.jpeg'

const { Content } = Layout;
const contentStyle = {
    height: '100vh',
    width: '100%',
    backgroundColor: '#0D0311',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    // color:'white',
    zIndex:'2'
}

const imgStyle = {
    zIndex: '-10',
    // height: '100%',
    width:'80vw',
    position: 'absolute',
    borderRadius:'800px 0 0 0',
    filter: 'blur(2px)',
}



const Login = (props) => {
    return (
        <Layout>
            <Navbar2 />
            
            <Content style={contentStyle}>
                <img src={bg} style={imgStyle}></img>
                <LoginForm setRole={props.setRole}/>
            </Content>
            <Footer />
        </Layout>
    )

}

export default Login