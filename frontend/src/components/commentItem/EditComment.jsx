import "./editComment.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { updateComment } from "../../redux/actions/postActions";
import { getPostById } from "../../redux/actions/postActions";

const EditComment = () => {
	const {
		state: { comment },
	} = useLocation();

	const [desc, setDesc] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	useEffect(() => {
		dispatch(getPostById(id));
	}, [dispatch, id]);

	const handleCancel = () => {
		navigate(-1);
	};

	const upDatedComment = {
		user: user._id,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		if (isAuthenticated && user._id === comment?.user) {
			dispatch(updateComment(currentPost._id, comment._id, upDatedComment));
			navigate(`/posts/${currentPost._id}`);
			window.location.reload();
		}
	};

	return (
		<div className="container">
			<div className="editCommentWrapper">
				<div className="commentsListItem">
					<Link to={`/profiles/${comment?.user}`}>
						<div className="singleLeftDiv">
							<img
								className="singlePostcommentImg"
								src={comment?.profilePic}
								alt=""
							/>
						</div>
					</Link>
					<div className="commentDivWrapper">
						<div className="commentsDiv">
							<div className="commentTop">
								<Link to={`/profiles/${comment?.user}`}>
									<div className="commentTopLeft">
										<p className="commentUserName">{comment?.name}</p>
										<span className="commentUserProfileDesc">
											Full Stack Developer: MERN | Socket.io | Redux | Firebase
											| Git...
										</span>
										<span className="commentTime">{format(comment?.date)}</span>
									</div>
								</Link>
							</div>
							<hr className="line" />
							<div className="commentBottom">
								<textarea
									className="editCommentDesc"
									defaultValue={comment.desc}
									onChange={(e) => setDesc(e.target.value)}
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="commentEditBtnGroup">
				<button className="editCancelBtn" onClick={handleCancel}>
					Cancel
				</button>
				<button className="updatelBtn" onClick={handleUpdate}>
					Update
				</button>
			</div>
		</div>
	);
};

export default EditComment;
