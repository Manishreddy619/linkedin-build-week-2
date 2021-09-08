import RightPeopleCol from "./RightPeopleCol";
import "./RightBar.css";
import { getProfiles } from "../Utilities/fetches";
import { useState, useEffect } from "react";
import BtnShowMore from "./BtnShowMore";
import RightTopEditContainer from "./RightTopEditContainer";

const RightBar = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      let profiles = await getProfiles();
      let uniqueProfiles = [];
      while (uniqueProfiles.length < 20) {
        const profile = profiles[Math.floor(Math.random() * profiles.length)];
        uniqueProfiles.push(profile);
        uniqueProfiles = [...new Set(uniqueProfiles)];
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
            <div className="right-top-1">
              <div>
                <span className="right-top-edit">
                  Edit public profile &amp; Url
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-question-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
              </div>
              <hr className="right-top-hr"></hr>
              <div>
                <span className="right-top-edit">
                  Add profile in another language
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-question-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
              </div>
            </div>

            <div className="right-people-main-container">
              <div className="right-people">
                <span className="right-people-title">People also viewed</span>
                <ul className="right-people-ul">
                  {profiles.slice(0, 10).map((profile) => (
                    <RightPeopleCol profile={profile} />
                  ))}
                </ul>
              </div>
              <div className="right-people-show-more">
                <div>
                  <span>Show more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-compact-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="right-people-main-container">
              <div className="right-people">
                <span className="right-people-title">People you may know</span>
                <ul className="right-people-ul">
                  {profiles.slice(11, 20).map((profile) => (
                    <RightPeopleCol profile={profile} />
                  ))}
                </ul>
              </div>
              <div className="right-people-show-more">
                <div>
                  <span>Show more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-compact-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RightBar;
