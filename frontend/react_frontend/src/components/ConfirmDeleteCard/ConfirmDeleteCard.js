import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ConfirmDeleteCard({ onClose, open, onConfirm }) {  
    return (
      <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
        <DialogTitle>Are you sure you want to delete this booking</DialogTitle>
        <DialogContent>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="contained" size="small" onClick={onClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
}