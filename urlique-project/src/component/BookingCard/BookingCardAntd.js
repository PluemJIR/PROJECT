import React, {useEffect, useState} from 'react'
import { Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'



const BookingCardAntd = (props) => {

    let username = ''
    const getUsername = async () => {
        const token = await localStorageService.getToken();
        if (token) {
            const user = jwtDecode(token)
            // console.log(user.name)
            username = user.name
        }
    }
    const [Booking, setBooking] = useState([])
    const fetchReservation = async () => {
        const myBooking = []
        let n = 0
        const httpResponse = await axios.get('http://localhost:5000/reservation')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if (x.user_id === result.data.id && x.option !== 'COMPLETED'){
                myBooking.push(x)
                n += 1
            }
        })
        props.count(n)
        setBooking(myBooking)
    }

    const getAlldata = async () => {
        await getUsername()
        await fetchReservation()
    }

    const completeBooking = async (id) => {
        const newStatus = 'COMPLETED'
        await axios.put(`/reservation/${id}`, {option : newStatus})
        await getAlldata()
        console.log(id)
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
                        <div style={{border:'3px solid black', height:'100%', backgroundColor:'#191970', width:'130px'}}>
                            <div style={{color:'white'}}><UserOutlined/> {item.number} || {item.date}</div>
                            <br></br>
                            <div style={{color:'white'}}>STATUS : {item.option}</div>
                            <hr></hr>
                            <div style={{color:'white'}}>STANDEE ID : #{item.toId}</div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        style={{border:'3px solid black', height:'70%', backgroundColor:'#191970', padding:'10px 10px '}}
                        title={<div style={{color:'white'}}>Place : <span style={{fontWeight:'bold', color:'white'}}>{item.restaurant}</span> #<span style={{fontWeight:'bold', color:'white'}}>{item.id}</span></div>}
                        description={<div style={{color:'white'}}>NOTE : {item.description}</div>}
                    />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        createdAt : {item.createdAt}  
                        <Button onClick={() => completeBooking(item.id)}>COMPLETE</Button>
                    </div>
                    
                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd