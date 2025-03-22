import "./roomItem.css";
import { useHistory } from "react-router-dom";

const RoomItem = ({ room , imageUrl, hotelId, date, options}) => {
  const history = useHistory();
  const handleSelect = () => {
    history.push({
        pathname: '/checkout',
        state: {  // location state
          room,
          hotelId,
          imageUrl,
          date,
          options
        },
    });
  };


  return (
    <div className="searchItem">
      <img
        src = {imageUrl}
        alt="room image"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{room.roomType} space</h1>
        {/* <span className="siDistance">{hotel.location}</span> */}
        {/* <span className="siTaxiOp">Member Flexible Rate</span>      */}
        {/* <span className="siSubtitle">{hotel.description}</span> */}
        <span className="siCancelOp">Free cancellation </span>
        <span className="siDistance">Capacity: {room.beds}</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          {/* <span>Excellent</span>
          <button>8.9</button> */}
        </div>
        <div className="siDetailTexts">
          {/* <span className="siTaxOp">from</span>
          <span className="siPrice">${room.perNightPrice}/night</span>
          <span className="siTaxOp">Excludes taxes and fees</span> */}
  
          <button className="siCheckButton" onClick={handleSelect}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
