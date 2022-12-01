import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const navigate = useNavigate();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			password.current.setCustomValidity("Passwords don's match");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				navigate("/login");
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="login">
			<div className="login-wrapper">
				<div className="login-left">
					<h3 className="login-logo">HBNU Chatbot</h3>
					<span className="	login-desc">회원가입</span>
				</div>
				<div className="login-right">
					<form className="login-box" onSubmit={handleClick}>
						<input placeholder="Username" required ref={username} className="login-input" />
						<input placeholder="Email" required ref={email} className="login-input" type="eamil" />
						<input
							placeholder="Password"
							required
							ref={password}
							className="login-input"
							type="password"
							minLength="6"
						/>
						<input
							placeholder="Password Again"
							required
							ref={passwordAgain}
							className="login-input"
							type="password"
						/>
						<button className="login-button" type="submit">
							Sign Up
						</button>
						<button className="login-registerButton">Log into Account</button>
					</form>
				</div>
			</div>
		</div>
	);
}
