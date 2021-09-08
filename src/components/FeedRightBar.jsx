import { getProfiles } from "../Utilities/fetches";
import { useState, useEffect } from "react";
import "./FeedRightBar.css";
import RightFeedBarCol from "./RightFeedBarCol";

const FeedRightBar = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      let profiles = await getProfiles();
      let uniqueProfiles = [];
      while (uniqueProfiles.length < 3) {
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
          <div className="feed-right-bar">
            <div className="feed-right-main-container">
              <div className="feed-right-title-container">
                <span className="feed-right-title ">Add to your feed</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </div>
              <ul className="feed-right-people-ul">
                {profiles.slice(0, 3).map((profile) => (
                  <RightFeedBarCol profile={profile} key={profile._id} />
                ))}
              </ul>
              <div className="feed-right-btn-recommendations">
                <span>View all recommendations</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>

            <div className="feed-right-main-container-2">
              <div className="feed-right-title-container">
                <span className="feed-right-title ">Today's top courses</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </div>

              <ol className="feed-right-courses-ol">
                <li className="feed-right-courses-li">
                  <span className="feed-right-name">
                    What is Graphic Design?
                  </span>
                  <p className="feed-right-area">Sean Adams</p>
                </li>
                <li className="feed-right-courses-li">
                  <span className="feed-right-name">
                    Customer Service Foundations
                  </span>
                  <p className="feed-right-area">Jeff Toister</p>
                </li>
                <li className="feed-right-courses-li">
                  <span className="feed-right-name">
                    Uncovering Your Authentic Self at Work
                  </span>
                  <p className="feed-right-area">Kenji Yoshino</p>
                </li>
              </ol>
              <div className="feed-right-btn-recommendations">
                <span>Show more on Linkedln Learning</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>

            <div className="feed-right-footer">
              <div className="feed-right-footer-container1">
                <div>
                  <span>About</span>
                  <span>Accessibility</span>
                  <span>Help Center</span>
                </div>
                <div>
                  <div className="feed-right-footer-text-arrow">
                    <span>Privacy &amp; Terms</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-compact-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                      />
                    </svg>
                  </div>

                  <span>Ad Choices</span>
                </div>
                <div>
                  <span>Advertising</span>
                  <div className="feed-right-footer-text-arrow">
                    <span>Business Services</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-compact-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <span>Get the LinkedIn app</span>
                  <span>More</span>
                </div>
              </div>
              <div className="feed-right-footer-container2">
                <div className="feed-right-linkedln-logo">
                  <span>Linkedln</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </div>
                <span className="feed-right-linkedln-corporation">
                  LinkedIn Corporation © 2021
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeedRightBar;
