import React, {useState, useEffect} from 'react'
import { Card, Rate } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios' 

const { Meta } = Card;

const Usercard = (props) => {
    const [avgScore, setAvgScore] = useState(0)
    // let avgScore 

    const fetchScore = async () => {
        let ownsReview = []
        let sum = 0
        const httpResponse = await axios.get('http://localhost:5000/reviews')
        const result = await axios.get(`http://localhost:5000/users/${props.user.username}`)
        httpResponse.data.map( x => {
            if (x.reviewTo === result.data.id){
                ownsReview.push(x)
                sum += x.score
            }
        })
        setAvgScore((sum/(ownsReview.length)).toFixed(1))
    }

    useEffect(() => {
        fetchScore()
    }, [])

    return (
        <Link to={`/profile/${props.user.username}`} target="_blank">
            <Card
                style={{ width: 240, height: 330, margin: '1rem 1rem 2rem 1rem' }}
                cover={
                    <img
                        alt={props.user.id}
                        src={`/user_image/${props.user.id}.jpeg`}
                        style={{ height: '230px', objectFit: 'cover' }}
                    />
                }
            >
                <Meta
                    title={<span>{props.user.username} | <span style={{color:'#BE1D37'}}>{avgScore}</span></span>}
                    description={props.user.hashtag}
                    style={{ fontFamily: 'Montserrat' }}
                />
            </Card>
        </Link>
    )
}





export default Usercard