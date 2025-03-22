import React, {useState, useEffect} from 'react';
import './userItem.css';


const UserItem = ()  => {

  return (
        <div className='home__section'>
            <div className='card'>
                <img src= "https://www.marriott.com/content/dam/marriott-homepage/destinations/chijw-attraction-beach-9561-hor-clsc.jpg.transform/mcom-hp-transform-190x285/image.jpg" alt="" />
                <div className="card__info">
                    <h2>CHICAGO</h2>
                    <h4>"View Offer"</h4>
                    <h3>The Second City</h3>
                </div>
            </div>
            <div className='card'>
                <img src= "https://www.marriott.com/content/dam/marriott-homepage/destinations/emea/png-images/emea_destinations_Paris.png.transform/mcom-hp-transform-190x285/image.png" alt="" />
                <div className="card__info">
                    <h2>"PARIS"</h2>
                    <h4>"View Offer"</h4>
                    <h3>City of Light</h3>
                </div>
            </div>
            <div className='card'>
                <img src= "https://www.marriott.com/content/dam/marriott-homepage/destinations/us-png/ritzNYCCPwn.823893-2x3.png.transform/mcom-hp-transform-190x285/image.png" alt="" />
                <div className="card__info">
                    <h2>NEW YORK</h2>
                    <h4>"View Offer"</h4>
                    <h3>The Big Apple</h3>
                </div>
            </div>
            <div className='card'>
                <img src= "https://www.marriott.com/content/dam/marriott-homepage/destinations/us-png/sandiego-2x3.png.transform/mcom-hp-transform-190x285/image.png" alt="" />
                <div className="card__info">
                    <h2>SAN DIEGO</h2>
                    <h4>"View Offer"</h4>
                    <h3>America's Finest City</h3>
                </div>
            </div>
            <div className='card'>
                <img src= "https://www.marriott.com/content/dam/marriott-homepage/hvmi/1_1_Beach_Homes.png.transform/mcom-hp-transform-738x738/image.png" alt="" />
                <div className="card__info">
                    <h2>Beach Home</h2>
                    <h4>"View Offer"</h4>
                    <h3>Enjoy your summers</h3>
                </div>
            </div>
            <div className='card'>
                <img src= "https://homes-and-villas.marriott.com/assets/images/Tile_TrendingHomes_Desktop.jpg" alt="" />
                <div className="card__info">
                    <h2>Austin</h2>
                    <h4>"View Offer"</h4>
                    <h3>Everything is here</h3>
                </div>
            </div>
        </div>
    //  </div>
   
    //  </div> 
  )
}

export default UserItem