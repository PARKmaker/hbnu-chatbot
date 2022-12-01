import "./chat.css";
import React, { useState, useRef, useEffect } from "react";

function Chat({ pdf }) {
	const [socketConnected, setSocketConnected] = useState(false);
	const endOfMessagesRef = useRef(null);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [messages, setMessages] = useState([]);

	const ws = useRef(new WebSocket("ws://192.168.37.122:9997"));

	useEffect(() => {
		ws.current.onopen = () => {
			console.log("server connect");
			setSocketConnected(true);
		};
		ws.current.onclose = () => {
			console.log("server Disconnect");
		};

		ws.current.onerror = (error) => {
			console.log("server error : " + error);
		};
	}, []);

	useEffect(() => {
		ws.current.onmessage = (message) => {
			const arrivalMessageData = {
				text: message.data,
				time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
				id: "frnd_message",
			};
			setArrivalMessage(arrivalMessageData);
		};
	}, [arrivalMessage]);

	useEffect(() => {
		if (arrivalMessage && arrivalMessage !== "") {
			setMessages((prev) => [...prev, arrivalMessage]);
		}

		scrollToBottom();
	}, [arrivalMessage]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (newMessage !== "") {
			const messageData = {
				text: newMessage,
				time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
				id: "my_message",
			};

			if (socketConnected) {
				let sendMessage;
				if (pdf === "") {
					sendMessage = `{"question": "${messageData.text}"}`;
				} else {
					sendMessage = `{"question": "${messageData.text}", "file": "${pdf}"}`;
				}
				console.log(sendMessage);
				ws.current.send(sendMessage);
				setMessages((list) => [...list, messageData]);
				setNewMessage("");
				scrollToBottom();
			}
		}
	};

	const scrollToBottom = () => {
		endOfMessagesRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const handleChangeInput = (e) => {
		setNewMessage(e.target.value);
	};

	return (
		<div className="chat_container">
			<div className="chat_box">
				{messages.map((messageContent) => {
					if (messageContent.id === "my_message") {
						return (
							<div className="message my_message">
								<p>
									{messageContent.text}
									<br />
									<span>{messageContent.time}</span>
								</p>
							</div>
						);
					} else {
						return (
							<div className="message frnd_message">
								<p>
									{messageContent.text}
									<br />
									<span>{messageContent.time}</span>
								</p>
							</div>
						);
					}
				})}
				<div id="end_scroll" ref={endOfMessagesRef} />
			</div>

			<div className="chat_input">
				<form onSubmit={handleSendMessage}>
					<input
						type="text"
						value={newMessage}
						placeholder="챗봇에게 질문 하세요"
						onChange={handleChangeInput}
					></input>
					<button onClick={handleSendMessage}>&#9658;</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;

//혹시 모르는것들
// useEffect(() => {
// 	if(!ws.current)
// });
// useEffect(() => {
// 	if (!ws.current) {
// 		ws.current = new WebSocket(webSocketUrl);
// 		ws.current.onopen = () => {
// 			console.log("server connect");
// 			setSocketConnected(true);
// 		};
// 		ws.current.onclose = () => {
// 			console.log("server Disconnect");
// 		};

// 		ws.current.onerror = (error) => {
// 			console.log("server error : " + error);
// 		};

// 		ws.current.onmessage = (message) => {
// 			const arrivalMessageData = {
// 				text: message.data,
// 				time:
// 					new Date(Date.now()).getHours() +
// 					":" +
// 					new Date(Date.now()).getMinutes(),
// 				id: "ai",
// 			};
// 			setArrivalMessage(arrivalMessageData);

// 			arrivalMessage &&
// 				setMessages((prev) => [...prev, arrivalMessage]) &&
// 				console.log(arrivalMessage.id) &&
// 				scrollToBottom();
// 		};
// 	}

// 	return () => {
// 		console.log("clean up");
// 		ws.current.close();
// 	};
// }, []);

// useEffect(() => {
// 	if (socketConnected) {
// 		ws.current.send();
// 	}
// });

// useEffect(() => {}, [arrivalMessage]);

// webSocket.onopen = () => {
// 	console.log("server connect");
// };

// webSocket.onclose = () => {
// 	console.log("server Disconnect");
// };

// webSocket.onerror = () => {
// 	console.log("server error");
// };

// useEffect(() => {
// 	socket.current = io("ws://localhost:9998");

// 	socket.current.on("getMessages", (data) => {
// 		setArrivalMessage({
// 			text: data.text,
// 		});
// 	});
// }, []);

// useEffect(() => {
// 	arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
// }, [arrivalMessage]);
