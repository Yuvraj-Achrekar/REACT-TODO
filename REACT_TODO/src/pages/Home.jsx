import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoItem from "../../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const { isAuthenticated } = useContext(Context);

	const updateHandler = (id) => {
		axios
			.put(`${server}/task/${id}`, {}, { withCredentials: true })
			.then((res) => {
				setRefresh((prev) => !prev);
				toast.success(res.data.message);
			})
			.catch((error) => toast.error(error.response.data.message));
	};
	const deleteHandler = (id) => {
		axios
			.delete(`${server}/task/${id}`, { withCredentials: true })
			.then((res) => {
				toast.success(res.data.message);
				setRefresh((prev) => !prev);
			})
			.catch((error) => toast.error(error.response.data.message));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${server}/task/new`,
				{
					title,
					description,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success(data.message);
			setTitle("");
			setDescription("");
			setRefresh((prev) => !prev);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		axios
			.get(`${server}/task/my`, {
				withCredentials: true,
			})
			.then((res) => {
				setTasks(res.data.tasks);
			})
			.catch((e) => toast.error(e.response.data.message));
	}, [refresh]);

	if (!isAuthenticated) return <Navigate to={"/login"} />;

	return (
		<div className="container">
			<div className="login">
				<section>
					<form action="" onSubmit={submitHandler}>
						<input
							type="text"
							placeholder="Title"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Description"
							required
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<button disabled={loading} type="submit">
							Add Task
						</button>
					</form>
				</section>
			</div>
			<section className="todosContainer">
				{tasks?.map((data) => {
					return (
						<TodoItem
							key={data._id}
							id={data._id}
							title={data.title}
							description={data.description}
							isCompleted={data.isCompleted}
							updateHandler={updateHandler}
							deleteHandler={deleteHandler}
						/>
					);
				})}
			</section>
		</div>
	);
};

export default Home;
