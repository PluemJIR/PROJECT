import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Tabs, Badge} from 'antd';
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import _ from 'lodash'
import BookingCard1 from '../../component/BookingCard/BookingCardAntd'
import BookingCard2 from '../../component/BookingCard/BookingCardAntd2'
import BookingCard3 from '../../component/BookingCard/BookingCardAntd3'
import BookingCard4 from '../../component/BookingCard/BookingCardAntd4'

const { TabPane } = Tabs;
const { Content } = Layout;
const contentStyle = {
    width:'100%',
    paddingTop: '10vh',
    fontFamily: 'Montserrat',
    height:'100%',
    paddingBottom:'10vh',
    marginBottom:'40vh',
    display:'flex',
    flexDirection:'column'
}
function callback(key) {
    console.log(key);
}


const Booking = (props) => {
    return (
        <Layout className="layout" style={{backgroundColor:'#0D0311', paddingBottom:'10%',}}>
            <Navbar setRole={props.setRole}/>
            <Content style={contentStyle} >
                <Tabs onChange={callback} type="card">
                    <TabPane tab={<div style={{color:'black'}}>INCOMING BOOKING </div>} key="1">
                        <Row>
                            <Col span={18} offset={3}><BookingCard2/></Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<div style={{color:'black'}}>MY BOOKING</div>} key="2">
                        <Row>
                            <Col span={18} offset={3}><BookingCard1 /></Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<div style={{color:'black'}}>ACCEPTED BOOKING</div>} key="3">
                        <Row>
                            <Col span={18} offset={3}><BookingCard3/></Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<div style={{color:'black'}}>HASHTAG BOOKING </div>} key="4">
                        <Row>
                            <Col span={18} offset={3}><BookingCard4/></Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Content>
            <Footer />
        </Layout>
    )
}




export default Booking;