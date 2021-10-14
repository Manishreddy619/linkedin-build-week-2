// Global Variables//functionsss
const apiUrl = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;
//Functions
const postsApiUrl = process.env.REACT_APP_POST_URL;
export const getProfiles = async () => {
	try {
		const apiResp = await fetch(apiUrl, {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let profileList = await apiResp.json();
			//console.log('PROFILE LIST', profileList);
			return profileList;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getMyProfile = async (thisUser) => {
	//console.log('THIS USER', thisUser);
	try {
		const apiResp = await fetch(apiUrl + '/' + thisUser, {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let myProfile = await apiResp.json();
			//console.log('MY PROFILE FETCH', myProfile);
			return myProfile;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getUserProfile = async (userId) => {
	try {
		const apiResp = await fetch(apiUrl + userId, {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let userProfile = await apiResp.json();
			return userProfile;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getFilteredProfiles = async (filterString) => {
	try {
		const apiResp = await fetch(apiUrl, {
			method: 'GET',
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
						[],
					);
					return matchingUsers;
				}),
			);
			return matchingUsers;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const updateMyProfile = async (profileData, userId) => {
	// 	const getUrlExtension = (url) => {
	//     return url
	//       .split(/[#?]/)[0]
	//       .split(".")
	//       .pop()
	//       .trim();
	//   }

	// const onImageEdit = async (imgUrl) => {
	//     var imgExt = getUrlExtension(imgUrl);

	//     const response = await fetch(imgUrl);
	//     const blob = await response.blob();
	//     const file = new File([blob], "profileImage." + imgExt, {
	//       type: blob.type,
	//     });
	// }
	const formData = new FormData();
	const { name, surname, email, bio, title, area, image, username } =
		profileData;

	formData.append('image', image);
	formData.append('name', name);
	formData.append('surname', surname);
	formData.append('email', email);
	formData.append('bio', bio);
	formData.append('title', title);
	formData.append('area', area);
	formData.append('username', username);

	console.log(formData.getAll('image'));
	try {
		const apiResp = await fetch(apiUrl + '/' + '61642ba7c7ce9a61a178ef42', {
			method: 'PUT',
			body: formData,
		});
		if (apiResp.ok) {
			let userProfileUpdated = await apiResp.json();
			return userProfileUpdated;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const updateMyProfileBody = async (profileData) => {
	try {
		const apiResp = await fetch(
			`https://linkedin-backendcrud.herokuapp.com/profile/profiles/61642ba7c7ce9a61a178ef42/profile`,
			{
				method: 'PUT',
				body: JSON.stringify(profileData),
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${apiKey}`,
				},
			},
		);
		if (apiResp.ok) {
			let updatedPost = await apiResp.json();
			return updatedPost;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const uploadProfilePicture = async (userId, profilePicture) => {
	const formData = new FormData();
	formData.append('profile', profilePicture);
	try {
		const apiResp = await fetch(apiUrl + userId + '/picture', {
			method: 'POST',
			body: formData,
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let uploadedProfilePicture = await apiResp.json();
			return uploadedProfilePicture;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};
//Functions/Profile/Experience
export const uploadExperiencePicture = async (
	userId,
	experienceId,
	experiencePicture,
) => {
	// experiencePicture should be the input field with the file upload
	const formData = new FormData();
	formData.append('experience', experiencePicture);
	try {
		const apiResp = await fetch(
			`${apiUrl}/${userId}/experiences/${experienceId}/picture`,
			{
				method: 'POST',
				body: formData,
				// headers: {
				// 	Authorization: `Bearer ${apiKey}`,
				// },
			},
		);
		if (apiResp.ok) {
			alert('experience updated');
			//   let uploadedExperiencePicture = await apiResp.json();
			//   return uploadedExperiencePicture;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};
export const getUserExperienceList = async (userId) => {
	try {
		const apiResp = await fetch(apiUrl + '/' + userId + '/experiences', {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let ExperienceList = await apiResp.json();
			return ExperienceList;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
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
		formData.append('role', role);
		formData.append('company', company);
		formData.append('startDate', startDate);
		formData.append('endDate', endDate);
		formData.append('description', description);
		formData.append('area', area);
		formData.append('image', image);

		console.log('USER EXP', userEx);
		const apiResp = await fetch(`${apiUrl}/Bimal/experiences`, {
			method: 'POST',
			body: formData,
			//   headers: {
			//     "Content-Type": "application/json",
			//     // Authorization: `Bearer ${apiKey}`,
			//   },
		});
		if (apiResp.ok) {
			alert('data sent');
			//   let createdUserExperience = await apiResp.json();
			//   return createdUserExperience;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getUserExperience = async (userId, experienceId) => {
	try {
		const apiResp = await fetch(
			apiUrl + userId + '/experiences/' + experienceId,
			{
				method: 'GET',
				// headers: {
				// 	Authorization: `Bearer ${apiKey}`,
				// },
			},
		);
		if (apiResp.ok) {
			let userExperience = await apiResp.json();
			return userExperience;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
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

	formData.append('role', role);
	formData.append('company', company);
	formData.append('startDate', startDate);
	formData.append('endDate', endDate);
	formData.append('description', description);
	formData.append('area', area);
	formData.append('image', image);

	try {
		const apiResp = await fetch(`${apiUrl}/${userId}/experiences/${exid}`, {
			method: 'PUT',
			body: formData,
			// headers: {
			//   "Content-Type": "application/json",
			//   // Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			//   let updatedUserExperience = await apiResp.json();
			//   return updatedUserExperience;
			alert('experience updated');
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
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
				method: 'PUT',
				body: JSON.stringify(updateEx),
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${apiKey}`,
				},
			},
		);
		if (apiResp.ok) {
			//   let updatedUserExperience = await apiResp.json();
			//   return updatedUserExperience;
			alert('experience updated');
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const deleteUserExperience = async (userId, exid) => {
	try {
		const apiResp = await fetch(
			apiUrl + '/' + userId + '/experiences/' + exid,
			{
				method: 'DELETE',
				// headers: {
				// 	Authorization: `Bearer ${apiKey}`,
				// },
			},
		);
		if (apiResp.ok) {
			return `${userId} experience with the id of ${exid} has been successfuly deleted`;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

//Functions/Posts
export const uploadPostPicture = async (postId, postPicture) => {
	
	const formData = new FormData();
	formData.append('post', postPicture);
	console.log('FROM FETCH POST ID', postId, 'IMAGE', postPicture);
	try {
		const apiResp = await fetch(postsApiUrl + postId, {
			method: 'POST',
			body: formData,
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let uploadedPostPicture = await apiResp.json();
			return uploadedPostPicture;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getPosts = async () => {
	try {
		const apiResp = await fetch(postsApiUrl, {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let posts = await apiResp.json();
			//console.log('LOOK HERE', posts);
			return posts.posts;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const createPost = async (postData) => {
	//console.log('POST DATA', postData);
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
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${apiKey}`,
			},
		});
		if (apiResp.ok) {
			let createdPost = await apiResp.json();
			console.log('CREATED POST(RESPONSE)', createdPost);
			return createdPost;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const getPost = async (postId) => {
	try {
		const apiResp = await fetch(postsApiUrl + postId, {
			method: 'GET',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			let aPost = await apiResp.json();
			return aPost;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const updatePost = async (postId, postData) => {
	console.log('POSTID FROM FETCH: ',postId,'POSTDATA FROM FETCH: ',postData)
	try {
		const apiResp = await fetch(postsApiUrl + postId, {
			method: 'PUT',
			body: JSON.stringify(postData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (apiResp.ok) {
			let updatedPost = await apiResp.json();
			console.log('UPDATED POST FROM FETCH: ',updatedPost)
			return updatedPost;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

export const deletePost = async (postId) => {
	try {
		const apiResp = await fetch(postsApiUrl + postId, {
			method: 'DELETE',
			// headers: {
			// 	Authorization: `Bearer ${apiKey}`,
			// },
		});
		if (apiResp.ok) {
			return `Post with the id of ${postId} has been successfuly deleted`;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (err) {
		throw err;
	}
};

// ****************** LIKE AND UNLIKE (with same fetch) ******************************
export const like = async (postId, thisUserId) => {
	//console.log('POST ID FROM FETCH',postId,' USER ID FROM FETCH: ',thisUserId)
	try {
		const apiResp = await fetch(postsApiUrl + postId + '/like', {
			method: 'POST',
			body: JSON.stringify(thisUserId),
			headers: { 'Content-Type': 'application/json' },
		});
		if (apiResp.ok) {
			let likeResponse = await apiResp.json();
			console.log('LIKE RESPONSE FROM FETCH: ', likeResponse.likes);
			return likeResponse;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('CLIENT SIDE ERROR');
		} else if (apiResp.status > 500) {
			throw new Error('SERVER GONE');
		}
	} catch (err) {
		throw err;
	}
};
// ***************** POST A COMMENT (commenting a Post) **********************
export const postAComment=async(postId,commentText)=>{
	//console.log('POST ID FROM FETCH',postId,' COMMENT TEXT FROM FETCH: ',commentText)
	try {
		const apiResp = await fetch(postsApiUrl + postId + '/comment', {
			method: 'POST',
			body: JSON.stringify(commentText),
			headers: { 'Content-Type': 'application/json' },
		});
		if (apiResp.ok) {
			let newComment = await apiResp.json();
			console.log('LIKE RESPONSE FROM FETCH: ', newComment);
			return newComment;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('CLIENT SIDE ERROR');
		} else if (apiResp.status > 500) {
			throw new Error('SERVER GONE');
		}
	} catch (err) {
		throw err;
	}
};

// ************************* GET COMMENTS *****************************
export const getCommentsFromDB=async(postId,setThisPostComments)=>{
	try{
		const apiResp = await fetch(postsApiUrl+postId+'/comment', {
			method: 'GET',
		});
		if (apiResp.ok) {
			let comments = await apiResp.json();
			console.log('POST ID FROM FETCH: ',postId,'COMMENTS FROM FETCH: ', comments);
			//setThisPostComments(comments)
			return comments;
		}else if(apiResp.status>400&&apiResp.status<500){
			throw new Error('Client Side Error');
		}else if(apiResp.status>500) {
			throw new Error('Server Side Error');
		}
	}catch (err){
		throw err;
	}
};
// ******************* UPDATE COMMENTS ***************************
export const updateComment=async(postId,commentId,comment)=>{
	try {
		const apiResp=await fetch(postsApiUrl+postId+/comment/+commentId,{
			method:'PUT',
			body:comment,
		}
		)
		if(apiResp.ok){
			const commentUpdated=await apiResp.json();
			return commentUpdated;
		} else if (apiResp.status > 400 && apiResp.status < 500) {
			throw new Error('Client Side Error');
		} else if (apiResp.status > 500) {
			throw new Error('Server Side Error');
		}
	} catch (error) {
		throw error
	}
}
