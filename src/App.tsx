import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./views/components/Footer/Footer";
import Nav from "./views/components/Nav/Nav";
import Details from "./views/pages/Details";
import HomePage from "./views/pages/HomePage";
import SearchPage from "./views/pages/SearchPage";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
