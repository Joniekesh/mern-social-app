import "./gitRepos.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGitRepos } from "../../../redux/actions/prifileActions";

const GitRepos = ({ userProfile }) => {
	const dispatch = useDispatch();

	const username = userProfile?.githubusername;

	const profile = useSelector((state) => state.profile);
	const { repos, loading } = profile;

	useEffect(() => {
		username && dispatch(getGitRepos(username));
	}, [dispatch, username]);

	return (
		<>
			{!loading && username && repos?.length > 0 ? (
				repos.map((repo, i) => (
					<div className="gitReposListItem" key={i}>
						<div className="reposInfo">
							<div className="reposLeft">
								<a
									href={repo?.html_url}
									target="_blank"
									rel="nooepener noreferrer"
								>
									{repo?.name}
								</a>
								<p>{repo?.description}</p>
							</div>
							<div className="reposRight">
								<p className="stars">Stars: {repo?.stargazers_count} </p>
								<p className="watchers">Watchers: {repo?.watchers_count} </p>
								<p className="forks">Forks: {repo?.forks_count} </p>
							</div>
						</div>
					</div>
				))
			) : (
				<h4>No repos for this user yet.</h4>
			)}
		</>
	);
};

export default GitRepos;
