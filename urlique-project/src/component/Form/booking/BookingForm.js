import React, {useState} from 'react'
import './booking.css'
import { Form, Input, InputNumber, Button, Upload, DatePicker, TimePicker } from 'antd';

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
/* eslint-disable no-template-curly-in-string */

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

const BookingForm = () => {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <div className='container'>
            <h1>Booking Order</h1>
            <div className="form-container">
                <Form {...layout} name="nest-messages" layout='vertical' onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                    <Form.Item
                        label='Restaurant'
                        name={['user', 'name']}
                        style={{margin:'0 0 10px 0'}}
                    >
                        <Input placeholder="RESTAURANT's NAME" />
                    </Form.Item>
                    <Form.Item
                        label='No. of People'
                        name={['user', 'Number']}
                        style={{margin:'0 0 10px 0'}}
                    >
                        <InputNumber placeholder='Number' style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item label="Date"
                        name={['user', 'date']}
                        label="date"
                        style={{margin:'0 0 10px 0'}}>
                            {/* <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{width:'100%'}}/> */}
                            <Input type='date' style={{width:'50%'}}/>
                            <Input type='time' style={{width:'50%'}}/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'description']}
                        label="Description"
                        style={{margin:'0 0 10px 0'}}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'description']}
                        style={{margin:'0 0 10px 0'}}
                    >
                        <Input placeholder="Price Calculater Component"/>
                    </Form.Item>
                    <Form.Item label="Upload Pay Slip" 
                        rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button style={{width:'50vh'}}>
                                Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{margin:'0 0 10px 0'}}>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{margin:'0 0 10px 0'}}>
                        <Button type="danger" htmlType="submit" block>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default BookingForm