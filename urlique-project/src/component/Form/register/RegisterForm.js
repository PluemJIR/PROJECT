import React from 'react';
import { Form, Input, notification, Select,Button} from 'antd';
import './form.css'
import axios from '../../../config/axios'
const { Option } = Select;

const formItemLayout = {
};
const tailFormItemLayout = {
};

const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const body = {
            name: values.name, 
            username: values.username,
            email: values.email,
            hashtag: values.hashtag, 
            password: values.password
        }
        axios.post('/users/register', body)
        .then(res => {
            notification.success({
                message: `คุณ ${values.username} สมัครสมาชิกแล้ว`,
                
            });
        })
        .catch(err => {
            notification.error({
                message: `สมัครสมาชิกล้มเหลว`,
                
            });
        })
    };

    return (
        <div className='register' style={{zIndex:'5'}}>
            <br></br>
            <h3 className='header' style={{fontFamily:'Montserrat', color:'#5C082A'}}>REGISTER - สร้างบัญชีใหม่</h3>
            <br></br>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    {...formItemLayout}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                    ]}
                >
                    <Input placeholder="ENTER YOUR NAME" />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder="ENTER YOUR USERNAME" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="ENTER YOUR EMAIL" />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    name="hashtag"
                    tooltip="Enter Something to find you easier"
                    rules={[
                        {
                            required: false,
                            message: 'Enter Something to find you easier!!',
                        },
                    ]}
                >
                    <Input placeholder="YOUR HASHTAG (CAN ADD MORE THAN 1)" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="YOUR PASSWORD" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='CONFIRM YOUR PASSWORD' />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{fontFamily:'Montserrat', fontWeight:'Bold', color:'#5C082A', backgroundColor:'#F5F1E3', border:'#5C082A'}}>
                        Register
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationForm