import React from 'react';
import { Layout} from 'antd';
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import Banner from '../../component/Banner/Banner'
import logo from './LOGO.png'
import { Button } from 'antd';
import {Link} from 'react-router-dom'

const { Content } = Layout;
const contentStyle = {
    height:'110%',
    width:'100%', 
    backgroundColor:'#0D0311', 
    padding:'75px',
    display:'flex',
    alignItems:'center',
    flexWrap:'wrap',
    justifyContent:'space-around'
}
const h3Style = {
    color:'#F5F1E3',
    textAlign:'center',
    fontFamily:'Montserrat',
    fontWeight:'Bold',
    fontSize:'1.4rem'
}

const HomeLogin = (props) => {
    return(
            <Layout className="layout" style={{height:'100%'}}>
                <Navbar setRole={props.setRole}/>
                <Content style={contentStyle} >
                    <Banner/>
                    <div style={{textAlign:'center',width:'40rem'}}>
                        <img src={logo} style={{width:'100%',}}></img>
                        <h3 style={h3Style}><span style={{color:'#BE1D37'}}>TAKE </span>YOUR TIME <span style={{color:'#BE1D37'}}>ENJOY</span> YOUR MEAL</h3>
                        <h3 style={h3Style}>เพราะเรารู้ว่า <span style={{color:'#BE1D37', fontSize:'1.7rem'}}> เวลา</span> ของคุณสำคัญ</h3>
                        <br></br>
                        <Link to='/profile'><Button type="primary" style={{height:'3rem', fontFamily:'Montserrat', fontWeight:'Bold', color:'#5C082A', backgroundColor:'#F5F1E3', border:'#5C082A', marginRight:'2rem'}}>YOUR PROFILE</Button></Link>
                        <Link to='/finder'><Button type="primary" style={{height:'3rem', fontFamily:'Montserrat', fontWeight:'Bold', color:'#5C082A', backgroundColor:'#F5F1E3', border:'#5C082A'}}>FIND YOUR STANDEE</Button></Link>
                    </div>
                </Content>
                <Footer/>
            </Layout>
        )
} 


export default HomeLogin;