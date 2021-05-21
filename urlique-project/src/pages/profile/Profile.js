import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Layout, Form, Input, Button, Rate, Modal, InputNumber, DatePicker, Upload, Row, Col } from 'antd';
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import { UploadOutlined, EditOutlined  } from '@ant-design/icons';
import AntdComment from '../../component/Comment/antdComment'
import './Profile.css'
import data from '../../data/data'
import _ from 'lodash'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'

const { Content } = Layout;
const contentStyle = {
    paddingTop: '10vh',
    backgroundColor: '#0D0311',
    fontFamily: 'Montserrat',
    height:'100%',
    paddingBottom:'20vh',
    marginBottom:'30vh'
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

const Profile = (props) => {
    const users = data.users
    const onFinish = (values) => {
        console.log(values);
    };

    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [inputReview, setInputReview] = useState('')
    const [inputScore, setInputScore] = useState(0)
    const [avgScore, setAvgScore] = useState(0)
    const [comments, setComments] = useState([])
    const [profile, setProfile] = useState([])
    const [pic, setPic] = useState()
    const [inputDescription, setInputDescription] = useState(profile.description)
    const [inputHashtag, setInputHashtag] = useState(profile.hashtag)
    const [inputPriceratePerson, setInputPriceratePerson] = useState(profile.priceratePerson)
    const [inputPricerateTime, setInputPricerateTime] = useState(profile.pricerateTime)

    let username = ''
    const getUsername = async () => {
        const token = await localStorageService.getToken();
        if (token) {
            const user = jwtDecode(token)
            console.log(user.name)
            username = user.name
        }
    }
    const getAlldata = async () => {
        await getUsername()
        await getUserByUsername()
        await fetchComments()
    }
 
    const getUserByUsername = async () => {
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        setProfile(result.data)
        setPic(users[result.data.id-1].image)
    }
    
    const ownsReview = []
    const fetchComments = async () => {
        let sum = 0
        const httpResponse = await axios.get('http://localhost:5000/reviews')
        const result = await axios.get(`http://localhost:5000/users/${username}`)
        httpResponse.data.map( x => {
            if (x.reviewTo === result.data.id){
                ownsReview.push(x)
                sum += x.score
            }
        })
        setAvgScore((sum/(ownsReview.length)).toFixed(2))
        setComments(ownsReview)
    }

    const addComment = async () => {
        await axios.post('http://localhost:5000/reviews', {review: inputReview, score: inputScore, to: profile.id})
        fetchComments()
    }

    const editProfile = async () => {
        await axios.put('http://localhost:5000/users/', 
        {description: inputDescription, hashtag: inputHashtag, priceratePerson: inputPriceratePerson, pricerateTime: inputPricerateTime})
        getAlldata()
    }

    useEffect(() => {
        getAlldata()
    },[])

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

    const showModal3 = () => {
        setIsModalVisible3(true);
    };

    const handleOk3 = () => {
        setIsModalVisible3(false);
    };

    const handleCancel3 = () => {
        setIsModalVisible3(false);
    };

    const styleContainer = {
        width: '100%',
        height: '100%',
        margin: '0 0 0 auto'
    }

    return (
        <Layout className="layout" style={{backgroundColor:'#0D0311', paddingBottom:'10%'}}>
            <Navbar setRole={props.setRole}/>
            <Content style={contentStyle} >
                <div className='profile-container'>
                    <div className='profile-section'>
                        <div className='img-profile'>
                            <img alt={profile.name} src={pic} style={{ width: '230px' }}></img>
                        </div>
                        <div className='info-profile'>
                            <Row style={{width:'100%'}}>
                                <Col span={23}><h3 style={{ color: 'white', fontWeight:'bolder', fontSize:'1.2rem'}}>{profile.name} | <span style={{fontWeight:'regular', fontSize:'0.85rem'}}>Average Score :</span><span style={{fontWeight:'regular', fontSize:'0.85rem', color:'#90EE90'}}>  {avgScore} </span></h3> </Col>
                                <Col span={1}><span style={{fontSize:'1.2rem'}}><EditOutlined onClick={showModal3}></EditOutlined></span></Col>
                            </Row>
                            <hr></hr>
                            <h3 style={{ color: 'white' }}>{profile.description}</h3>
                            <h4 style={{ color: '#BE1D37' }}>{profile.hashtag}</h4>
                            <h3 style={{ color: 'white' }}>Price rate</h3> <hr></hr>
                            {profile.priceratePerson} THB/Person || Waiting {profile.pricerateTime} THB/Hour
                            <br></br>
                            <Modal title='Edit Your Profile' visible={isModalVisible3} onOk={handleOk3} onCancel={handleCancel3} footer={null} width={350} style={{ paddingRight: '0' }}>
                                <div style={{ ...styleContainer }}>
                                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                                        <Form.Item
                                            {...layout}
                                            label="Description"
                                            style={{ margin: '0 0 5px 0', }}
                                        >
                                            <Input.TextArea value={inputDescription} onChange={(e)=>setInputDescription(e.target.value)} placeholder={profile.description} />
                                        </Form.Item>
                                        <Form.Item
                                            {...layout}
                                            label="Hashtag"
                                            style={{ margin: '0 0 5px 0', }}
                                        >
                                            <Input value={inputHashtag} onChange={(e)=>setInputHashtag(e.target.value)} placeholder={profile.hashtag} />
                                        </Form.Item>
                                        <Form.Item
                                            {...layout}
                                            label="Price/Person"
                                            style={{ margin: '0 0 5px 0', }}
                                        >
                                            <Input value={inputPriceratePerson} onChange={(e)=>setInputPriceratePerson(e.target.value)} placeholder={profile.priceratePerson} />
                                        </Form.Item>
                                        <Form.Item
                                            {...layout}
                                            label="Waiting time Price"
                                            style={{ margin: '0 0 20px 0', }}
                                        >
                                            <Input value={inputPricerateTime} onChange={(e)=>setInputPricerateTime(e.target.value)} placeholder={profile.pricerateTime} />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                                            <Button type="primary" htmlType="submit" block onClick={editProfile}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                            <Button disabled type="primary" onClick={showModal1} size='large' style={{ marginRight: '3%', marginTop: '4%', backgroundColor: '#BE1D37', border: '#BE1D37',width:'200px', marginBottom:'3%' }}>BE MY STANDEE</Button>
                            <Modal title='Booking Order' visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1} footer={null} width={350}>
                                <div style={{ ...styleContainer }}>
                                    <Form {...layout} name="nest-messages" layout='vertical' onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                                        <Form.Item
                                            label='Restaurant'
                                            name={['user', 'name']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input placeholder="RESTAURANT's NAME" />
                                        </Form.Item>
                                        <Form.Item
                                            label='No. of People'
                                            name={['user', 'Number']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <InputNumber placeholder='Number' style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label="Date"
                                            style={{ margin: '0 0 10px 0' }}>
                                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name={['user', 'description']}
                                            label="Description"
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item
                                            name={['user', 'description']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input placeholder="Price Calculater Component" />
                                        </Form.Item>
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
                                            <Button type="primary" htmlType="submit" block>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                                            <Button type="danger" htmlType="submit" block>
                                                Cancel
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                            <Button disabled type="primary" onClick={showModal2} size='large' style={{ backgroundColor: '#BE1D37', border: '#BE1D37', width:'200px' }}>WRITE A REVIEW</Button>
                            <Modal title='Review Your Standee' visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2} footer={null} width={350} style={{ paddingRight: '0' }}>
                                <div style={{ ...styleContainer }}>
                                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                                        <Form.Item
                                            {...layout}

                                            name={['user', 'description']}
                                            label="Tell me something?"
                                            style={{ margin: '0 0 20px 0', }}
                                        >
                                            <Input.TextArea value={inputReview} onChange={(e)=>setInputReview(e.target.value)} style={{ height: '150px' }} />
                                        </Form.Item>
                                        <Form.Item label="Rate" layout='horizontal' style={{ margin: '0 0 20px 0' }}>
                                            <Rate value={inputScore} onChange={(e)=>{setInputScore(e)}} />
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
                            <AntdComment comments={comments}/>
                            
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}




export default Profile;