import React, { useEffect, useState } from "react";
import "./BasicPagination.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../data.json";


const BasicPagination = ({
  setPage,
  page,
  pageCount,
  sortPage,
  setSortPage
}) => {
  const handleNext = () => {
    if (page === pageCount) {
      return page;
    }
    setPage(page + 1);
  };

  const sortingHandle = (e) => {
    const sorted = Number(e.target.value);
    setSortPage(sorted);
  };
  


  const handlePrevious = () => {
    if (page === 1) {
      return page;
    }
    setPage(page - 1);
  };

  const maxPageToShow = 5;
  // console.log(pageCount)
  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor( maxPageToShow / 2),  //1-2=-1
      pageCount - maxPageToShow + 1     //20-5+1=-16
    )
  );
  // console.log(pageCount)
  // console.log("Start Page",startPage)
  const endPage = Math.min( startPage + maxPageToShow - 1,pageCount); //1+5-1,20 ==== 1+4=5 5,20 =5 
  // console.log("END PAGE",endPage)

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <p className="pagination-number">
        Showing {startPage}-{endPage} out of {data.length}
      </p>
      <div className="pagination-main">
          <button onClick={handlePrevious} disabled={page === 1}   className="pagination-prev"> prev </button>
          {pageNumbers.map((pageNumbers) => {
            return (
              <>
                <button
                  key={pageNumbers}
                  active={pageNumbers === page}
                  onClick={() => setPage(pageNumbers)}
                  // style={{background:"blue"}} 
            className={`pagination-item ${page === pageNumbers ? 'active' : ''}`}
                >
                  {pageNumbers}
                </button>
              </>
            );
          })}
          <button onClick={handleNext} disabled={page === pageCount} className="pagination-next" > next </button>
      </div>

      <div className="sort-selection-container">
        {/* <div>{sortPage}</div> */}
{/* <label htmlFor="sort"> {sortPage}</label> */}
<p className="show-rows">Show Rows</p>
          <select
            name="sort"
            id="sort"
            className="sort-selection"
            onChange={sortingHandle}
            value={sortPage}
          >
            <option value="50">50</option>
            <option value="20">20</option>
            <option value="5">5</option>
          
          </select>
      </div>
    </div>
  );
};

export default BasicPagination;
