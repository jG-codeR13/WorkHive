import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomServiceIcon from '@mui/icons-material/RoomService';

export default function ControlledAccordions({noOfRooms, amenities}) {
  const [expanded, setExpanded] = React.useState(false);
  const roomCount = {noOfRooms};

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <RoomServiceIcon/> Choose Room Features
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {amenities.map((amenity) => (
              <>
                <label for="amenity"> {amenity.description} : ${amenity.price}</label> 
                <select name={amenity.name} id={amenity.name}>
                  {Array.from(Array(noOfRooms+1), (e, i) => {
                      return <option value={i}>{i}</option>
                  })}
                </select> 
                <br></br><br></br>
              </>
            ))}
              <button className="siCheckButton">Submit</button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
