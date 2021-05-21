import React from 'react'
import './review.css'
import { Form, Input, Rate, Button } from 'antd';

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

const ReviewForm = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className='container'>
            <h1>REVIEW STANDEE</h1>
            <div className="form-container">
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                    <Form.Item
                        {...layout}
                        name={['user', 'description']}
                        label="Tell me something?"
                        style={{ margin: '0 0 20px 0', }}
                    >
                        <Input.TextArea style={{ height: '150px' }} />
                    </Form.Item>
                    <Form.Item label="Rate" layout='horizontal' style={{margin:'0 0 20px 0'}}>
                        <Rate />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{margin:'0 0 10px 0'}}>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ReviewForm