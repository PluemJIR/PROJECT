import React, { useEffect, useState } from 'react'
import { Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom';



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
        httpResponse.data.map(x => {
            if (x.hashtag !== null && x.hashtag !== '') {
                if (result.data.hashtag.search(x.hashtag.slice(1, x.hashtag.length)) > 0) {
                    if (x.option === 'WAITING') {
                        console.log(x.hashtag.slice(1, x.hashtag.length))
                        console.log(result.data.hashtag.search(x.hashtag.slice(1, x.hashtag.length)))
                        myBooking.push(x)
                        n += 1
                    }

                }
            }
        })
        setBooking(myBooking)
    }

    const getAlldata = async () => {
        await getUsername()
        await fetchReservation()
    }

    const acceptBooking = async (id) => {
        await getUsername()
        const newStatus = `HASHTAG #${userId} ACCEPT`
        await axios.put(`/reservation/${id}`, { option: newStatus })
        await fetchReservation()
    }

    useEffect(() => {
        getAlldata()
        // console.log(Booking)
    }, [])
    return (
        <List
            itemLayout="vertical"
            size="large"
            style={{ width: '100%' }}
            dataSource={Booking}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    style={{height:'240px', borderRadius:'5px', backgroundColor:'white', marginBottom:'20px', width:'100%'}}
                    extra={
                        <div style={{padding:'10px', borderBottom:'15px solid black', height:'100%', backgroundColor:'#191970', width:'130px'}}>
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
                        style={{border:'3px solid black', height:'80%', backgroundColor:'#191970', padding:'20px 20px ', borderBottom:'3px solid black', borderRight:'20px solid black'}}
                        title={<div style={{color:'white'}}><span style={{fontWeight:'bold', color:'white', fontSize:'3rem'}}>{item.restaurant}</span></div>}
                        description={<div><div style={{color:'white', fontSize:'2rem', display:'flex', justifyContent:'space-between'}}>
                            <span>{item.date}</span> 
                            <span style={{color:'white'}}> <UserOutlined/> {item.number}</span>
                            <span></span>
                            </div>
                            <div style={{color:'white', fontSize:'1rem'}}>NOTE : {item.description}</div></div>}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        Booking Date : {(item.createdAt.slice(0, 10)) + ' ' + (item.createdAt.slice(11, 19))}
                        <Button type="primary" onClick={() => acceptBooking(item.id)}>ACCEPT</Button>
                    </div>

                </List.Item>
            )}
        />
    )
}

export default BookingCardAntd2