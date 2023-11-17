import React from "react";
import loading from "../images/loading2.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} style={{width: "4rem",marginTop: "10rem"}} alt="loading" />
    </div>
  );
};
export default Loading;
