import "./video.css";
import ReactPlayer from "react-player";

export default function Video({ videoUrl }) {
	return (
		<>
			<ReactPlayer
				url={videoUrl}
				width="100%"
				height="100%"
				controls={true}
				light={false}
				pip={true}
			/>
		</>
	);
}
