import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./AddAmenities.css";
import { ApiInstance, SecureAPIInstance } from "../../api/axiosInstance";

export default function AddAmenities(props) {
  const { onClose, open } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onAddAmenities = () => {
    //call api here
    SecureAPIInstance.post("amenities", {name,description,price})
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle>Add Amenity</DialogTitle>
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
            label="Name"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
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
                    label="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
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
            label="Price"
            value={price}
            onChange={(e) => {
                setPrice(e.target.value);
            }}
          />
        </Typography>
        
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small" onClick={onAddAmenities}>
          Add
        </Button>
        <Button variant="contained" size="small" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
