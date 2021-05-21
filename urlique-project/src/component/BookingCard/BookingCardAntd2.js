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
        props.count(n)
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
        await getAlldata()
    }

    const acceptBooking = async (id) => {
        const newStatus = 'ACCEPTED'
        await axios.put(`/reservation/${id}`, {option : newStatus})
        await getAlldata()
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
                        <div style={{border:'3px solid black', height:'100%', backgroundColor:'#5C082A', width:'100%'}}>
                            <div style={{color:'white'}}><UserOutlined/> {item.number} || {item.date}</div>
                            <br></br>
                            <div style={{color:'white'}}>STATUS : {item.option}</div>
                            <hr></hr>
                            <div style={{color:'white'}}>STANDEE ID : #{item.toId}</div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        style={{border:'3px solid black', height:'70%', backgroundColor:'#5C082A', padding:'10px 10px '}}
                        title={<div style={{color:'white'}}>Place : <span style={{fontWeight:'bold', color:'white'}}>{item.restaurant}</span> #<span style={{fontWeight:'bold', color:'white'}}>{item.id}</span></div>}
                        description={<div><div style={{color:'white'}}>NOTE : {item.description}</div>
                                     <div style={{color:'white'}}>FROM : {item.fromUsername}</div></div>}
                    />
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        Booking Date : {(item.createdAt.slice(0,10)) + ' ' + (item.createdAt.slice(11,19))}  
                        <Button type="primary" onClick={() => acceptBooking(item.id)}>ACCEPT</Button>
                        <Button type="danger" onClick={() => declineBooking(item.id)} >DECLINE</Button>
                    </div>
                    
                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd2