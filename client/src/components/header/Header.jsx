import { Link } from "react-router-dom";
import "./header.css";
// import Nav from "./Header_Nav.js";
function Header() {
	return (
		<header className="header">
			<div className="header-container">
				<div className="header-left">
					<Link to="/" style={{ textDecoration: "none" }}>
						<span className="logo">HBNU</span>
					</Link>
				</div>
				<nav className="header-center">
					<Link to="/courses" style={{ textDecoration: "none" }}>
						<span className="header-link">모든강의</span>
					</Link>
					<Link to="/my-courses" style={{ textDecoration: "none" }}>
						<span className="header-link">내강의</span>
					</Link>
					<Link to="/manager" style={{ textDecoration: "none" }}>
						<span className="header-link">관리자페이지</span>
					</Link>
				</nav>
				<div className="header-right">
					<Link to="/" style={{ textDecoration: "none" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							width="35px"
							height="35px"
						>
							<path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
						</svg>
						{/* <span className="header-cta">내정보</span> */}
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;
