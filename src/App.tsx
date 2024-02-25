/* eslint-disable react-hooks/exhaustive-deps */
import "./reset.css";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrayUsers, requestSixUsers } from "./api/usersAPI";
import { WeatherData, requestWeather } from "./api/weatherAPI";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";
import { theme } from "./theme";

export type User = {
	id: string;
	name: string;
	gender: string;
	email: string;
	picture: string;
	country: string;
	city: string;
	weather: WeatherData;
};

const Wrapper = styled.section`
	background: ${theme.bg};
`;

const Spinner = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	margin-top: 4rem;
`;

const App = () => {
	const [users, setUsers] = useState<ArrayUsers>();
	const [weather, setWeather] = useState<Array<WeatherData>>();
	const [data, setData] = useState<Array<User>>();

	async function getUsers() {
		await requestSixUsers().then((response) => {
			setUsers(response);
		});
	}

	async function loadUsers() {
		await requestSixUsers().then((response) => {
			setUsers(users?.concat(response));
		});
	}

	function getCoordinates() {
		const coordinates: { lat: Array<string>; lon: Array<string> } = {
			lat: [],
			lon: [],
		};

		users?.forEach((user) => {
			coordinates.lat.push(user.results[0].location.coordinates.latitude);
			coordinates.lon.push(
				user.results[0].location.coordinates.longitude
			);
		});
		return coordinates;
	}

	async function getWeather(lat: Array<string>, lon: Array<string>) {
		requestWeather(lat, lon).then((response) => {
			setWeather(response);
		});
	}

	console.log(
		users?.length === weather?.length,
		users?.length,
		weather?.length
	);

	function sortData() {
		if (users && weather && users.length === weather.length) {
			console.log(1);
			const sortedData: Array<User> = [];
			users.forEach((user) => {
				sortedData.push({
					id: uuidv4(),
					name: `${user.results[0].name.first} ${user.results[0].name.last}`,
					gender: user.results[0].gender,
					email: user.results[0].email,
					picture: user.results[0].picture.large,
					country: user.results[0].location.country,
					city: user.results[0].location.city,
					weather: weather[users.indexOf(user)],
				});
			});
			console.log(sortedData);
			setData(sortedData);
		}
	}

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		if (users) {
			getWeather(getCoordinates().lat, getCoordinates().lon);
		}
	}, [users]);

	useEffect(() => {
		sortData();
	}, [weather]);

	return (
		<Wrapper>
			<Header />
			<div className="container">
				{data?.length && users?.length === weather?.length ? (
					<Outlet
						context={{
							data: data,
							loadMore: () => {
								loadUsers();
							},
						}}
					/>
				) : (
					<Spinner>
						<TailSpin
							visible={true}
							height="80"
							width="80"
							color="#666666"
							ariaLabel="tail-spin-loading"
							radius="1"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					</Spinner>
				)}
			</div>
		</Wrapper>
	);
};

export default App;
