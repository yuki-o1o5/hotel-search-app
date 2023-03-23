/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import HotelList from "../components/HotelList/HotelList";
import { fetchHotelListByCity } from "../../infra/amadeus";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [city, setCity] = useState("");

  useEffect(() => {
    (async () => {
      console.log(await fetchHotelListByCity("YVR"));
    })();
  }, []);

  const navigate = useNavigate();

  const handleCityChange = (event: any) => {
    setCity(event.target.value as string);
  };

  return (
    <>
      <TextField
        id="city-search"
        label="Write City"
        type="search"
        onChange={handleCityChange}
      />
      <button onClick={() => navigate(`/search?city=${city}`)}>search</button>
      <div>{city}</div>
    </>
  );
}
