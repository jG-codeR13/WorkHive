import * as React from "react";
import { useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// "id": 80,
//         "bookingId": "d3e846ca-5866-480c-b257-ee2d56cc9ce0",
//         "username": "teethi123",
//         "hotelId": 8,
//         "roomType": "Family Room",
//         "numberOfRooms": 2,
//         "numberOfGuestsPerRoom": 4,
//         "checkInDate": "2022-05-27",
//         "checkOutDate": "2022-05-31",
//         "totalNights": 4,
//         "perRoomPerNightPrice": 400.0,
//         "totalRoomPrice": 800.0,
//         "amenitiesResponse": "All meals included (Breakfast, Lunch, Dinner : 1 * 200.0,Access to fitness room : 2 * 50.0,",
//         "totalAmenityPrice": 300.0,
//         "taxableAmount": 4400.0,
//         "tax": 440.0,
//         "surchargeType": "Surcharge",
//         "surcharge": 0.0,
//         "loyaltyType": "PLATINUM - 20.0%",
//         "loyaltyDiscount": 880.0,
//         "price": 3960.0,
//         "rewardPoints": 3960,
//         "email": "teethi123@gmail.com",
//         "phone": "1234567890",
//         "localDateTime": "2022-05-09T00:37:58",
//         "roomId": 3,
//         "hotelName": "JW Marriott Mumbai Sahar",
//         "hotelImage": "https://www.baglionihotels.com/wp-content/themes/baglioni-hotels-new/images/schema/baglioni-hotel-london.jpg"
//     },

export default function ControlledAccordions(props) {
 const {
    disabled,
    isOpen,
    totalRoomPrice,  
    perRoomPerNightPrice, 
    numberOfRooms,
    totalNights,
    totalAmenityPrice,
    taxableAmount,
    tax,
    surchargeType,
    surcharge,
    loyaltyType,
    loyaltyDiscount,
    totalPrice,
    price,
  } = props;
  // const  i = Number({totalAmenityPrice}) * Number({totalNights});
  console.log('props', props);
  console.log('isOpen', isOpen);
  const [expanded, setExpanded] = React.useState(isOpen ? "panel3" : false);

  useEffect(() => {
    console.log('isOpen inside useeffect', isOpen);
    setExpanded(isOpen ? "panel3" : false);
  }, [isOpen]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")} disabled={disabled}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <DescriptionIcon/> Summary Of Booking
          </Typography>
           */}
           <div>
            <DescriptionIcon/> Summary Of Booking
           </div>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>test</Typography> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>BOOKING DETAILS</TableCell>
                  <TableCell align="right">Prices in USD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {/* <TableRow style={{height: 5}}>
                    <TableCell component="th" scope="row">Total Room price = Room Price * Room(s) * Night(s)</TableCell>
                    <TableCell align="right">{perRoomPerNightPrice} * {numberOfRooms} * {totalNights} = {totalRoomPrice * totalNights}</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell component="th" scope="row">Add-on charges </TableCell>
                    <TableCell align="right">{totalAmenityPrice} * {totalNights} = {totalAmenityPrice * totalNights} </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell component="th" scope="row">Taxable Amount: </TableCell>
                    <TableCell align="right">{taxableAmount}</TableCell>
                  </TableRow> */}
                  {/* <TableRow>
                    <TableCell component="th" scope="row">Tax (10%): </TableCell>
                    <TableCell align="right">+ {tax}</TableCell>
                  </TableRow> */}
                  {/* <TableRow>
                    <TableCell component="th" scope="row">{surchargeType}: </TableCell>
                    <TableCell align="right">+ {surcharge}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Member discount: {loyaltyType}: </TableCell>
                    <TableCell align="right">- {loyaltyDiscount}</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell component="th" scope="row">TOTAL BOOKING PRICE </TableCell>
                    <TableCell align="right">{totalPrice || price} USD</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
