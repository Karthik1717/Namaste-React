import React from "react";
import UserContext from "../utils/UserContext";

class About extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<h1>About Class Component</h1>
				<div>
					LoggedIn User:
					<UserContext.Consumer>
						{({ loggedInUser }) => <span>{loggedInUser}</span>}
					</UserContext.Consumer>
				</div>
			</div>
		);
	}
}

export default About;
