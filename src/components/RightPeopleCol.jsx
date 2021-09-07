const RightPeopleCol = ({ profile }) => {
  return (
    profile !== undefined && (
      <li>
        <div className="right-people-container">
          <div className="right-people-img-container">
            <img
              src={profile.image}
              alt="user images"
              className="right-people-user-image"
            ></img>
          </div>
          <div className="right-people-details">
            <span className="right-people-name">{profile.name} </span>
            <span className="right-people-dot">&bull;</span>
            <p className="right-people-area">{profile.area}</p>
          </div>
        </div>
        <div className="right-people-button-container">
          <span>Connect</span>
        </div>
      </li>
    )
  );
};

export default RightPeopleCol;
