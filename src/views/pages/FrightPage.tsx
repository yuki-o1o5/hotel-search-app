import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function SearchPage() {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const cityName = query.get("city");
  console.log(cityName);

  useEffect(() => {}, []);

  return (
    <>

    </>
  );
}
