import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { Context, server } from "./main";
import axios from "axios";

function App() {
	const { setUser, setIsAuthenticated, setLoading, newUser } =
		useContext(Context);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${server}/users/me`, { withCredentials: true })
			.then((res) => {
				setUser(res.data.user);
				setIsAuthenticated(true);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setUser({});
				setLoading(false);
				setIsAuthenticated(false);
			});
	}, [newUser]);
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
