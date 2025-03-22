import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import HotelItem from "../components/HotelItem/HotelItem";
import Navbar from "../components/navbar/Navbar";
import { ApiInstance } from "../api/axiosInstance";
import { useForm } from 'react-hook-form';


const HotelListPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  const initDateData = location?.state?.date ? location?.state?.date : [{ startDate: new Date(), endDate: tomorrow, key: "selection",}];
  const [date, setDate] = useState(initDateData);
  const [openDate, setOpenDate] = useState(false);

  const initOptionsData = location?.state?.options? location?.state?.options : { adult: 1, room: 1 };
  const [options, setOptions] = useState(initOptionsData);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm({ defaultValues: {
    destination,
    adult: options.adult,
    room: options.room
  }});

  useEffect(() => {
    const url = destination ? `hotels?location=${destination}` : "hotels";
    setIsLoading(true);
    ApiInstance.get(url)
      .then((response) => {
        if (response.status === 200) {
          setHotels(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [destination]);

  const onSubmit = ({ destination }) => {
    setDestination(destination);
    setOptions({ adult: 1, room: 1 });
  }

  return (
    <div>
      <Navbar history={history} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="lsItem">
                <label>Location</label>
                <input
                  id="destination"
                  placeholder="Location"
                  {...register("destination")}
                />
              </div>
              <div className="lsItem">
                <label>Booking date range</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              {/* <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      className="lsOptionInput"
                      id="adult"
                      {...register("adult", {
                        min: { value: 1, message: 'Minimum 1 adult should be selected.' },
                        max: { value: 8, message: 'Maximum 8 adults can be selected.' },
                      })}
                    />
                  </div>
                  { errors.adult ? <div className="field-error"> {errors.adult.message} </div> : null }
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      className="lsOptionInput"
                      id="room"
                      {...register("room", {
                        min: { value: 1, message: 'Minimum 1 room should be selected.' },
                        max: { value: 8, message: 'Maximum 8 rooms can be selected.' },
                      })}
                    />
                  </div>
                  { errors.room ? <div className="field-error"> {errors.room.message} </div> : null }
                </div>
              </div> */}
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="listResult">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {hotels.map((hotel) => (
                  <HotelItem hotel={hotel} key={hotel.id} date={date} options={options}/>
                ))}
                {
                  hotels.length === 0 ? "We don't have hotels at this location yet. Let's try something else." : null
                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListPage;
