import React, { useEffect, useRef, useState } from "react";
import data from "../data.json";
import "./Home.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import MakeChart from "./MakeChart";

// console.log("MY JSON DATA",data)

const Home = ({ pageData }) => {
  const [dataSort, setDataSort] = useState(data);
  
  const [iconSort, setIconSort] = useState(true);

  useEffect(() => {
    setDataSort(pageData);
  }, [pageData]);

  const priceSorting = () => {
    setDataSort((data) => {
      const dataToSort = [...data];
      if (iconSort) {
        dataToSort.sort((a, b) => a.current_price - b.current_price);
        // setIconSort(true)
      } 
      setIconSort(!iconSort);
  
      return dataToSort;
    });
  };

  const nameSorting = () => {
    setDataSort((data) => {
      const dataToSort = [...data];

      if (iconSort) {
        dataSort.sort((a, b) => {
          const firstName = a.name;
          const secondName = b.name;
          if (firstName < secondName) {
            return -1;    //A PEHLE
          }
          if (firstName > secondName) {
            return 1;  //B PEHLE
          }
          return 0;
        });
      }
      setIconSort(!iconSort);
      return dataToSort;
    });
  };

  const marketCapSorting = () => {
    setDataSort((data) => {
      const dataToSort = [...data];
      if (iconSort) {
        dataToSort.sort((a, b) => a.market_cap - b.market_cap);
        // setIconSort(true)
      } 
      setIconSort(!iconSort);
      // console.log(dataToSort)
      return dataToSort;
    });
  };

  const volumeSorting = () => {
    setDataSort((data) => {
      const dataToSort = [...data];
      if (iconSort) {
        dataToSort.sort((a, b) => a.total_volume - b.total_volume);
      } 
      setIconSort(!iconSort);
      // console.log(dataToSort)
      return dataToSort;
    });
  };

  const circulatingSupplySorting = () => {
    setDataSort((data) => {
      const dataToSort = [...data];
      if (iconSort) {
        dataToSort.sort((a, b) => a.total_volume - b.total_volume);
        // setIconSort(true)
      } 
      setIconSort(!iconSort);
      // console.log(dataToSort)
      return dataToSort;
    });
  };
  return (
    <div className="container">
      <table className="custom-table">
        <thead>
          <tr>
            <th className="table-head">#</th>

            <th onClick={nameSorting} className="table-head-name">
              Name
              {iconSort === true ? (
                <MdOutlineArrowDropDown />
              ) : (
                <IoMdArrowDropup />
              )}
            </th>

            <th onClick={priceSorting} className="table-head-price">
              Price
              {iconSort === true ? (
                <MdOutlineArrowDropDown />
              ) : (
                <IoMdArrowDropup />
              )}
            </th>

            <th className="table-head-hour">1h%</th>

            <th className="table-head-all-hour">24h%</th>

            <th className="table-head-days">7d%</th>

            <th onClick={marketCapSorting} className="table-head-market-cap">
              MarketCap
              {iconSort === true ? (
                <MdOutlineArrowDropDown />
              ) : (
                <IoMdArrowDropup />
              )}
            </th>

            <th onClick={volumeSorting} className="table-head-volume">
              Volume 24h%
              {iconSort === true ? (
                <MdOutlineArrowDropDown />
              ) : (
                <IoMdArrowDropup />
              )}
            </th>

            <th
              onClick={circulatingSupplySorting}
              className="table-head-circulating-supply"
            >
              Circulating Supply
              {iconSort === true ? (
                <MdOutlineArrowDropDown />
              ) : (
                <IoMdArrowDropup />
              )}
            </th>

            <th className="table-head-last-days">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {dataSort.map((elem, ind) => {
            // console.log("DATA MAPPING", elem);
            return (
              <tr key={ind}>
                <td>{elem.market_cap_rank}</td>
                <td>
                  <div className="Name-Table">
                    <img
                      src={elem.image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "7px",
                      }}
                      className="Image"
                    />
                    <div className="Name-Table-Inner">
                      <p className="Name-Table-Text"> {elem.name} </p>
                      <p className="Name-Table-Text-Two">{elem.symbol}</p>
                    </div>
                  </div>
                </td>
                <td>${elem.current_price.toLocaleString()}</td>
                <td
                  style={{
                    color:
                      elem.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {(elem.price_change_percentage_24h * 2).toFixed(2)}%
                </td>
                <td
                  style={{
                    color:
                      elem.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {(elem.price_change_percentage_24h * 2).toFixed(2)}%
                </td>
                <td
                  style={{
                    color:
                      elem.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {(elem.price_change_24h * 2).toFixed(2)}%
                </td>
                <td>{elem.market_cap.toLocaleString()}</td>
                <td>
                  <div className="Total-Volume">
                    <div>${elem.total_volume.toLocaleString()}</div>
                    <p className="Total-Volume-two">
                      {" "}
                      {elem.total_volume.toLocaleString()} {elem.symbol}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="Circulating-Supply">
                    <div> {elem.circulating_supply.toLocaleString()}</div>
                    <p className="Circulating-Supply-two"> {elem.symbol}</p>
                  </div>
                </td>
                <td>
            <MakeChart sparkline={elem}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
