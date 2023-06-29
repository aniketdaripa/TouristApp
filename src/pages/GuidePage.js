import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import GuideProfileForm from "../components/GuideProfileForm";
import classes from "../Assets/Styles/guidePage.module.css";
import GuideHome from "../components/GuideHome";
const GuidePage = () => {
  const [currGuideData, setCurrGuideData] = useState({});
  const currUserName = localStorage.getItem("userName");
  const [profileView, setProfileView] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const Navigate = useNavigate();
  /////////upload image
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    await axios.post("http://localhost:4000/uploadImage", formData, {
      params: { userName: currUserName },
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/getImageData", {
        params: { userName: currUserName },
      })
      .then((response) => {
        setImageUrl(response.data);
      });
  }, []);
  ///////////////
  useEffect(() => {
    axios
      .get("http://localhost:4000/getGuideFullData", {
        params: { currUserName: currUserName },
      })
      .then((response) => {
        setCurrGuideData(response.data);
        setIsAvailable(response.data[0].availaibility);
      });
  }, []);

  const reqChangeHandler = () => {
    axios.get("http://localhost:4000/reject", {
      params: { currUserName: currUserName },
    });
  };
  const availabilityChangeHandler = () => {
    axios.get("http://localhost:4000/availability", {
      params: { currUserName: currUserName },
    });
    window.location.reload(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userName");
    Navigate("/");
  };
  return (
    <>
      {Object.keys(currGuideData).length !== 0 && (
        <div className={classes["container"]}>
          <div className={classes["profile-header"]}>
              {imageUrl && (
                <img
                  src={`http://localhost:4000/${imageUrl}`}
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              )}
              {!imageUrl && (
                <div style={{width:"100px",marginLeft:"20px"}}>
                <label >Choose Profile Picture
                  <input style={{width:"250px"}} 
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                  ></input>
                  </label>
                  <button
                    onClick={handleSubmit}
                  >
                    Upload Image
                  </button>
                </div>
              )}
            <div className={classes["profile-img"]}>
            </div>
            <div className={classes["profile-nav-info"]}>
              <h3
                className={classes["user-name"]}
              >{`${currGuideData[0].firstName} ${currGuideData[0].lastName}`}</h3>
              <div className={classes["address"]}>
                <span id="country" className={classes["country"]}>
                  India
                </span>
              </div>
            </div>
            <div
              className={classes["profile-option"]}
              style={{ height: "16px", width: "100px" }}
            >
              {/* <div className={classes["notification"]}> */}
              <button
                onClick={logoutHandler}
                style={{
                  height: "30px",
                  width: "100px",
                  background: "#e40046",
                  color: "#fff",
                  fontSize: "1rem",
                  borderRadius: "3px",
                  border: "0px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
              {/* </div> */}
            </div>
          </div>

          <div className={classes["main-bd"]}>
            <div className={classes["left-side"]}>
              <div className={classes["profile-side"]}>
                <p className={classes["mobile-no"]}>
                  <i class="fa fa-phone"></i> {currGuideData[0].phNo}
                </p>
                <p className={classes["user-mail"]}>
                  <i class="fa fa-envelope"></i> {currGuideData[0].email}
                </p>
                <div className={classes["user-bio"]}>
                  <h3>Bio</h3>
                  <p className={classes["bio"]}>
                    <ul>
                      <li>Language: {currGuideData[0].languages}</li>
                      <li>Experience: {currGuideData[0].experience} year</li>
                      <li>Qualification: {currGuideData[0].qualifications}</li>
                      <li>Location: {currGuideData[0].location}</li>
                    </ul>
                  </p>
                </div>
                <div className={classes["profile-btn"]}>
                  <button className={classes["chatbtn"]} id="chatBtn">
                    <i class="fa fa-comment"></i>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/chatPage"
                    >
                      Chat
                    </a>
                  </button>
                  {/* <button className={classes["createbtn"]} onClick={reqChangeHandler} id="Create-post">
                     Change Availability
                  </button> */}
                  <button
                    className={classes["createbtn"]}
                    onClick={availabilityChangeHandler}
                    id="Create-post"
                  >
                    {isAvailable && <h5>Available</h5>}
                    {!isAvailable && <h5>Not Available</h5>}
                  </button>
                </div>
                <div className={classes["user-rating"]}>
                  <h3 className={classes["rating"]}>
                    {currGuideData[0].rating}*
                  </h3>
                  <div className={classes["rate"]}>
                    <div className={classes["star-outer"]}>
                      <div className={classes["star-inner"]}>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                    <span className={classes["no-of-user-rate"]}>
                      <span>123</span>&nbsp;&nbsp;reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "85%" }} className={classes["right-side"]}>
              <div className={classes["nav"]}>
                <ul>
                  <li
                    onClick={() => {
                      setProfileView(true);
                    }}
                    className={`${classes["user-post"]}`}
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      setProfileView(false);
                    }}
                    className={classes["user-review"]}
                  >
                    Edit Profile
                  </li>
                </ul>
              </div>
              {profileView && <GuideHome />}
              {!profileView && (
                <GuideProfileForm currGuideData={currGuideData} />
              )}
            </div>
          </div>
        </div>
      )}
      {currGuideData.length === 0 && <p>Loading....</p>}
    </>
  );
};

export default GuidePage;
