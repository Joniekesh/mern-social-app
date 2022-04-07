import "./commentForm.css";

const CommentForm = () => {
	return (
		<div className="commentForm">
			<div className="commentFormWrapper">
				<form className="form">
					<div className="formGroup">
						<div className="inputDiv">
							<img className="commentFormImg" src="/assets/profile2.jpeg" />
							<textarea placeholder="Add comment"></textarea>
						</div>
						<div className="formButtom">
							<span className="at">@</span>
							<i className="fa-solid fa-camera"></i>
							<i className="fa-solid fa-paper-plane"></i>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CommentForm;
