import "./checkOutItem.css";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const CheckOutItem = ({room, imageUrl, date, options, hotelId, amenities}) => {
  const history = useHistory();
  const handleSelect = () => {
    history.push({
        pathname: '/book',
        state: { 
          amenities, // location state
          room,
          hotelId,
          imageUrl,
          date,
          options
        },
    });
  };

  return (
    <>
    <div className="searchItem">
      <img
        src = {imageUrl}
        alt="room"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{room.roomType} space</h1>
        {/* <span className="siTaxiOp">Member Flexible Rate</span>      */}
        <span className="siCancelOp">Booking start date:  {format(date[0].startDate, "MM/dd/yyyy")}</span>
        <span className="siCancelOp">Booking end date: {format(date[0].endDate, "MM/dd/yyyy")}</span>
        {/* <span className="siDistance">Room(s): {options.room}</span> */}
        {/* <span className="siDistance">Guest(s) per room: {options.adult}</span> */}
      </div>
      <div className="siDetails">
        <div className="siRating">
        </div>
        <div className="siDetailTexts">
          {/* <span className="siTaxOp">from</span>
          <span className="siPrice">${room.perNightPrice}/night</span>
          <span className="siTaxOp">Excludes taxes and fees</span> */}
          {/* <button className="siCheckButton" onClick={handleSelect}>Get Summary Of Booking</button> */}
        </div>
      </div>
    </div>

    </>
  );
};

export default CheckOutItem;
