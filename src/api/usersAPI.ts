type User = {
	name: {
		first: string;
		last: string;
	};
	gender: string;
	email: string;
	picture: {
		large: string;
		medium: string;
	};
	location: {
		city: string;
		country: string;
		coordinates: {
			latitude: string;
			longitude: string;
		};
	};
};

type Users = {
	info: any;
	results: Array<User>;
};

export type ArrayUsers = Array<Users>;

export async function requestUser(): Promise<Users> {
	return fetch("https://randomuser.me/api/")
		.then((response) => {
			if (!response.ok) {
				throw new Error("User response was not ok");
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
		});
}

export async function requestSixUsers(): Promise<ArrayUsers> {
	const result: ArrayUsers = [];
	for (let i = 0; i < 6; i++) {
		await requestUser().then((response) => {
			if (response) {
				result.push(response);
			}
		});
	}

	return result;
}
