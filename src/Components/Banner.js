import React, { Component } from 'react'

export class Banner extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <style>
          {`
            .banner-image {
              width: 96vw;
              object-fit: cover;
              border-radius: 20px;
            }
          `}
        </style>
        <img src="./images/banner.jpg" className="banner-image img-fluid" alt="" />
        <br/>
        <h3>Keep your thoughts close, even when far away!</h3>
        <p>Never forget a great idea again | Never forget a great idea again</p>
        <br/>
        <br/>
        <img src="./images/banner2.jpg" className="banner-image img-fluid" alt="" />
        
      </div>
    )
  }
}

export default Banner
