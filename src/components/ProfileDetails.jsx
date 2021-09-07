import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import { Avatar } from "@material-ui/core";
import { Button, Modal } from "react-bootstrap";
import { getMyProfile } from "../Utilities/fetches";

import Example from "./Modal";
const ProfileDetails = () => {
  const [details, setDetails] = useState({});
  useEffect(() => {
    let mydetails = getMyProfile();
    mydetails.then((data) => setDetails(data));
  }, []);
  console.log(details);

  return (
    details && (
      <div className="profileDetails" key={details._id}>
        <div className="profileBox1">
          <img
            src="https://cdn.wallpapersafari.com/72/62/bf6Xxh.jpg"
            alt="backimg"
          />

          <Avatar
            className="Avatar"
            // src={details.image}
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwaW4lMjBzdWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            style={{ width: "200px", height: "200px" }}
          />

          <div className="details">
            <div className="detailsRight">
              <h2>
                {details.username}{" "}
                <span style={{ display: "inline-flex", marginLeft: "3rem" }}>
                  <Example details={details} />
                </span>
              </h2>

              <h4>{details.title}</h4>
              <p>email : {details.email}</p>
              <p>{details.area}</p>
              <p>
                <span style={{ color: "blue", fontWeight: "500" }}>35</span>
              </p>
            </div>
            <div className="detailsLeft">
              <img src="https://strive.school/favicon.ico" alt="striveschool" />
              <span>StriveSchool</span>
            </div>
          </div>
          <div className="buttons">
            <Button variant="primary" className="mx-1">
              Open section
            </Button>
            <Button variant="light" className="mx-1">
              Add section
            </Button>
            <Button variant="light">More</Button>
          </div>
        </div>
        <div className="aboutSection">
          <h3>About</h3>
          <p>
            {details
              ? details.bio
              : "My name is manish elaganti I'm a Front End Engineer based in  germany☀️. I describe myself as a passionate developer who loves coding"}
          </p>
        </div>
        <div className="experience">
          <h3>Experience</h3>

          <div className="experience-div">
            <img
              src="https://strive.school/favicon.ico"
              alt="striveschool"
              alt=""
            />
            <div className="experienceDetails">
              <h3>Full stack developer</h3>
              <p>experience deatails</p>
            </div>
          </div>
        </div>
        <div className="education">
          <h3>Education</h3>
          <div className="experience-div">
            <img
              src="https://strive.school/favicon.ico"
              alt="striveschool"
              alt=""
            />
            <div className="educationDetails">
              <h3>Full stack developer</h3>
              <p>education details</p>
            </div>
          </div>
        </div>
        <div className="skills">
          <h3>Skills & endorsements</h3>
          <Button variant="light">Take skill quiz</Button>
          <div className="skills-list">
            <p>skill-1</p>
            <p>skill-2</p>
            <p>skill-3</p>
          </div>
        </div>
        <div className="interests">
          <h3>Interests</h3>
          <div className="interests-container">
            <div className="interests-div">
              <img
                src="https://strive.school/favicon.ico"
                alt="striveschool"
                alt=""
              />
              <span>Strive</span>
            </div>
            <div className="interests-div">
              <img
                src="https://strive.school/favicon.ico"
                alt="striveschool"
                alt=""
              />
              <span>Strive</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileDetails;
