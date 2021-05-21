import React, {useEffect, useState} from 'react'
import { Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'



const BookingCardAntd2 = (props) => {

    let username = ''
    const [userId, setUserId] = useState(0)
    const getUsername = async () => {
        const token = await localStorageService.getToken();
        if (token) {
            const user = jwtDecode(token)
            username = user.name
            setUserId(user.id)
        }
    }
    const [Booking, setBooking] = useState([])
    const fetchReservation = async () => {
        const myBooking = []
        let n = 0
        const httpResponse = await axios.get('http://localhost:5000/reservation')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if (result.data.hashtag.search(x.hashtag) > 0 && x.option.search('HASHTAG') !== 0 && x.option.search('ACCEPTED') !== 0 && x.option !== 'COMPLETED' ){
                myBooking.push(x)
                n +=1
            }
        })
        props.count(n)
        setBooking(myBooking)
    }

    const getAlldata = async () => {
        await getUsername()
        await fetchReservation()
    }

    const acceptBooking = async (id) => {
        await getUsername()
        const newStatus = `HASHTAG #${userId} ACCEPT`
        await axios.put(`/reservation/${id}`, {option : newStatus})
        await fetchReservation()
    }

    useEffect(() => {
        getAlldata()
        // console.log(userId)
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
                    </div>
                    
                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd2