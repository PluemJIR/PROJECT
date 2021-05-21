import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Layout, Form, Input, Button, Rate, Modal, InputNumber, message, Upload } from 'antd';
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import { UploadOutlined } from '@ant-design/icons';
import AntdComment from '../../component/Comment/antdComment'
import './standeeProfile.css'
import _ from 'lodash'
import data from '../../data/data'

const { Content } = Layout;
const contentStyle = {
    paddingTop: '10vh',
    backgroundColor: '#0D0311',
    fontFamily: 'Montserrat',
    height: '100%',
    marginBottom: '30vh'
}

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const StandeeProfile = (props) => {

    const url = window.location.href.split('/')
    const length = url.length
    const username = url[length - 1]
    const users = data.users
    const onFinish = (values) => {
        // console.log(values);
    };

    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [inputReview, setInputReview] = useState('')
    const [inputScore, setInputScore] = useState(0)
    const [avgScore, setAvgScore] = useState(0)
    const [comments, setComments] = useState([])
    const [profile, setProfile] = useState([])
    const [pic, setPic] = useState()
    const [inputRestaurant, setInputRestaurant] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [inputNumber, setInputNumber] = useState(0)
    const [inputDate, setInputDate] = useState('')
    const [inputTime, setInputTime] = useState('')
    // const [inputHashtag, setInputHashtag] = useState('')


    const getUserByUsername = async () => {
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        setProfile(result.data)
        setPic(users[result.data.id - 1].image)
    }

    const ownsReview = []
    const fetchComments = async () => {
        let sum = 0
        const httpResponse = await axios.get('http://localhost:5000/reviews')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map(x => {
            if (x.reviewTo === result.data.id) {
                ownsReview.push(x)
                sum += x.score
            }
        })
        setAvgScore((sum / (ownsReview.length)).toFixed(2))
        setComments(ownsReview)
    }

    const addComment = async () => {
        await axios.post('http://localhost:5000/reviews', {
            review: inputReview,
            score: inputScore,
            to: profile.id
        })
        message.success('Review added');
        fetchComments()
    }

    const addReservation = async () => {
        await axios.post('http://localhost:5000/reservation', {
            restaurant: inputRestaurant,
            description: inputDescription,
            number: inputNumber,
            date: inputDate,
            time: inputTime,
            // hashtag: inputHashtag,
            toId: profile.id,
            option: 'WAITING'
        })
        message.success('BOOKING COMPLETED')
    }

    useEffect(() => {
        getUserByUsername()
        fetchComments();
    }, [])

    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk1 = () => {
        setIsModalVisible1(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const styleContainer = {
        width: '100%',
        height: '100%',
        margin: '0 0 0 auto'
    }

    return (
        <Layout className="layout" style={{ backgroundColor: '#0D0311', paddingBottom: '10%' }}>
            <Navbar setRole={props.setRole} />
            <Content style={contentStyle} >
                <div className='profile-container'>
                    <div className='profile-section'>
                        <div className='img-profile'>
                            <img alt={profile.name} src={pic} style={{ width: '230px' }}></img>
                        </div>
                        <div className='info-profile'>
                            <h3 style={{ color: 'white' }}><span style={{ fontWeight: 'bolder', fontSize: '1.3rem' }}>{profile.name}</span> | <span style={{ fontWeight: 'bolder', fontSize: '0.8rem' }}>Average Score : <span style={{ color: '#90EE90', fontSize: '1rem' }}>{avgScore}</span></span> </h3> <hr></hr>
                            <h3 style={{ color: 'white' }}>{profile.description}</h3>
                            <h4 style={{ color: '#BE1D37' }}>{profile.hashtag}</h4>
                            <h3 style={{ color: 'white' }}>Price rate</h3> <hr></hr>
                            {profile.priceratePerson} THB/Person || Waiting {profile.pricerateTime} THB/Hour
                            <br></br>
                            <Button type="primary" onClick={showModal1} size='large' style={{ marginRight: '3%', marginTop: '4%', backgroundColor: '#BE1D37', border: '#BE1D37', width: '200px', marginBottom: '3%' }}>BE MY STANDEE</Button>
                            <Modal title='Booking Order' visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1} footer={null} width={350}>
                                <div style={{ ...styleContainer }}>
                                    <Form {...layout} name="nest-messages" layout='vertical' onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                                        <Form.Item
                                            label='Restaurant'
                                            name={['user', 'name']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input placeholder="RESTAURANT's NAME" value={inputRestaurant} onChange={(e) => setInputRestaurant(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            label='No. of People'
                                            name={['user', 'Number']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input placeholder='Number' value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label="Date - Waiting time"
                                            style={{ margin: '0 0 10px 0' }}>
                                            {/* <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} /> */}
                                            <Input type='date' value={inputDate} onChange={(e) => setInputDate(e.target.value)} style={{ width: '50%' }} />
                                            <Input value={inputTime} onChange={(e) => setInputTime(e.target.value)} style={{ width: '50%' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name={['user', 'description']}
                                            label="Description"
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input.TextArea value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}/>
                                        </Form.Item>
                                        <div>
                                            <span style={{ fontWeight: 'bolder', fontSize: '0.9rem' }}>
                                                TOTAL COST : {profile.priceratePerson*inputNumber + profile.pricerateTime*inputTime} THB 
                                            </span>
                                        </div>
                                        <Form.Item label="Upload Pay Slip"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}>
                                            <Upload name="logo" action="/upload.do" listType="picture" style={{ width: '100%' }}>
                                                <Button icon={<UploadOutlined />} block>
                                                    Click to upload
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                                            <Button type="primary" htmlType="submit" block onClick={addReservation}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                                            <Button type="danger" htmlType="submit" block onClick={handleCancel1}>
                                                Cancel
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                            <Button type="primary" onClick={showModal2} size='large' style={{ backgroundColor: '#BE1D37', border: '#BE1D37', width: '200px' }}>WRITE A REVIEW</Button>
                            <Modal title='Review Your Standee' visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2} footer={null} width={350} style={{ paddingRight: '0' }}>
                                <div style={{ ...styleContainer }}>
                                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                                        <Form.Item
                                            {...layout}

                                            name={['user', 'description']}
                                            label="Tell me something?"
                                            style={{ margin: '0 0 20px 0', }}
                                        >
                                            <Input.TextArea value={inputReview} onChange={(e) => setInputReview(e.target.value)} style={{ height: '150px' }} />
                                        </Form.Item>
                                        <Form.Item label="Rate" layout='horizontal' style={{ margin: '0 0 20px 0' }}>
                                            <Rate value={inputScore} onChange={(e) => { setInputScore(e) }} />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                                            <Button type="primary" htmlType="submit" block onClick={addComment}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className='comment-section'>
                        <h1 style={{ color: 'white', marginLeft: '0' }}>Review from User</h1>
                        <div className='comment-feed'>
                            <AntdComment comments={comments} />

                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}




export default StandeeProfile;