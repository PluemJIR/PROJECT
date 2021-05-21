import React from 'react';
import { Layout} from 'antd';
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import Banner from '../../component/Banner/Banner'
import { Button } from 'antd';
import {Link} from 'react-router-dom'

const { Content } = Layout;
const contentStyle = {
    height:'100%',
    width:'100%', 
    backgroundColor:'#0D0311', 
    padding:'75px',
    display:'flex',
    alignItems:'center',
    flexWrap:'wrap',
    justifyContent:'space-around',
    paddingBottom:'10vh'
}
const h3Style = {
}

export default function About() {
    return(
        <div>
            <Layout className="layout" style={{height:'100%'}}>
                <Navbar/>
                <Content style={contentStyle} >
                    
                </Content>
                <Footer/>
            </Layout>
        </div>
    )
}