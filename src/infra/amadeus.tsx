import axios from "axios";

const authorize = async () => {
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_SECRET}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  if (response.data.state !== "approved") return;

  return response.data.access_token;
};

export const fetchHotelListByCity = async (cityCode: string) => {
  const accessToken = await authorize();

  const response = await axios.get(
    `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
};
