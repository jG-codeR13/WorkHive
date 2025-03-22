import "./HotelItem.css";
import { useHistory } from "react-router-dom";


const HotelItem = ({ hotel, date, options}) => {
  const history = useHistory();
  const hotelId = hotel.id

  const handleViewRates = () => {
    history.push({
        pathname: '/rooms',
        state: {  // location state
          hotelId,
          date,
          options
        },
    });
  };


  return (
    <div className="searchItem">
      <img
        src = {hotel.imageURL}
        alt="hotel"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.hotelName}</h1>
        <span className="siDistance">{hotel.location}</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        <span className="siSubtitle">
          {hotel.description}
        </span>
        <span className="siFeatures">
         Contact: {hotel.hotelPhone}
        </span>
        <span className="siFeatures">
         Email: {hotel.hotelEmail}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        {/* <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span> */}
      </div>
      <div className="siDetails">
        {/* <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div> */}
        <div className="siDetailTexts">
          {/* <span className="siPrice">From ${hotel.hotelBasePrice}</span> */}
          {/* <span className="siTaxOp">Excludes taxes and fees</span> */}
          <button className="siCheckButton" onClick={handleViewRates}>View Offices</button>
        </div>
      </div>
    </div>
  );
};



export default HotelItem;
