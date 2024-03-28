import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import BasicPagination from './Components/BasicPagination';
import data from "./data.json"
import { useEffect, useState } from 'react';

function App() {
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [sortPage,setSortPage]=useState(5)
  
  useEffect(() => {
    
    const itemsPerPage = sortPage;   //INITIAL IS  5
    // console.log(data.length)
    // console.log("ITEM PER PAGE",itemsPerPage)  
    const pageDataCount = data.length / itemsPerPage;  //100/5=20 
    setPageCount(pageDataCount);
  

// console.log(page)
const pages= page -1
const startIndex =Math.max(0,pages*itemsPerPage) //INITIAL PAGE IS 1 CALC 1-1 * 5 AND 2ND CALC 2-1 *5
    // const startIndex = (page - 1) * itemsPerPage;   
    const endIndex = startIndex + itemsPerPage;   //0+5 =5 AT FIRST AND AT SECOND 5+5=10 
  // console.log("START INDEX",startIndex)
  const dataSlice = data.slice(startIndex, endIndex);   //0 SE START 5 P KHATAM 5 SE START 10 P KHATAM 
// console.log("LETS SLICE",dataSlice)
  setPageData(dataSlice)
    // if (page) {
    //   const limit = 10;
    //   const skip = limit * page; //5*1 =5   5*2=10 5*3=15 and so on
    //   const dataSkip = data.slice(page === 1 ? 0 : skip - limit, skip); //skip will be 10 so subtsract by 5 so it will show 5 products
    //   // console.log("DATA SKIP",dataSkip)
    //   setPageData(dataSkip);
    // }
  }, [page,sortPage]);

  return (
    <div className="App">
      <Home pageData={pageData}/>
      <BasicPagination setPage={setPage} page={page} pageCount={pageCount} sortPage={sortPage} setSortPage={setSortPage} />
    </div>
  );
}

export default App;
