export type WeatherData = {
	current_units: {
		temperature_2m: string;
	};
	current: {
		time: string;
		temperature_2m: number;
		is_day: number;
		precipation: number;
		cloud_cover: number;
	};
	daily_units: {
		temperature_2m_min: string;
		temperature_2m_max: string;
	};

	daily: {
		temperature_2m_min: Array<number>;
		temperature_2m_max: Array<number>;
	};

	hourly: {
		time: Array<string>;
		temperature_2m: Array<number>;
		precipitation: Array<number>;
		cloud_cover: Array<number>;
	};
};

export async function requestWeather(
	lat: Array<string>,
	lon: Array<string>
): Promise<Array<WeatherData>> {
	return await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat.join(
			","
		)}&longitude=${lon.join(
			","
		)}&current=temperature_2m,is_day,precipitation,cloud_cover&hourly=temperature_2m,precipitation,cloud_cover&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Weather response was not ok");
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
		});
}
