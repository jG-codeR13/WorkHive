import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { SecureAPIInstance } from "../../api/axiosInstance";
import "./Card.css";

export default function HotelCard(props) {
  const [hotelName, setHotelName] = useState(props.name);
  const [location, setLocation] = useState(props.loc);
  const [hotelId, setHotelId] = useState(props.id);


  const [hotelDescription, setHotelDescription] = useState(props.desc);
  const [hotelAddress, setHotelAddress] = useState(props.address);
  const [hotelEmail, setHotelEmail] = useState(props.email);
  const [hotelPhone, setHotelPhone] = useState(props.phone);
  const [hotelBasePrice, setHotelBasePrice] = useState(props.price);
  console.log(props)


  const { removeHotel } = props;

  //added now
  const { updateHotel} = props;


//added now
  const onHotelUpdate = () => {
     alert("Hotel successfully updated");
       SecureAPIInstance.put("/hotels/"+hotelId, {hotelName,hotelDescription, location,hotelAddress, hotelEmail, hotelPhone,hotelBasePrice,})
         .then((response) => [updateHotel(response.id)])
         .catch((err) => {});

  };


  const onHotelDelete = () => {
    alert("Hotel removed successfully");
    SecureAPIInstance.delete("/hotels/"+hotelId, {})
      .then((response) => [removeHotel(response.id)])
      .catch((err) => {});

  };

  const { image } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="Motel 6" height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>

        <Typography
          className="typography-spacing"
          variant="body2"
          color="text.secondary"
        >
          <TextField
            id="outlined-name"
            label="Name"
            value={hotelName}
            onChange={(e) => {
              setHotelName(e.target.value);
            }}
          />
        </Typography>


        <Typography
          className="typography-spacing"
          variant="body2"
          color="text.secondary"
        >
          <TextField
            id="outlined-location"
            label="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </Typography>
     <Typography
              className="typography-spacing"
              variant="body2"
              color="text.secondary"
            >
              <TextField
                id="outlined-rooms"
                label="Hotel Description"
                value={hotelDescription}
                onChange={(e) => {
                  setHotelDescription(e.target.value);
                }}
              />
            </Typography>
            <Typography
              className="typography-spacing"
              variant="body2"
              color="text.secondary"
            >
              <TextField
                id="outlined-roomtype"
                label="Hotel Address"
                value={hotelAddress}
                onChange={(e) => {
                  setHotelAddress(e.target.value);
                }}
              />
            </Typography>

      <Typography
               className="typography-spacing"
               variant="body2"
               color="text.secondary"
             >
               <TextField
                 id="outlined-rooms"
                 label="Hotel Email"
                 value={hotelEmail}
                 onChange={(e) => {
                   setHotelEmail(e.target.value);
                 }}
               />
             </Typography>
             <Typography
               className="typography-spacing"
               variant="body2"
               color="text.secondary"
             >
               <TextField
                 id="outlined-roomtype"
                 label="Hotel Phone"
                 value={hotelPhone}
                 onChange={(e) => {
                   setHotelPhone(e.target.value);
                 }}
               />
             </Typography>

     <Typography
                    className="typography-spacing"
                    variant="body2"
                    color="text.secondary"
                  >
                    <TextField
                      id="outlined-roomtype"
                      label="Hotel Base Price"
                      value={hotelBasePrice}
                      onChange={(e) => {
                        setHotelBasePrice(e.target.value);
                      }}
                    />
      </Typography>

      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={onHotelUpdate}>
          Update
        </Button>

        <Button variant="contained" size="small" onClick={onHotelDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
