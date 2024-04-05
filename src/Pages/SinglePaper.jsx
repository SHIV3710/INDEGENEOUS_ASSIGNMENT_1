import React, { useEffect, useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { IoBookmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  resultbookmarks,
  resultpaper,
  resultremovebookmarks,
} from "../Redux/Store";
import { useNavigate } from "react-router-dom";

const SinglePaper = ({ item }) => {
  const [bookmark, setbookmark] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useSelector((state) => state.CurrentSearch);
  let trimmedurl = new URL(item.url);
  trimmedurl = trimmedurl.origin;

  let trimmedabstract = item.abstract;
  if (trimmedabstract) {
    trimmedabstract = "..." + trimmedabstract.substring(4, 150) + "...";
  }

  const handlebookmark = async () => {
    if (bookmark) {
      await dispatch(resultremovebookmarks(item.paperId));
    } else {
      await dispatch(resultbookmarks(item));
    }
    setbookmark(!bookmark);
  };

  return (
    <div className="single-paper">
      <div className="single-paper-url">
        <span className="url">{trimmedurl}</span>
        <span className="mark-as-bookmark" onClick={handlebookmark}>
          {bookmark ? <IoBookmark /> : <BiBookmark />}
          Bookmark
        </span>
      </div>
      <div className="Heading">{item.title}</div>
      <div className="abstract">{trimmedabstract}</div>
      <div className="options-single-paper">
        <div className="numbers">
          {!type ? (
            <></>
          ) : (
            <>
              <span className="total-cites">Cited by {item.citationCount}</span>
              <span className="total-cites">View all versions</span>
            </>
          )}
        </div>
        <div className="buttons-single-paper">
          {!type ? (
            <></>
          ) : (
            <>
              <button style={{ background: "white", color: "green" }}>
                Cite
              </button>
            </>
          )}
          <button
            style={{ background: "green", color: "white" }}
            onClick={() => dispatch(resultpaper(item))}
          >
            {!type ? "Get Content" : "Explore   "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePaper;
