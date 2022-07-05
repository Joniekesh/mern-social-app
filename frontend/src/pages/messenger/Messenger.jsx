import "./messenger.css";
import Message from "../../components/message/Message";
const Messenger = (own) => {
	return (
		<div className="messenger">
			<div className="messengerContainer">
				<div className="messengerWrapper">
					<div className="messengerTop">
						<h2 className="messengerTitle">Messages</h2>
						<img className="messengerImg" src="/assets/profile2.jpeg" alt="" />
					</div>
					<div className="messageList">
						<Message />
						<Message own={true} />
						<Message />
						<Message />
						<Message />
						<Message own />
						<Message />
						<Message />
						<Message own />
					</div>
					<div className="chatBox">
						<textarea rows="3" placeholder="Write Something..."></textarea>
						<button className="chatBoxBtn">Send</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Messenger;
