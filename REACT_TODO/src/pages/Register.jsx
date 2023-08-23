import axios from "axios";
import React, { useContext, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const {
		isAuthenticated,
		setIsAuthenticated,
		loading,
		setLoading,
		setNewUser,
	} = useContext(Context);

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`${server}/users/register`,
				{
					name,
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			setIsAuthenticated(true);
			setLoading(false);
			setNewUser((prev) => !prev);
			toast.success(data.message);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setLoading(false);
			setIsAuthenticated(false);
		}
	};

	if (isAuthenticated) return <Navigate to={"/"} />;

	return (
		<div className="login">
			<section>
				<form onSubmit={submitHandler}>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button disabled={loading} type="submit">
						Sign Up
					</button>
					<h4>Or</h4>
					<Link to={"/login"}>Login</Link>
				</form>
			</section>
		</div>
	);
};

export default Register;
