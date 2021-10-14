import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import { Avatar } from "@material-ui/core";
import { Button, Modal } from "react-bootstrap";
import { getMyProfile } from "../Utilities/fetches";
import { getUserExperienceList } from "../Utilities/fetches";
import Example from "./UpdateMyProfile";

import ExperienceModal from "./AddExperienceModal";
import EditMyExperience from "./EditMyExperience";
import DeleteMyExperience from "./DeleteMyExperience";
const ProfileDetails = () => {
  const [details, setDetails] = useState({});
  const [experience, setExperience] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchProfileData = async () => {
    //console.log(details._id)

    let profileData = await getMyProfile("616574bca2d651fc0b95a4b2");

    if (profileData !== details) {
      setDetails(profileData);
      //console.log('PROFILE DATA',profileData, details._id)
    }

    let experienceData = await getUserExperienceList("vinay425");

    if (experienceData !== experience) {
      setExperience(experienceData.reverse());
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);
  /*
  useEffect(() => {
    if (isLoading) {
      fetchProfileData();
    }
  }, [isLoading, details, experience]);
  */
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
            src={details.image}
            style={{ width: "200px", height: "200px" }}
          />
          <span className="pencil">
            <Example
              loadingState={(state) => setLoading(state)}
              details={details}
            />
          </span>
          <div className="details">
            <div className="detailsRight">
              <h2>
                {details.username && details.username.length >= 10
                  ? details.username.slice(0, 14)
                  : details.username}
              </h2>

              <h4>{details.title}</h4>
              <p>email : {details.email}</p>
              <p>{details.area}</p>
              <p>
                <span style={{ color: "blue", fontWeight: "500" }}>
                  35:Connections
                </span>
              </p>
            </div>
            <div className="detailsLeft">
              <img
                src="https://strive.school/favicon.ico"
                alt="striveschool"
                style={{ marginRight: "20px" }}
              />
              <span>StriveSchool</span>
            </div>
          </div>
          <div className="buttons">
            <Button className="btn1">Open to</Button>
            <Button variant="light" className="mx-1 btn1">
              Add section
            </Button>
            <Button variant="light" className="btn1">
              More
            </Button>
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
          <span className="mx-1">
            <ExperienceModal
              loadingState={(state) => setLoading(state)}
              id={details._id}
            />
          </span>
          {experience &&
            experience.map((ex) => {

              return (
                <>
                  <div className="experience-div" key={ex._id}>
                    <img src={ex.image} alt="striveschool" className="ex-img" />
                    <div className="experienceDetails">
                      <h3>{ex.role}</h3>
                      <h5>Role:{ex.description}</h5>
                      <h6>Company:{ex.company}</h6>
                      <div>
                        <p>from: {new Date(ex.startDate).toDateString()}</p>
                        <p>To: {new Date(ex.endDate).toDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <DeleteMyExperience
                        loadingState={(state) => setLoading(state)}
                        exid={ex._id}

                        userId={details.username}

                      />
                    </div>
                    <div>
                      <EditMyExperience
                        loadingState={(state) => setLoading(state)}
                        exid={ex._id}
                        currentEx={ex}

                        userId={details.username}

                      />
                    </div>
                  </div>
                </>
              );
            })}
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
