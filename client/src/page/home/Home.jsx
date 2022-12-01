import "./home.css";
import Header from "../../components/header/Header";
import CourseList from "../../components/courseList/CourseList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [lectures, setLectures] = useState([]);

	useEffect(() => {
		const fetchLecture = async () => {
			const res = await axios.get("lecture/timeline");
			setLectures(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchLecture();
	}, []);

	return (
		<div className="home">
			<Header />
			<div className="home_container">
				<header className="home_topbar">강의 목록</header>
				<section className="home_coures">
					{lectures?.map((p) => (
						<CourseList key={p._id} lecture={p} />
					))}
				</section>
				<footer className="home_footer">푸터</footer>
			</div>
		</div>
	);
}
