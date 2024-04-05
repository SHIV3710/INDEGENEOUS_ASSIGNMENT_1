import React, { useEffect, useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { CiStickyNote } from "react-icons/ci";
import { LuQuote } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import BookMark from "./BookMark";
import {
  resulterror,
  resultloading,
  resultsuccess,
  resulttype,
} from "../Redux/Store";
import ResultShow from "./ResultShow";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import SinglePaperwithCitation from "./SinglePaperwithCitation";

const SearchBar = () => {
  const [selected, setselected] = useState("research");
  const [academic, setacademic] = useState(false);
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const { result, loading, Paper } = useSelector(
    (state) => state.CurrentSearch
  );

  const handlesearch = async () => {
    if (search) {
      dispatch(resultloading());
      let data = JSON.stringify({
        keyword: search,
        limit: "10",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.gyanibooks.com/search_publication/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        console.log(response);
        dispatch(resulttype(academic));
        dispatch(resultsuccess(response.data.data));
      } catch (error) {
        dispatch(resulterror(error));
      }
    }
  };

  return (
    <div className="top-page">
      <div className="searchbar">
        <div
          className="back-button"
          style={{ display: result ? "flex" : "none", cursor: "pointer" }}
        >
          <span onClick={() => dispatch(resultsuccess(""))}>
            <FaLongArrowAltLeft /> Back
          </span>
          <div
            style={{
              display: !result ? "none" : "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>Academic</span>
            <Switch
              className="switch"
              onClick={() => setacademic(!academic)}
              checked={academic}
            />
          </div>
        </div>
        <div className="top-options">
          <span
            className="top-options-card"
            style={{
              color: selected == "research" ? "green" : "black",
            }}
          >
            <IoGlobeOutline /> Research
          </span>
          <span className="top-options-card">
            <CiStickyNote />
          </span>
          <span className="top-options-card">
            <LuQuote />
          </span>
          <span
            className="top-options-card"
            style={{ width: "80vw", justifyContent: "flex-end" }}
          >
            <RxCross2 />
          </span>
        </div>
        <div
          className="Quillbot-search"
          style={{ height: result ? "fit-content" : "30vw" }}
        >
          <div
            className="quillbot-logo"
            style={{ display: result ? "none" : "flex" }}
          >
            QuillBot Search
          </div>
          <div className="quillbot-search-bar">
            <GoSearch />
            <input
              type="text"
              placeholder="Enter some Keywords"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              autoFocus
            />
            <div
              style={{
                display: result ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <span>Academic</span>
              <Switch
                className="switch"
                onClick={() => setacademic(!academic)}
                checked={academic}
              />
            </div>
          </div>

          {!result ? (
            <>
              {loading ? (
                <span className="loader"></span>
              ) : (
                <button className="search" onClick={handlesearch}>
                  Search the Web
                </button>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <span className="loader"></span>
              ) : (
                <>
                  <FaArrowAltCircleRight
                    style={{
                      position: "absolute",
                      left: "88%",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={handlesearch}
                  />
                </>
              )}
            </>
          )}
        </div>
        <div className="searched-content"></div>
        {result ? <ResultShow /> : <></>}
        <BookMark />
      </div>
      {Paper ? <SinglePaperwithCitation item={Paper} /> : <></>}
    </div>
  );
};

export default SearchBar;
