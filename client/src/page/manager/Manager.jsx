import Header from "../../components/header/Header";
import Upload from "../../components/upload/Upload";
import "./manager.css";

export default function Manager() {
	return (
		<div className="manager">
			<Header />
			<div className="manager_container">
				<header className="manager_topbar">강의 업로드</header>
				<section className="manager_upload">
					<Upload />
				</section>
				<footer className="manager_footer"></footer>
			</div>
		</div>
	);
}
