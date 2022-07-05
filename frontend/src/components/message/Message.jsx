import "./message.css";

const Message = ({ own }) => {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageInfoTop">
				<img className="messageImg" src="/assets/profile.jpeg" alt="" />
				<p className="messageText">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed,
				</p>
			</div>
			<div className="messageTime">30 mins ago</div>
		</div>
	);
};

export default Message;
