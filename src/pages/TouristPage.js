import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const TouristPage = () => {
  const Navigate = useNavigate();
  
  const [allGuideData, setAllGuideData] = useState([]);
  const [currLoggedUser,setCurrLoggedUser] =useState("");
  const [sortBy,setSortBy]=useState("None");
  const [type,setType]=useState("");
  const currUserName = localStorage.getItem("userName") || '/0';
  // console.log(currLoggedUser)
  useEffect(() => {
    axios.get("https://touristbackend-z6a1.onrender.com/touristPage", {
      params: { currUserName: currUserName },
    }).then((response) => {
      if(response.data!=="Logged out"){
        const allGData=response.data;
        const guideData=allGData.filter((person)=>{
          return person.userType==="Guide"
        })
        setAllGuideData(guideData);
      }
    });
    setCurrLoggedUser(localStorage.getItem("userName"));
  }, []);
  const options = [
    'None','Languages', 'Location'
  ];
  
  const dropdownChangeHandler =(e)=>{
    setSortBy(e.value)
  }
  const typeChangeHandler=(e)=>{
    setType(e.target.value);
  }
  let filteredData=[]
  if(sortBy!=="None"){
     filteredData=allGuideData.filter((data)=>{
      const sorte=sortBy.toLowerCase();
      const first=data[sorte].toUpperCase();
      const second=type.toUpperCase();
      return first===second;
    })
  }
  else{
   filteredData=allGuideData
  }
  const logoutHandler=()=>{
    localStorage.removeItem('userName');
    Navigate('/');
  }
  return (
    <div>
      <h1 style={{textAlign:"center", margin:"30px", fontSize:"50px",color:"black", fontWeight:"800"}}>Tourist Page</h1>
      
      <div style={{display:"flex", justifyContent:"center", margin:"20px" }}><Dropdown options={options} value={sortBy} onChange={dropdownChangeHandler}   placeholder="Sort By" />
      <input style={{width:"30%", height:"41px"}} type="text" placeholder="Search For" value={type} onChange={typeChangeHandler} />
      <button onClick={logoutHandler} style={{marginLeft:"auto", width:"100px",borderRadius:"5px",background:"orange",color:"white",border:"1px solid black",fontWeight:"900",fontSize:"20px",cursor:"pointer" }}>Logout</button>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-evenly" , flexWrap:"wrap" }}>
        {
          
          
          filteredData.map((data) => {
          return (
            <Card
            key={data.id}
            currGuideUsername={data.userName}
            firstName={data.firstName}
            phNo={data.phNo}
            price={data.price}
            lastName={data.lastName}
            email={data.email}
            languages={data.languages}
            availability={data.availaibility}
            qualifications={data.qualifications}
            experience={data.experience}
            location={data.location}
            rating={data.rating}
          />
          )
        })}
      </div>
    </div>
  );
};

export default TouristPage;