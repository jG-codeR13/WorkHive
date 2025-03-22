import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import RoomItem from "../components/RoomItem/RoomItem";
import Navbar from "../components/navbar/Navbar";
import { ApiInstance } from "../api/axiosInstance";
import { useForm } from 'react-hook-form';

const RoomListPage = () => {
  const history = useHistory();
  const location = useLocation();
  const hotelId = location?.state?.hotelId;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  const initDateData = location?.state?.date ? location?.state?.date : [{ startDate: new Date(), endDate: tomorrow, key: "selection",}];
  const [date, setDate] = useState(initDateData);
  const [openDate, setOpenDate] = useState(false);

  const initOptionsData = location?.state?.options? location?.state?.options : { adult: 1, room: 1, };
  const [options, setOptions] = useState(initOptionsData);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  // const photos = [
  //   "https://image.insider.com/585029a0dd0895bc548b4b8b?width=750&format=jpeg&auto=webp",
  //   "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
  //   "https://media.istockphoto.com/photos/interior-of-a-modern-luxury-hotel-double-bed-bedroom-picture-id1163498940?k=20&m=1163498940&s=612x612&w=0&h=tUPidNW2ny095sCR97dur7cbrCnYpcjHbevUTJyB8Jc=",
  //   "https://techcrunch.com/wp-content/uploads/2016/12/dream-presidential-suite-terrace.jpg",
  //   "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  //   "https://bluebiz-media.azureedge.net/48da09/contentassets/cc4c46c0c048442683523c7f9253b1b6/hotel-room-624x364.jpg"
  // ];

  const photos = [
    "https://uc.yamaha.com/getattachment/Insights/Blog/2021/August/The-Return-of-Office-Cubicles/Office-Cubicles.jpg.aspx?width=1200&height=857",
    "https://m.media-amazon.com/images/I/81NnUBnLSrL._SX522_.jpg",
    "https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_fb.jpg",
    "https://property.mq.edu.au/__data/assets/image/0004/365035/75T_604sm.JPG"
  ];

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm({ defaultValues: {
    adult: options.adult,
    room: options.room
  }});

  useEffect(() => {
    const url = options.adult ? `rooms?noOfGuests=${options.adult}` : "rooms";
    setIsLoading(true);
    ApiInstance.get(url)
      .then((response) => {
        if (response.status === 200) {
          setRooms(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [options.adult]);

  // const onSubmit = ({ adult, room }) => {
  const onSubmit = ({ }) => {
    setOptions({ adult: 1, room: 1 });
  }

  return (
    <div>
      <Navbar history={history} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Filter</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="lsItem"></div>
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
              <button type="submit">Filter</button>
            </form>
          </div>
          <div className="listResult">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {rooms.map((room, index) => (
                  <RoomItem room={room} key={room.id} imageUrl={photos[index]} hotelId={hotelId} date={date} options={options} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
