import { WeatherData } from "../api/weatherAPI";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
	display: flex;
	overflow: scroll;
	font-size: 0.9rem;
	gap: 1.5em;
	padding: 0.8rem 0.5rem;
	width: 90%;
	margin: 0 auto;
	background: #f3f6ff;
	border-radius: 0.45rem;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Item = styled.div`
	display: grid;
	justify-items: center;
	gap: 0.35em;
`;

const HourlyWeather = ({ weather }: { weather: WeatherData }) => {
	function separateWeatherData() {
		const weatherArray = [];
		for (let i = 0; i < weather.hourly.time.length; i++) {
			weatherArray.push({
				time: weather.hourly.time[i],
				temperature_2m: weather.hourly.temperature_2m[i],
				cloud_cover: weather.hourly.cloud_cover[i],
				precipation: weather.hourly.precipitation[i],
				is_day:
					Number(weather.hourly.time[i].slice(-5, -3)) >= 6 &&
					Number(weather.hourly.time[i].slice(-5, -3)) <= 20
						? 1
						: 0,
			});
		}

		return weatherArray;
	}

	function render() {
		const weatherArray = separateWeatherData();
		const toRender = weatherArray.map((weatherHour) => {
			return (
				<Item key={uuidv4()}>
					<div>
						{weatherHour.temperature_2m}
						{weather.current_units.temperature_2m}
					</div>
					<WeatherIcon weather={weatherHour} size="2em" />
					<div>{weatherHour.time.slice(-5)}</div>
				</Item>
			);
		});

		return toRender;
	}

	return <Wrapper>{render()}</Wrapper>;
};

export default HourlyWeather;
