import React, { useState, useEffect } from "react";
import "./App.css";
import "./Footer/Footer";
import Footer from "./Footer/Footer";

const App = () => {
  const [obj, setObj] = useState({
    Time: String,
    USD: 0,
    EUR: 0,
    GBP: 0,
  });
  const [arr] = useState([{ Time: String, USD: 0, EUR: 0, GBP: 0 }]);
  const data = async () => {
    let res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
    let d = await res.json();
    console.log(d);
    setObj({
      Time: d.time["updated"],
      USD: d.bpi["USD"].rate,
      EUR: d.bpi["EUR"].rate,
      GBP: d.bpi["GBP"].rate,
    });
  };
  arr.push(obj);
  console.log(obj);
  console.log(arr);

  useEffect(() => {
    setInterval(data, 60000);
  }, [arr]);
  return (
    <>
      <div className="hdiv">
        <h1 className="Header">
          <i className="fab fa-bitcoin"></i>Bitcoin Price Tracker
        </h1>
      </div>
      <h4></h4>
      <table id="bitcoin">
        <thead>
          <th>Sr.No</th>
          <th>Time</th>
          <th>USD</th>
          <th>EUR</th>
          <th>GBP</th>
          <th>Trend</th>
        </thead>
        {arr.map(({ Time, USD, EUR, GBP }, index) => {
          if (index >= 1) {
            if (arr[index - 1].USD > arr[index].USD) {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{Time}</td>
                  <td id="bear">
                    <i className="fas fa-dollar-sign"></i>
                    {USD}
                  </td>
                  <td id="bear">
                    <i className="fas fa-euro-sign"></i>
                    {EUR}
                  </td>
                  <td id="bear">
                    <i className="fas fa-pound-sign"></i>
                    {GBP}
                  </td>
                  <td>
                    <i className="fas fa-arrow-down" id="bear"></i>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{Time}</td>
                  <td id="bull">
                    <i className="fas fa-dollar-sign"></i>
                    {USD}
                  </td>
                  <td id="bull">
                    <i className="fas fa-euro-sign"></i>
                    {EUR}
                  </td>
                  <td id="bull">
                    <i className="fas fa-pound-sign"></i>
                    {GBP}
                  </td>
                  <td>
                    <i className="fas fa-arrow-up" id="bull"></i>
                  </td>
                </tr>
              );
            }
          }
        })}
      </table>
      <Footer />
    </>
  );
};
export default App;
