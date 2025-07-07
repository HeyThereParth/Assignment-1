import React from "react";
import { useSelector } from "react-redux";
import image from "../../assets/no-results.png";
import "./NoResultDiv.css";

function NoResultDiv() {
  const error = useSelector((state) => state.weather.error);

  return (
    <div className="no-result">
      <img src={image} alt="No result found" className="no-result__icon" />
      <h3 className="no-result__title">
        {error || "Something went wrong"}
      </h3>
    </div>
  );
}

export default NoResultDiv;
