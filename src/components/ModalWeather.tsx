import styled from "styled-components";
import { theme } from "../theme";
import { WeatherData } from "../api/weatherAPI";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";

const Container = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

const Info = styled.div`
	width: 85%;
	margin: auto;
	background: ${theme.bg};
	padding: 1rem 0rem;
	display: grid;
	gap: 1rem;
	border-radius: 0.45rem;
`;

const CloseButton = styled.a`
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: #fff;
	padding: 0 0.5rem;
	border-radius: 5rem;
	font-weight: bold;
	display: grid;
	align-items: center;
`;

const ModalWeather = ({
	weather,
	toggleModalWeather,
}: {
	weather: WeatherData;
	toggleModalWeather: () => void;
}) => {
	return (
		<Container>
			<Info>
				<CloseButton
					onClick={() => {
						toggleModalWeather();
					}}
				>
					Close
				</CloseButton>
				<h2>Current weather</h2>
				<CurrentWeather weather={weather} />
				<h2>Hourly weather</h2>
				<HourlyWeather weather={weather} />
			</Info>
		</Container>
	);
};

export default ModalWeather;
