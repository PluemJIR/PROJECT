import React from 'react';
import Navbar2 from '../../component/Navbar/Navbar2'
import Footer from '../../component/Footer/Footer'
import {Layout} from 'antd';
import RegistrationForm from '../../component/Form/register/RegisterForm'
import bg from './bg.jpeg'

const { Content } = Layout;
const contentStyle = {
    height:'100vh',
    width:'100%', 
    backgroundColor:'#0D0311', 
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
}

const h1Style = {
    color:'white',
    fontFamily:'Montserrat',
    fontWeight: 'bolder',
    fontSize:'3rem',
    zIndex: '3',
}

const h2Style = {
    color:'#5C082A',
    fontFamily:'Montserrat',
    fontSize:'1.5rem',
    zIndex: '3',
}

const imgStyle = {
    zIndex: '1',
    // height: '100%',
    width:'80vw',
    position: 'absolute',
    borderRadius:'800px 0 0 0',
    filter: 'blur(2px)',
}



class Register extends React.Component{
    render() {
        return(
            <Layout>
                <Navbar2/>
                <Content style={contentStyle}>
                    <img src={bg} style={imgStyle}></img>
                    <h1 style={h1Style}>JOIN OUR <span style={{color:'#5C082A'}}>COMMUNITY</span></h1>
                    <h3 style={h2Style}><span style={{color:'white'}}>WHY BOOK BY YO</span>URSELF WHEN YOU CAN FIND YOUR STANDEE </h3>
                    <RegistrationForm/>
                </Content>
                <Footer/>
            </Layout>
        )
    }
}

export default Register