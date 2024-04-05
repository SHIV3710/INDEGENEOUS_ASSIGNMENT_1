import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BiBookmark } from "react-icons/bi";
import { useSelector } from "react-redux";
import SinglePaper from "./SinglePaper";
const BookMark = () => {
  const [scrolled, setscrolled] = useState(false);
  const { bookmarks } = useSelector((state) => state.CurrentSearch);
  return (
    <div
      className="bookmark"
      style={{
        top: scrolled ? "30%" : "85%",
        left: "35.5%",
        height: !scrolled ? "5vh" : "60vh",
        alignItems: scrolled ? "flex-start" : "center",
      }}
    >
      <div className="bookmark-head">
        <span>
          <BiBookmark />
          BookMarks
        </span>
        <span onClick={() => setscrolled(!scrolled)}>
          {scrolled ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
      </div>
      <div
        style={{
          height: scrolled ? "40vh" : "0vh",
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          alignItems: "center",
        }}
      >
        {bookmarks ? (
          <>
            {bookmarks.map((item, index) => {
              return <SinglePaper item={item} key={index} />;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BookMark;
