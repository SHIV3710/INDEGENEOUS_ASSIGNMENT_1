import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBar from "./Pages/SearchBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SearchBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
