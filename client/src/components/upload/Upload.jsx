import "./upload.css";
import { PermMedia, PictureAsPdf } from "@mui/icons-material";
import { useRef, useState } from "react";
import Video from "../../components/content/video/Video";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
	const videoUrl = useRef();
	const title = useRef();
	const description = useRef();
	const [isUploadVideo, setIsUploadVideo] = useState(false);
	const [isNotUploadVideo, setIsNotUploadVideo] = useState(false);
	const [pdfFile, setPdfFile] = useState(null);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(videoUrl.current.value);
		if (videoUrl.current.value !== "") {
			setIsUploadVideo(true);
		} else {
			setIsNotUploadVideo(true);
		}

		const data = new FormData();
		let fileName = "";
		if (pdfFile) {
			fileName = pdfFile.name;
		}

		data.append("name", fileName);
		data.append("file", pdfFile);

		const upload_data = {
			fileName: fileName,
			videoUrl: videoUrl.current.value,
			title: title.current.value,
			description: description.current.value,
		};

		try {
			await axios.post("/uploadLecture", data);
			await axios.post("/lecture", upload_data);
		} catch (err) {}
	};

	const routeHomeHandler = () => {
		navigate("/");
	};

	return (
		<>
			<form className="upload_container" onSubmit={submitHandler}>
				<div className="upload_option">
					<label
						className={`upload_video ${isNotUploadVideo ? "notUpload" : ""}`}
					>
						{isUploadVideo ? (
							<Video videoUrl={videoUrl.current.value} />
						) : (
							<>
								<PermMedia htmlColor="tomato" sx={{ fontSize: 84 }} />
								<input
									className="upload_video_input"
									type="text"
									placeholder="동영상 주소 입력하세요"
									ref={videoUrl}
								/>
							</>
						)}

						{/* <input
							style={{ display: "none" }}
							type="file"
							id="file"
							accept=".mp4"
							onChange={(e) => {
								setVideoUrl(e.target.files[0]);
							}}
						/> */}
					</label>
					<div className="upload_keywords">
						<input
							type="text"
							className="upload_title"
							placeholder="제목"
							required
							ref={title}
						/>

						<textarea
							type="text"
							className="upload_description"
							placeholder="강의 설명"
							ref={description}
							required
						></textarea>

						<label className="upload_lecturePlan">
							<PictureAsPdf htmlColor="black" sx={{ fontSize: 42 }} />
							<span className="share_optionText">
								{pdfFile ? pdfFile.name : "pdf 강의 계획서 업로드"}
							</span>
							<input
								style={{ display: "none" }}
								type="file"
								accept=".pdf"
								onChange={(e) => {
									setPdfFile(e.target.files[0]);
								}}
							/>
						</label>
					</div>
				</div>
				{isUploadVideo ? (
					<div className="upload_button" onClick={routeHomeHandler}>
						<p className="upload_buttonText">홈으로 돌아가기</p>
					</div>
				) : (
					<button
						className="upload_button"
						type="submit"
						onClick={submitHandler}
					>
						업로드
					</button>
				)}
			</form>
		</>
	);
}
