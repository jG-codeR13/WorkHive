import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BookingItem from "../components/BookingItem/BookingItem";
import SummaryOfCharges from "../components/SummaryOfCharges/SummaryOfCharges";
import { SecureAPIInstance } from "../api/axiosInstance";

export const MyBookingsPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [success, setSuccess] = useState(location?.state?.success);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    SecureAPIInstance.get("bookings/users")
      .then((response) => {
        if (response.status === 200) {
          setBookings(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar history={history} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            <h2 className="pageHeading">My Bookings</h2>
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {
                  success ? "Congratulations! Your booking has been confirmed." : null
                }
                {bookings.map((booking) => (
                    <BookingItem {...booking} key={booking.id} booking={booking}/>
                ))}
                {
                  bookings.length === 0 ? "You don't have any bookings yet. Let's book!" : null
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
