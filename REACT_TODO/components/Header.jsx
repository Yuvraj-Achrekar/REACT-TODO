import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../src/main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
	const {
		isAuthenticated,
		setIsAuthenticated,
		loading,
		setLoading,
		setNewUser,
	} = useContext(Context);

	const logoutHandler = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${server}/users/logout`,

				{
					withCredentials: true,
				}
			);
			setIsAuthenticated(false);
			setLoading(false);
			setNewUser((prev) => !prev);
			toast.success("Logged Out Successfully");
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setLoading(false);
			setIsAuthenticated(true);
		}
	};

	return (
		<nav className="header">
			<div>
				<h2>ToDo App.</h2>
			</div>
			<article>
				<Link to={"/"}>Home</Link>
				<Link to={"/profile"}>Profile</Link>
				{isAuthenticated ? (
					<button disabled={loading} onClick={logoutHandler} className="btn">
						Logout
					</button>
				) : (
					<Link to={"/login"}>Login</Link>
				)}
			</article>
		</nav>
	);
};

export default Header;
