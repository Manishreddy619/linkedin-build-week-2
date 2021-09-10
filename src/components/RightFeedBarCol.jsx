const RightFeedBarCol = ({ profile }) => {
  return (
    profile !== undefined && (
      <li>
        <div className="feed-right-container">
          <div className="feed-right-img-container">
            <img
              src={profile.image}
              alt="user images"
              className="feed-right-user-image"
            ></img>
          </div>
          <div className="feed-right-details">
            <span className="feed-right-name">{profile.name} </span>
            <p className="feed-right-area">{profile.area}</p>
          </div>
        </div>
        <div className="feed-right-button-container">
          <div className="feed-right-btn-follow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fillRule="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span>Follow</span>
          </div>
        </div>
      </li>
    )
  );
};

export default RightFeedBarCol;
