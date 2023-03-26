import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import { authorize } from "../../infra/amadeus";
import HotelCardSimple from "../components/HotelCardSimple/HotelCardSimple";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SearchBar from "../components/SearchBar/SearchBar";

export default function HomePage() {
  const [city, setCity] = useState("");

  const [hotelList, setHotelList] = useState<Hotel[]>([]);

  const fetchHotelListByCity = async (cityCode: string) => {
    const accessToken = await authorize();
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=10&radiusUnit=KM&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resultArray = response.data.data;
    return setHotelList(resultArray);
  };

  console.log("withimage", hotelList);

  type Hotel = {
    name: string;
    iataCode: string;
    hotelId: string;
    distance: {
      value: number;
      unit: string;
    };
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <>
      <SImageContainer>
        <ImageList
          sx={{ width: 900, height: 450 }}
          variant="quilted"
          cols={4}
          rowHeight={222}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 1000, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </SImageContainer>
      <SSearchContainer>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="City">City</InputLabel>
            <Select
              labelId="label-city"
              id="city"
              value={city}
              label="city"
              onChange={handleCityChange}
            >
              <MenuItem value={"YYC"}>Calgary Airport, Canada</MenuItem>
              <MenuItem value={"YEG"}>Edmonton Airport</MenuItem>
              <MenuItem value={"YFC"}>Fredericton Airport, Canada</MenuItem>
              <MenuItem value={"YQX"}>Gander Airport, Canada</MenuItem>
              <MenuItem value={"YHZ"}>
                Halifax Stanfield Airport, Canada
              </MenuItem>
              <MenuItem value={"YQM"}>
                Greater Moncton Roméo LeBlanc Airport, Canada
              </MenuItem>
              <MenuItem value={"YUL"}>
                Montréal Trudeau Airport, Canada
              </MenuItem>
              <MenuItem value={"YOW"}>
                Ottawa Macdonald Cartier Airport, Canada
              </MenuItem>
              <MenuItem value={"YQB"}>
                Québec/Jean Lesage Airport, Canada
              </MenuItem>
              <MenuItem value={"YYT"}>St. John's Airport, Canada</MenuItem>
              <MenuItem value={"YYZ"}>Toronto Pearson Airport, Canada</MenuItem>
              <MenuItem value={"YVR"}>Vancouver Airport, Canada</MenuItem>
              <MenuItem value={"YWG"}>Winnipeg Airport, Canada</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <button onClick={() => fetchHotelListByCity(city)}>search</button>
      </SSearchContainer>

      <SearchBar />
      
      <Sp>City Code: {city}</Sp>
      <SHotelListContainer>
        {hotelList.map((hotel, index) => {
          return (
            <HotelCardSimple
              hotelName={hotel.name}
              distanceValue={hotel.distance.value}
              distanceUnit={hotel.distance.unit}
              iataCode={hotel.iataCode}
              hotelId={hotel.hotelId}
              key={index}
            />
          );
        })}
      </SHotelListContainer>
    </>
  );
}

const SSearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SHotelListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 5rem;
`;

const Sp = styled.p`
  display: flex;
  justify-content: center;
`;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1592555059503-0a774cb8d477?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1614359198392-996de37bb0dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1605346475807-2088e0897b2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Coffee",
    cols: 2,
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
