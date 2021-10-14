// Global Variables//functionsss
const apiUrl = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;
//Functions
const postsApiUrl = process.env.REACT_APP_POST_URL;
export const getProfiles = async () => {
  try {
    const apiResp = await fetch(apiUrl, {
      method: "GET",
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      let profileList = await apiResp.json();
      console.log("PROFILE LIST", profileList);
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

export const getMyProfile = async (thisUser) => {
  console.log("THIS USER", thisUser);
  try {
    const apiResp = await fetch(apiUrl + "/" + thisUser, {
      method: "GET",
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      let myProfile = await apiResp.json();
      console.log("MY PROFILE FETCH", myProfile);
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
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
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
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
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

export const updateMyProfile = async (profileData, userId) => {
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
  const formData = new FormData();
  const { name, surname, email, bio, title, area, image } = profileData;
  //   console.log(name, surname, image);
  // let img =
  // 	'https://res.cloudinary.com/dytffimtv/image/upload/v1634140859/hjqypmpvl90fffy6fjlk.jpg';
  formData.append("image", image);
  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("email", email);
  formData.append("bio", bio);
  formData.append("title", title);
  formData.append("area", area);

  // formData.append('data', JSON.stringify(profileData));
  try {
    const apiResp = await fetch(apiUrl + "/" + "61642ba7c7ce9a61a178ef42", {
      method: "PUT",
      body: formData,
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

export const uploadProfilePicture = async (userId, profilePicture) => {
  const formData = new FormData();
  formData.append("profile", profilePicture);
  try {
    const apiResp = await fetch(apiUrl + userId + "/picture", {
      method: "POST",
      body: formData,
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      let uploadedProfilePicture = await apiResp.json();
      return uploadedProfilePicture;
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
export const uploadExperiencePicture = async (
  userId,
  experienceId,
  experiencePicture
) => {
  // experiencePicture should be the input field with the file upload
  const formData = new FormData();
  formData.append("experience", experiencePicture);
  try {
    const apiResp = await fetch(
      `${apiUrl}/${userId}/experiences/${experienceId}/picture`,
      {
        method: "POST",
        body: formData,
        // headers: {
        // 	Authorization: `Bearer ${apiKey}`,
        // },
      }
    );
    if (apiResp.ok) {
      alert("experience updated");
      //   let uploadedExperiencePicture = await apiResp.json();
      //   return uploadedExperiencePicture;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};
export const getUserExperienceList = async (userId) => {
  try {
    const apiResp = await fetch(apiUrl + "/" + userId + "/experiences", {
      method: "GET",
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
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

export const createUserExperience = async (userEx) => {
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
  //experienceData.startDate = new Date(experienceData.startDate).toISOString();
  //experienceData.endDate = new Date(experienceData.endDate).toISOString();

  try {
    const formData = new FormData();
    const { role, company, startDate, endDate, description, area, image } =
      userEx;

    // let img =
    // 	'https://res.cloudinary.com/dytffimtv/image/upload/v1634140859/hjqypmpvl90fffy6fjlk.jpg';
    formData.append("role", role);
    formData.append("company", company);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);
    formData.append("area", area);
    formData.append("image", image);

    console.log("USER EXP", userEx);
    const apiResp = await fetch(`${apiUrl}/vinay425/experiences`, {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Authorization: `Bearer ${apiKey}`,
      //   },
    });
    if (apiResp.ok) {
      alert("data sent");
      //   let createdUserExperience = await apiResp.json();
      //   return createdUserExperience;
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
        // headers: {
        // 	Authorization: `Bearer ${apiKey}`,
        // },
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

export const updateUserExperience = async (userId, exid, updateEx) => {
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
  //   experienceData.startDate = new Date(experienceData.startDate).toISOString();
  //   experienceData.endDate = new Date(experienceData.endDate).toISOString();
  const formData = new FormData();
  const { role, company, startDate, endDate, description, area, image } =
    updateEx;

  formData.append("role", role);
  formData.append("company", company);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("description", description);
  formData.append("area", area);
  formData.append("image", image);

  try {
    const apiResp = await fetch(`${apiUrl}/${userId}/experiences/${exid}`, {
      method: "PUT",
      body: formData,
      // headers: {
      //   "Content-Type": "application/json",
      //   // Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      //   let updatedUserExperience = await apiResp.json();
      //   return updatedUserExperience;
      alert("experience updated");
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const updateUserExperienceTwo = async (userId, exid, updateEx) => {
  try {
    const apiResp = await fetch(
      `${apiUrl}/${userId}/experience/experiences/${exid}`,
      {
        method: "PUT",
        body: JSON.stringify(updateEx),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    if (apiResp.ok) {
      //   let updatedUserExperience = await apiResp.json();
      //   return updatedUserExperience;
      alert("experience updated");
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const deleteUserExperience = async (userId, exid) => {
  try {
    const apiResp = await fetch(
      apiUrl + "/" + userId + "/experiences/" + exid,
      {
        method: "DELETE",
        // headers: {
        // 	Authorization: `Bearer ${apiKey}`,
        // },
      }
    );
    if (apiResp.ok) {
      return `${userId} experience with the id of ${exid} has been successfuly deleted`;
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
export const uploadPostPicture = async (postId, postPicture) => {
  const formData = new FormData();
  formData.append("post", postPicture);
  console.log("POST ID", postId);
  try {
    const apiResp = await fetch(postsApiUrl + postId, {
      method: "POST",
      body: formData,
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      let uploadedPostPicture = await apiResp.json();
      return uploadedPostPicture;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResp.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    throw err;
  }
};

export const getPosts = async () => {
  try {
    const apiResp = await fetch(postsApiUrl, {
      method: "GET",
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
    });
    if (apiResp.ok) {
      let posts = await apiResp.json();
      console.log("LOOK HERE", posts);
      return posts.posts;
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
  console.log("POST DATA", postData);
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
        // Authorization: `Bearer ${apiKey}`,
      },
    });
    if (apiResp.ok) {
      let createdPost = await apiResp.json();
      console.log("CREATED POST(RESPONSE)", createdPost);
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
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
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
        // Authorization: `Bearer ${apiKey}`,
      },
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
      // headers: {
      // 	Authorization: `Bearer ${apiKey}`,
      // },
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

// ****************** LIKE AND UNLIKE (with same fetch) ******************************
export const like = async (postId, thisUserId) => {
  //console.log('POST ID FROM FETCH',postId,' USER ID FROM FETCH: ',thisUserId)
  try {
    const apiResp = await fetch(postsApiUrl + postId + "/like", {
      method: "POST",
      body: JSON.stringify(thisUserId),
      headers: { "Content-Type": "application/json" },
    });
    if (apiResp.ok) {
      let likeResponse = await apiResp.json();
      console.log("LIKE RESPONSE FROM FETCH: ", likeResponse.likes);
      return likeResponse;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("CLIENT SIDE ERROR");
    } else if (apiResp.status > 500) {
      throw new Error("SERVER GONE");
    }
  } catch (err) {
    throw err;
  }
};
// ***************** POST A COMMENT (commenting a Post) **********************
export const postAComment = async (postId, commentText) => {
  console.log(
    "POST ID FROM FETCH",
    postId,
    " COMMENT TEXT FROM FETCH: ",
    commentText
  );
  try {
    const apiResp = await fetch(postsApiUrl + postId + "/comment", {
      method: "POST",
      body: JSON.stringify(commentText),
      headers: { "Content-Type": "application/json" },
    });
    if (apiResp.ok) {
      let newComment = await apiResp.json();
      console.log("LIKE RESPONSE FROM FETCH: ", newComment);
      return newComment;
    } else if (apiResp.status > 400 && apiResp.status < 500) {
      throw new Error("CLIENT SIDE ERROR");
    } else if (apiResp.status > 500) {
      throw new Error("SERVER GONE");
    }
  } catch (err) {
    throw err;
  }
};
