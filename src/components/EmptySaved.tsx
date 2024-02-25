import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../theme";

const Wrapper = styled.div`
	color: #646464;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%);
	width: 100%;
	text-align: center;
`;

const StyledLink = styled(Link)`
	color: ${theme.primary};
`;

const EmptySaved = () => {
	return (
		<Wrapper>
			<p>Looks like there are no users saved</p>
			<p>
				You can save user on <StyledLink to="/">Home page</StyledLink>
			</p>
		</Wrapper>
	);
};

export default EmptySaved;
