import { useLocation } from "react-router-dom";
import HotelList from "../components/HotelList/HotelList";
import SearchBar from "../components/SearchBar/SearchBar";

export default function SearchPage() {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const cityName = query.get("city");
  console.log(cityName);
  return (
    <>
      <div>{cityName}</div>
      <SearchBar />
      <HotelList />
    </>
  );
}
