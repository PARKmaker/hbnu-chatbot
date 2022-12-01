import Chat from "../../components/chat/Chat.jsx";
import "./lecture.css";
import { useEffect, useState } from "react";
import Content from "../../components/content/Content.jsx";
import LectureList from "../../components/lectureList/LectureList.jsx";
import { useParams } from "react-router";
import axios from "axios";

function Lecture() {
	const [selectedAside, setSelectedAside] = useState(true);
	const [tabActive, setTabActive] = useState({
		atciveObject: "chat",
		objects: [{ id: "chat" }, { id: "lectureList" }],
	});

	const handleSelectedChat = () => {
		if (selectedAside !== true) {
			setSelectedAside(true);
		}
	};

	const handleSelectedLectureList = () => {
		if (selectedAside !== false) {
			setSelectedAside(false);
		}
	};

	const toggleActive = (id) => {
		setTabActive({ ...tabActive, atciveObject: id });
	};

	const toggleActiveStyles = (id) => {
		if (id === tabActive.atciveObject) {
			return "active";
		} else {
			return "inactive";
		}
	};

	const [lectures, setLectures] = useState({});
	const title = useParams().title;

	useEffect(() => {
		const fetchLecture = async () => {
			const res = await axios.get(`/lecture/${title}`);
			setLectures(res.data);
		};
		fetchLecture();
	}, [title]);
	return (
		<>
			<main id="main">
				<section className="lecture_container">
					<Content lectures={lectures} />
					<div className="lecture_aside">
						{selectedAside ? (
							<Chat key="chat" pdf={lectures.fileName}></Chat>
						) : (
							<LectureList key="lectureList" />
						)}
					</div>
				</section>
				<aside className="tab_container">
					<button
						type="button"
						onClick={() => {
							handleSelectedChat();
							toggleActive("chat");
						}}
						className={toggleActiveStyles("chat")}
					>
						챗봇
					</button>
					<button
						type="button"
						onClick={() => {
							handleSelectedLectureList();
							toggleActive("lectureList");
						}}
						className={toggleActiveStyles("lectureList")}
					>
						강의 목록
					</button>
				</aside>
			</main>
		</>
	);
}

export default Lecture;
