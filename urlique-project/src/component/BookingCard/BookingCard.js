import React from 'react'
import './BookingCard.css'
import { Descriptions, Button } from 'antd';


const BookingCard = () => {
    return (
        <div className='container'>
            <div className='date'>
                <h1>07<br></br>MAY<br></br>2021</h1>
            </div>
            <Descriptions
                title="Booking #2 - Cat on the roof"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                size='small'
                layout='horizontal'
                className='descriptions'
            >
                <Descriptions.Item label="Person">No. People</Descriptions.Item>
                <br></br>
                <Descriptions.Item label="Date">19.00 09/05/2021</Descriptions.Item>
                <Descriptions.Item label="Description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Descriptions.Item>
            </Descriptions>
            <div className='response'>
                <div style={{fontSize:'2rem', fontWeight:'regular',paddingRight:'1rem'}}>100 THB</div>
                <div style={{fontSize:'1.5rem', fontWeight:'regular',paddingRight:'1rem'}}>Bukayo Saka</div>
                <div style={{fontSize:'1.2rem', fontWeight:'regular',paddingRight:'1rem'}}>WAITING FOR RESPONSE</div>
                <div style={{textAlign:'center'}}><Button type="primary"><span style={{fontSize:'1rem'}}>CANCEL ORDER</span></Button></div>
            </div>
        </div>
    )
}

export default BookingCard