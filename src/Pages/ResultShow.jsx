import React from "react";
import { useSelector } from "react-redux";
import SinglePaper from "./SinglePaper";

const ResultShow = () => {
  const { result } = useSelector((state) => state.CurrentSearch);
  return (
    <div className="result-show">
      {result.map((item, index) => {
        return <SinglePaper item={item} key={index} />;
      })}
    </div>
  );
};

export default ResultShow;
