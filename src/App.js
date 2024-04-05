import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBar from "./Pages/SearchBar";
import SinglePaperwithCitation from "./Pages/SinglePaperwithCitation";

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
