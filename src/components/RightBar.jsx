import RightPeopleCol from "./RightPeopleCol";
import "./RightBar.css";
import { getProfiles, getMyProfile } from "../Utilities/fetches";
import { useState, useEffect } from "react";
import BtnShowMore from "./BtnShowMore";
import RightTopEditContainer from "./RightTopEditContainer";

const RightBar = () => {
  const [profiles, setProfiles] = useState([]);
  const [myProfile, setMyProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      let profiles = await getProfiles();
      let myProfile = await getMyProfile();
      setMyProfile(myProfile);
      let uniqueProfiles = [];
      while (uniqueProfiles.length < 20) {
        const profile = profiles[Math.floor(Math.random() * profiles.length)];
        if (profile._id !== myProfile._id) {
          uniqueProfiles.push(profile);
          uniqueProfiles = [...new Set(uniqueProfiles)];
        } else {
          continue;
        }
      }
      setProfiles(uniqueProfiles);
    };
    getProfile();
  }, []);

  return (
    <>
      {profiles.length > 0 && (
        <>
          <div className="right-bar">
            <RightTopEditContainer />

            <div className="right-people-main-container">
              <div className="right-people">
                <span className="right-people-title">People also viewed</span>
                <ul className="right-people-ul col-no1">
                  {profiles.slice(0, 10).map((profile) => (
                    <RightPeopleCol profile={profile} key={profile._id} />
                  ))}
                </ul>
              </div>
              <BtnShowMore number={"1"} />
            </div>

            <div className="right-people-main-container">
              <div className="right-people">
                <span className="right-people-title">People you may know</span>
                <ul className="right-people-ul col-no2">
                  {profiles.slice(10, 20).map((profile) => (
                    <RightPeopleCol profile={profile} key={profile._id} />
                  ))}
                </ul>
              </div>
              <BtnShowMore number={"2"} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RightBar;
