import "./reply.css";
import CommentItem from "../../components/commentItem/CommentItem";
import ReplyItem from "../../components/replieItem/ReplyItem";
import { Link } from "react-router-dom";
import CommentForm from "../../components/forms/commentForm/CommentForm";

const Reply = () => {
	return (
		<div className="reply">
			<div className="container">
				<div className="replyWrapper">
					<p className="replyIntro">
						Replies to <Link to="/profiles/111">Okoro John's</Link> Comment on
						this <Link to="/111">post</Link>
					</p>
					<CommentItem />
					<div className="replyLists">
						<ReplyItem />
						<ReplyItem />
						<ReplyItem />
						<ReplyItem />
						<ReplyItem />
						<ReplyItem />
					</div>
					<CommentForm />
				</div>
			</div>
		</div>
	);
};

export default Reply;
