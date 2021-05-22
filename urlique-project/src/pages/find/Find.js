import React, { useEffect, useState } from 'react';
import { UploadOutlined, } from '@ant-design/icons';
import axios from 'axios'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import { Input, Space, Layout, Button, Modal, Form, Upload, message } from 'antd';
import Usercard from '../../component/Usercard/Usercard'
import localStorageService from '../../services/localStorageService'
import jwtDecode from 'jwt-decode'

const { Content } = Layout;

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

const contentStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: '#0D0311',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '10vh',
    alignItems: 'center',
    paddingBottom: '60vh'
}

const divStyle1 = {
    // border:'2px solid green',
    width: '90vw',
    height: '8vh',
    color: 'red',
    textAlign: 'center'
}

const divStyle2 = {
    // border:'2px solid lightgreen',
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    // visibility:{showResult}

}

const divStyle3 = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '3rem'

    // border:'2px solid lightgreen',
}

const divStyle4 = {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'Bolder',
    fontSize: '2rem',
    marginBottom: '2rem'
}

const goToResult = () => {
    window.scrollTo({
        top: window.innerHeight - 50,
        behavior: 'smooth'
    })
}

const styleContainer = {
    width: '100%',
    height: '100%',
    margin: '0 0 0 auto'
}


const Find = (props) => {
    const [inputRestaurant, setInputRestaurant] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [inputNumber, setInputNumber] = useState(0)
    const [inputDate, setInputDate] = useState('')
    const [inputTime, setInputTime] = useState('')
    const [inputHashtag, setInputHashtag] = useState('')
    const [userN, setUserN] = useState('')

    const getUsername = async () => {
        const token = await localStorageService.getToken();
        if (token) {
            const user = jwtDecode(token)
            setUserN(user.name)
            // console.log(token)
        }
    }

    const onFinish = (values) => {
        console.log(values);
    };

    const handleOk1 = () => {
        setIsModalVisible1(false);
    };
    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    // const [showResult, setShowResult] = useState('visible')

    const fetchUsers = async () => {
        const httpResponse = await axios.get('http://localhost:5000/users/')
        setUsers(httpResponse.data)
        // console.log(users)
    }
    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    useEffect(() => {
        getUsername();
        fetchUsers();
    }, [])

    const addReservation = async () => {
        await axios.post('http://localhost:5000/reservation', {
            restaurant: inputRestaurant,
            description: inputDescription,
            number: inputNumber,
            date: inputDate,
            time: inputTime,
            hashtag: inputHashtag,
            option: 'WAITING'
        })
        message.success('BOOKING COMPLETED')
    }

    return (
        <Layout>
            <Navbar setRole={props.setRole} />
            <Content style={contentStyle}>
                <div style={divStyle1}>
                    <Space direction="vertical" style={{ textAlign: 'center' }}>
                        <div>
                            <Input
                                placeholder="ENTER NAME/HASHTAG TO FIND YOUR STANDEE"
                                size="large"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                }}

                                style={{ fontFamily: 'Montserrat', fontWeight: 'regular', width: '35vw' }}
                            />
                            <Button onClick={goToResult} type="primary" size='large' style={{ fontFamily: 'Montserrat', fontWeight: 'Bold', color: '#5C082A', backgroundColor: '#F5F1E3', marginLeft: '1rem' }}>GO TO RESULT</Button>
                            <Button onClick={showModal1} type="primary" size='large' style={{ fontFamily: 'Montserrat', fontWeight: 'Bold', color: '#5C082A', backgroundColor: '#F5F1E3', marginLeft: '1rem' }}>RESERVER BY HASHTAG</Button>
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
                                            <Input.TextArea value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            label='Hashtag'
                                            name={['user', 'Hashtag']}
                                            style={{ margin: '0 0 10px 0' }}
                                        >
                                            <Input placeholder='Hashtag' value={inputHashtag} onChange={(e) => setInputHashtag(e.target.value)} style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label="Upload Pay Slip"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}>
                                            <Upload name="logo" action="/upload.do" listType="picture" style={{ width: '100%' }}>
                                                <Button disabled icon={<UploadOutlined />} block>
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
                        </div>
                    </Space>
                </div>
                <div style={divStyle2}>
                    <div style={divStyle4} className='result'>CHOOSE YOUR STANDEE</div>
                    <div style={divStyle3}>
                        {users.filter((val) => {
                            console.log(userN, val.username)
                            if (searchTerm == '' && val.username !== userN) {
                                return val
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.username !== userN) {
                                return val
                            } else if (val.hashtag.toLowerCase().includes(searchTerm.toLowerCase()) && val.username !== userN) {
                                return val
                            } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase()) && val.username !== userN) {
                                return val
                            }
                        }).map(user => (
                            <Usercard user={user} />
                        ))}
                    </div>
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}





export default Find