import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../../components/Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {
	const { user, loading, isAuthenticated } = useContext(Context);
	console.log(user);

	return loading ? (
		<Loader />
	) : isAuthenticated ? (
		<div>
			<h1>{user?.name}</h1>
			<p>{user?.email}</p>
		</div>
	) : (
		<Navigate to={"/login"} />
	);
};

export default Profile;
