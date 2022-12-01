import { Link } from "react-router-dom";
import "./content.css";
import Video from "./video/Video";

export default function Content({ lectures }) {
	return (
		<div className="content_container">
			<header className="content_topbar">
				<div className="content_topbar_dashboard">
					<Link to="/" style={{ textDecoration: "none" }}>
						<span id="dashboard">대시보드</span>
					</Link>
				</div>

				<h4 className="content_topbar_lectureName">{lectures.title}</h4>
			</header>
			<main className="content_video">
				<Video videoUrl={lectures.videoUrl} />
			</main>
			<footer className="content_footer">
				<div className="content_footer_container">
					<span className="content_footer_button prev_button">이전 강의</span>
					<span className="content_footer_button next_button">다음 강의</span>
				</div>
			</footer>
		</div>
	);
}
