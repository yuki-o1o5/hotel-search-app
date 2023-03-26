import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { authorize } from "../../infra/amadeus";
import HotelCard from "../components/HotelCard/HotelCard";

export default function Details() {
  const { id } = useParams();

  const [hotelInfo, setHotelInfo] = useState<HotelInfo[]>([]);

  const [hotelImage, setHotelImage] = useState();

  interface HotelInfo {
    available: boolean;
    hotel: {
      name: string;
    };
    offers: [
      {
        checkInDate: string;
        checkOutDate: string;
        guests: {};
        policies: {};
        price: {};
        room: {};
      }
    ];
  }

  useEffect(() => {
    getHotelDataById();
  }, []);

  const getHotelDataById = async () => {
    const accessToken = await authorize();
    const { data } = await axios.get(
      `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${id}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const hotelDetail = data;
    setHotelInfo(hotelDetail);
  };

  console.log("hello", hotelInfo);

  return (
    <>
      <SDetailsContainer>
        {/* <image src="https://raw.githubusercontent.com/yuki-o1o5/my-portfolio/main/public/assets/main3.jpeg" /> */}
        {/* <h1>{hotelInfo.[0].hotel.name}</h1> */}

        <HotelCard />
      </SDetailsContainer>
    </>
  );
}

const SDetailsContainer = styled.div`
  background-color: #fff;
  margin: 5rem 15rem;
  justify-content: center;
`;
