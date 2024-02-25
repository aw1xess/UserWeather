import { WeatherData } from "../api/weatherAPI";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon";

const UserWeather = styled.div`
	display: grid;
	gap: 0.75rem;
	justify-items: center;
`;

const CurrentWeather = ({ weather }: { weather: WeatherData }) => {
	return (
		<UserWeather>
			<p>
				{weather.current.temperature_2m}
				{weather.current_units.temperature_2m}
			</p>
			<WeatherIcon weather={weather.current} size="3rem" />
			<p>
				{weather.daily.temperature_2m_min[0]}
				{weather.daily_units.temperature_2m_min} /{" "}
				{weather.daily.temperature_2m_max[0]}
				{weather.daily_units.temperature_2m_max}
			</p>
		</UserWeather>
	);
};

export default CurrentWeather;
