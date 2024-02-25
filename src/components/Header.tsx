import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "../theme";

const Wrapper = styled.header`
	color: #fff;
	background: ${theme.primary};
	padding: 1em 0;
`;

const Container = styled.div`
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
	align-self: flex-end;
	color: inherit;
	text-decoration: none;
	font-weight: bold;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}

	&:visited {
		color: inherit;
	}

	&.active {
		border-bottom: #fff 1px solid;
		opacity: 1;
	}
`;

const Header = () => {
	return (
		<Wrapper>
			<Container>
				<StyledLink to="/">User's Weather</StyledLink>
				<StyledLink to="/saved">Saved List</StyledLink>
			</Container>
		</Wrapper>
	);
};

export default Header;
