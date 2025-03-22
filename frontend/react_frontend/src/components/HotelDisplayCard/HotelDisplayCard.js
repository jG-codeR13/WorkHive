import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HotelDisplayCard.css";

export default function HotelCard(props) {
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
          Name : {props.name}
        </Typography>
        <Typography
          className="typography-spacing"
          variant="body2"
          color="text.secondary"
        >
          Location: {props.loc}
        </Typography>
        <Typography
          className="typography-spacing"
          variant="body2"
          color="text.secondary"
        >
          No.of Rooms : {props.rooms}
        </Typography>
        <Typography
          className="typography-spacing"
          variant="body2"
          color="text.secondary"
        >
          Type of Rooms : {props.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book</Button>
      </CardActions>
    </Card>
  );
}
