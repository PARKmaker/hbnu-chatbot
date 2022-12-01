import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./courseList.css";

export default function CourseList({ lecture }) {
	const [thumbnail, setThumbnail] = useState("");

	useEffect(() => {
		let thumbnail = [];
		const videoUrl = new URLSearchParams(lecture?.videoUrl);
		for (const param of videoUrl) {
			thumbnail.push(param[1]);
		}
		setThumbnail(`http://img.youtube.com/vi/${thumbnail[0]}/0.jpg`);
	}, []);

	return (
		<div className="courseList-container">
			<div className="courseList-card">
				<div className="card-image">
					<Link to={`lecture/${lecture.title}`}>
						<img className="video-thumbnail" src={thumbnail} alt="" />
					</Link>
				</div>
				<div className="card-section">
					<div className="card-title">{lecture?.title}</div>
					<div className="card-description">{lecture?.description}</div>
				</div>
			</div>
		</div>
	);
}
