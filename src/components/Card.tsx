import styled from "styled-components";
import { theme } from "../theme";
import ModalWeather from "./ModalWeather";
import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import { User } from "../App";

type UserCard = User & {
	saved?: boolean;
	saveUser: (user: User) => void;
	removeUser: (id: string) => void;
};

const Wrapper = styled.div`
	background: #fff;
	color: ${theme.text};
	border-radius: 0.35rem;
	display: grid;
	gap: 1.5rem;
	padding: 2rem 1rem;
	justify-items: center;
	text-align: center;
	width: 85%;
	margin: 0 auto;

	@media (min-width: 650px) {
		width: 50%;
	}

	@media (min-width: 1024px) {
		width: 40%;
	}
`;

const Picture = styled.div<{ $picture: string }>`
	width: 7rem;
	height: 7rem;
	background: url(${(props) => props.$picture}) no-repeat;
	background-position: center;
	background-size: contain;
	border-radius: 6rem;
`;

const UserInfo = styled.div`
	& > p:nth-child(2) {
		font-size: 0.9rem;
		opacity: 0.7;
	}

	& > p:nth-child(3) {
		font-style: italic;
	}

	& > p:nth-child(4) {
		color: ${theme.primary};
	}
`;

const Line = styled.span`
	width: 100%;
	height: 1px;
	background: ${theme.primary};
	opacity: 0.5;
`;

const ButtonsWrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

const Button = styled.button<{ $background: string }>`
	background: ${(props) => props.$background};
	color: #fff;
	padding: 0.5em;
	width: 6rem;
	border: none;
	border-radius: 0.35rem;

	&:hover {
		cursor: pointer;
	}
`;

const Card = ({
	id,
	name,
	gender,
	email,
	picture,
	country,
	city,
	weather,
	saved,
	saveUser,
	removeUser,
}: UserCard) => {
	const [modalVisible, setModalVisible] = useState(false);

	function toggleModalWeather() {
		setModalVisible(!modalVisible);
	}

	useEffect(() => {
		document.body.style.overflow = modalVisible ? "hidden" : "unset";
	}, [modalVisible]);

	// console.log(window.localStorage.getItem("savedUsers"));

	// window.localStorage.removeItem("savedUsers");

	return (
		<Wrapper>
			<Picture $picture={picture} />
			<UserInfo>
				<h3>{name}</h3>
				<p>{gender}</p>
				<p>
					{city}, {country}
				</p>
				<p>{email}</p>
			</UserInfo>
			<Line />
			<CurrentWeather weather={weather} />
			<Line />
			<ButtonsWrapper>
				{saved ? (
					<Button
						$background="#b9142d"
						onClick={() => removeUser(id)}
					>
						Remove
					</Button>
				) : (
					<Button
						$background="#1d941d"
						onClick={() =>
							saveUser({
								id: id,
								name: name,
								gender: gender,
								email: email,
								picture: picture,
								country: country,
								city: city,
								weather: weather,
							})
						}
					>
						Save
					</Button>
				)}

				<Button
					$background={theme.primary}
					onClick={toggleModalWeather}
				>
					Weather
				</Button>
			</ButtonsWrapper>
			{modalVisible ? (
				<ModalWeather
					weather={weather}
					toggleModalWeather={toggleModalWeather}
				/>
			) : (
				""
			)}
		</Wrapper>
	);
};

export default Card;
