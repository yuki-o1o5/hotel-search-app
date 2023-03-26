import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HotelCardSimple({
  hotelName,
  distanceValue,
  distanceUnit,
  iataCode,
  hotelId,
  // imageURL
}) {
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ width:300}}>
        {/* <CardActionArea
          onClick={() => {
            navigate(`/search?city=${city}`);
          }} */}
        <CardActionArea
          onClick={() => {
            navigate(`/search/${hotelId}`);
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://raw.githubusercontent.com/yuki-o1o5/my-portfolio/main/public/assets/main3.jpeg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {hotelName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {distanceValue}
              {distanceUnit} far away from {iataCode} airport.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
