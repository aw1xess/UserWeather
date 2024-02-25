import Cards from "../components/Cards";
import EmptySaved from "../components/EmptySaved";

const SavedUsers = () => {
	//@ts-expect-error local
	const data = JSON.parse(window.localStorage.getItem("savedUsers"));

	if (data) {
		return <Cards data={data} saved={true} />;
	}

	return <EmptySaved />;
};

export default SavedUsers;
