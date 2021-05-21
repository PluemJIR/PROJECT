import React from 'react'
import { Form, Input, Button, Checkbox, notification, Result } from 'antd';
import './loginform.css'
import axios from '../../../config/axios'
import localStorageService from '../../../services/localStorageService'
import {Link} from 'react-router-dom'

// const layout = {
//     labelCol: {
//         span: 12,
//     },
//     wrapperCol: {
//         span: 12,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 20,
//         span: 4,
//     },
// };

const LoginForm = (props) => {
    const onFinish = (values) => {
        const body = {
            username :values.username, 
            password :values.password
        }
        axios.post('users/login', body)
        .then(res => {
            localStorageService.setToken(res.data.token)
            props.setRole('user')
        })
        .catch(err => { 
            notification.error({
                message: 'เข้าสู่ระบบล้มเหลว'
            })
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            // {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{backgroundColor:'rgb(220, 200, 213, 0.8)', width:'100%',display:'flex', flexDirection:'column', alignItems:'center',zIndex: '10' }}
        >
            <h3 style={{textAlign:'center', fontFamily:'Montserrat', fontSize:'1.5rem', marginTop:'1rem', fontWeight:'bolder',width:'250px',marginLeft:'0.8rem',color:'#5C082A'}}>SIGN IN - เข้าสู่ระบบ</h3>
    
            <Form.Item
                label="Username"
                name="username"
                // style={{width:'250px',}}
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
                
            >
                <Input  style={{borderRadius:'3px',width:'350px',marginLeft:'0.8rem'}}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password style={{ width:'350px', borderRadius:'3px',marginLeft:'0.8rem'}}/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" style={{width:'100%', fontFamily:'Montserrat', fontWeight:'Bold', color:'#5C082A', backgroundColor:'#F5F1E3', border:'#5C082A', marginBottom:'0.5rem'}}>
                    SIGN IN
                </Button>
                <div type="primary" htmlType="submit" style={{fontFamily:'Montserrat', fontWeight:'Bold', color:'white',  border:'#5C082A'}}>
                    Don't have an account? 
                    <Link to='/register'> Sign up</Link>
                </div>
            </Form.Item>
        </Form>
    );
};


export default LoginForm