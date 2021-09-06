// Global Variables
const apiUrl = "https://striveschool-api.herokuapp.com/api/profile/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM1ZDc0MzdiZTZjMTAwMTVmOWRiOTkiLCJpYXQiOjE2MzA5MTg0NjgsImV4cCI6MTYzMjEyODA2OH0._zo14VO4bjHUJ0UC6s3ciJfFHagr5f8SL0gvNXpPtak";
//Functions

export const getProfiles = async () => {
  try {
    const apiResp = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let profileList = await apiResp.json();
      return profileList;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getMyProfile = async () => {
  try {
    const apiResp = await fetch(apiUrl + "me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let myProfile = await apiResp.json();
      return myProfile;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const apiResp = await fetch(apiUrl + userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let userProfile = await apiResp.json();
      return userProfile;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getFilteredProfiles = async (filterString) => {
  try {
    const apiResp = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let profileList = await apiResp.json();
      let matchingUsers = [];
      profileList.map((profile) =>
        Object.values(profile).filter((userData) => {
          if (
            userData
              .toString()
              .toLowerCase()
              .includes(filterString.toString().toLowerCase())
          ) {
            matchingUsers.push(profile);
            matchingUsers = matchingUsers.reduce(
              (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
              []
            );
          }
        })
      );
      return matchingUsers;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const updateMyProfile = async () => {
  let profileData = {
    name: "Aron",
    surname: "Hajnal",
    email: "hajnal.aron.2k11@gmail.com",
    bio: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
    title: "Strive Student",
    area: "Berlin"
  };
  try {
    const apiResp = await fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let userProfileUpdated = await apiResp.json();
      return userProfileUpdated;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};
