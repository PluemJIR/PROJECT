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
        const date = new Date()
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
        let n = 0
        const httpResponse = await axios.get('http://localhost:5000/reservation')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if (x.toId === result.data.id && x.option === 'WAITING'){
                myBooking.push(x)
                n +=1
            }
        })
        setBooking(myBooking)
    }

    const checkTimeOut = async () => {
        const date = new Date()
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
        const httpResponse = await axios.get('http://localhost:5000/reservation')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if (x.toId === result.data.id && x.option === 'WAITING'){
                let createdAt = Date.parse((x.createdAt.slice(0,10)) + ' ' + (x.createdAt.slice(11,19)))
                let dateNow = Date.parse((formatted_date).slice(0,24))
                // console.log((x.createdAt.slice(0,10)) + ' ' + (x.createdAt.slice(11,19)))
                // console.log(x.id)
                // console.log(dateNow-createdAt)
                if (dateNow-createdAt > 28800000) {
                    // console.log(x)
                    axios.delete(`/reservation/${x.id}`);
                } 
            } 
        })
    }

    const getAlldata = async () => {
        await getUsername()
        await checkTimeOut()
        await fetchReservation()
    }

    const declineBooking = async (id) => {
        await axios.delete(`/reservation/${id}`);
        await fetchReservation()
    }

    const acceptBooking = async (id) => {
        const newStatus = 'ACCEPTED'
        await axios.put(`/reservation/${id}`, {option : newStatus})
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
                    style={{height:'240px', borderRadius:'5px', backgroundColor:'white', marginBottom:'20px', width:'100%'}}
                    extra={
                        <div style={{padding:'10px', height:'100%', backgroundColor:'tomato', width:'130px', borderBottom:'15px solid black'}}>
                            <div style={{color:'white', fontWeight:'Bold'}}>REV. ID : {item.id}</div>
                            <br></br>
                            <div style={{color:'white', fontWeight:'Bold'}}>  
                                <span>{item.option}</span></div>
                            <hr></hr>
                            <div style={{color:'white'}}>STANDEE ID : #{item.toId}</div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        style={{ height:'80%', backgroundColor:'tomato', padding:'20px 20px', borderBottom:'3px solid black', borderRight:'20px solid black'}}
                        title={<div style={{color:'white'}}><span style={{fontWeight:'bold', color:'white', fontSize:'3rem'}}>{item.restaurant}</span></div>}
                        description={<div><div style={{color:'white', fontSize:'2rem', display:'flex', justifyContent:'space-between'}}>
                            <span>{item.date}</span> 
                            <span style={{color:'white'}}> <UserOutlined/> {item.number}</span>
                            <span></span>
                            </div>
                            <div style={{color:'white', fontSize:'1rem'}}>NOTE : {item.description}</div></div>}
                    />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        Booking Date : {(item.createdAt.slice(0,10)) + ' ' + (item.createdAt.slice(11,19))}  
                        <span>
                            <Button type="primary" style={{marginRight:'10px'}} onClick={() => acceptBooking(item.id)}>ACCEPT</Button>  
                            <Button type="danger" onClick={() => declineBooking(item.id)} >DECLINE</Button>
                        </span>
                    </div>
                    
                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd2