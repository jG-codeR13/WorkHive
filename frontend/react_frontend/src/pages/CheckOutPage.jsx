import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import CheckOutItem from "../components/CheckOutItem/CheckOutItem";
import Navbar from "../components/navbar/Navbar";
import { ApiInstance, SecureAPIInstance } from "../api/axiosInstance";
import Footer from "../components/Footer/Footer";
import SummaryOfCharges from "../components/SummaryOfCharges/SummaryOfCharges";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useLocation, useHistory } from "react-router-dom";


const CheckOutPage = () => {
  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm();
  const history = useHistory();
  const location = useLocation();

  const EMAIL_REGEX = /^([-\w+~]+(?:\.[-\w+~]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const initDateData = location?.state?.date ? location?.state?.date : [{ startDate: new Date(), endDate: new Date(), key: "selection",}];
  const [date, setDate] = useState(initDateData);
  const initOptionsData = location?.state?.options? location?.state?.options : { adult: 1, room: 1, };
  const [options, setOptions] = useState(initOptionsData);
  
  const [payment, setPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [summary, setSummary] = useState({});

  const imageUrl = location?.state?.imageUrl;
  const room = location?.state?.room;
  const hotelId = location?.state?.hotelId;
  
  const [expanded, setExpanded] = React.useState(false);
  const [disableAmenity, setDisableAmenity] = React.useState(true);
  const [disableSummary, setDisableSummary] = React.useState(true);
  const [expandedSummary, setExpandedSummary] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setIsLoading(true);
    ApiInstance.get("amenities")
      .then((response) => {
        if (response.status === 200) {
          setAmenities(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const onSubmit = useCallback(async ({ name, email, phoneNumber, amenity }) => {
    if(payment == false) {
      setDisableSummary(false);
      setExpandedSummary(true);
      setExpanded("panel3");
    }

    SecureAPIInstance.post("bookings", {
      customerName: name,
      hotelId,
      email,
      phone: phoneNumber,
      numberOfGuestsPerRoom: options.adult,
      numberOfRooms: options.room,
      roomId: room.id,
      checkInDate: date[0].startDate.getTime(),
      checkOutDate: date[0].endDate.getTime(),
      amenitiesMap: amenity,
      payment
    })
    .then((response) => {
      if (response.status === 200) {
        setSummary(response.data);
        if(payment) {
          history.push({
            pathname: '/bookings',
            state: {
              success: true
            },
        });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [payment]);

  const enableAmenity = () => {
    setExpanded("panel2");
    setDisableAmenity(false);
  };

  return (
    <div>
      <Navbar history={history} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
          <h2 className="pageHeading">Checkout</h2>
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <CheckOutItem room={room} imageUrl={imageUrl} date={date} options={options} hotelId ={hotelId} amenities={amenities} />

                  <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        <PersonIcon/> Personal Information
                      </Typography> */}
                      <div>
                        <PersonIcon/> Personal Information
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              variant="standard"
                              id="name"
                              label="Full Name"
                              {...register("name", { required: 'Enter full name.' })}
                              error={errors.name}
                            />
                            { errors.name ? <div className="field-error"> {errors.name.message} </div> : null }
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              variant="standard"
                              id="email"
                              type="email"
                              label="Email Address"
                              error={errors.email}
                              {...register("email", {
                                required: 'Enter an email.',
                                minLength: { value: 8, message: 'Please enter an email 8-32 characters in length.' },
                                maxLength: { value: 32, message: 'Please enter an email 8-32 characters in length.' },
                                validate: (value) => EMAIL_REGEX.test(value.trim()) || 'Please enter a valid email.',
                              })}
                            />
                            { errors.email ? <div className="field-error"> {errors.email.message} </div> : null }
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              variant="standard"
                              id="phoneNumber"
                              label="Phone Number"
                              error={errors.phoneNumber}
                              {...register("phoneNumber", {
                                required: 'Enter a phone number.',
                                validate: (value) => value.trim().length === 10 || 'Please enter a phone number 10 characters in length.',
                              })}
                            />
                            { errors.phoneNumber ? <div className="field-error"> {errors.phoneNumber.message} </div> : null }
                          </Grid>
                        </Grid>
                        <div className="siCheckButton continueButton" onClick={enableAmenity}>Continue</div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <br />

                  <Accordion disabled={disableAmenity} expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        <AddReactionIcon/> Choose additional service
                      </Typography> */}
                      <div>
                        <AddReactionIcon/> Choose additional service
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {amenities.map((amenity) => (
                          <div className="amenity">
                            <label for="amenity" style={{"padding-right": "10px"}}> {amenity.description} : ${amenity.price}</label> 
                            <select id={amenity.name} {...register(`amenity.${amenity.name}`, { valueAsNumber: true, })}>
                              {Array.from(Array(options.room+1), (e, i) => {
                                  return <option value={i}>{i}</option>
                              })}
                            </select> 
                            <br /><br />
                          </div>
                        ))}
                        <button className="siCheckButton continueButton">Continue</button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <br />

                  <SummaryOfCharges disabled={disableSummary} isOpen={expandedSummary} {...summary}/>
                  <br />

                  <div className="siDesc">
                    <h1 className="siTitle">Booking Cancellation Policy</h1>     
                    <span className="siCancelOp">About this booking: </span>
                    <span className="siDistance">You may cancel your booking for no charge before 11:59 PM local time on day before your booking start date.</span>
                    {/* <span className="siDistance">After this time, please note that your prepayment  is non-refundable.</span> */}
                  </div>
                  <br />
                  <button className="siCheckButton" type="submit" onClick={() => setPayment(true)}>Confirm Booking</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>

  );
};

export default CheckOutPage;
