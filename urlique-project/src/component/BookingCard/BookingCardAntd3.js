import React, {useEffect, useState} from 'react'
import { Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'



const BookingCardAntd2 = (props) => {

    let username = ''
    const getUsername = async () => {
        const token = await localStorageService.getToken();
        if (token) {
            const user = jwtDecode(token)
            username = user.name
        }
    }
    const [Booking, setBooking] = useState([])
    const fetchReservation = async () => {
        const myBooking = []
        const httpResponse = await axios.get('http://localhost:5000/reservation')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if ((x.toId === result.data.id && x.option === 'ACCEPTED') || x.option.length > 10){
                myBooking.push(x)
            }
        })
        setBooking(myBooking)
    }

    const getAlldata = async () => {
        await getUsername()
        await fetchReservation()
    }

    useEffect(() => {
        getAlldata()
    },[])
    return (
        <List
            itemLayout="vertical"
            size="large"
            style={{width:'100%'}}
            dataSource={Booking}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    style={{height:'180px', borderRadius:'5px', backgroundColor:'white', marginBottom:'20px', width:'100%'}}
                    extra={
                        <div style={{border:'3px solid black', height:'100%', backgroundColor:'#097969', width:'130px'}}>
                            <div style={{color:'white'}}><UserOutlined/> {item.number} || {item.date}</div>
                            <br></br>
                            <div style={{color:'white'}}>STATUS : {item.option}</div>
                            <hr></hr>
                            <div style={{color:'white'}}>STANDEE ID : #{item.toId}</div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        style={{border:'3px solid black', height:'70%', backgroundColor:'#097969', padding:'10px 10px '}}
                        title={<div style={{color:'white'}}>Place : <span style={{fontWeight:'bold', color:'white'}}>{item.restaurant}</span> #<span style={{fontWeight:'bold', color:'white'}}>{item.id}</span></div>}
                        description={<div><div style={{color:'white'}}>NOTE : {item.description}</div>
                                     <div style={{color:'white'}}>FROM : {item.fromUsername}</div></div>}
                    />
                    <div style={{display:'flex', justifyContent:'left'}}>
                        createdAt : {item.createdAt}  
                    </div>
                    
                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd2