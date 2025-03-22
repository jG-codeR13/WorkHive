import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./AddRoom.css";
import { ApiInstance, SecureAPIInstance} from "../../api/axiosInstance";


export default function AddNewRoomCard(props) {
  const { onClose, open } = props;

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [perNightPrice, setPerNightPrice] = useState("");
  const [beds, setBeds] = useState("");

  const onRoomAdd = () => {
    //call api here
    SecureAPIInstance.post("rooms", {roomNumber,roomType,perNightPrice,beds})
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle>Add New Room</DialogTitle>
      <DialogContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>

        <Typography
          className="typography-spacing-add"
          variant="body2"
          color="text.secondary"
        >
          <TextField
            fullWidth
            id="outlined-name"
            label="Room No."
            value={roomNumber}
            onChange={(e) => {
                setRoomNumber(e.target.value);
            }}
          />
        </Typography>
        <Typography
                  className="typography-spacing-add"
                  variant="body2"
                  color="text.secondary"
                >
                  <TextField
                    fullWidth
                    id="outlined-roomtype"
                    label="Room Type"
                    value={roomType}
                    onChange={(e) => {
                        setRoomType(e.target.value);
                    }}
                  />
                </Typography>
        <Typography
          fullWidth
          className="typography-spacing-add"
          variant="body2"
          color="text.secondary"
        >
          <TextField
            fullWidth
            id="outlined-location"
            label="Per Night Price"
            value={perNightPrice}
            onChange={(e) => {
                setPerNightPrice(e.target.value);
            }}
          />
        </Typography>
        <Typography
          className="typography-spacing-add"
          variant="body2"
          color="text.secondary"
        >
          <TextField
            fullWidth
            id="outlined-rooms"
            label="No. of Beds"
            value={beds}
            onChange={(e) => {
                setBeds(e.target.value);
            }}
          />
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small" onClick={onRoomAdd}>
          Add
        </Button>
        <Button variant="contained" size="small" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
