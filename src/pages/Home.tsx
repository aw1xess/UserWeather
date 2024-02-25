import Cards from "../components/Cards";
import styled from "styled-components";
import { theme } from "../theme";
import { useData } from "../hooks/useData";

const Wrapper = styled.div`
	display: grid;
`;

const LoadButton = styled.button`
	background: #1d941d;
	color: ${theme.bg};
	padding: 0.5em;
	width: 9rem;
	border: none;
	border-radius: 0.35rem;
	justify-self: center;
	margin-bottom: 2rem;

	&:hover {
		cursor: pointer;
	}
`;

const Home = () => {
	const data = useData();
	return (
		<Wrapper>
			<Cards data={data.data} />
			<LoadButton onClick={() => data.loadMore()}>Load More</LoadButton>
		</Wrapper>
	);
};

export default Home;
