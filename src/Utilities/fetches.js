// Global Variables//functionsss
const apiUrl = 'https://striveschool-api.herokuapp.com/api/profile/';
const apiKey = process.env.REACT_APP_API_KEY;
//Functions

export const getProfiles = async () => {
	try {
		const apiResp = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (apiResp.ok) {
			let profileList = await apiResp.json();
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

export const getMyProfile = async () => {
	try {
		const apiResp = await fetch(apiUrl + 'me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (apiResp.ok) {
			let myProfile = await apiResp.json();
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
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
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
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
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
							[],
						);
					}
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
			method: 'PUT',
			body: JSON.stringify(profileData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
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
