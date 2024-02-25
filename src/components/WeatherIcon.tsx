import heavy_clouds from "../assets/images/heavy_clouds.png";
import light_clouds_day from "../assets/images/light_clouds_day.png";
import light_clouds_night from "../assets/images/light_clouds_night.png";
import clouds_day from "../assets/images/clouds_day.png";
import clouds_night from "../assets/images/clouds_night.png";
import sunny from "../assets/images/sunny.png";
import moon from "../assets/images/moon.png";
import snow from "../assets/images/snow.png";
import rain from "../assets/images/rain.png";
import styled from "styled-components";

type Weather = {
	temperature_2m: number;
	is_day: number;
	precipation: number;
	cloud_cover: number;
};

const Icon = styled.img<{ $size: string }>`
	width: ${(props) => props.$size};
`;

const WeatherIcon = ({ weather, size }: { weather: Weather; size: string }) => {
	let weatherIcon = sunny;

	if (weather.precipation > 0) {
		if (weather.temperature_2m < 0) {
			weatherIcon = snow;
		} else {
			weatherIcon = rain;
		}
	} else if (weather.cloud_cover > 85) {
		weatherIcon = heavy_clouds;
	} else if (weather.is_day === 1) {
		if (weather.cloud_cover > 50) {
			weatherIcon = light_clouds_day;
		} else if (weather.cloud_cover > 65) {
			weatherIcon = clouds_day;
		}
	} else if (weather.is_day !== 1) {
		weatherIcon = moon;

		if (weather.cloud_cover > 50) {
			weatherIcon = light_clouds_night;
		} else if (weather.cloud_cover > 65) {
			weatherIcon = clouds_night;
		}
	}

	return <Icon src={weatherIcon} alt="weather Icon" $size={size} />;
};

export default WeatherIcon;
