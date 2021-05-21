import React, { useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, Button, Rate } from 'antd';

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

const IsModal = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const styleContainer = {
        width: '100%',
        height: '100%',
        margin: '0 0 0 auto'
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title='Review Your Standee' onClick={showModal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={350} style={{ paddingRight: '0' }}>
                <div style={{ ...styleContainer }}>
                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: '100%' }}>
                        <Form.Item
                            {...layout}
                            name={['user', 'description']}
                            label="Tell me something?"
                            style={{ margin: '0 0 20px 0', }}
                        >
                            <Input.TextArea style={{ height: '150px' }} />
                        </Form.Item>
                        <Form.Item label="Rate" layout='horizontal' style={{ margin: '0 0 20px 0' }}>
                            <Rate />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ margin: '0 0 10px 0' }}>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default IsModal