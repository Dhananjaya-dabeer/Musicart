import React from 'react'
import './AdvertiseBanner.css'
import model_image from '../assets/add_model.png';

const AdvertiseBanner = () => {
  return (
    <div className='advertise-banner-container'>
      <div className="advertise-banner">
        <div className="advertise-detail-container">
            <div className="advertise-title">
                <p className="advertise-title-text">
                    Grab Upto 50% off on <br /> selected headphones
                </p>
            </div>
            <div className="advertise-action-btn">
                    <button className="advertise-buy-now">Buy Now</button>
            </div>
        </div>
        <div className="advertise-model">
                <img src={model_image} alt="" className="advertise-model-img" />
        </div>
      </div>
    </div>
  )
}

export default AdvertiseBanner
