// Global Variables

const apiUrl = "https://striveschool-api.herokuapp.com/api/profile/";
const postsApiUrl = "https://striveschool-api.herokuapp.com/api/posts/ ";
const apiKey = process.env.REACT_APP_API_KEY;
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
          }
          matchingUsers = matchingUsers.reduce(
            (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
            []
          );
          return matchingUsers;
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

export const updateMyProfile = async (profileData) => {
  // PROFILE Model:
  // {
  //     "_id": "5d84937322b7b54d848eb41b", //server generated
  //     "name": "Diego",
  //     "surname": "Banovaz",
  //     "email": "diego@strive.school",
  //     "bio": "SW ENG",
  //     "title": "COO @ Strive School",
  //     "area": "Berlin",
  //     "image": ..., //server generated on upload
  //     "username": "admin", //server generated from Auth
  //     "createdAt": "2019-09-20T08:53:07.094Z", //server generated
  //     "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
  //     "__v": 0 //server generated
  // }
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

//Functions/Profile/Experience

export const getUserExperienceList = async (userId) => {
  try {
    const apiResp = await fetch(apiUrl + userId + "/experiences", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let ExperienceList = await apiResp.json();
      return ExperienceList;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const createUserExperience = async (userId, experienceData) => {
  // EXPERIENCE Model:
  //   {
  //       "_id": "5d925e677360c41e0046d1f5",  //server generated
  //       "role": "CTO",
  //       "company": "Strive School",
  //       "startDate": "2019-06-16",
  //       "endDate": "2019-06-16", //could be null
  //       "description": "Doing stuff here and there",
  //       "area": "Berlin",
  //       "username": "admin",  //server generated
  //       "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
  //       "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
  //       "__v": 0  //server generated
  //       "image": ... //server generated on upload
  //   }
  experienceData.startDate = new Date(experienceData.startDate).toISOString();
  experienceData.endDate = new Date(experienceData.endDate).toISOString();
  try {
    const apiResp = await fetch(apiUrl + userId + "/experiences/", {
      method: "POST",
      body: JSON.stringify(experienceData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let createdUserExperience = await apiResp.json();
      return createdUserExperience;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getUserExperience = async (userId, experienceId) => {
  try {
    const apiResp = await fetch(
      apiUrl + userId + "/experiences/" + experienceId,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    if (apiResp.ok) {
      let userExperience = await apiResp.json();
      return userExperience;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const updateUserExperience = async (
  userId,
  experienceId,
  experienceData
) => {
  // EXPERIENCE Model:
  //   {
  //       "_id": "5d925e677360c41e0046d1f5",  //server generated
  //       "role": "CTO",
  //       "company": "Strive School",
  //       "startDate": "2019-06-16",
  //       "endDate": "2019-06-16", //could be null
  //       "description": "Doing stuff here and there",
  //       "area": "Berlin",
  //       "username": "admin",  //server generated
  //       "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
  //       "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
  //       "__v": 0  //server generated
  //       "image": ... //server generated on upload
  //   }
  experienceData.startDate = new Date(experienceData.startDate).toISOString();
  experienceData.endDate = new Date(experienceData.endDate).toISOString();
  try {
    const apiResp = await fetch(
      apiUrl + userId + "/experiences/" + experienceId,
      {
        method: "PUT",
        body: JSON.stringify(experienceData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    if (apiResp.ok) {
      let updatedUserExperience = await apiResp.json();
      return updatedUserExperience;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const deleteUserExperience = async (userId, experienceId) => {
  try {
    const apiResp = await fetch(
      apiUrl + userId + "/experiences/" + experienceId,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    if (apiResp.ok) {
      return `${userId} experience with the id of ${experienceId} has been successfuly deleted`;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

//Functions/Posts

export const getPosts = async () => {
  try {
    const apiResp = await fetch(postsApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let posts = await apiResp.json();
      return posts;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const createPost = async (postData) => {
  // POST Model:
  //   {
  //       "_id": "5d93ac84b86e220017e76ae1", //server generated
  //       "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
  //       "username": "admin", //server generated
  //       "createdAt": "2019-10-01T19:44:04.496Z", //server generated
  //       "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
  //       "__v": 0 //server generated
  //   }
  try {
    const apiResp = await fetch(postsApiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let createdPost = await apiResp.json();
      return createdPost;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getPost = async (postId) => {
  try {
    const apiResp = await fetch(postsApiUrl + postId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let userExperience = await apiResp.json();
      return userExperience;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const updatePost = async (postId, postData) => {
  // POST Model:
  // {
  //     "_id": "5d93ac84b86e220017e76ae1", //server generated
  //     "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
  //     "username": "admin", //server generated
  //     "createdAt": "2019-10-01T19:44:04.496Z", //server generated
  //     "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
  //     "__v": 0 //server generated
  // }
  try {
    const apiResp = await fetch(postsApiUrl + postId, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      let updatedPost = await apiResp.json();
      return updatedPost;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const deletePost = async (postId) => {
  try {
    const apiResp = await fetch(postsApiUrl + postId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    if (apiResp.ok) {
      return `Post with the id of ${postId} has been successfuly deleted`;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};
