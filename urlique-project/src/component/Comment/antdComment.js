import { Avatar, Comment, Rate } from 'antd';
import React, {useEffect, useState} from 'react'
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios'
const commentStyle = {
    backgroundColor: '#F5F1E3',
    padding: '5px 5px 5px 20px',
    margin: '10px 0 10px 0',
    borderRadius: '10px',
    fontFamily: 'Montserrat'
    // color: 'white'
}

const AntdComment = (props) => {
    const reviewData = props.comments
    // console.log(reviewData[0])
    
    return (
            reviewData.map(item => (
                <Comment
                    avatar={
                        <div>
                            <Avatar
                                src={`/user_image/${item.user_id}.jpeg`}
                            />
                        </div>
                    }
                    author={<span style={{ fontSize: '1.3rem' }}>{item.from} | <Rate disabled defaultValue={item.score} /></span>}
                    style={commentStyle}
                    content={
                        <p style={{color:'black'}}>
                            {item.review}
                        </p>
                    }
                />
            ))
    )
}
export default AntdComment