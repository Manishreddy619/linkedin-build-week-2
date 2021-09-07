import React from 'react';
import { useParams } from 'react-router-dom';
const UserDetails = () => {
	const params = useParams();
	// will recieve params from search
	return <div>hello user {params.Id}</div>;
};

export default UserDetails;
