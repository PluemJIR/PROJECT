import React from 'react'
import { Carousel } from 'antd';
import dinner1 from './pic/dinner1.jpeg'
import dinner2 from './pic/dinner2.jpeg'
import dinner3 from './pic/dinner3.jpeg'

const contentStyle = {
  textAlign: 'center'
};

const imgStyle = {
  objectFit: 'fill',
  width: '100%',
  borderRadius: '1000px',
  height: '75vh',
}

const Banner = () => {
  return (
    <div style={{ width: '50%', textAlign: 'center' }}>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <img src={dinner1} style={imgStyle}></img>
          </div>
        </div>
        <div>
          <div style={contentStyle}><img src={dinner2} style={imgStyle}></img></div>
        </div>
        <div>
          <div style={contentStyle}><img src={dinner3} style={imgStyle}></img></div>
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
