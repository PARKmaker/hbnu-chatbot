import Lecture from "./page/lecture/Lecture";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/home/Home";
import Manager from "./page/manager/Manager";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import { useContext } from "react";

function App() {
	const { user } = useContext(AuthContext);

	return (
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="manager" element={user ? <Manager /> : <Navigate replace to="/login" />} />
				<Route path="login" element={user ? <Navigate replace to="/manager" /> : <Login />} />
				<Route path="register" element={<Register />} />
				<Route path="lecture/:title" element={<Lecture />} />
			</Route>
		</Routes>
	);
}

export default App;
