import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "../Assets/Styles/card.module.css";
import GooglePayBtn from "./GooglePayBtn";

export default function Card(props) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const requestHandler = async () => {
    window.location.reload(false);
    await axios.get("https://touristbackend-z6a1.onrender.com/request", {
      params: { currUserName: props.currGuideUsername },
    });
  };
  useEffect(() => {
    axios
      .get("https://touristbackend-z6a1.onrender.com/getImageData", {
        params: { userName: props.currGuideUsername },
      })
      .then((response) => {
        setImageUrl(response.data);
      });
  }, []);
  ///////////////
  useEffect(() => {
    axios
      .get("https://touristbackend-z6a1.onrender.com/requestCheckData", {
        params: { currUserName: props.currGuideUsername },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data[0].outgoingReq === "yes") {
          setIsAccepted(true);
        } else {
          setIsAccepted(false);
        }
      });
  }, []);

  return (
    <div id={classes["login-container"]}>
      <div >
        <img src={`https://touristbackend-z6a1.onrender.com/${imageUrl}`} alt="img"  style={{height:"80px", width:"80px",borderRadius:"50%"}}/>
      </div>
      <h1>{`${props.firstName} ${props.lastName}`}</h1>
      <div className={classes["description"]}>
        Maddie is a front end web developer in New York. She has worked in the
        field for 10 years now. Check out her projects in the links below. She
        is available for hire as well.
      </div>
      <div className={classes["social"]}>
        <a style={{ textDecoration: "none" }} href="/chatPage">
          Chat
        </a>
        <a>{`${props.rating}`}</a>
        <a style={{ cursor: "default" }}>{`$${props.price}`}</a>
        <a style={{ cursor: "default" }}>{`${props.location}`}</a>
      </div>
      {isAccepted && (
        <GooglePayBtn
          merchantId={props.accountNo || "123456789876"}
          price={props.price}
          currGuideUsername={props.currGuideUsername}
          firstName={props.firstName}
          phNo={props.phNo}
          lastName={props.lastName}
        />
      )}
      {!isAccepted && <button onClick={requestHandler}>Request</button>}
    </div>
  );
}
