import styled from "styled-components";
import Card from "./Card";
import { User } from "../App";
import { useState } from "react";
import EmptySaved from "./EmptySaved";

const Wrapper = styled.section`
	display: grid;
	margin: 2rem 0;
	gap: 1rem;
`;

const Cards = ({ data, saved }: { data: Array<User>; saved?: boolean }) => {
	const [users, setUsers] = useState<Array<User> | undefined>(data);

	function saveUser(user: User) {
		if (window.localStorage.getItem("savedUsers") !== null) {
			const usersData = JSON.parse(
				//@ts-expect-error local
				window.localStorage.getItem("savedUsers")
			);

			for (let i = 0; i < usersData.length; i++) {
				if (usersData[i].id === user.id) {
					window.alert("This user is already in list!");
					return false;
				}
			}

			usersData.unshift(user);
			localStorage.setItem("savedUsers", JSON.stringify(usersData));
			setUsers(usersData);
		} else {
			const usersData = [user];
			localStorage.setItem("savedUsers", JSON.stringify(usersData));
			setUsers(usersData);
		}

		window.alert(`User ${user.name} is added to your Saved List`);

		// console.log(window.localStorage);
	}

	function removeUser(id: string) {
		if (window.localStorage.getItem("savedUsers") !== null) {
			const usersData = JSON.parse(
				//@ts-expect-error local
				window.localStorage.getItem("savedUsers")
			);

			if (usersData.length === 1) {
				window.localStorage.removeItem("savedUsers");
				setUsers(undefined);
			} else {
				usersData.forEach((user: User) => {
					if (user.id === id) {
						usersData.splice(usersData.indexOf(user), 1);
						localStorage.setItem(
							"savedUsers",
							JSON.stringify(usersData)
						);
						setUsers(usersData);
					}
				});
			}
		}
	}

	function renderUsers() {
		if (!users) {
			return <EmptySaved />;
		}
		const usersData = saved ? users : data;
		const arrayUsers = usersData.map((user) => {
			return (
				<Card
					id={user.id}
					name={user.name}
					gender={user.gender}
					email={user.email}
					picture={user.picture}
					country={user.country}
					city={user.city}
					weather={user.weather}
					saved={saved ? true : false}
					saveUser={saveUser}
					removeUser={removeUser}
					key={user.id}
				/>
			);
		});
		return arrayUsers;
	}

	return <Wrapper>{renderUsers()}</Wrapper>;
};

export default Cards;
