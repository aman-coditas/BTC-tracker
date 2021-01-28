import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [disc, setDisc] = useState("");
  const getDisc = async () => {
    let res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    let d = await res.json();
    setDisc(d.disclaimer);
  };

  getDisc();

  return (
    <div className="footer">
      <h5>Disclaimer: {disc}</h5>
    </div>
  );
};

export default Footer;
